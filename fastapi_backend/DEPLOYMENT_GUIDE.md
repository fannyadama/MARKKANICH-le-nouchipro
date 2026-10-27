# 🇨🇮 Guide de Déploiement FastAPI, Article SEO & Stratégie Réseaux Sociaux

Ce dossier contient le pack backend complet prêt à l'emploi (Python / FastAPI + SQLite + seed automatique de 300 mots Nouchi authentiques).

---

## 🚀 1. Déploiement Gratuit sur Render (Web Service)

1. **Créer un dépôt GitHub** :
   - Déposez les fichiers de ce dossier (`requirements.txt`, `database.py`, `main.py`, `nouchi_300.json`) sur un nouveau dépôt GitHub (ex: `markkanich-nouchi-api`).

2. **Créer le service sur Render.com** :
   - Rendez-vous sur [dashboard.render.com](https://dashboard.render.com/) et connectez votre compte GitHub.
   - Cliquez sur **New +** > **Web Service**.
   - Sélectionnez votre dépôt `markkanich-nouchi-api`.

3. **Paramètres de configuration** :
   - **Name** : `markkanich-nouchi-api`
   - **Environment** : `Python 3`
   - **Region** : `Frankfurt (EU Central)` ou celle la plus proche
   - **Branch** : `main`
   - **Build Command** :
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command** :
     ```bash
     uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan Type** : `Free`

4. **Lancement & Test** :
   - Cliquez sur **Create Web Service**.
   - En 2 minutes, votre API sera en ligne avec son URL publique (ex: `https://markkanich-nouchi-api.onrender.com`).
   - La documentation interactive Swagger est accessible immédiatement sur :
     `https://markkanich-nouchi-api.onrender.com/docs`

---

## 📝 2. Article SEO Prêt à Publier (Pour Blog & Médias)

**Titre :** *Top 50 des mots Nouchi incontournables à connaître en 2026*  
**Meta Description :** *Découvrez les 50 mots nouchi indispensables en 2026. Définitions, étymologies, prononciations et exemples en contexte pour maîtriser l'argot d'Abidjan.*  
**Mots-clés cibles :** *Nouchi ivoirien, dictionnaire nouchi, argot abidjanais, goumin nouchi, enjailler signification, parler ivoirien 2026.*

### Extrait de l'article :
> Le Nouchi, né dans les années 70 au cœur des quartiers populaires d'Abidjan (Treichville, Adjamé, Yopougon), n'est plus seulement un argot de rue : c'est un véritable patrimoine vivant, symbole de créativité et de cohésion nationale en Côte d'Ivoire.
>
> Que vous prépariez un voyage à Abidjan ou souhaitiez enrichir vos conversations, voici les termes indispensables :
>
> 1. **Djê** (`/dʒe/`) : L'argent en général. *« Le djê ne dort jamais à Babi ! »*
> 2. **Enjailler** (`/ɑ̃.ʒa.je/`) : S'amuser, plaire, faire la fête. *« Cette soirée m'enjaille trop. »* (Validé au Larousse)
> 3. **Goumin** (`/gu.mɛ̃/`) : Chagrin d'amour, peine de cœur intense. *« Le goumin fatigue la jeunesse. »*
> 4. **Y'a drap** (`/ja dʁap/`) : Il y a un problème sérieux ou une embrouille imminente.
> 5. **Bramogo** (`/bʁa.mo.go/`) : Ami fidèle, frère de cœur, complice de longue date.
>
> 💡 *Retrouvez l'intégralité des 300+ termes répertoriés, leurs exemples audio et le quiz quotidien sur le dictionnaire interactif Markkanich.*

---

## 📢 3. Posts Réseaux Sociaux Prêts à Copier-Coller

### 💬 WhatsApp (Groupes & Statuts)
```text
🇨🇮 On ne parle pas seulement français en Côte d'Ivoire, on parle Nouchi ! 🗣️🔥

Fini de chercher le sens des expressions de Babi dans le vide : découvrez le Dictionnaire Markkanich Le NouchiPro !

✅ +300 mots authentiques avec prononciation & exemples
✅ Quiz Quotidien de 5 questions avec classement du jour
✅ Traducteur IA Nouchi ⇄ Français
✅ Cartes visuelles Story pour vos statuts WhatsApp

👉 Testez-le ici : https://markkanich.ci
```

### 🐦 X (ex-Twitter)
```text
🇨🇮 « Abidjan, c'est technique » : connaissez-vous vraiment le Nouchi en 2026 ?

Lancement officiel de l'API & Dictionnaire Markkanich Nouchi :
📚 +300 termes urbains indexés
🎙️ Prononciations certifiées
📊 Quiz quotidien & classements

Explorez le dico 👉 https://markkanich.ci
#Nouchi #Abidjan #CotedIvoire #TechCI
```

### 📸 Instagram / TikTok
```text
De « Boucantier » à « Goumin » en passant par « Gbagboter », le nouchi est la langue la plus vivante d'Afrique de l'Ouest ! 🇨🇮✨

Envie de tester ton niveau ? Réponds au Quiz Quotidien sur Markkanich et partage ton score du jour ! 🏆

Lien en bio 📲 @markkanich.ci
#Nouchi #AbidjanVie #HumourIvoirien #Babi #CultureCI
```
