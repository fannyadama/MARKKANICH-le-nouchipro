export type Category = 
  | 'all'
  | 'personnes'
  | 'argent'
  | 'actions'
  | 'qualificatifs'
  | 'transport_lieux'
  | 'expressions'
  | 'musique_culture';

export type DifficultyLevel = 'debutant' | 'intermediaire' | 'expert';

export interface NouchiExample {
  nouchi: string;
  french: string;
  context?: string;
}

export interface NouchiWord {
  id: string;
  term: string;
  phonetic?: string;
  grammaticalCategory: string; // e.g. "Nom masculin", "Verbe intransitif", "Locution", "Adjectif"
  definition: string;
  frenchTranslation: string;
  literalMeaning?: string;
  originLanguage: string; // e.g. "Dioula", "Baoulé", "Bété", "Français déformé", "Anglais", "Hybride"
  etymologyDetails?: string;
  examples: NouchiExample[];
  synonyms: string[];
  antonyms?: string[];
  category: Category;
  difficultyLevel: DifficultyLevel;
  officialStatus?: 'Larousse' | 'Robert' | 'Classique' | 'Tendance' | 'Populaire';
  officialYear?: string;
  tags: string[];
  likes?: string[];
  contributedBy?: {
    id: string;
    username: string;
    role?: 'admin' | 'contributor' | 'user';
  };
  audioUrl?: string;
  isCommunity?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'contributor' | 'user';
  avatar?: string;
  plan?: 'free' | 'pass_express' | 'pro_vip' | 'business_api';
  isVip?: boolean;
  apiKey?: string;
  dailyTranslationsUsed?: number;
}

export type PlanId = 'free' | 'pass_express' | 'pro_vip' | 'business_api';
export type BillingCycle = 'monthly' | 'yearly';
export type Currency = 'XOF' | 'EUR' | 'USD';
export type PaymentMethodType = 'paystack' | 'wave' | 'orange_money' | 'mtn_momo' | 'moov_money' | 'card' | 'paypal';

export interface DigitalProduct {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  category: 'certification' | 'content' | 'b2b_tools';
  price: { XOF: number; EUR: number; USD: number };
  features: string[];
  deliverable: string;
  icon: string;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  price: {
    monthly: { XOF: number; EUR: number; USD: number };
    yearly: { XOF: number; EUR: number; USD: number };
  };
  features: string[];
  limitations?: string[];
  ctaText: string;
  highlightColor: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  requestsUsed: number;
  requestsLimit: number;
  rateLimitPerMin: number;
  active: boolean;
}

export interface PaymentTransaction {
  id: string;
  planId: PlanId;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethodType;
  billingCycle: BillingCycle;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  invoiceNumber: string;
  customerName: string;
  customerPhoneOrEmail: string;
  paystackReference?: string;
}

export interface CommentReply {
  id: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
    role?: 'admin' | 'contributor' | 'user';
  };
  content: string;
  createdAt: string;
}

export interface WordComment {
  id: string;
  wordId: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
    role?: 'admin' | 'contributor' | 'user';
  };
  content: string;
  type: 'comment' | 'suggestion' | 'correction';
  likes: string[];
  replies: CommentReply[];
  createdAt: string;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  impact: string;
  badge?: string;
}

export interface HistorySection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  summary: string;
  content: string[];
  keyPoints: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: DifficultyLevel;
  category?: Category;
  culturalNote?: string;
}

export interface Proverb {
  id: string;
  nouchi: string;
  translation: string;
  meaning: string;
  context: string;
  origin?: string;
  theme: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category?: 'contribution' | 'engagement' | 'social' | 'special';
  requirement: {
    type: 'words_added' | 'words_approved' | 'likes_received' | 'comments_made' | 'streak_days' | 'audio_uploaded' | 'referrals';
    threshold: number;
  } | string;
  threshold?: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
  unlockedAt?: string;
}

export interface UserStats {
  userId: string;
  points: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  wordsAdded: number;
  wordsApproved: number;
  likesReceived: number;
  commentsMade: number;
  wordsViewed: number;
  audioUploaded: number;
  referrals: number;
  badges: string[];
  pointsToNextLevel: number;
  progressToNextLevel: number;
  dailyActivity: {
    date: string;
    points: number;
    actions: number;
  }[];
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    _id?: string;
    id?: string;
    username: string;
    avatar?: string;
  };
  points: number;
  level: number;
  wordsAdded: number;
  wordsApproved: number;
  badgesCount: number;
  title?: string;
  commune?: string;
  streakDays?: number;
  audioUploaded?: number;
  trend?: 'up' | 'down' | 'same';
  weeklyPoints?: number;
  monthlyPoints?: number;
}

export const PREDEFINED_BADGES: Badge[] = [
  { id: 'b1', name: 'Premier Pas', description: 'Ajouter votre premier mot au dictionnaire', icon: '🎯', category: 'contribution', level: 'bronze', requirement: { type: 'words_added', threshold: 1 }, points: 10 },
  { id: 'b2', name: 'Contributeur', description: 'Ajouter 10 mots au dictionnaire', icon: '📚', category: 'contribution', level: 'silver', requirement: { type: 'words_added', threshold: 10 }, points: 50 },
  { id: 'b3', name: 'Expert Nouchi', description: 'Ajouter 50 mots au dictionnaire', icon: '🎓', category: 'contribution', level: 'gold', requirement: { type: 'words_added', threshold: 50 }, points: 200 },
  { id: 'b4', name: 'Légende du Nouchi', description: 'Ajouter 100 mots au dictionnaire', icon: '👑', category: 'contribution', level: 'platinum', requirement: { type: 'words_added', threshold: 100 }, points: 500 },
  { id: 'b5', name: 'Maître Absolu', description: 'Ajouter 500 mots au dictionnaire', icon: '💎', category: 'contribution', level: 'diamond', requirement: { type: 'words_added', threshold: 500 }, points: 2000 },
  { id: 'b6', name: 'Validé', description: 'Avoir 5 mots approuvés par les sages', icon: '✅', category: 'contribution', level: 'bronze', requirement: { type: 'words_approved', threshold: 5 }, points: 25 },
  { id: 'b7', name: 'Qualité Supérieure', description: 'Avoir 25 mots approuvés', icon: '⭐', category: 'contribution', level: 'silver', requirement: { type: 'words_approved', threshold: 25 }, points: 100 },
  { id: 'b8', name: 'Populaire', description: 'Recevoir 50 likes sur vos contributions', icon: '❤️', category: 'social', level: 'bronze', requirement: { type: 'likes_received', threshold: 50 }, points: 30 },
  { id: 'b9', name: 'Influenceur', description: 'Recevoir 200 likes sur vos contributions', icon: '🔥', category: 'social', level: 'silver', requirement: { type: 'likes_received', threshold: 200 }, points: 100 },
  { id: 'b10', name: 'Célébrité', description: 'Recevoir 1000 likes sur vos contributions', icon: '🌟', category: 'social', level: 'gold', requirement: { type: 'likes_received', threshold: 1000 }, points: 500 },
  { id: 'b11', name: 'Régulier', description: '7 jours consécutifs d’activité', icon: '📅', category: 'engagement', level: 'bronze', requirement: { type: 'streak_days', threshold: 7 }, points: 20 },
  { id: 'b12', name: 'Assidu', description: '30 jours consécutifs d’activité', icon: '🔥', category: 'engagement', level: 'silver', requirement: { type: 'streak_days', threshold: 30 }, points: 100 },
  { id: 'b13', name: 'Légendaire', description: '100 jours consécutifs d’activité', icon: '💫', category: 'engagement', level: 'gold', requirement: { type: 'streak_days', threshold: 100 }, points: 500 },
  { id: 'b14', name: 'Voix du Nouchi', description: 'Uploader 10 enregistrements audio', icon: '🎙️', category: 'special', level: 'silver', requirement: { type: 'audio_uploaded', threshold: 10 }, points: 75 },
  { id: 'b15', name: 'Studio Pro', description: 'Uploader 50 enregistrements audio', icon: '🎧', category: 'special', level: 'gold', requirement: { type: 'audio_uploaded', threshold: 50 }, points: 300 },
  { id: 'b16', name: 'Recruteur', description: 'Parrainer 5 amis sur Markkanich', icon: '🤝', category: 'special', level: 'bronze', requirement: { type: 'referrals', threshold: 5 }, points: 50 },
  { id: 'b17', name: 'Ambassadeur', description: 'Parrainer 20 amis sur Markkanich', icon: '🌍', category: 'special', level: 'silver', requirement: { type: 'referrals', threshold: 20 }, points: 200 }
];

export interface TranslationResult {
  translatedText: string;
  explanation: string;
  vocabularyUsed: { term: string; meaning: string }[];
  culturalNote?: string;
  alternativeVariants?: string[];
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface WordSubmission {
  id: string;
  word: NouchiWord;
  status: SubmissionStatus;
  submittedBy: {
    id: string;
    username: string;
    email?: string;
    role: 'admin' | 'contributor' | 'user';
  };
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  rejectionReason?: string;
  confidenceScore?: number; // AI or community rating 0-100%
  neighborhood?: string;
}

export interface ModerationComment {
  id: string;
  wordId: string;
  wordTerm: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
    role: 'admin' | 'contributor' | 'user';
  };
  content: string;
  type: 'comment' | 'suggestion' | 'correction';
  status: 'approved' | 'flagged' | 'hidden';
  flagsCount: number;
  flagReason?: string;
  createdAt: string;
  likesCount: number;
}

export interface PlatformStatPoint {
  date: string;
  frToNouchi: number;
  nouchiToFr: number;
  apiCalls: number;
  activeUsers: number;
}

export interface CategoryStatPoint {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface NeighborhoodStatPoint {
  neighborhood: string;
  count: number;
  popularTerm: string;
}

export interface DailyWordNotificationSettings {
  enabled: boolean;
  scheduledTime: string; // e.g. "08:00"
  soundEnabled: boolean;
  streakReminder: boolean;
  categoryPreference: Category;
  lastNotifiedDate?: string;
  subscriptionEndpoint?: string;
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data: {
    url: string;
    wordId: string;
    term: string;
    frenchTranslation: string;
    date: string;
  };
  actions?: {
    action: string;
    title: string;
    icon?: string;
  }[];
}

