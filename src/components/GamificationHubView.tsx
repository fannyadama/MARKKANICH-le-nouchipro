import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Flame, 
  Medal, 
  Crown, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Zap,
  Gift,
  Award,
  Calendar,
  Share2,
  Download,
  FileJson,
  FileSpreadsheet,
  Bookmark,
  Database
} from 'lucide-react';
import { User, Badge, PREDEFINED_BADGES, NouchiWord } from '../types';
import { exportFavoritesToJSON, exportFavoritesToCSV } from '../utils/exportHelper';
import { hapticManager } from '../utils/haptics';
import { Leaderboard } from './Leaderboard';

interface GamificationHubViewProps {
  user: User | null;
  onOpenAuth: () => void;
  onOpenAddWord: () => void;
  favoriteWords?: NouchiWord[];
  onOpenExportFavorites?: () => void;
  onSelectWord?: (word: NouchiWord) => void;
}

export const GamificationHubView: React.FC<GamificationHubViewProps> = ({
  user,
  onOpenAuth,
  onOpenAddWord,
  favoriteWords = [],
  onOpenExportFavorites,
  onSelectWord
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'leaderboard' | 'badges' | 'missions'>('profile');
  const [claimedRewardNotice, setClaimedRewardNotice] = useState<string | null>(null);

  // User Stats with local state
  const [userStats, setUserStats] = useState({
    points: 840,
    level: 3,
    currentStreak: 7,
    longestStreak: 14,
    wordsAdded: 12,
    wordsApproved: 8,
    likesReceived: 45,
    commentsMade: 22,
    wordsViewed: 164,
    audioUploaded: 3,
    referrals: 2,
    earnedBadgeIds: ['b1', 'b2', 'b6', 'b8', 'b11', 'b16']
  });

  const nextLevelPoints = Math.pow(userStats.level, 2) * 100;
  const pointsToNextLevel = Math.max(0, nextLevelPoints - userStats.points);
  const progressPercent = Math.min(100, Math.round((userStats.points / nextLevelPoints) * 100));

  const showRewardToast = (msg: string) => {
    setClaimedRewardNotice(msg);
    setTimeout(() => setClaimedRewardNotice(null), 3500);
  };

  const handleClaimDailyBonus = () => {
    setUserStats(prev => {
      const nextPts = prev.points + 25;
      const nextLvl = Math.floor(Math.sqrt(nextPts / 100)) + 1;
      return {
        ...prev,
        points: nextPts,
        level: nextLvl,
        currentStreak: prev.currentStreak + 1
      };
    });
    hapticManager.trigger('celebration');
    showRewardToast('🔥 +25 points réclamés ! Votre série augmente de +1 jour.');
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return 'from-amber-400 via-yellow-500 to-amber-600';
    if (level >= 5) return 'from-purple-500 via-indigo-500 to-pink-500';
    if (level >= 3) return 'from-blue-500 via-cyan-500 to-teal-500';
    return 'from-emerald-500 via-teal-600 to-amber-500';
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {claimedRewardNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce border border-amber-300">
          <Sparkles className="w-4 h-4" />
          <span>{claimedRewardNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#161618] border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Système de Progression & Récompenses Nouchiman</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Passeport & Gamification du Ghetto 🇨🇮
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Gagnez des points en enrichissant le dictionnaire, enregistrez les prononciations authentiques, débloquez des badges prestigieux et grimpez dans le Panthéon d'Abidjan !
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClaimDailyBonus}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-lg hover:scale-105 transform duration-200"
            >
              <Gift className="w-4 h-4" />
              <span>Bonus Quotidien (+25 pts)</span>
            </button>

            <button
              onClick={onOpenAddWord}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Proposer un Mot (+50 pts)</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          {[
            { id: 'profile' as const, label: 'Mon Profil & Niveau', icon: Crown },
            { id: 'leaderboard' as const, label: 'Classement Top Babi', icon: Trophy },
            { id: 'badges' as const, label: `Galerie des Badges (${userStats.earnedBadgeIds.length}/${PREDEFINED_BADGES.length})`, icon: Medal },
            { id: 'missions' as const, label: 'Missions & Barème de Points', icon: Zap }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MON PROFIL & NIVEAU */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Main Level Hero Card */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Level Badge Circle */}
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${getLevelColor(userStats.level)} flex flex-col items-center justify-center text-black font-black shadow-2xl relative`}>
                  <Crown className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="text-xl sm:text-2xl leading-none mt-1">Lvl {userStats.level}</span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {user?.username ? `@${user.username}` : 'Nouchiman Initié'}
                  </h3>
                  <p className="text-xs text-amber-400 font-bold mt-0.5">
                    {userStats.level >= 5 ? 'Vieux Père Respecté' : userStats.level >= 3 ? 'Chroniqueur de Rue' : 'Apprenti Gbaka'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-semibold">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <strong>{userStats.points}</strong> points cumulés
                  </p>
                </div>
              </div>

              {/* Progress to Next Level */}
              <div className="space-y-2 md:col-span-2 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Progression vers le Niveau {userStats.level + 1}</span>
                  <span className="text-amber-400">{userStats.points} / {nextLevelPoints} pts ({progressPercent}%)</span>
                </div>
                <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Encore <strong>{pointsToNextLevel} pts</strong> requis</span>
                  <span className="text-emerald-400">Formule : Niveau = ⌊√(Points / 100)⌋ + 1</span>
                </p>
              </div>
            </div>
          </div>

          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Série Active</span>
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-black text-white">{userStats.currentStreak} jours</p>
              <p className="text-[11px] text-slate-500">Record : {userStats.longestStreak} j</p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Mots Validés</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-emerald-400">{userStats.wordsApproved} / {userStats.wordsAdded}</p>
              <p className="text-[11px] text-slate-500">Taux de succès : 67%</p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Likes Reçus</span>
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-amber-400">{userStats.likesReceived}</p>
              <p className="text-[11px] text-slate-500">Popularité communautaire</p>
            </div>

            <div className="bg-[#161618] border border-slate-800 p-5 rounded-3xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                <span>Audios Uploadés</span>
                <Volume2 className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-black text-purple-400">{userStats.audioUploaded}</p>
              <p className="text-[11px] text-slate-500">Empreinte phonétique</p>
            </div>
          </div>

          {/* Unlocked Badges Showcase */}
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Medal className="w-5 h-5 text-amber-500" />
                Badges Débloqués Récemment
              </h3>
              <button 
                onClick={() => setActiveTab('badges')}
                className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Voir les {PREDEFINED_BADGES.length} badges</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {PREDEFINED_BADGES.filter(b => userStats.earnedBadgeIds.includes(b.id)).map((badge) => (
                <div key={badge.id} className="bg-slate-900/80 border border-amber-500/30 p-3.5 rounded-2xl text-center space-y-1.5 shadow-sm">
                  <div className="text-2xl">{badge.icon}</div>
                  <p className="text-xs font-bold text-white tracking-tight truncate">{badge.name}</p>
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
                    {badge.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Lexicon & Export Data Card (User Space Requirement) */}
          <div className="bg-[#161618] border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/20">
                  <Database className="w-3 h-3" />
                  <span>Mon Carnet Personnel</span>
                </div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400" />
                  Lexique des Mots Favoris ({favoriteWords.length})
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Exportez votre collection de termes nouchi sauvegardés vers un fichier <strong>JSON</strong> ou <strong>CSV (Excel)</strong> pour vos révisions, impressions ou intégrations techniques.
                </p>
              </div>

              {/* Main Export Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="btn-user-export-lexicon-modal"
                  onClick={onOpenExportFavorites}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs rounded-2xl flex items-center gap-2 transition shadow-lg shadow-amber-500/20 hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Exporter mon Lexique</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    id="btn-user-quick-export-json"
                    onClick={() => {
                      if (favoriteWords.length === 0) {
                        showRewardToast('⚠️ Votre liste de favoris est vide. Marquez des mots d\'abord !');
                        return;
                      }
                      exportFavoritesToJSON(favoriteWords, user);
                      showRewardToast('📥 Export JSON téléchargé avec succès ! (+10 XP)');
                    }}
                    title="Export direct en JSON"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <FileJson className="w-4 h-4" />
                    <span className="hidden md:inline">JSON</span>
                  </button>

                  <button
                    id="btn-user-quick-export-csv"
                    onClick={() => {
                      if (favoriteWords.length === 0) {
                        showRewardToast('⚠️ Votre liste de favoris est vide. Marquez des mots d\'abord !');
                        return;
                      }
                      exportFavoritesToCSV(favoriteWords, user);
                      showRewardToast('📥 Export CSV (Excel UTF-8) téléchargé avec succès ! (+10 XP)');
                    }}
                    title="Export direct en CSV pour Excel"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span className="hidden md:inline">CSV</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Favorite Words Chips Preview */}
            {favoriteWords.length > 0 ? (
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>Mots enregistrés dans votre carnet :</span>
                  <span className="text-amber-400 font-mono text-[10px]">Prêts pour l'exportation</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {favoriteWords.slice(0, 12).map((word) => (
                    <button
                      key={word.id}
                      onClick={() => onSelectWord && onSelectWord(word)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs font-semibold text-slate-200 hover:text-amber-300 transition flex items-center gap-1.5 group"
                    >
                      <Bookmark className="w-3 h-3 text-amber-500 group-hover:scale-110 transition-transform" />
                      <span>{word.term}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({word.frenchTranslation || word.grammaticalCategory})</span>
                    </button>
                  ))}
                  {favoriteWords.length > 12 && (
                    <span className="px-3 py-1.5 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500 font-semibold flex items-center">
                      +{favoriteWords.length - 12} autres mots
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
                <p className="text-xs text-slate-400">
                  Aucun mot favori pour l'instant. Marquez des termes dans le dictionnaire pour composer votre lexique personnalisé.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CLASSEMENT TOP BABI (LEADERBOARD TOP 10) */}
      {/* ========================================================================= */}
      {activeTab === 'leaderboard' && (
        <Leaderboard 
          currentUser={user}
          onOpenAddWord={onOpenAddWord}
          onOpenAuth={onOpenAuth}
        />
      )}

      {/* ========================================================================= */}
      {/* 3. GALERIE DES BADGES */}
      {/* ========================================================================= */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PREDEFINED_BADGES.map((badge) => {
              const isUnlocked = userStats.earnedBadgeIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-3xl border transition-all space-y-3 relative ${
                    isUnlocked
                      ? 'bg-[#161618] border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
                      : 'bg-[#121214] border-slate-800/60 opacity-50 grayscale'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{badge.icon}</div>
                    <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                      badge.level === 'diamond' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                      badge.level === 'platinum' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                      badge.level === 'gold' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      badge.level === 'silver' ? 'bg-slate-300/20 text-slate-200 border border-slate-400/40' :
                      'bg-orange-900/20 text-orange-300 border border-orange-800/40'
                    }`}>
                      {badge.level}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{badge.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                    <span className="text-amber-400">+{badge.points} points</span>
                    <span className={isUnlocked ? 'text-emerald-400' : 'text-slate-500'}>
                      {isUnlocked ? '✅ Débloqué' : '🔒 Verrouillé'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MISSIONS & BARÈME DE POINTS */}
      {/* ========================================================================= */}
      {activeTab === 'missions' && (
        <div className="space-y-6">
          <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Barème Officiel des Actions Récompensées
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {[
                { action: 'Ajouter un mot au dictionnaire', points: '+10 pts', desc: 'Proposition soumise en attente de validation', icon: '✍️' },
                { action: 'Mot approuvé par les modérateurs', points: '+50 pts', desc: 'Intégration officielle au patrimoine nouchi', icon: '🏆' },
                { action: 'Enregistrer une prononciation audio', points: '+20 pts', desc: 'Aide à la synthèse vocale et à l’apprentissage', icon: '🎙️' },
                { action: 'Maintenir un streak quotidien', points: '+10 pts / jour', desc: 'Bonus régularité de connexion', icon: '🔥' },
                { action: 'Recevoir un like sur un commentaire', points: '+2 pts', desc: 'Appréciation de la communauté', icon: '❤️' },
                { action: 'Parrainer un nouvel utilisateur', points: '+30 pts', desc: 'Partage du lien d’invitation Markkanich', icon: '🤝' }
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{m.action}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                  <span className="text-amber-400 font-black text-sm whitespace-nowrap bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                    {m.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
