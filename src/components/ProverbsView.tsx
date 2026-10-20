import React, { useState } from 'react';
import { NOUCHI_PROVERBS } from '../data/nouchiProverbs';
import { Proverb } from '../types';
import { speakWord } from '../utils/speech';
import { 
  Quote, 
  Sparkles, 
  Volume2, 
  Copy, 
  Check, 
  Flame, 
  Shuffle, 
  Share2,
  BookMarked
} from 'lucide-react';

export const ProverbsView: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [dailyIndex, setDailyIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const themes = ['all', ...Array.from(new Set(NOUCHI_PROVERBS.map(p => p.theme)))];

  const filteredProverbs = selectedTheme === 'all' 
    ? NOUCHI_PROVERBS 
    : NOUCHI_PROVERBS.filter(p => p.theme === selectedTheme);

  const dailyProverb = NOUCHI_PROVERBS[dailyIndex];

  const handleNextDaily = () => {
    setDailyIndex((prev) => (prev + 1) % NOUCHI_PROVERBS.length);
  };

  const handleCopyProverb = (p: Proverb) => {
    const text = `🇨🇮 Proverbe Nouchi :\n« ${p.nouchi} »\n\n📖 Traduction : ${p.translation}\n💡 Sens : ${p.meaning}\n\nVia Markkanich Le NouchiPro 🇨🇮`;
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="proverbs-view" className="space-y-8 max-w-5xl mx-auto">
      {/* Daily Proverb Bento Spotlight Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-black p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-xs font-bold text-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              04. Proverbe & Sagesse du Jour
            </span>

            <button
              onClick={handleNextDaily}
              className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-black/15 hover:bg-black/25 text-black transition"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Autre proverbe
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black italic tracking-tight leading-snug text-black uppercase">
            « {dailyProverb.nouchi} »
          </h2>

          <p className="text-black/90 text-base sm:text-lg font-bold mt-3">
            ➡️ {dailyProverb.translation}
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-black/10 border border-black/15 text-xs sm:text-sm text-black/90 leading-relaxed font-semibold">
            <strong className="text-black uppercase">Philosophie de la rue :</strong> {dailyProverb.meaning}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-black/20">
            <span className="text-xs font-bold text-black/80">
              Thème : {dailyProverb.theme}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakWord(dailyProverb.nouchi)}
                className="p-2 rounded-xl bg-black/20 hover:bg-black/30 text-black transition"
                title="Écouter"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCopyProverb(dailyProverb)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-amber-400 text-xs font-black shadow-md hover:bg-slate-900 transition"
              >
                {copiedId === dailyProverb.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === dailyProverb.id ? 'Copié !' : 'Partager'}
              </button>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Theme Filters Bento Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition capitalize ${
              selectedTheme === theme
                ? 'bg-amber-500 text-black border-amber-500 shadow-sm font-bold'
                : 'bg-[#161618] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {theme === 'all' ? 'Toutes les sagesses' : theme}
          </button>
        ))}
      </div>

      {/* Proverbs Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProverbs.map((proverb) => (
          <div
            key={proverb.id}
            id={`proverb-card-${proverb.id}`}
            className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-amber-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
                  {proverb.theme}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => speakWord(proverb.nouchi)}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
                    title="Écouter"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyProverb(proverb)}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
                    title="Copier la maxime"
                  >
                    {copiedId === proverb.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-black text-white leading-snug group-hover:text-amber-400">
                « {proverb.nouchi} »
              </h3>

              <p className="text-sm font-semibold text-amber-400/90 mt-2">
                ➡️ {proverb.translation}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {proverb.meaning}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500 italic">
              Contexte : {proverb.context}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
