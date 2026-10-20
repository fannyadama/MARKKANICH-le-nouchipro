import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types';
import { 
  BookOpen, 
  History, 
  Sparkles, 
  Trophy, 
  Quote, 
  Bookmark, 
  Award, 
  Plus, 
  User as UserIcon, 
  LogIn, 
  LogOut, 
  Shield, 
  ChevronDown,
  Crown,
  Code2,
  Zap,
  ShieldCheck,
  Bell,
  BellRing,
  Share2,
  Download,
  FileJson,
  Vibrate,
  VibrateOff,
  Flame
} from 'lucide-react';
import { notificationService } from '../services/notificationService';
import { hapticManager } from '../utils/haptics';
import { UserProfileCard } from './UserProfileCard';
import { getProgressionData } from '../utils/progressionHelper';

export type ActiveHeaderTab = 'dictionary' | 'history' | 'translator' | 'quiz' | 'proverbs' | 'pricing' | 'api-console' | 'admin' | 'gamification';

interface HeaderProps {
  activeTab: ActiveHeaderTab;
  onTabChange: (tab: ActiveHeaderTab) => void;
  wordCount: number;
  officialCount: number;
  bookmarkCount: number;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAddWord: () => void;
  onOpenPricing: () => void;
  onOpenNotificationModal?: () => void;
  onOpenShareModal?: () => void;
  onOpenExportFavorites?: () => void;
  customWordsCount?: number;
  likesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  wordCount,
  officialCount,
  bookmarkCount,
  user,
  onOpenAuth,
  onLogout,
  onOpenAddWord,
  onOpenPricing,
  onOpenNotificationModal,
  onOpenShareModal,
  onOpenExportFavorites,
  customWordsCount = 1,
  likesCount = 6
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(false);
  const [isHapticsEnabled, setIsHapticsEnabled] = useState<boolean>(() => hapticManager.getEnabled());
  const isHapticsSupported = hapticManager.isSupported();

  const handleToggleHaptics = () => {
    const next = !isHapticsEnabled;
    setIsHapticsEnabled(next);
    hapticManager.setEnabled(next);
  };

  // Progression & Badges calculation
  const progression = useMemo(() => {
    return getProgressionData(user, customWordsCount, bookmarkCount, likesCount);
  }, [user, customWordsCount, bookmarkCount, likesCount]);

  // Click outside listener for user dropdown
  useEffect(() => {
    if (!showUserMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    const checkStatus = () => {
      const settings = notificationService.getSettings();
      setIsNotifEnabled(settings.enabled && notificationService.getPermission() === 'granted');
    };
    checkStatus();
  }, []);

  const tabs = [
    { id: 'dictionary' as const, label: 'Dictionnaire', icon: BookOpen, badge: `${wordCount}` },
    { id: 'gamification' as const, label: 'Passeport & Niveaux', icon: Trophy, badge: '🔥 Lvl' },
    { id: 'translator' as const, label: 'Traducteur IA', icon: Sparkles, badge: 'Babi' },
    { id: 'admin' as const, label: 'Admin & Modération', icon: ShieldCheck, badge: '📊 Dashboard' },
    { id: 'pricing' as const, label: 'Tarifs & VIP Pro', icon: Crown, badge: '👑 VIP' },
    { id: 'api-console' as const, label: 'API & B2B', icon: Code2, badge: '100k/m' },
    { id: 'quiz' as const, label: 'Quiz Nouchiman', icon: Trophy, badge: 'Test' },
    { id: 'proverbs' as const, label: 'Sagesses & Proverbes', icon: Quote, badge: 'Maximes' },
    { id: 'history' as const, label: 'Histoire & Essai', icon: History, badge: 'Essai' },
  ];

  const isVip = user?.isVip || user?.plan === 'pro_vip' || user?.plan === 'business_api';

  return (
    <header className="bg-[#161618] border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/3 w-64 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        {/* Brand */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative group flex-shrink-0">
            <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-2xl overflow-hidden border-2 border-amber-500/80 bg-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center p-0.5">
              <img
                src="/logo.jpg"
                alt="Logo Markkanich Le NouchiPro"
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
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#161618] flex items-center justify-center" title="Mascotte active">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Markkanich <span className="text-amber-500">Le NouchiPro</span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                🇨🇮 CI
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mt-0.5">
              L'intelligence & Le Trésor Linguistique d'Abidjan
            </p>
          </div>
        </div>

        {/* Action Controls & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Monetization Quick Upgrade Button */}
          {isVip ? (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-black shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Membre VIP Actif 👑</span>
            </div>
          ) : (
            <button
              onClick={onOpenPricing}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black px-3.5 py-2 rounded-xl text-xs font-black transition shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse"
              title="Découvrir les formules VIP Pro"
            >
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>Devenir VIP Pro</span>
            </button>
          )}

          {/* Add word button */}
          <button
            id="btn-header-add-word"
            onClick={onOpenAddWord}
            className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500 hover:text-black text-amber-400 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            title="Proposer un mot Nouchi"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ajouter un mot</span>
          </button>

          {/* Daily Word Notification Push Bell Trigger */}
          {onOpenNotificationModal && (
            <button
              id="btn-header-daily-notif"
              onClick={onOpenNotificationModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                isNotifEnabled
                  ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="Notifications Push : Mot du Jour quotidien"
            >
              {isNotifEnabled ? (
                <BellRing className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              ) : (
                <Bell className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden md:inline">
                {isNotifEnabled ? 'Mot du Jour Actif' : 'Mot du Jour 🔔'}
              </span>
            </button>
          )}

          {/* Haptic vibration mobile toggle */}
          <button
            id="btn-header-haptic-toggle"
            onClick={handleToggleHaptics}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
              isHapticsEnabled
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title={
              isHapticsSupported
                ? `Vibrations haptiques mobiles : ${isHapticsEnabled ? 'Activées' : 'Désactivées'}`
                : 'API Vibration non disponible sur ce navigateur'
            }
          >
            {isHapticsEnabled ? (
              <Vibrate className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VibrateOff className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden xl:inline">
              {isHapticsEnabled ? 'Vibration On' : 'Vibration Off'}
            </span>
          </button>

          {/* Share App Trigger */}
          {onOpenShareModal && (
            <button
              id="btn-header-share-app"
              onClick={onOpenShareModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 transition"
              title="Partager l'application"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Partager</span>
            </button>
          )}

          {/* Larousse badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span><strong className="text-white">{officialCount}</strong> au Larousse / Robert</span>
          </div>

          {/* Bookmarks link */}
          <button
            onClick={() => onTabChange('dictionary')}
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
            title="Favoris enregistrés"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span><strong className="text-white">{bookmarkCount}</strong> favori{bookmarkCount > 1 ? 's' : ''}</span>
          </button>

          {/* User Account / Progression Badges trigger */}
          {user ? (
            <div className="relative user-menu">
              <button
                id="btn-user-profile"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 hover:border-amber-500/60 px-3 py-1.5 rounded-2xl text-xs text-white transition shadow-sm cursor-pointer group"
                title={`Profil de ${user.username} - Niveau ${progression.level} (${progression.levelTitle})`}
              >
                {/* Avatar with level badge pill */}
                <div className="relative flex-shrink-0">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-black flex items-center justify-center font-black uppercase text-xs shadow-md border border-amber-400/50 group-hover:scale-105 transition-transform">
                    {user.username.charAt(0)}
                  </div>
                  <div 
                    className="absolute -bottom-1 -right-1 px-1 py-0 rounded-full bg-slate-950 border border-amber-500 text-[8px] font-black text-amber-400 leading-tight shadow"
                    title={`Niveau ${progression.level}`}
                  >
                    L{progression.level}
                  </div>
                </div>

                {/* Info & Badges Pill */}
                <div className="text-left hidden sm:block min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-200 text-xs truncate max-w-[95px]">
                      @{user.username}
                    </span>
                    <span 
                      className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30"
                      title={`${progression.unlockedCount} badges débloqués sur ${progression.totalBadgesCount}`}
                    >
                      <span>🎖️</span>
                      <span>{progression.unlockedCount}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px]">
                    <span className="text-amber-400 font-semibold truncate max-w-[85px]">
                      {progression.levelTitle}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-orange-400 font-semibold flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 text-orange-500" />
                      {progression.streakDays}j
                    </span>
                  </div>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180 text-amber-400' : 'group-hover:text-white'}`} />
              </button>

              {/* User Dropdown Profile Card with Progression Badges */}
              {showUserMenu && (
                <UserProfileCard
                  user={user}
                  progression={progression}
                  onTabChange={onTabChange}
                  onOpenPricing={onOpenPricing}
                  onOpenExportFavorites={onOpenExportFavorites}
                  onLogout={onLogout}
                  isHapticsEnabled={isHapticsEnabled}
                  onToggleHaptics={handleToggleHaptics}
                  onClose={() => setShowUserMenu(false)}
                  bookmarkCount={bookmarkCount}
                />
              )}
            </div>
          ) : (
            <button
              id="btn-header-login"
              onClick={onOpenAuth}
              className="login-btn flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-200 hover:text-amber-400 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer group"
              title="Connectez-vous pour débloquer vos badges de progression Nouchiman"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>Connexion</span>
              <span className="hidden sm:inline-flex items-center text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 ml-0.5">
                🎖️ Badges
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Bento Navigation Bar */}
      <nav className="mt-3.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto p-1.5 bg-[#0A0A0B] border border-slate-800/80 rounded-2xl scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-lg font-bold ${
                  isActive 
                    ? 'bg-black/20 text-black' 
                    : tab.id === 'pricing'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

