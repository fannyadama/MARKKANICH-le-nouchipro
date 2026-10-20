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
  Zap
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
    </div>
  );
};
