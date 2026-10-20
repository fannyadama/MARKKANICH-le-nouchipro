import { User, Badge } from '../types';

export interface ProgressionBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'contribution' | 'collection' | 'engagement' | 'social' | 'vip' | 'savoir';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  current: number;
  target: number;
  percent: number;
  isUnlocked: boolean;
  points: number;
  unlockedAt?: string;
}

export interface UserProgression {
  level: number;
  levelTitle: string;
  totalPoints: number;
  currentLevelPoints: number;
  nextLevelPoints: number;
  pointsToNextLevel: number;
  progressPercent: number;
  streakDays: number;
  unlockedCount: number;
  totalBadgesCount: number;
  badges: ProgressionBadge[];
  stats: {
    wordsAdded: number;
    bookmarksCount: number;
    likesCount: number;
    quizCompleted: number;
    translationsCount: number;
  };
}

const STORAGE_PROGRESSION_KEY = 'markkanich_progression_extra';

export const LEVEL_TIERS = [
  { level: 1, minPoints: 0, title: 'Apprenti Nouchiman', color: 'from-slate-600 to-slate-400', border: 'border-slate-500' },
  { level: 2, minPoints: 150, title: 'Griot de Rue', color: 'from-teal-600 to-emerald-400', border: 'border-teal-500' },
  { level: 3, minPoints: 400, title: 'Enjailleur Pro', color: 'from-amber-600 to-yellow-400', border: 'border-amber-500' },
  { level: 4, minPoints: 800, title: 'Boss du Babi', color: 'from-orange-600 to-amber-500', border: 'border-orange-500' },
  { level: 5, minPoints: 1500, title: 'Sage Académicien', color: 'from-purple-600 to-indigo-400', border: 'border-purple-500' },
  { level: 6, minPoints: 2500, title: 'Légende Vivante 🇨🇮', color: 'from-yellow-400 via-amber-500 to-orange-500', border: 'border-yellow-400' }
];

export function getProgressionData(
  user: User | null,
  customWordsCount: number = 1,
  bookmarksCount: number = 5,
  likesGivenOrReceived: number = 6
): UserProgression {
  // Read extra progression state from storage if present
  let extraStats = {
    bonusPoints: 350,
    streakDays: 7,
    quizCompleted: 2,
    translationsCount: 4
  };

  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_PROGRESSION_KEY);
      if (saved) {
        extraStats = { ...extraStats, ...JSON.parse(saved) };
      }
    }
  } catch (e) {
    console.error('Erreur lecture progression:', e);
  }

  const isVip = !!(user?.isVip || user?.plan === 'pro_vip' || user?.plan === 'business_api');
  const isAdmin = user?.role === 'admin';

  // Base activities points calculation
  const wordsPoints = customWordsCount * 50;
  const bookmarksPoints = bookmarksCount * 15;
  const likesPoints = likesGivenOrReceived * 10;
  const streakPoints = extraStats.streakDays * 20;
  const quizPoints = extraStats.quizCompleted * 30;
  const vipBonus = isVip ? 300 : 0;
  const adminBonus = isAdmin ? 500 : 0;

  const totalPoints = extraStats.bonusPoints + wordsPoints + bookmarksPoints + likesPoints + streakPoints + quizPoints + vipBonus + adminBonus;

  // Determine user level based on total points
  let currentLevelObj = LEVEL_TIERS[0];
  let nextLevelObj = LEVEL_TIERS[1];

  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_TIERS[i].minPoints) {
      currentLevelObj = LEVEL_TIERS[i];
      nextLevelObj = LEVEL_TIERS[i + 1] || {
        level: currentLevelObj.level + 1,
        minPoints: currentLevelObj.minPoints + 1500,
        title: 'Divinité du Nouchi',
        color: 'from-amber-300 via-yellow-400 to-amber-600',
        border: 'border-amber-400'
      };
      break;
    }
  }

  const level = currentLevelObj.level;
  const levelTitle = currentLevelObj.title;
  const currentLevelMin = currentLevelObj.minPoints;
  const nextLevelMin = nextLevelObj.minPoints;
  const range = Math.max(1, nextLevelMin - currentLevelMin);
  const earnedInRange = Math.max(0, totalPoints - currentLevelMin);
  const progressPercent = Math.min(100, Math.round((earnedInRange / range) * 100));
  const pointsToNextLevel = Math.max(0, nextLevelMin - totalPoints);

  // Define comprehensive progression badges
  const rawBadges: Array<Omit<ProgressionBadge, 'percent' | 'isUnlocked'>> = [
    {
      id: 'badge-first-word',
      name: 'Premier Pas',
      description: 'Ajouter votre premier mot Nouchi',
      icon: '🎯',
      category: 'contribution',
      tier: 'bronze',
      current: customWordsCount,
      target: 1,
      points: 50
    },
    {
      id: 'badge-words-contributor',
      name: 'Griot Actif',
      description: 'Ajouter 5 mots au dictionnaire',
      icon: '📚',
      category: 'contribution',
      tier: 'silver',
      current: customWordsCount,
      target: 5,
      points: 150
    },
    {
      id: 'badge-words-expert',
      name: 'Maître Lexicographe',
      description: 'Ajouter 15 mots pour enrichir la langue',
      icon: '🎓',
      category: 'contribution',
      tier: 'gold',
      current: customWordsCount,
      target: 15,
      points: 300
    },
    {
      id: 'badge-favorites-collector',
      name: 'Curateur du Ghetto',
      description: 'Sauvegarder 5 mots dans vos favoris',
      icon: '🔖',
      category: 'collection',
      tier: 'bronze',
      current: bookmarksCount,
      target: 5,
      points: 40
    },
    {
      id: 'badge-favorites-master',
      name: 'Trésorier Nouchi',
      description: 'Constituer un lexique de 12 favoris',
      icon: '⭐',
      category: 'collection',
      tier: 'silver',
      current: bookmarksCount,
      target: 12,
      points: 100
    },
    {
      id: 'badge-streak-fire',
      name: 'Flamme d’Abidjan',
      description: '3 jours consécutifs d’activité',
      icon: '🔥',
      category: 'engagement',
      tier: 'bronze',
      current: extraStats.streakDays,
      target: 3,
      points: 60
    },
    {
      id: 'badge-streak-assidu',
      name: 'Nouchiman Assidu',
      description: '7 jours de fidélité consécutive',
      icon: '⚡',
      category: 'engagement',
      tier: 'silver',
      current: extraStats.streakDays,
      target: 7,
      points: 140
    },
    {
      id: 'badge-streak-legend',
      name: 'Pied de Biche',
      description: '30 jours consécutifs d’enjaillement',
      icon: '🌟',
      category: 'engagement',
      tier: 'gold',
      current: extraStats.streakDays,
      target: 30,
      points: 400
    },
    {
      id: 'badge-social-enjaille',
      name: 'Cœur Vaillant',
      description: 'Attribuer ou recevoir 5 mentions J’aime',
      icon: '❤️',
      category: 'social',
      tier: 'bronze',
      current: likesGivenOrReceived,
      target: 5,
      points: 50
    },
    {
      id: 'badge-social-star',
      name: 'Star de Treichville',
      description: 'Atteindre 15 mentions J’aime sur la plateforme',
      icon: '🚀',
      category: 'social',
      tier: 'silver',
      current: likesGivenOrReceived,
      target: 15,
      points: 150
    },
    {
      id: 'badge-quiz-ace',
      name: 'As du Quiz',
      description: 'Compléter au moins 2 sessions de Quiz',
      icon: '🏆',
      category: 'savoir',
      tier: 'silver',
      current: extraStats.quizCompleted,
      target: 2,
      points: 80
    },
    {
      id: 'badge-vip-crown',
      name: 'Couronne VIP Pro',
      description: 'Accéder aux privilèges Membre VIP 👑',
      icon: '👑',
      category: 'vip',
      tier: 'platinum',
      current: isVip ? 1 : 0,
      target: 1,
      points: 250
    }
  ];

  const badges: ProgressionBadge[] = rawBadges.map(b => {
    const isUnlocked = b.current >= b.target;
    const percent = Math.min(100, Math.round((b.current / b.target) * 100));
    return {
      ...b,
      percent,
      isUnlocked
    };
  });

  const unlockedCount = badges.filter(b => b.isUnlocked).length;

  return {
    level,
    levelTitle,
    totalPoints,
    currentLevelPoints: currentLevelMin,
    nextLevelPoints: nextLevelMin,
    pointsToNextLevel,
    progressPercent,
    streakDays: extraStats.streakDays,
    unlockedCount,
    totalBadgesCount: badges.length,
    badges,
    stats: {
      wordsAdded: customWordsCount,
      bookmarksCount,
      likesCount: likesGivenOrReceived,
      quizCompleted: extraStats.quizCompleted,
      translationsCount: extraStats.translationsCount
    }
  };
}

export function saveProgressionAction(type: 'bonus' | 'streak' | 'quiz' | 'translation', amount: number = 1) {
  try {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(STORAGE_PROGRESSION_KEY);
    const curr = saved ? JSON.parse(saved) : { bonusPoints: 350, streakDays: 7, quizCompleted: 2, translationsCount: 4 };

    if (type === 'bonus') curr.bonusPoints = (curr.bonusPoints || 350) + amount;
    if (type === 'streak') curr.streakDays = (curr.streakDays || 7) + amount;
    if (type === 'quiz') curr.quizCompleted = (curr.quizCompleted || 2) + amount;
    if (type === 'translation') curr.translationsCount = (curr.translationsCount || 4) + amount;

    localStorage.setItem(STORAGE_PROGRESSION_KEY, JSON.stringify(curr));
  } catch (e) {
    console.error('Erreur sauvegarde progression action:', e);
  }
}
