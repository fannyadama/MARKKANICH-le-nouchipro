import React, { useState } from 'react';
import { User } from '../types';
import { UserProgression, ProgressionBadge } from '../utils/progressionHelper';
import { ActiveHeaderTab } from './Header';
import { 
  Trophy, 
  Sparkles, 
  Crown, 
  Star, 
  Flame, 
  CheckCircle2, 
  Lock, 
  Download, 
  ShieldCheck, 
  Vibrate, 
  VibrateOff, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Bookmark,
  Heart,
  Zap,
  Info
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface UserProfileCardProps {
  user: User;
  progression: UserProgression;
  onTabChange: (tab: ActiveHeaderTab) => void;
  onOpenPricing: () => void;
  onOpenExportFavorites?: () => void;
  onLogout: () => void;
  isHapticsEnabled: boolean;
  onToggleHaptics: () => void;
  onClose: () => void;
  bookmarkCount: number;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  progression,
  onTabChange,
  onOpenPricing,
  onOpenExportFavorites,
  onLogout,
  isHapticsEnabled,
  onToggleHaptics,
  onClose,
  bookmarkCount
}) => {
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<ProgressionBadge | null>(null);

  const isVip = user?.isVip || user?.plan === 'pro_vip' || user?.plan === 'business_api';

  const filteredBadges = progression.badges.filter(b => {
    if (badgeFilter === 'unlocked') return b.isUnlocked;
    if (badgeFilter === 'locked') return !b.isUnlocked;
    return true;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'diamond': return 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300';
      case 'platinum': return 'bg-purple-500/15 border-purple-500/40 text-purple-300';
      case 'gold': return 'bg-amber-500/15 border-amber-500/40 text-amber-300';
      case 'silver': return 'bg-slate-400/15 border-slate-400/40 text-slate-300';
      default: return 'bg-orange-600/15 border-orange-600/40 text-orange-300';
    }
  };

  const handleBadgeClick = (b: ProgressionBadge) => {
    setSelectedBadge(b);
    hapticManager.trigger(b.isUnlocked ? 'celebration' : 'tap');
  };

  return (
    <div 
      id="user-profile-card-dropdown"
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#161618] border border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 sm:p-5 z-50 animate-fadeIn overflow-hidden text-left"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Profile Header */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-black font-black text-lg flex items-center justify-center shadow-lg border-2 border-amber-400/60">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div 
              className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-950 border border-amber-500/80 text-[10px] font-black text-amber-400 shadow"
              title={`Niveau ${progression.level}`}
            >
              L{progression.level}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-white text-sm truncate max-w-[150px]">
                @{user.username}
              </h4>
              {isVip && (
                <span className="p-0.5 rounded-full bg-amber-500/20 text-amber-400" title="Membre VIP">
                  <Crown className="w-3 h-3" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[170px]">{user.email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {progression.levelTitle}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-orange-500" />
                {progression.streakDays}j
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-400 font-mono">
            {progression.totalPoints} XP
          </span>
          <div className="text-[10px] text-slate-500">Score Cumulé</div>
        </div>
      </div>

      {/* Global XP Progression to next level */}
      <div className="py-3 border-b border-slate-800/80 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-300 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span>Niveau {progression.level + 1} en vue</span>
          </span>
          <span className="text-amber-400 font-bold font-mono">
            {progression.progressPercent}% ({progression.pointsToNextLevel} XP restant)
          </span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 rounded-full transition-all duration-700"
            style={{ width: `${progression.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Badge Progression System Section */}
      <div className="py-3.5 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Badges de Progression
            </h5>
          </div>
          <span className="text-[11px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            {progression.unlockedCount} / {progression.totalBadgesCount}
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 mb-2.5">
          <button
            type="button"
            onClick={() => setBadgeFilter('all')}
            className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
              badgeFilter === 'all' ? 'bg-amber-500 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tous ({progression.totalBadgesCount})
          </button>
          <button
            type="button"
            onClick={() => setBadgeFilter('unlocked')}
            className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
              badgeFilter === 'unlocked' ? 'bg-emerald-500 text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Obtenus ({progression.unlockedCount})
          </button>
          <button
            type="button"
            onClick={() => setBadgeFilter('locked')}
            className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
              badgeFilter === 'locked' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            En cours ({progression.totalBadgesCount - progression.unlockedCount})
          </button>
        </div>

        {/* Scrollable Badge Grid */}
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {filteredBadges.map((b) => {
            const isSelected = selectedBadge?.id === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => handleBadgeClick(b)}
                className={`p-2 rounded-2xl border text-left transition flex flex-col justify-between relative cursor-pointer group ${
                  b.isUnlocked
                    ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400 hover:bg-slate-900 shadow-sm'
                    : 'bg-slate-950/50 border-slate-850 opacity-75 hover:opacity-100 hover:border-slate-700'
                } ${isSelected ? 'ring-2 ring-amber-400' : ''}`}
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                    {b.icon}
                  </span>
                  {b.isUnlocked ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      +{b.points}
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      {b.current}/{b.target}
                    </span>
                  )}
                </div>

                <div>
                  <div className="font-bold text-[11px] text-white truncate leading-tight">
                    {b.name}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate mt-0.5">
                    {b.description}
                  </div>
                </div>

                {/* Progress bar inside badge */}
                <div className="mt-1.5 w-full">
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        b.isUnlocked ? 'bg-emerald-400' : 'bg-amber-500'
                      }`}
                      style={{ width: `${b.percent}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected badge details banner */}
        {selectedBadge && (
          <div className="mt-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-300 flex items-start gap-2 animate-fadeIn">
            <span className="text-lg flex-shrink-0">{selectedBadge.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <strong className="text-white">{selectedBadge.name}</strong>
                <span className="text-amber-400 font-bold">+{selectedBadge.points} XP</span>
              </div>
              <p className="text-slate-400 text-[9px] mt-0.5">{selectedBadge.description}</p>
              <div className="mt-1 flex items-center gap-1.5 text-slate-400">
                <span>Progression : <strong>{selectedBadge.current} / {selectedBadge.target}</strong></span>
                <span>•</span>
                <span className={selectedBadge.isUnlocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {selectedBadge.isUnlocked ? '✅ Débloqué !' : `Encore ${selectedBadge.target - selectedBadge.current} requis`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Activity Metrics Strip */}
      <div className="grid grid-cols-4 gap-2 py-2.5 border-b border-slate-800/80 text-center">
        <div className="p-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
            <BookOpen className="w-3 h-3 text-amber-500" />
            <span>Mots</span>
          </div>
          <span className="font-extrabold text-white text-xs font-mono">{progression.stats.wordsAdded}</span>
        </div>

        <div className="p-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
            <Bookmark className="w-3 h-3 text-amber-500" />
            <span>Favoris</span>
          </div>
          <span className="font-extrabold text-white text-xs font-mono">{progression.stats.bookmarksCount}</span>
        </div>

        <div className="p-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
            <Heart className="w-3 h-3 text-rose-500" />
            <span>Likes</span>
          </div>
          <span className="font-extrabold text-white text-xs font-mono">{progression.stats.likesCount}</span>
        </div>

        <div className="p-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
            <Flame className="w-3 h-3 text-orange-500" />
            <span>Série</span>
          </div>
          <span className="font-extrabold text-white text-xs font-mono">{progression.streakDays}j</span>
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-2 space-y-1">
        <button
          type="button"
          onClick={() => {
            onTabChange('gamification');
            onClose();
          }}
          className="w-full flex items-center justify-between p-2 rounded-xl text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition font-bold border border-amber-500/30 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Passeport & Panthéon Complet</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          id="btn-profile-card-export"
          onClick={() => {
            if (onOpenExportFavorites) onOpenExportFavorites();
            onClose();
          }}
          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-emerald-400 hover:bg-emerald-500/10 transition font-semibold cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exporter mon lexique favori ({bookmarkCount})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onOpenPricing();
            onClose();
          }}
          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-amber-400 hover:bg-amber-500/10 transition font-semibold cursor-pointer"
        >
          <Crown className="w-3.5 h-3.5" />
          <span>{isVip ? 'Gérer mon statut VIP Pro' : 'Passer VIP Pro (Illimité)'}</span>
        </button>

        {user.role === 'admin' && (
          <button
            type="button"
            onClick={() => {
              onTabChange('admin');
              onClose();
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition font-semibold cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Tableau de Bord Administrateur</span>
          </button>
        )}

        <button
          type="button"
          id="btn-profile-card-haptics"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHaptics();
          }}
          className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition font-semibold cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {isHapticsEnabled ? (
              <Vibrate className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VibrateOff className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>Vibrations haptiques</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isHapticsEnabled ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
            {isHapticsEnabled ? 'ON' : 'OFF'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 transition font-semibold mt-1 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};
