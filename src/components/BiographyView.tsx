import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Globe2, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Quote, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight, 
  Share2, 
  Check, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Gem,
  Compass
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface BiographyViewProps {
  onOpenPricing?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const BiographyView: React.FC<BiographyViewProps> = ({ onOpenPricing, onNavigateTab }) => {
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [activePoleTab, setActivePoleTab] = useState<'all' | 'elegance' | 'proptech' | 'strategy'>('all');

  const handleCopyQuote = () => {
    const textToCopy = `« Chez Mark Kanich, nous ne nous contentons pas de suivre les tendances, nous bâtissons les fondations de demain. » — Adama F Sheickner, Fondateur & CEO de l'Écosystème Mark Kanich`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuote(true);
    hapticManager.trigger('tap');
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  const poles = [
    {
      id: 'elegance',
      title: 'Pôle Élégance, Identité & Bien-être',
      icon: Gem,
      emoji: '👗',
      accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      tagline: 'Couture haut de gamme & soins d’excellence',
      projects: [
        {
          name: 'Mark Kanich Fashion Design',
          category: 'Haute Couture & Style',
          description: 'L’expression de notre vision du style, alliant authenticité, couture de haute qualité et identité culturelle forte.',
          highlights: ['Authenticité africaine & internationale', 'Lignes intemporelles & finitions d’exception', 'Symbole d’affirmation et de prestige']
        },
        {
          name: 'Mark Kanich Cosmétique',
          category: 'Soins & Beauté',
          description: 'Le prolongement naturel de notre marque vers le soin, la beauté et le bien-être au quotidien.',
          highlights: ['Formulations exigeantes et dermatologiques', 'Rituels de bien-être quotidien', 'Valorisation de l’éclat naturel']
        }
      ]
    },
    {
      id: 'proptech',
      title: 'Pôle Immobilier & PropTech',
      icon: Building2,
      emoji: '🏢',
      accentColor: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      tagline: "L'Immobilier de Demain pensé pour les investisseurs",
      projects: [
        {
          name: 'Villagia Intercontinental',
          category: 'Immobilier Premium & Résidences',
          description: 'Notre bras armé dans l’immobilier premium, offrant des espaces de vie et d’investissement d’exception.',
          highlights: ['Patrimoine résidentiel et commercial haut de gamme', 'Standards internationaux de construction', 'Rendement locatif & valorisation pérenne']
        },
        {
          name: 'ImmoScale AI',
          category: 'SaaS & Intelligence Artificielle PropTech',
          description: 'Notre pépite technologique. Un SaaS révolutionnaire dédié aux agences et courtiers, utilisant l’Intelligence Artificielle pour la génération et la curation de contenu immobilier.',
          highlights: ['Génération automatisée de contenus et fiches mandats IA', 'Accélération des transactions pour courtiers', 'L’immobilier de demain avec la technologie d’aujourd’hui']
        }
      ]
    },
    {
      id: 'strategy',
      title: 'Pôle Stratégie, Technologie & Impact Global',
      icon: Globe2,
      emoji: '🌍',
      accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      tagline: 'Scale-up continental, automatisation financière & conseil',
      projects: [
        {
          name: 'KIIS Global',
          category: 'Solutions Technologiques & Conseil International',
          description: 'Notre hub de solutions technologiques et de conseil stratégique international pour entreprises et institutions.',
          highlights: ['Transformation digitale d’envergure', 'Conseil en gouvernance & expansion internationale', 'Architecture de systèmes scalables']
        },
        {
          name: 'KLT & NationeX',
          category: 'Performance Financière & Développement Mondial',
          description: 'Des entités dédiées au développement, à l’optimisation des processus (notamment via l’intégration de gestions financières de pointe) et à l’expansion de nos modèles d’affaires à l’échelle continentale et mondiale.',
          highlights: ['Pilotage de trésorerie et cash-flow en temps réel', 'Optimisation des flux et automatisation financière', 'Déploiement pan-africain et international']
        }
      ]
    }
  ];

  const benefits = [
    {
      number: '01',
      title: 'La Synergie Transversale (Cross-Pollination)',
      subtitle: 'Intersection des talents & des disciplines',
      text: "L'innovation développée dans notre pôle Tech (ImmoScale AI) inspire nos méthodes de gestion chez Villagia, tandis que l'esthétique de Mark Kanich Fashion influence notre branding global. Chaque projet nourrit et élève les autres."
    },
    {
      number: '02',
      title: 'Une Agilité et une Résilience Absolues',
      subtitle: 'Diversification stratégique équilibrée',
      text: "En diversifiant notre expertise de la création de produits physiques (Cosmétique, Mode) aux services numériques (SaaS, IA), nous protégeons notre écosystème des fluctuations d'un seul marché tout en captant les opportunités de demain."
    },
    {
      number: '03',
      title: "L'Excellence Opérationnelle",
      subtitle: 'Rigueur financière & automatisation',
      text: "Ma rigueur en matière de gestion (notamment à travers l'automatisation financière et le cash-flow en temps réel) garantit que chaque projet de l'écosystème Mark Kanich est non seulement créatif, mais financièrement sain, scalable et durable."
    },
    {
      number: '04',
      title: 'Un Impact Holistique',
      subtitle: 'Accompagnement de bout en bout',
      text: "Nous ne vendons pas seulement des produits ou des services ; nous offrons des expériences complètes. Du soin de soi (Cosmétique) à l'investissement de sa vie (Immobilier), en passant par l'optimisation de son business (Tech & SaaS), nous accompagnons l'humain et l'entreprise à chaque étape."
    }
  ];

  const filteredPoles = activePoleTab === 'all' 
    ? poles 
    : poles.filter(p => p.id === activePoleTab);

  return (
    <div id="biography-view" className="space-y-10 max-w-6xl mx-auto pb-8">
      {/* 1. Grand Hero Banner with Executive Portrait */}
      <div className="relative overflow-hidden rounded-3xl bg-[#161618] border border-slate-800 p-6 sm:p-10 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Executive Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              {/* Decorative Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-400/40 to-transparent opacity-80 blur-sm group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/80 bg-slate-950 shadow-2xl aspect-[4/5]">
                <img
                  src="/assets/aistudio/image_b1b89bf7.png"
                  alt="Portrait Officiel - Adama F Sheickner, Fondateur & CEO de l'Écosystème Mark Kanich"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Executive Gradient Overlay for Name plate */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Profil Officiel Certifié</span>
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Adama F Sheickner
                  </h2>
                  <p className="text-xs text-amber-400/90 font-medium">
                    Fondateur & CEO, Écosystème Mark Kanich
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Badges below portrait */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-medium">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                CEO & Entrepreneur
              </span>
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-medium">
                <Cpu className="w-3.5 h-3.5 text-[#00C3F7]" />
                Bâtisseur PropTech & IA
              </span>
            </div>
          </div>

          {/* Vision & Introduction Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Visionnaire · Entrepreneur · Bâtisseur d'Avenir</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
              Adama F <span className="text-amber-500">Sheickner</span>
            </h1>

            <p className="text-base sm:text-lg font-semibold text-slate-300 leading-snug">
              Fondateur & CEO de l'Écosystème Mark Kanich
            </p>

            {/* Quote Card */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <Quote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">
                Ma Vision : Au-delà de l'entreprise, un Écosystème
              </p>
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                « Je suis Adama F Sheickner, et ma conviction la plus profonde est que la véritable innovation ne naît pas dans l'isolement d'un seul secteur, mais dans la puissance de la synergie. C'est dans cette optique que j'ai fondé Mark Kanich. »
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Loin d'être une simple marque, <strong className="text-white">Mark Kanich</strong> est un écosystème holistique et transversal. J'ai conçu cette matrice pour répondre aux défis complexes du monde moderne en connectant des domaines a priori distincts : <strong className="text-amber-400">la mode, la beauté, l'immobilier, l'intelligence artificielle et le conseil stratégique global</strong>. Mon idéologie est simple : l'excellence n'a pas de frontières, et la valeur se crée à l'intersection des disciplines.
            </p>

            {/* Quick Executive Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyQuote}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {copiedQuote ? <Check className="w-4 h-4 text-black" /> : <Quote className="w-4 h-4" />}
                <span>{copiedQuote ? 'Citation copiée !' : 'Partager la maxime'}</span>
              </button>

              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('pricing')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition border border-slate-700 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Découvrir l'Académie & Formules VIP</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Navigation Filter between Poles */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Constellation Stratégique</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              L'Écosystème Mark Kanich : Nos Réalisations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              En tant que fondateur, j'ai eu le privilège de donner vie à une constellation de projets innovants, tous unis par une même quête de perfection et d'impact. Ensemble, nous avons bâti :
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-[#161618] border border-slate-800 rounded-xl overflow-x-auto self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setActivePoleTab('all');
                hapticManager.trigger('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activePoleTab === 'all'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tous les Pôles
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePoleTab('elegance');
                hapticManager.trigger('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activePoleTab === 'elegance'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👗 Mode & Beauté
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePoleTab('proptech');
                hapticManager.trigger('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activePoleTab === 'proptech'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏢 Immobilier & IA
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePoleTab('strategy');
                hapticManager.trigger('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activePoleTab === 'strategy'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌍 Stratégie & Finance
            </button>
          </div>
        </div>

        {/* Poles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPoles.map((pole) => {
            const Icon = pole.icon;
            return (
              <div
                key={pole.id}
                className={`rounded-3xl bg-[#161618] border ${pole.borderColor} p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-amber-500/60 transition-all duration-300`}
              >
                <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${pole.accentColor} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-md">
                      {pole.emoji}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Pôle Stratégique
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {pole.title}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      {pole.tagline}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {pole.projects.map((proj, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2 hover:border-slate-700 transition"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-black text-white">
                            {proj.name}
                          </h4>
                          <span className="text-[10px] font-semibold text-slate-500">
                            {proj.category}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {proj.description}
                        </p>

                        <div className="pt-2 border-t border-slate-800/80 space-y-1">
                          {proj.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Idéologie & Avantages Concurrentiels de l'Écosystème */}
      <div className="rounded-3xl bg-[#161618] border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Penser en Système</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mon Idéologie : Les Bénéfices de l'Approche « Écosystème »
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Pourquoi avoir créé un écosystème plutôt qu'une entreprise classique ? Parce que notre modèle offre des avantages concurrentiels uniques à nos partenaires, clients et investisseurs :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-amber-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-500 font-mono">
                  {b.number}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Pilier Stratégique
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-amber-400/80 font-medium mt-0.5">
                  {b.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Le Mot du Fondateur & Signature */}
      <div className="rounded-3xl bg-gradient-to-br from-[#161618] via-slate-900 to-[#121214] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Manifeste & Vision
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Le Mot du Fondateur
              </h3>
            </div>
          </div>

          <div className="border-l-2 border-amber-500/70 pl-4 sm:pl-6 space-y-4">
            <blockquote className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
              « Chez Mark Kanich, nous ne nous contentons pas de suivre les tendances, nous bâtissons les fondations de demain. Mon rôle en tant que CEO n'est pas seulement de diriger des entreprises, mais de tisser les liens invisibles qui transforment de bonnes idées en un écosystème inarrêtable. Je vous invite à découvrir nos univers, à collaborer avec nous, et à construire, ensemble, l'héritage de demain. »
            </blockquote>
          </div>

          {/* Signature & Identification */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/60 bg-slate-950 flex-shrink-0">
                <img
                  src="/assets/aistudio/image_b1b89bf7.png"
                  alt="Adama F Sheickner"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-base font-black text-white">
                  Adama F Sheickner
                </p>
                <p className="text-xs text-amber-400 font-semibold">
                  Fondateur & CEO, Écosystème Mark Kanich
                </p>
                <p className="text-[11px] text-slate-500">
                  Mode · Beauté · Immobilier · IA · Conseil Global
                </p>
              </div>
            </div>

            {/* Direct Interaction Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyQuote}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Partager</span>
              </button>
              <a
                href="mailto:contact@markkanich.com"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 transition shadow-md cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Nous Contacter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
