import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  Star, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  MapPin, 
  Award, 
  Sparkles, 
  Filter, 
  Share2, 
  ChevronRight, 
  User as UserIcon,
  X,
  Zap,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { User, LeaderboardEntry } from '../types';
import { hapticManager } from '../utils/haptics';

export interface LeaderboardProps {
  currentUser?: User | null;
  onOpenAddWord?: () => void;
  onOpenAuth?: () => void;
}

// Top 10 Authentic Ivorian Contributors Dataset
export const DEFAULT_TOP_10_CONTRIBUTORS: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: 'c1',
      username: 'Dj_Arouna_Yop',
      avatar: '🎧'
    },
    title: 'Grand Maître du Nouchi 🇨🇮',
    commune: 'Yopougon',
    level: 6,
    points: 3450,
    weeklyPoints: 480,
    monthlyPoints: 1250,
    wordsAdded: 58,
    wordsApproved: 52,
    audioUploaded: 24,
    streakDays: 32,
    badgesCount: 12,
    trend: 'same'
  },
  {
    rank: 2,
    user: {
      id: 'c2',
      username: 'Treich_Queen_Fatou',
      avatar: '👑'
    },
    title: 'Reine de Treichville',
    commune: 'Treichville',
    level: 5,
    points: 2890,
    weeklyPoints: 520,
    monthlyPoints: 1100,
    wordsAdded: 44,
    wordsApproved: 39,
    audioUploaded: 19,
    streakDays: 24,
    badgesCount: 10,
    trend: 'up'
  },
  {
    rank: 3,
    user: {
      id: 'c3',
      username: 'Momo_Adjamé_Express',
      avatar: '⚡'
    },
    title: 'Capitaine Marché Noir',
    commune: 'Adjamé',
    level: 5,
    points: 2410,
    weeklyPoints: 340,
    monthlyPoints: 920,
    wordsAdded: 36,
    wordsApproved: 32,
    audioUploaded: 14,
    streakDays: 19,
    badgesCount: 9,
    trend: 'down'
  },
  {
    rank: 4,
    user: {
      id: 'c4',
      username: 'Kouassi_Abobo_Kpata',
      avatar: '🦁'
    },
    title: 'Guerrier d’Abobo Baoulé',
    commune: 'Abobo',
    level: 4,
    points: 1980,
    weeklyPoints: 290,
    monthlyPoints: 780,
    wordsAdded: 28,
    wordsApproved: 24,
    audioUploaded: 11,
    streakDays: 15,
    badgesCount: 8,
    trend: 'up'
  },
  {
    rank: 5,
    user: {
      id: 'c5',
      username: 'Prof_Linguistique_UFHB',
      avatar: '🎓'
    },
    title: 'Sage Académicien',
    commune: 'Cocody',
    level: 4,
    points: 1650,
    weeklyPoints: 180,
    monthlyPoints: 610,
    wordsAdded: 22,
    wordsApproved: 22,
    audioUploaded: 16,
    streakDays: 21,
    badgesCount: 11,
    trend: 'same'
  },
  {
    rank: 6,
    user: {
      id: 'c6',
      username: 'Aicha_Chic_Angré',
      avatar: '✨'
    },
    title: 'Styliste du Verbe',
    commune: 'Cocody',
    level: 3,
    points: 1320,
    weeklyPoints: 240,
    monthlyPoints: 540,
    wordsAdded: 18,
    wordsApproved: 16,
    audioUploaded: 8,
    streakDays: 11,
    badgesCount: 7,
    trend: 'up'
  },
  {
    rank: 7,
    user: {
      id: 'c7',
      username: 'Djibril_Wassakara',
      avatar: '🔥'
    },
    title: 'Enjailleur de Rue',
    commune: 'Yopougon',
    level: 3,
    points: 1150,
    weeklyPoints: 150,
    monthlyPoints: 460,
    wordsAdded: 16,
    wordsApproved: 14,
    audioUploaded: 7,
    streakDays: 9,
    badgesCount: 6,
    trend: 'down'
  },
  {
    rank: 8,
    user: {
      id: 'c8',
      username: 'Marcory_Griot_Vibe',
      avatar: '🥁'
    },
    title: 'Chroniqueur Urbain',
    commune: 'Marcory',
    level: 3,
    points: 980,
    weeklyPoints: 130,
    monthlyPoints: 390,
    wordsAdded: 13,
    wordsApproved: 11,
    audioUploaded: 5,
    streakDays: 8,
    badgesCount: 6,
    trend: 'same'
  },
  {
    rank: 9,
    user: {
      id: 'c9',
      username: 'Bamba_Koumassi_Remblais',
      avatar: '🎯'
    },
    title: 'Sentinelle du Ghetto',
    commune: 'Koumassi',
    level: 2,
    points: 860,
    weeklyPoints: 190,
    monthlyPoints: 350,
    wordsAdded: 11,
    wordsApproved: 9,
    audioUploaded: 4,
    streakDays: 7,
    badgesCount: 5,
    trend: 'up'
  },
  {
    rank: 10,
    user: {
      id: 'c10',
      username: 'Yasmine_Plateau_Biz',
      avatar: '💼'
    },
    title: 'Ambassadrice Nouchi Pro',
    commune: 'Plateau',
    level: 2,
    points: 740,
    weeklyPoints: 110,
    monthlyPoints: 290,
    wordsAdded: 9,
    wordsApproved: 8,
    audioUploaded: 3,
    streakDays: 6,
    badgesCount: 5,
    trend: 'same'
  }
];

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentUser,
  onOpenAddWord,
  onOpenAuth
}) => {
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');
  const [communeFilter, setCommuneFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContributor, setSelectedContributor] = useState<LeaderboardEntry | null>(null);
  const [copiedShareNotice, setCopiedShareNotice] = useState(false);

  // Extract unique communes for filtering
  const availableCommunes = useMemo(() => {
    const set = new Set<string>();
    DEFAULT_TOP_10_CONTRIBUTORS.forEach(c => {
      if (c.commune) set.add(c.commune);
    });
    return Array.from(set).sort();
  }, []);

  // Filter and sort contributors according to timeframe and filters
  const sortedAndFilteredContributors = useMemo(() => {
    let list = [...DEFAULT_TOP_10_CONTRIBUTORS];

    // Filter by commune
    if (communeFilter !== 'all') {
      list = list.filter(c => c.commune?.toLowerCase() === communeFilter.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c => 
        c.user.username.toLowerCase().includes(q) ||
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.commune && c.commune.toLowerCase().includes(q))
      );
    }

    // Sort by points depending on timeframe
    list.sort((a, b) => {
      const ptsA = timeframe === 'week' ? (a.weeklyPoints || 0) : timeframe === 'month' ? (a.monthlyPoints || 0) : a.points;
      const ptsB = timeframe === 'week' ? (b.weeklyPoints || 0) : timeframe === 'month' ? (b.monthlyPoints || 0) : b.points;
      return ptsB - ptsA;
    });

    // Re-assign ranks for the filtered view
    return list.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }, [timeframe, communeFilter, searchQuery]);

  // Restrict strictly to Top 10
  const top10List = useMemo(() => {
    return sortedAndFilteredContributors.slice(0, 10);
  }, [sortedAndFilteredContributors]);

  // Top 3 Podium elements
  const podiumTop1 = top10List.find(c => c.rank === 1);
  const podiumTop2 = top10List.find(c => c.rank === 2);
  const podiumTop3 = top10List.find(c => c.rank === 3);

  // Calculate current user's relative standing
  const currentUserEntry = useMemo(() => {
    if (!currentUser) return null;
    return DEFAULT_TOP_10_CONTRIBUTORS.find(c => 
      c.user.username.toLowerCase() === currentUser.username.toLowerCase()
    );
  }, [currentUser]);

  // User simulated rank if not directly in top 10
  const userSimulatedPoints = currentUser?.role === 'admin' ? 890 : 420;
  const userSimulatedRank = currentUserEntry?.rank || 12;

  const handleSelectContributor = (c: LeaderboardEntry) => {
    setSelectedContributor(c);
    hapticManager.trigger('tap');
  };

  const handleSharePodium = () => {
    hapticManager.trigger('celebration');
    if (navigator.share) {
      navigator.share({
        title: 'Classement Top 10 Nouchi - Panthéon d’Abidjan',
        text: `Découvrez le Top 10 des maîtres contributeurs de Markkanich Nouchi ! 🇨🇮 @${podiumTop1?.user.username || 'Dj_Arouna_Yop'} domine le Panthéon avec ${podiumTop1?.points || 3450} points !`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShareNotice(true);
      setTimeout(() => setCopiedShareNotice(false), 2500);
    }
  };

  const getPointsByTimeframe = (c: LeaderboardEntry) => {
    if (timeframe === 'week') return c.weeklyPoints || Math.round(c.points * 0.15);
    if (timeframe === 'month') return c.monthlyPoints || Math.round(c.points * 0.35);
    return c.points;
  };

  return (
    <div id="leaderboard-component" className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {copiedShareNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black px-4 py-2.5 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 border border-amber-300">
          <Sparkles className="w-4 h-4" />
          <span>Lien du Panthéon copié dans le presse-papier !</span>
        </div>
      )}

      {/* Top Banner & Title */}
      <div className="bg-[#161618] border border-amber-500/30 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Panthéon Officiel d’Abidjan 🇨🇮</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Classement des 10 Meilleurs Contributeurs</span>
              <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Top 10
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Consultez les maîtres lexicographes et ambianceurs de rue qui enrichissent quotidiennement le vocabulaire, les prononciations et les proverbes du Nouchi.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="btn-share-leaderboard"
              onClick={handleSharePodium}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-slate-200 hover:text-amber-400 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Partager le classement"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager</span>
            </button>

            {onOpenAddWord && (
              <button
                type="button"
                id="btn-leaderboard-contribute"
                onClick={() => {
                  hapticManager.trigger('tap');
                  onOpenAddWord();
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Gagner des points (+50 pts)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar: Timeframe, Commune Filter, Search */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Timeframe Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {(['all', 'month', 'week'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                hapticManager.trigger('tap');
                setTimeframe(t);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                timeframe === t
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'Général (Tout temps)' : t === 'month' ? 'Ce mois' : 'Cette semaine'}
            </button>
          ))}
        </div>

        {/* Filter and Search Inputs */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Commune Filter Dropdown */}
          <div className="relative min-w-[150px] flex-1 sm:flex-none">
            <select
              value={communeFilter}
              onChange={(e) => {
                hapticManager.trigger('tap');
                setCommuneFilter(e.target.value);
              }}
              className="w-full appearance-none bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold py-2.5 pl-8 pr-8 rounded-2xl focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">📍 Toutes les communes</option>
              {availableCommunes.map((comm) => (
                <option key={comm} value={comm}>📍 {comm}</option>
              ))}
            </select>
            <MapPin className="w-3.5 h-3.5 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search Contributor Bar */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chercher un contributeur..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-white placeholder-slate-500 text-xs rounded-2xl py-2.5 pl-8 pr-3 focus:outline-none transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PODIUM DES AS : TOP 3 (Or, Argent, Bronze) */}
      {/* ========================================================================= */}
      {podiumTop1 && !searchQuery && communeFilter === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-end pt-4 pb-2">
          {/* 2nd Place - Silver */}
          {podiumTop2 && (
            <div 
              onClick={() => handleSelectContributor(podiumTop2)}
              className="order-2 sm:order-1 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-700/80 rounded-3xl p-5 text-center relative shadow-lg hover:border-slate-500 transition-all cursor-pointer group hover:-translate-y-1 duration-200"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-300 text-slate-950 text-xs font-black shadow-md flex items-center gap-1">
                <span>🥈 2ème</span>
              </div>
              <div className="text-4xl mb-2 mt-1 group-hover:scale-110 transition-transform">
                {podiumTop2.user.avatar || '👑'}
              </div>
              <h4 className="font-extrabold text-white text-base truncate">
                @{podiumTop2.user.username}
              </h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">{podiumTop2.title}</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                  📍 {podiumTop2.commune}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                  Lvl {podiumTop2.level}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-lg font-black text-slate-200 font-mono">
                  {getPointsByTimeframe(podiumTop2).toLocaleString()} <span className="text-xs text-slate-400">XP</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{podiumTop2.wordsApproved} mots validés</span>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place - Gold (Grand Maître, Elevated) */}
          {podiumTop1 && (
            <div 
              onClick={() => handleSelectContributor(podiumTop1)}
              className="order-1 sm:order-2 bg-gradient-to-b from-amber-500/15 via-[#1a1712] to-slate-950 border-2 border-amber-500/70 rounded-3xl p-6 text-center relative shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:border-amber-400 transition-all cursor-pointer group hover:-translate-y-1.5 duration-200 sm:-mt-4"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black shadow-lg flex items-center gap-1.5 border border-amber-300">
                <Crown className="w-3.5 h-3.5" />
                <span>🥇 Champion 1er</span>
              </div>
              <div className="text-5xl mb-2 mt-2 group-hover:scale-110 transition-transform filter drop-shadow">
                {podiumTop1.user.avatar || '🎧'}
              </div>
              <h4 className="font-black text-white text-lg truncate">
                @{podiumTop1.user.username}
              </h4>
              <p className="text-xs text-amber-400 font-semibold truncate mt-0.5">{podiumTop1.title}</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  📍 {podiumTop1.commune}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-black">
                  Lvl {podiumTop1.level}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/30">
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {getPointsByTimeframe(podiumTop1).toLocaleString()} <span className="text-xs text-amber-500">XP</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{podiumTop1.wordsApproved} mots • {podiumTop1.audioUploaded} audios</span>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place - Bronze */}
          {podiumTop3 && (
            <div 
              onClick={() => handleSelectContributor(podiumTop3)}
              className="order-3 bg-gradient-to-b from-orange-950/30 to-slate-950 border border-orange-800/60 rounded-3xl p-5 text-center relative shadow-lg hover:border-orange-600 transition-all cursor-pointer group hover:-translate-y-1 duration-200"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-800 text-amber-100 text-xs font-black shadow-md flex items-center gap-1 border border-amber-700">
                <span>🥉 3ème</span>
              </div>
              <div className="text-4xl mb-2 mt-1 group-hover:scale-110 transition-transform">
                {podiumTop3.user.avatar || '⚡'}
              </div>
              <h4 className="font-extrabold text-white text-base truncate">
                @{podiumTop3.user.username}
              </h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">{podiumTop3.title}</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                  📍 {podiumTop3.commune}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 font-bold">
                  Lvl {podiumTop3.level}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-lg font-black text-orange-300 font-mono">
                  {getPointsByTimeframe(podiumTop3).toLocaleString()} <span className="text-xs text-slate-400">XP</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{podiumTop3.wordsApproved} mots validés</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CURRENT USER POSITION BANNER */}
      {/* ========================================================================= */}
      {currentUser ? (
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black font-black text-lg flex items-center justify-center shadow-md border border-amber-400">
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-white text-sm">
                  Votre Position : @{currentUser.username}
                </h4>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Rang #{userSimulatedRank}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Vous avez accumulé <strong className="text-amber-400 font-mono">{userSimulatedPoints} XP</strong>. Plus que <strong className="text-white font-mono">{top10List[top10List.length - 1]?.points - userSimulatedPoints > 0 ? top10List[top10List.length - 1].points - userSimulatedPoints : 80} XP</strong> pour entrer dans le Top 10 officiel !
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAddWord}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition flex items-center justify-center gap-1.5 shadow cursor-pointer whitespace-nowrap"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Grimper au classement</span>
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-500">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm">
                Vous n'êtes pas encore connecté
              </h5>
              <p className="text-[11px] text-slate-400">
                Connectez-vous pour enregistrer vos points, débloquer des badges et voir votre rang parmi les Ivoiriens !
              </p>
            </div>
          </div>
          {onOpenAuth && (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow cursor-pointer whitespace-nowrap"
            >
              Se connecter / S'inscrire
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TABLEAU COMPLET DU TOP 10 (Liste avec détails) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Medal className="w-4 h-4 text-amber-500" />
            <span>Détail du Top 10 des Contributeurs</span>
          </h3>
          <span className="text-xs text-slate-500">
            {top10List.length} contributeur{top10List.length > 1 ? 's' : ''} affiché{top10List.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-2.5">
          {top10List.map((entry) => {
            const isTop1 = entry.rank === 1;
            const isTop2 = entry.rank === 2;
            const isTop3 = entry.rank === 3;
            const isCurrentUser = currentUser?.username.toLowerCase() === entry.user.username.toLowerCase();
            const points = getPointsByTimeframe(entry);

            return (
              <div
                key={entry.user.id || entry.rank}
                onClick={() => handleSelectContributor(entry)}
                className={`p-3.5 sm:p-4 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group ${
                  isCurrentUser
                    ? 'bg-amber-500/15 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400'
                    : isTop1
                    ? 'bg-amber-500/10 border-amber-500/40 hover:border-amber-400 shadow-sm'
                    : isTop2
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                    : isTop3
                    ? 'bg-orange-950/20 border-orange-900/40 hover:border-orange-700'
                    : 'bg-[#161618] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Left: Rank, Avatar & Contributor Meta */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  {/* Rank Badge */}
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0 shadow-sm ${
                    isTop1
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-black font-black'
                      : isTop2
                      ? 'bg-slate-300 text-black font-black'
                      : isTop3
                      ? 'bg-amber-800 text-white font-black'
                      : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}>
                    {isTop1 ? '👑 1' : isTop2 ? '🥈 2' : isTop3 ? '🥉 3' : `#${entry.rank}`}
                  </div>

                  {/* Avatar Icon */}
                  <div className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {entry.user.avatar || '👤'}
                  </div>

                  {/* Username, Title & Badges */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-extrabold text-white text-xs sm:text-sm truncate">
                        @{entry.user.username}
                      </p>
                      {isCurrentUser && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-black">
                          C'est vous !
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                        Lvl {entry.level}
                      </span>
                      {entry.commune && (
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 hidden sm:inline-flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-amber-500" />
                          <span>{entry.commune}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="truncate text-slate-300 font-medium">
                        {entry.title}
                      </span>
                      <span className="hidden sm:inline text-slate-600">•</span>
                      <span className="hidden sm:inline text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{entry.wordsApproved} validés</span>
                      </span>
                      {entry.streakDays && (
                        <>
                          <span className="hidden sm:inline text-slate-600">•</span>
                          <span className="text-orange-400 font-semibold flex items-center gap-0.5">
                            <Flame className="w-3 h-3 text-orange-500" />
                            <span>{entry.streakDays}j</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Points, Badges Count & Trend */}
                <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <div className="flex items-center gap-2">
                    {/* Trend Icon */}
                    {entry.trend === 'up' && (
                      <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] flex items-center gap-0.5 font-bold" title="En progression">
                        <TrendingUp className="w-3 h-3" />
                      </span>
                    )}
                    {entry.trend === 'down' && (
                      <span className="p-1 rounded-md bg-rose-500/10 text-rose-400 text-[10px] flex items-center gap-0.5 font-bold" title="En baisse">
                        <TrendingDown className="w-3 h-3" />
                      </span>
                    )}
                    {entry.trend === 'same' && (
                      <span className="p-1 rounded-md bg-slate-800 text-slate-500 text-[10px]" title="Stable">
                        <Minus className="w-3 h-3" />
                      </span>
                    )}

                    {/* Badges count pill */}
                    <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800 font-mono hidden md:inline-block">
                      🎖️ {entry.badgesCount} badges
                    </span>
                  </div>

                  {/* Points display */}
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-black text-amber-400 font-mono leading-none">
                      {points.toLocaleString()} <span className="text-xs font-bold text-slate-400">XP</span>
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {timeframe === 'week' ? 'cette semaine' : timeframe === 'month' ? 'ce mois' : 'score cumulé'}
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors hidden sm:block" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALE DÉTAIL D'UN CONTRIBUTEUR DU TOP 10 */}
      {/* ========================================================================= */}
      {selectedContributor && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedContributor(null)}
        >
          <div 
            className="bg-[#161618] border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedContributor(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with avatar and rank */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg border border-amber-400/50">
                {selectedContributor.user.avatar || '👤'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">
                    @{selectedContributor.user.username}
                  </h3>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Rang #{selectedContributor.rank}
                  </span>
                </div>
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  {selectedContributor.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span>📍 Commune de {selectedContributor.commune}</span>
                  <span>•</span>
                  <span>Niveau {selectedContributor.level}</span>
                </div>
              </div>
            </div>

            {/* Contributor Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Score Total</span>
                </div>
                <p className="text-xl font-black text-amber-400 font-mono">
                  {selectedContributor.points.toLocaleString()} XP
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mots Validés</span>
                </div>
                <p className="text-xl font-black text-white font-mono">
                  {selectedContributor.wordsApproved}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Prononciations</span>
                </div>
                <p className="text-xl font-black text-white font-mono">
                  {selectedContributor.audioUploaded || 0}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Série Active</span>
                </div>
                <p className="text-xl font-black text-orange-400 font-mono">
                  {selectedContributor.streakDays || 0} jours
                </p>
              </div>
            </div>

            {/* Badges showcase preview */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Palmarès & Titres Débloqués</span>
                </span>
                <span className="text-amber-400 font-bold">{selectedContributor.badgesCount} distinctions</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Ce contributeur a activement enrichi la transmission orale et écrite du Nouchi ivoirien. Ses contributions sont validées par le conseil des sages.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedContributor(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
              >
                Fermer
              </button>
              {onOpenAddWord && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedContributor(null);
                    onOpenAddWord();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Ajouter un mot</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
