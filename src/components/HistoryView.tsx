import React, { useState } from 'react';
import { HISTORY_SECTIONS, HISTORY_TIMELINE, ABIDJAN_HOTSPOTS } from '../data/nouchiHistory';
import { 
  History, 
  Sparkles, 
  Music, 
  BookOpen, 
  Award, 
  Flame, 
  MapPin, 
  Quote, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Share2
} from 'lucide-react';

export const HistoryView: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
    History: <History className="w-5 h-5 text-orange-500" />,
    Music: <Music className="w-5 h-5 text-emerald-500" />,
    BookOpen: <BookOpen className="w-5 h-5 text-blue-500" />,
    Award: <Award className="w-5 h-5 text-purple-500" />,
    Flame: <Flame className="w-5 h-5 text-rose-500" />
  };

  return (
    <div id="history-view" className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner with Bento Dark & Amber Styling */}
      <div className="relative overflow-hidden rounded-3xl bg-[#161618] border border-slate-800 p-6 sm:p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-4 uppercase tracking-widest">
            <History className="w-3.5 h-3.5" />
            01. Essai Historique, Linguistique & Culturel
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            L'Épopée du Nouchi : <span className="text-amber-500">Du Code Secret</span> à l'Étendard Mondial
          </h1>

          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Découvrez l'histoire fascinante, l'étymologie, la sociolinguistique et l'évolution d'une langue née dans les bas quartiers d'Abidjan pour conquérir les plus grands dictionnaires de l'Académie francophone.
          </p>

          {/* Quick Bento Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-amber-500">1970</span>
              <p className="text-[11px] text-slate-400 font-medium">Naissance à Adjamé</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-amber-500">60+</span>
              <p className="text-[11px] text-slate-400 font-medium">Langues hybridées</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-emerald-400">2019</span>
              <p className="text-[11px] text-slate-400 font-medium">Entrée au Larousse</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-amber-500">100%</span>
              <p className="text-[11px] text-slate-400 font-medium">Fierté ivoirienne</p>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Navigation Pill Bar for Essay Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {HISTORY_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSectionId(sec.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition ${
              activeSectionId === sec.id
                ? 'bg-amber-500 text-black border-amber-500 shadow-md font-bold'
                : 'bg-[#161618] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {sec.title.split('.')[0]}. {sec.title.split('.')[1]?.trim().split('&')[0]}
          </button>
        ))}
      </div>

      {/* Main Essay Section Display */}
      <div className="space-y-6">
        {HISTORY_SECTIONS.map((sec) => {
          const isCurrent = activeSectionId === sec.id;
          return (
            <div
              key={sec.id}
              id={`section-${sec.id}`}
              className={`rounded-3xl border transition-all duration-300 p-6 sm:p-8 bg-[#161618] ${
                isCurrent 
                  ? 'border-amber-500/60 shadow-[0_0_24px_rgba(245,158,11,0.08)]' 
                  : 'border-slate-800 opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex-shrink-0">
                  {iconMap[sec.icon] || <Sparkles className="w-5 h-5 text-amber-500" />}
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                    Étude Analytique
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {sec.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-400 mt-0.5">
                    {sec.subtitle}
                  </p>
                </div>
              </div>

              {/* Summary Highlight Box */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-900 border-l-4 border-amber-500 text-sm text-slate-200 leading-relaxed font-medium">
                {sec.summary}
              </div>

              {/* Paragraphs */}
              <div className="mt-6 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                  Points Clés à Retenir
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {sec.keyPoints.map((kp, kpIdx) => (
                    <div 
                      key={kpIdx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Quote */}
              {sec.quote && (
                <div className="mt-6 p-5 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-start gap-3">
                  <Quote className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm sm:text-base font-semibold italic text-white">
                      « {sec.quote.text} »
                    </p>
                    <p className="text-xs text-amber-400 font-bold mt-1">
                      — {sec.quote.author}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Chronology / Timeline in Bento Box */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Chronologie Interactive du Nouchi (1970 - 2026)
            </h3>
            <p className="text-sm text-slate-400">
              Les grandes dates charnières qui ont façonné le phénomène
            </p>
          </div>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8">
          {HISTORY_TIMELINE.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-[#161618] shadow-sm" />

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {event.year}
                  </span>
                  {event.badge && (
                    <span className="text-xs font-semibold text-slate-400">
                      {event.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-bold text-white">
                  {event.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-3 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Impact : {event.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cartographie Culturelle d'Abidjan Bento Container */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <MapPin className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Les Hauts Lieux de la Culture Nouchi à Abidjan
            </h3>
            <p className="text-sm text-slate-400">
              Les bastions urbains où la langue de Babi bat son plein
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ABIDJAN_HOTSPOTS.map((spot, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition"
            >
              <h4 className="text-lg font-bold text-amber-400">
                {spot.commune}
              </h4>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                {spot.role}
              </p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {spot.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
