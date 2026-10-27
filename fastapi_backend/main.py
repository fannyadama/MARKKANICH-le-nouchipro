import json, os
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Text, func, or_
from typing import Optional, List
from pydantic import BaseModel
from database import get_db, engine, Base

# 1. Modèles SQLAlchemy
class MotNouchi(Base):
    __tablename__ = "mots_nouchi"
    id = Column(Integer, primary_key=True, index=True)
    mot = Column(String, unique=True, index=True, nullable=False)
    prononciation = Column(String)
    definition = Column(Text)
    exemple = Column(Text)
    origine = Column(String)
    categorie = Column(String, index=True)
    nb_consultations = Column(Integer, default=0)

class ContributionIn(BaseModel):
    mot_propose: str
    definition_proposee: str
    exemple: Optional[str] = None
    categorie: Optional[str] = None
    auteur_email: Optional[str] = None

# 2. Initialisation de la Base de données
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="API Markkanich Nouchi",
    description="API officielle du dictionnaire de l'argot ivoirien (Nouchi) 🇨🇮",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Seed automatique au démarrage
def seed_database():
    json_path = os.path.join(os.path.dirname(__file__), "nouchi_300.json")
    if not os.path.exists(json_path):
        # Fallback to root if run from parent
        json_path = "nouchi_300.json"
    
    if os.path.exists(json_path):
        try:
            db = next(get_db())
            count = db.query(MotNouchi).count()
            if count == 0:
                with open(json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                for item in data:
                    db.add(MotNouchi(
                        mot=item.get('m', ''),
                        prononciation=item.get('p', ''),
                        definition=item.get('d', ''),
                        exemple=item.get('e', ''),
                        origine=item.get('o', ''),
                        categorie=item.get('c', 'general')
                    ))
                db.commit()
                print(f"✅ Base de données initialisée avec {len(data)} mots Nouchi.")
            db.close()
        except Exception as e:
            print("⚠️ Erreur lors de l'initialisation du seed :", e)

seed_database()

# 3. Routes de l'API
@app.get("/")
def read_root():
    return {
        "message": "API Markkanich Nouchi en ligne 🇨🇮",
        "doc": "/docs",
        "status": "healthy"
    }

@app.get("/mots")
def get_mots(
    q: Optional[str] = Query(None, description="Terme ou définition à rechercher"),
    categorie: Optional[str] = Query(None, description="Filtrer par catégorie"),
    page: int = Query(1, ge=1, description="Numéro de la page"),
    limite: int = Query(50, ge=1, le=200, description="Nombre de mots par page"),
    db: Session = Depends(get_db)
):
    query = db.query(MotNouchi)
    if q:
        terme = f"%{q.lower().strip()}%"
        query = query.filter(
            or_(
                func.lower(MotNouchi.mot).like(terme),
                func.lower(MotNouchi.definition).like(terme),
                func.lower(MotNouchi.exemple).like(terme)
            )
        )
    if categorie and categorie != "all":
        query = query.filter(MotNouchi.categorie == categorie)
    
    total = query.count()
    mots = query.offset((page - 1) * limite).limit(limite).all()
    
    return {
        "total": total,
        "page": page,
        "limite": limite,
        "resultats": mots
    }

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_mots = db.query(func.count(MotNouchi.id)).scalar() or 0
    total_categories = db.query(func.count(func.distinct(MotNouchi.categorie))).scalar() or 0
    return {
        "total_mots": total_mots,
        "total_categories": total_categories,
        "statut": "Actif 🇨🇮"
    }

@app.post("/contribuer", status_code=201)
def contribuer(data: ContributionIn, db: Session = Depends(get_db)):
    clean_mot = data.mot_propose.strip()
    existant = db.query(MotNouchi).filter(func.lower(MotNouchi.mot) == clean_mot.lower()).first()
    if existant:
        raise HTTPException(status_code=400, detail="Ce mot existe déjà dans le lexique.")
    
    nouveau = MotNouchi(
        mot=clean_mot,
        definition=data.definition_proposee.strip(),
        exemple=data.exemple.strip() if data.exemple else None,
        categorie=data.categorie.strip() if data.categorie else "general",
        origine="Contribution utilisateur"
    )
    db.add(nouveau)
    db.commit()
    db.refresh(nouveau)
    return {
        "message": "Merci ! Mot ajouté avec succès.",
        "mot": nouveau
    }
