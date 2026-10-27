import React, { useState } from 'react';
import { User, ApiKeyItem } from '../types';
import { MOCK_API_SAMPLE_RESPONSE } from '../data/pricingData';
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  Key, 
  Sparkles, 
  Play, 
  Download, 
  ShieldCheck, 
  Layers, 
  Server, 
  Cpu, 
  ExternalLink,
  Zap,
  FileCode,
  FileText,
  Share2,
  CloudUpload,
  Globe,
  BookOpen
} from 'lucide-react';

interface ApiConsoleViewProps {
  user: User | null;
  onOpenPricing: () => void;
}

export const ApiConsoleView: React.FC<ApiConsoleViewProps> = ({ user, onOpenPricing }) => {
  const isBusinessPlan = user?.plan === 'business_api' || user?.role === 'admin';
  const defaultKey = user?.apiKey || (isBusinessPlan ? 'nouchi_live_9b4e78a2f1c890123' : 'nouchi_demo_guest_preview_key');
  
  const [apiKey, setApiKey] = useState(defaultKey);
  const [selectedEndpoint, setSelectedEndpoint] = useState<'translate' | 'dictionary' | 'proverbs'>('translate');
  const [sampleInput, setSampleInput] = useState("Le jeune homme s'amuse avec ses amis dans le maquis");
  const [codeLanguage, setCodeLanguage] = useState<'curl' | 'js' | 'python'>('curl');
  const [apiResponse, setApiResponse] = useState<any>(MOCK_API_SAMPLE_RESPONSE);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeFastApiSubTab, setActiveFastApiSubTab] = useState<'code' | 'render' | 'seo' | 'social'>('code');
  const [selectedFastApiFile, setSelectedFastApiFile] = useState<'main' | 'database' | 'requirements' | 'html'>('main');

  const SEO_ARTICLE_CONTENT = `Titre : Top 50 des mots nouchi à connaître en 2026
Meta Description : Découvrez les 50 mots nouchi incontournables en 2026. Définitions, exemples et prononciations pour maîtriser l'argot ivoirien.

Contenu :
Le nouchi, cet argot né dans les rues d'Abidjan dans les années 70, est devenu un marqueur culturel ivoirien majeur et un vecteur de cohésion sociale à travers toute l'Afrique de l'Ouest. Que vous soyez touriste, expatrié, créateur de contenu ou passionné de linguistique, voici les indispensables du lexique urbain :

1. Djê (/dʒe/) : L'argent en général. « Le djê ne dort jamais à Babi. »
2. Enjailler (/ɑ̃.ʒa.je/) : S'amuser, plaire, faire la fête. (Inscrit au dictionnaire Larousse).
3. Goumin (/gu.mɛ̃/) : Chagrin d'amour, peine de cœur intense.
4. Y'a drap (/ja dʁap/) : Il y a un problème ou une complication.
5. Môgô (/mo.go/) : Pote, personne, homme de confiance.
6. Boucantier (/bu.kɑ̃.tje/) : Celui qui aime frimer et faire la fête.
7. Soutra (/su.tʁa/) : Dépanner, aider financièrement.
8. Gbagboter (/gba.gbo.te/) : Marcher sur une très longue distance.

Consultez notre dictionnaire complet et testez vos connaissances via l'API officielle Markkanich !`;

  const WHATSAPP_POST = `🇨🇮 On ne parle pas seulement français en Côte d'Ivoire, on parle Nouchi ! 🗣️🔥

Je suis fier de partager le Dictionnaire & API Markkanich Nouchi : la référence officielle en ligne pour comprendre et maîtriser l'argot ivoirien.

🔍 +300 mots authentiques avec prononciation et exemples
💡 Propose tes propres mots pour enrichir la base collaborative !
🏆 Quiz Quotidien avec classement des meilleurs scores

Découvrez-le ici 👉 https://markkanich.ci
#Nouchi #ArgotIvoirien #CôteDIvoire #Abidjan #Markkanich`;

  const TWITTER_POST = `🇨🇮 « Abidjan, c'est technique » : connaissez-vous vraiment le Nouchi en 2026 ?

Lancement de l'API & Dictionnaire Markkanich Nouchi :
📚 +300 termes urbains indexés
🎙️ Prononciations certifiées
📊 Quiz quotidien & classements

Explorez le dico 👉 https://markkanich.ci
#Nouchi #Abidjan #CotedIvoire #TechCI`;

  const INSTAGRAM_POST = `De « Boucantier » à « Goumin » en passant par « Gbagboter », le nouchi est la langue la plus vivante d'Afrique de l'Ouest ! 🇨🇮✨

Envie de tester ton niveau ? Réponds au Quiz Quotidien sur Markkanich et partage ton score du jour ! 🏆

Lien en bio 📲 @markkanich.ci
#Nouchi #AbidjanVie #HumourIvoirien #Babi #CultureCI`;

  const getFastApiFileContent = (fileId: 'main' | 'database' | 'requirements' | 'html') => {
    switch (fileId) {
      case 'requirements':
        return `fastapi==0.109.0\nuvicorn==0.27.0\nsqlalchemy==2.0.25\npydantic==2.5.3`;
      case 'database':
        return `from sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker, declarative_base\n\nDATABASE_URL = "sqlite:///./nouchi.db"\nengine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})\nSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)\nBase = declarative_base()\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()`;
      case 'html':
        return `<!-- index.html (Client tout-en-un) -->\n<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Dictionnaire Markkanich Nouchi</title>\n</head>\n<body>\n  <h1>🇨🇮 Markkanich Nouchi</h1>\n  <div id="results"></div>\n</body>\n</html>`;
      case 'main':
      default:
        return `# main.py\nimport json, os\nfrom fastapi import FastAPI, Depends, HTTPException, Query\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom sqlalchemy.orm import Session\nfrom sqlalchemy import Column, Integer, String, Text, func, or_\nfrom database import get_db, engine, Base\n\nclass MotNouchi(Base):\n    __tablename__ = "mots_nouchi"\n    id = Column(Integer, primary_key=True, index=True)\n    mot = Column(String, unique=True, index=True, nullable=False)\n    prononciation = Column(String)\n    definition = Column(Text)\n    exemple = Column(Text)\n    origine = Column(String)\n    categorie = Column(String, index=True)\n    nb_consultations = Column(Integer, default=0)\n\nBase.metadata.create_all(bind=engine)\napp = FastAPI(title="API Markkanich Nouchi")\napp.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])\n\n@app.get("/mots")\ndef get_mots(q: str = None, categorie: str = None, page: int = 1, limite: int = 50, db: Session = Depends(get_db)):\n    query = db.query(MotNouchi)\n    if q:\n        terme = f"%{q.lower()}%"\n        query = query.filter(or_(func.lower(MotNouchi.mot).like(terme), func.lower(MotNouchi.definition).like(terme)))\n    if categorie:\n        query = query.filter(MotNouchi.categorie == categorie)\n    return query.offset((page - 1) * limite).limit(limite).all()\n\n@app.get("/stats")\ndef get_stats(db: Session = Depends(get_db)):\n    return {\n        "total_mots": db.query(func.count(MotNouchi.id)).scalar(),\n        "total_categories": db.query(func.count(func.distinct(MotNouchi.categorie))).scalar()\n    }`;
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRunTest = async () => {
    setIsLoadingTest(true);
    try {
      if (selectedEndpoint === 'translate') {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sampleInput, direction: 'fr_to_nouchi' })
        });
        const data = await res.json();
        setApiResponse({
          status: 'success',
          endpoint: '/api/v1/translate',
          data: data,
          meta: {
            latency_ms: 32,
            rate_limit_remaining: isBusinessPlan ? 99940 : 4,
            plan: isBusinessPlan ? 'enterprise_unlimited' : 'free_sandbox'
          }
        });
      } else {
        // Mocked response for dictionary or proverbs endpoint
        setApiResponse({
          status: 'success',
          endpoint: `/api/v1/${selectedEndpoint}`,
          count: 100,
          data: {
            sample: [
              { term: "S'enjailler", definition: "Faire la fête", category: "actions", officialStatus: "Larousse" },
              { term: "Boucantier", definition: "Personne qui fait du boucan / exhibe sa richesse", officialStatus: "Robert" }
            ]
          },
          meta: { latency_ms: 12, cached: true }
        });
      }
    } catch (e) {
      setApiResponse(MOCK_API_SAMPLE_RESPONSE);
    } finally {
      setIsLoadingTest(false);
    }
  };

  const getCodeSnippet = () => {
    if (codeLanguage === 'curl') {
      return `curl -X POST "https://api.markkanich-nouchipro.com/api/v1/${selectedEndpoint}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "${sampleInput}",
    "direction": "fr_to_nouchi",
    "include_phonetics": true,
    "cultural_notes": true
  }'`;
    }

    if (codeLanguage === 'js') {
      return `import { NouchiProClient } from '@nouchipro/sdk';

const client = new NouchiProClient({ apiKey: '${apiKey}' });

const response = await client.translate({
  text: "${sampleInput}",
  direction: 'fr_to_nouchi',
  dialect: 'abidjan_authentique'
});

console.log(response.translatedText);`;
    }

    return `import requests

url = "https://api.markkanich-nouchipro.com/api/v1/${selectedEndpoint}"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "text": "${sampleInput}",
    "direction": "fr_to_nouchi"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;
  };

  const handleDownloadDataset = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(MOCK_API_SAMPLE_RESPONSE, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "nouchipro_sample_dictionary.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="api-console-section" className="space-y-6 animate-fadeIn">
      {/* Top Header Bento */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                Développeurs & SaaS B2B
              </span>
              <span className="text-[10px] text-slate-400 font-mono">v1.2-REST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              API REST & SDK <span className="text-amber-400">Markkanich NouchiPro</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Alimentez vos chatbots WhatsApp, applications e-commerce, assistants vocaux et campagnes marketing avec l'intelligence culturelle et le moteur de traduction nouchi le plus avancé de Côte d'Ivoire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownloadDataset}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-amber-500" />
              <span>Télécharger Extrait JSON</span>
            </button>

            {!isBusinessPlan && (
              <button
                onClick={onOpenPricing}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                <Zap className="w-4 h-4" />
                <span>Obtenir une Clé API Pro (100k req/m)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* API Key Management Bar */}
      <div className="bg-[#161618] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white flex items-center gap-2">
              <span>Votre Clé d'API Active</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-normal ${isBusinessPlan ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                {isBusinessPlan ? 'Forfait Business Actif' : 'Clé Sandbox Démo'}
              </span>
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Utilisez cette clé dans l'en-tête HTTP <code className="text-amber-300">Authorization: Bearer &lt;KEY&gt;</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 font-mono text-xs text-amber-300 truncate max-w-xs select-all">
            {apiKey}
          </div>
          <button
            onClick={handleCopyKey}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-1.5 text-xs"
            title="Copier la clé"
          >
            {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedKey ? 'Copié !' : 'Copier'}</span>
          </button>
        </div>
      </div>

      {/* Interactive API Testing Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Endpoints & Request Builder */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Terminal className="w-4 h-4 text-amber-500" />
                <span>Sélection du Point de Terminaison</span>
              </div>
              <div className="flex rounded-xl bg-slate-900 p-0.5 border border-slate-800 text-[11px]">
                <button
                  onClick={() => setCodeLanguage('curl')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${codeLanguage === 'curl' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setCodeLanguage('js')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${codeLanguage === 'js' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Node.js
                </button>
                <button
                  onClick={() => setCodeLanguage('python')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${codeLanguage === 'python' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Python
                </button>
              </div>
            </div>

            {/* Endpoint Selector Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedEndpoint('translate')}
                className={`p-2.5 rounded-xl border text-left text-xs transition ${
                  selectedEndpoint === 'translate'
                    ? 'bg-amber-500/10 border-amber-500/80 text-amber-300 font-bold'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase block font-mono text-amber-500 font-bold">POST</span>
                <span className="truncate block">/v1/translate</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('dictionary')}
                className={`p-2.5 rounded-xl border text-left text-xs transition ${
                  selectedEndpoint === 'dictionary'
                    ? 'bg-amber-500/10 border-amber-500/80 text-amber-300 font-bold'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase block font-mono text-emerald-400 font-bold">GET</span>
                <span className="truncate block">/v1/dictionary</span>
              </button>

              <button
                onClick={() => setSelectedEndpoint('proverbs')}
                className={`p-2.5 rounded-xl border text-left text-xs transition ${
                  selectedEndpoint === 'proverbs'
                    ? 'bg-amber-500/10 border-amber-500/80 text-amber-300 font-bold'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase block font-mono text-blue-400 font-bold">GET</span>
                <span className="truncate block">/v1/proverbs</span>
              </button>
            </div>

            {/* Input Param */}
            {selectedEndpoint === 'translate' && (
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Texte à traduire en Nouchi (Payload Test)
                </label>
                <input
                  type="text"
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            {/* Code Snippet */}
            <div className="relative">
              <pre className="bg-[#0D0D0E] border border-slate-800/80 rounded-2xl p-4 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                {getCodeSnippet()}
              </pre>
              <button
                onClick={() => handleCopyCode(getCodeSnippet())}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copier le code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={handleRunTest}
              disabled={isLoadingTest}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{isLoadingTest ? 'Exécution de la requête...' : 'Tester la requête en direct'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Response Preview */}
        <div className="lg:col-span-6">
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Réponse HTTP (JSON) • 200 OK
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Latence: ~28ms
                  </span>
                </div>
              </div>

              <div className="bg-[#0D0D0E] border border-slate-800/80 rounded-2xl p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[380px] overflow-y-auto leading-relaxed">
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px]">SLA 99.9% avec réplication sur serveurs edge Cloudflare & Google Cloud</span>
              </div>
              <span className="text-[10px] text-amber-400 font-bold">Prêt pour Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* Turnkey FastAPI, Render & SEO Pack Section */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Turnkey Microservice
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Python 3.10+ / FastAPI</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Pack Clé-en-main : Backend FastAPI, Déploiement Render & Stratégie SEO
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Déployez votre propre API Nouchi autonome en 2 minutes sur Render avec SQLite, 300 mots pré-chargés et un article SEO prêt à publier.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="/api/dictionary/download/json"
              download="nouchi_300.json"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-2 transition shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger nouchi_300.json</span>
            </a>
            <a
              href="/demo/fastapi"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Tester Client Web Démo</span>
            </a>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => handleCopyCode(`fastapi==0.109.0\nuvicorn==0.27.0\nsqlalchemy==2.0.25\npydantic==2.5.3`)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => setActiveFastApiSubTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeFastApiSubTab === 'code'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>1. Code Source Backend Python</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFastApiSubTab('render')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeFastApiSubTab === 'render'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CloudUpload className="w-4 h-4" />
            <span>2. Déploiement Render (Gratuit)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFastApiSubTab('seo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeFastApiSubTab === 'seo'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>3. Article SEO Top 50</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFastApiSubTab('social')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeFastApiSubTab === 'social'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>4. Posts Réseaux Sociaux</span>
          </button>
        </div>

        {/* Tab 1: Code Source */}
        {activeFastApiSubTab === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
              {[
                { id: 'main', label: 'main.py' },
                { id: 'database', label: 'database.py' },
                { id: 'requirements', label: 'requirements.txt' },
                { id: 'html', label: 'index.html (Client)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFastApiFile(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                    selectedFastApiFile === f.id
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                      : 'text-slate-400 hover:text-white bg-slate-900/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <pre className="bg-[#0D0D0E] border border-slate-800 rounded-2xl p-4 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-[380px] overflow-y-auto leading-relaxed">
                {getFastApiFileContent(selectedFastApiFile)}
              </pre>
              <button
                onClick={() => handleCopyCode(getFastApiFileContent(selectedFastApiFile))}
                className="absolute top-3 right-3 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition shadow cursor-pointer"
                title="Copier le code du fichier"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Render Déploiement */}
        {activeFastApiSubTab === 'render' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Étape 1 : Paramètres sur Render.com
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Créez un dépôt GitHub et déposez-y les 4 fichiers du dossier <code>fastapi_backend/</code></li>
                <li>Créez un <strong>New Web Service</strong> connecté à votre dépôt</li>
                <li><strong>Environment</strong> : Python 3</li>
                <li><strong>Build Command</strong> : <code className="text-amber-400">pip install -r requirements.txt</code></li>
                <li><strong>Start Command</strong> : <code className="text-amber-400">uvicorn main:app --host 0.0.0.0 --port $PORT</code></li>
                <li><strong>Plan</strong> : Gratuit (Free)</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Étape 2 : Test & Endpoints Déployés
              </div>
              <div className="text-xs text-slate-300 space-y-2">
                <p>Dès le déploiement terminé, votre API sera accessible aux adresses :</p>
                <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-400 space-y-1">
                  <div>GET <span className="text-white">/mots?q=goumin</span> (Recherche)</div>
                  <div>GET <span className="text-white">/stats</span> (Compteurs 300 mots)</div>
                  <div>POST <span className="text-white">/contribuer</span> (Soumission de mot)</div>
                  <div>GET <span className="text-emerald-400">/docs</span> (Swagger interactif)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Article SEO */}
        {activeFastApiSubTab === 'seo' && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white">Article SEO : « Top 50 des mots nouchi à connaître en 2026 »</h4>
                <p className="text-xs text-slate-400">Prêt pour votre blog WordPress, Ghost, Medium ou Substack</p>
              </div>
              <button
                onClick={() => handleCopyCode(SEO_ARTICLE_CONTENT)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copier l'article</span>
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              {SEO_ARTICLE_CONTENT}
            </pre>
          </div>
        )}

        {/* Tab 4: Posts Réseaux Sociaux */}
        {activeFastApiSubTab === 'social' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">💬 WhatsApp (Statuts)</span>
                <button
                  onClick={() => handleCopyCode(WHATSAPP_POST)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  title="Copier"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{WHATSAPP_POST}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">🐦 X / Twitter</span>
                <button
                  onClick={() => handleCopyCode(TWITTER_POST)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  title="Copier"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{TWITTER_POST}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-400">📸 Instagram & TikTok</span>
                <button
                  onClick={() => handleCopyCode(INSTAGRAM_POST)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  title="Copier"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{INSTAGRAM_POST}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

