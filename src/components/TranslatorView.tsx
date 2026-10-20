import React, { useState, useEffect } from 'react';
import { TranslationResult, User as UserType } from '../types';
import { speakWord } from '../utils/speech';
import { NOUCHI_DICTIONARY } from '../data/nouchiDictionary';
import { 
  ArrowRightLeft, 
  Sparkles, 
  Volume2, 
  Copy, 
  Check, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  BookOpen, 
  HelpCircle,
  MessageSquare,
  Flame,
  Lightbulb,
  WifiOff,
  Crown,
  Zap,
  Lock,
  AlertTriangle,
  X,
  Smartphone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface TranslatorViewProps {
  user?: UserType | null;
  onOpenPricing?: () => void;
}

const FREE_DAILY_TRANSLATIONS = 5;
const FREE_DAILY_CHAT = 3;

export const TranslatorView: React.FC<TranslatorViewProps> = ({ user, onOpenPricing }) => {
  const [direction, setDirection] = useState<'fr_to_nouchi' | 'nouchi_to_fr'>('fr_to_nouchi');
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('populaire');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [paywallReason, setPaywallReason] = useState<'translation' | 'chat'>('translation');

  const isVip = user?.isVip || user?.plan === 'pro_vip' || user?.plan === 'business_api' || user?.plan === 'pass_express';

  // Quota Management
  const [dailyTranslations, setDailyTranslations] = useState<number>(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const savedDate = localStorage.getItem('nouchipro_daily_date');
      const savedCount = localStorage.getItem('nouchipro_daily_translations');
      if (savedDate === today && savedCount) {
        return parseInt(savedCount, 10);
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const [dailyChatCount, setDailyChatCount] = useState<number>(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const savedDate = localStorage.getItem('nouchipro_daily_date');
      const savedChat = localStorage.getItem('nouchipro_daily_chat');
      if (savedDate === today && savedChat) {
        return parseInt(savedChat, 10);
      }
      return 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('nouchipro_daily_date', today);
      localStorage.setItem('nouchipro_daily_translations', dailyTranslations.toString());
      localStorage.setItem('nouchipro_daily_chat', dailyChatCount.toString());
    } catch (e) {
      console.error(e);
    }
  }, [dailyTranslations, dailyChatCount]);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: "Prends mon GBõ mon ami ! Je suis Le Vieux Père Markkanich. Tu veux traduire une phrase, connaître le sens d'un son de Coupé-Décalé ou savoir comment draguer en Nouchi ? Pose ta question, y'a fohi !"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const samplePrompts = [
    "Tu es mon ami le plus fidèle et je te respecte beaucoup.",
    "Je n'ai plus d'argent pour payer mon transport.",
    "Ce soir, on va faire la fête et s'amuser jusqu'au matin.",
    "Il a essayé de m'embobiner avec ses mensonges.",
    "La vie à Abidjan exige d'être très rusé et vigilant."
  ];

  const performOfflineTranslation = (text: string): TranslationResult => {
    const lower = text.toLowerCase();
    const matchedVocab: { term: string; meaning: string }[] = [];

    // Search matches in local dictionary
    NOUCHI_DICTIONARY.forEach((entry) => {
      const termLower = entry.term.toLowerCase();
      const frenchLower = entry.frenchTranslation.toLowerCase();
      const defLower = entry.definition.toLowerCase();

      if (direction === 'fr_to_nouchi') {
        if (lower.includes(frenchLower) || lower.includes(defLower) || entry.synonyms.some(s => lower.includes(s.toLowerCase()))) {
          matchedVocab.push({ term: entry.term, meaning: entry.frenchTranslation });
        }
      } else {
        if (lower.includes(termLower)) {
          matchedVocab.push({ term: entry.term, meaning: entry.frenchTranslation });
        }
      }
    });

    if (direction === 'fr_to_nouchi') {
      if (lower.includes('ami') || lower.includes('pote') || lower.includes('frère')) {
        matchedVocab.push({ term: 'Môgô sûr / Gbonhi', meaning: 'Ami intime / Équipe' });
      }
      if (lower.includes('fête') || lower.includes('amuser') || lower.includes('joie')) {
        matchedVocab.push({ term: "S'enjailler", meaning: 'Faire la fête, prendre du bon temps' });
      }
      if (lower.includes('argent') || lower.includes('sous')) {
        matchedVocab.push({ term: 'Kpôkro / Grotto', meaning: 'Argent / Homme aisé' });
      }
      if (lower.includes('manger') || lower.includes('nourriture')) {
        matchedVocab.push({ term: 'Daba', meaning: 'Manger copieusement' });
      }
      if (lower.includes('peur') || lower.includes('fuir')) {
        matchedVocab.push({ term: 'Pia', meaning: 'Prendre la fuite' });
      }

      const generated = matchedVocab.length > 0
        ? `« ${matchedVocab.map(v => v.term).join(' ')} » — Traduction locale hors-ligne authentique.`
        : `« Môgô, ${text} » (Mode autonome hors-ligne)`;

      return {
        translatedText: generated,
        explanation: "Traduction générée instantanément depuis la base lexicale locale sans connexion internet.",
        vocabularyUsed: matchedVocab.slice(0, 4),
        culturalNote: "Le dictionnaire local contient plus de 100 expressions officielles avec étymologie complète.",
        alternativeVariants: [
          "Version rue : On est calé dans le beat !",
          "Version posée : Y'a fohi, c'est propre."
        ]
      };
    } else {
      // Nouchi to FR
      const meanings = matchedVocab.map(v => `${v.term} = ${v.meaning}`).join(', ');
      return {
        translatedText: matchedVocab.length > 0 
          ? `Sens : ${matchedVocab.map(v => v.meaning).join(' / ')}`
          : `Phrase nouchie analysée : ${text}`,
        explanation: meanings || "Analyse locale directe depuis le dictionnaire NouchiPro embarqué.",
        vocabularyUsed: matchedVocab.slice(0, 4),
        culturalNote: "Cette analyse a été réalisée sans réseau grâce au Service Worker.",
        alternativeVariants: ["Français standard : Tout va bien.", "Français soutenu : La situation est favorable."]
      };
    }
  };

  const handleTranslate = async (textToTranslate?: string) => {
    const text = textToTranslate || inputText;
    if (!text.trim()) return;

    if (!isVip && dailyTranslations >= FREE_DAILY_TRANSLATIONS) {
      hapticManager.trigger('warning');
      setPaywallReason('translation');
      setShowPaywallModal(true);
      return;
    }

    setLoading(true);
    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        // Offline directly
        const offlineResult = performOfflineTranslation(text);
        setResult(offlineResult);
        if (!isVip) setDailyTranslations(prev => prev + 1);
        return;
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          direction,
          tone
        })
      });
      const data = await response.json();
      if (data && data.translatedText) {
        setResult(data);
      } else {
        setResult(performOfflineTranslation(text));
      }
      if (!isVip) setDailyTranslations(prev => prev + 1);
      hapticManager.trigger('selection');
    } catch (err) {
      console.warn('Network translation unavailable, falling back to local dictionary:', err);
      setResult(performOfflineTranslation(text));
      if (!isVip) setDailyTranslations(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;

    if (!isVip && dailyChatCount >= FREE_DAILY_CHAT) {
      hapticManager.trigger('warning');
      setPaywallReason('chat');
      setShowPaywallModal(true);
      return;
    }

    const userMsg = chatInput.trim();
    const newHistory = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(newHistory);
    setChatInput('');
    setChatLoading(true);

    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        // Offline assistant answer from local knowledge base
        const matched = NOUCHI_DICTIONARY.find(w => userMsg.toLowerCase().includes(w.term.toLowerCase()));
        let offlineReply = "Mon môgô sûr ! On est en mode hors-ligne sans réseau. Mais sache que dans le Nouchi, 'le découragement n'est pas ivoirien' ! Consulte les cartes du dictionnaire pour tout découvrir.";
        if (matched) {
          offlineReply = `Prends mon GBõ ! Le mot « ${matched.term} » signifie : « ${matched.frenchTranslation} ». Exemple : ${matched.examples[0]?.nouchi || matched.term}. (Réponse instantanée locale)`;
        }
        setChatMessages([...newHistory, { role: 'assistant' as const, content: offlineReply }]);
        if (!isVip) setDailyChatCount(prev => prev + 1);
        return;
      }

      const response = await fetch('/api/chat-babi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: newHistory
        })
      });
      const data = await response.json();
      setChatMessages([...newHistory, { role: 'assistant' as const, content: data.reply || "On est ensemble mon môgô !" }]);
      if (!isVip) setDailyChatCount(prev => prev + 1);
    } catch (err) {
      console.warn('Chat network error, responding offline:', err);
      setChatMessages([...newHistory, { role: 'assistant' as const, content: "Y'a fohi mon môgô ! On est en mode autonome hors-ligne, tout le lexique reste dispo dans l'onglet Dictionnaire !" }]);
    } finally {
      setChatLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Erreur copie presse-papier', e);
    }
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'fr_to_nouchi' ? 'nouchi_to_fr' : 'fr_to_nouchi');
    setResult(null);
  };

  return (
    <div id="translator-view" className="space-y-8 max-w-5xl mx-auto">
      {/* Header Info Bento Card */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-2 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              02. Moteur Contextuel Bilingue IA & Dictionnaire
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Traducteur Intelligent & Conversateur Babi
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Traduisez instantanément des phrases entières avec toutes les nuances culturelles et l'esprit des rues d'Abidjan.
            </p>
          </div>

          {/* Direction Switch Button & VIP Status */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {isVip ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Traductions IA Illimitées (Pass VIP)</span>
              </div>
            ) : (
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-slate-300 hover:text-amber-400 text-xs font-semibold transition"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Mode Gratuit • <strong className="text-amber-400 font-bold">Passer en Illimité VIP</strong></span>
              </button>
            )}

            <button
              onClick={toggleDirection}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-400 font-bold text-xs transition shadow-sm"
            >
              <ArrowRightLeft className="w-4 h-4" />
              {direction === 'fr_to_nouchi' ? 'Français ➔ Nouchi' : 'Nouchi ➔ Français'}
            </button>
          </div>
        </div>

        {/* Translation Box Bento Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Input Section */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-3xl p-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {direction === 'fr_to_nouchi' ? 'Texte en Français' : 'Texte en Nouchi'}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {inputText.length} caractères
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={direction === 'fr_to_nouchi' ? "Ex : Mon ami, viens on va manger ensemble et faire la fête..." : "Ex : Mon môgô sûr, viens on va daba et s'enjailler..."}
              rows={5}
              className="w-full bg-transparent text-white text-sm sm:text-base resize-none focus:outline-none placeholder:text-slate-600 leading-relaxed"
            />

            {/* Quick Prompts */}
            <div className="mt-3 pt-3 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                Exemples rapides :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.slice(0, 3).map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      setInputText(prompt);
                      handleTranslate(prompt);
                    }}
                    className="text-xs px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:border-amber-500/60 hover:text-white transition truncate max-w-[200px]"
                    title={prompt}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector & Translate Trigger */}
            <div className="mt-4 flex flex-col gap-3 pt-3 border-t border-slate-800">
              {!isVip && (
                <div className="w-full flex items-center justify-between text-[11px] bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Traductions gratuites du jour : <strong className="text-white">{Math.min(dailyTranslations, FREE_DAILY_TRANSLATIONS)}/{FREE_DAILY_TRANSLATIONS}</strong>
                  </span>
                  {dailyTranslations >= FREE_DAILY_TRANSLATIONS ? (
                    <span className="text-red-400 font-bold">Quota épuisé (500 FCFA pour débloquer)</span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">{FREE_DAILY_TRANSLATIONS - dailyTranslations} restante(s)</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-medium">Style :</span>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                  >
                    <option value="populaire">Populaire & Vivant</option>
                    <option value="punchline">Punchline & Rue</option>
                    <option value="sage">Sagesse & Vieux Père</option>
                    <option value="propre">Élégant & Branché (Choco)</option>
                  </select>
                </div>

                <button
                  onClick={() => handleTranslate()}
                  disabled={loading || !inputText.trim()}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs shadow-md flex items-center gap-2 transition cursor-pointer"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {loading ? 'Traduction...' : 'Traduire en direct'}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-3xl p-5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {direction === 'fr_to_nouchi' ? 'Résultat en Nouchi Ivoirien' : 'Résultat en Français Standard'}
                </span>

                {result && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speakWord(result.translatedText)}
                      className="p-2 rounded-xl bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-black transition"
                      title="Écouter"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(result.translatedText)}
                      className="p-2 rounded-xl bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-black transition"
                      title="Copier"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>

              {result ? (
                <div className="space-y-3">
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                    {result.translatedText}
                  </p>

                  <p className="text-xs text-slate-300 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                    💡 <strong className="text-amber-400">Explication :</strong> {result.explanation}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-44 text-slate-500 text-center px-4">
                  <Lightbulb className="w-8 h-8 mb-2 opacity-40 text-amber-500" />
                  <p className="text-sm">Tapez votre texte et cliquez sur "Traduire en direct".</p>
                </div>
              )}
            </div>

            {/* Alternative Variants if available */}
            {result?.alternativeVariants && result.alternativeVariants.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
                  Variantes alternatives :
                </span>
                <div className="space-y-1">
                  {result.alternativeVariants.map((alt, aIdx) => (
                    <p key={aIdx} className="text-xs text-slate-400 italic">
                      • « {alt} »
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary Breakdown Tag Cloud */}
        {result?.vocabularyUsed && result.vocabularyUsed.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              Mots Nouchis Clés Détectés & Utilisés
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {result.vocabularyUsed.map((v, vIdx) => (
                <div 
                  key={vIdx}
                  className="p-3 rounded-2xl bg-slate-900 border border-slate-800"
                >
                  <span className="text-xs font-bold text-amber-400 block">
                    {v.term}
                  </span>
                  <span className="text-xs text-slate-400">
                    {v.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sponsored Native Banner (Monétisation & Publicité Locale Abidjan) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black font-black flex items-center justify-center flex-shrink-0 text-base shadow-md">
            Wave
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md">Partenaire Officiel</span>
              <span className="text-xs font-bold text-white">Wave Côte d'Ivoire 🇨🇮</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Rechargez votre Pass Flash NouchiPro (500 FCFA) ou abonnez-vous en 1 clic à 0% de frais partout à Abidjan !
            </p>
          </div>
        </div>
        <button 
          onClick={onOpenPricing}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition whitespace-nowrap shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <span>Prendre le Pass Flash</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive AI Companion Bento Card: "Le Vieux Père Markkanich" */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-2xl overflow-hidden border-2 border-amber-500/70 bg-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] flex-shrink-0 flex items-center justify-center p-0.5">
              <img
                src="/logo.jpg"
                alt="Logo Officiel Markkanich"
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('markkanich_logo.jpg')) {
                    target.src = '/markkanich_logo.jpg';
                  }
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Discuter avec Le Vieux Père Markkanich (IA Nouchiman)
              </h3>
              <p className="text-xs text-slate-400">
                Posez vos questions culturelles, demandez une punchline sur mesure ou testez votre Nouchi.
              </p>
            </div>
          </div>

          {!isVip && (
            <div className="text-right text-[11px] bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Messages IA gratuits : </span>
              <strong className="text-amber-400">{Math.max(0, FREE_DAILY_CHAT - dailyChatCount)}/{FREE_DAILY_CHAT}</strong>
            </div>
          )}
        </div>

        {/* Chat Messages Window */}
        <div className="h-72 overflow-y-auto p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3.5 scrollbar-thin">
          {chatMessages.map((msg, mIdx) => (
            <div
              key={mIdx}
              className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/70 bg-slate-950 flex-shrink-0 flex items-center justify-center p-0.5">
                  <img
                    src="/logo.jpg"
                    alt="VP"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('markkanich_logo.jpg')) {
                        target.src = '/markkanich_logo.jpg';
                      }
                    }}
                  />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-black font-medium rounded-tr-none'
                    : 'bg-[#161618] text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  Moi
                </div>
              )}
            </div>
          ))}

          {chatLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
              Le Vieux Père est en train de réfléchir...
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
            placeholder="Écrivez au Vieux Père (ex: Comment dit-on 'Tu as beaucoup de style' ?)..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleSendChatMessage}
            disabled={chatLoading || !chatInput.trim()}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Envoyer
          </button>
        </div>
      </div>

      {/* Paywall Conversion Modal */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#161618] border border-amber-500/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative">
            <button 
              onClick={() => setShowPaywallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Zap className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-white">
                {paywallReason === 'translation' 
                  ? "Quota Quotidien Atteint ! 🇨🇮" 
                  : "Discussions du Jour Épuisées ! 💬"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Vous avez profité de vos {paywallReason === 'translation' ? `${FREE_DAILY_TRANSLATIONS} traductions gratuites` : `${FREE_DAILY_CHAT} messages gratuits`} du jour. Débloquez un accès <strong>illimité</strong> sans attendre !
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <span className="text-[10px] font-black uppercase text-emerald-400">Option Flash Sans Engagement</span>
                  <p className="text-lg font-black text-white">500 FCFA</p>
                  <p className="text-[11px] text-slate-300">Accès VIP total pendant 24 heures via Wave ou Orange Money.</p>
                  <button
                    onClick={() => {
                      setShowPaywallModal(false);
                      onOpenPricing?.();
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition shadow-md cursor-pointer"
                  >
                    Prendre le Pass 24H
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <span className="text-[10px] font-black uppercase text-amber-400">Abonnement Populaire</span>
                  <p className="text-lg font-black text-white">2 500 FCFA <span className="text-xs font-normal text-slate-400">/mois</span></p>
                  <p className="text-[11px] text-slate-300">Illimité permanent + Assistant IA + Diplôme Nouchiman.</p>
                  <button
                    onClick={() => {
                      setShowPaywallModal(false);
                      onOpenPricing?.();
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition shadow-md cursor-pointer"
                  >
                    Activer le VIP Pro
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 pt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Activation instantanée par Wave & Mobile Money 🇨🇮
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
