import { WordSubmission, ModerationComment, PlatformStatPoint, CategoryStatPoint, NeighborhoodStatPoint } from '../types';

export const INITIAL_PENDING_SUBMISSIONS: WordSubmission[] = [
  {
    id: 'sub-001',
    status: 'pending',
    confidenceScore: 94,
    neighborhood: 'Yopougon (Siporex / Rue Princesse)',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    submittedBy: {
      id: 'user-yop-dj',
      username: 'Dj_Arouna_Yop',
      email: 'arouna.yop@babi.ci',
      role: 'contributor'
    },
    word: {
      id: 'custom-coup-de-marteau',
      term: 'Coup de marteau',
      phonetic: '/ku.də.maʁ.to/',
      grammaticalCategory: 'Expression / Locution festive',
      definition: 'Action décisive, choc festif ou frappe musicale imparable qui met tout le monde d’accord et déclenche l’euphorie collective.',
      frenchTranslation: 'Frappe magistrale, coup d’éclat, son festif imparable',
      literalMeaning: 'Frapper fort comme avec une masse',
      originLanguage: 'Abidjan / Coupé-Décalé & Tam-tam',
      etymologyDetails: 'Popularisé massivement durant la CAN 2023/2024 en Côte d’Ivoire par Tam Sir et la Team Paiya, devenu un hymne de ralliement continental.',
      examples: [
        {
          nouchi: 'Le son là a mis le coup de marteau dans tout le maquis hier soir !',
          french: 'Ce morceau a créé une onde de choc festive dans tout le bar hier soir !'
        },
        {
          nouchi: 'Éléphants ont donné le coup de marteau à la 90e minute.',
          french: 'Les Éléphants ont asséné le coup de grâce à la 90e minute.'
        }
      ],
      synonyms: ['Kpafloter', 'Gnogbô', 'Bordement total'],
      antonyms: ['Goumin', 'Drap'],
      category: 'musique_culture',
      difficultyLevel: 'debutant',
      tags: ['CAN2024', 'Fête', 'Hymne', 'Tendance', 'Yopougon'],
      isCommunity: true
    }
  },
  {
    id: 'sub-002',
    status: 'pending',
    confidenceScore: 88,
    neighborhood: 'Adjamé (Grand Marché / Gare)',
    submittedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    submittedBy: {
      id: 'user-momo-adjame',
      username: 'Momo_Adjamé_Express',
      email: 'momo.adjame@gmail.com',
      role: 'user'
    },
    word: {
      id: 'custom-gbass',
      term: 'Gbass',
      phonetic: '/ɡbas/',
      grammaticalCategory: 'Nom masculin ou Verbe transitif (Gbassé)',
      definition: 'Pratique mystique, charme ensorcelant ou séduction irrésistible qui lie totalement une personne à une autre.',
      frenchTranslation: 'Charme mystique, envoûtement, emprise amoureuse',
      literalMeaning: 'Potion ou pouvoir occulte',
      originLanguage: 'Dioula / Baoulé hybride',
      etymologyDetails: 'Issu des traditions populaires urbaines de Babi désignant l’amour fou causé par des poudres secrètes ou un magnétisme irrésistible.',
      examples: [
        {
          nouchi: 'Le petit là est trop tombé amoureux, la go lui a fait bon gbass.',
          french: 'Ce jeune homme est éperdument amoureux, la fille l’a totalement ensorcelé.'
        }
      ],
      synonyms: ['Fétiche', 'Tchoco', 'Attachement'],
      antonyms: ['Libéré', 'Dégrisé'],
      category: 'expressions',
      difficultyLevel: 'intermediaire',
      tags: ['Mystique', 'Amour', 'Adjamé', 'Tradition urbaine'],
      isCommunity: true
    }
  },
  {
    id: 'sub-003',
    status: 'pending',
    confidenceScore: 91,
    neighborhood: 'Treichville (Avenue 16)',
    submittedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    submittedBy: {
      id: 'user-fatou-treich',
      username: 'Treich_Queen_Fatou',
      email: 'fatou.treich@ivoire.ci',
      role: 'contributor'
    },
    word: {
      id: 'custom-kpangba',
      term: 'Kpangba',
      phonetic: '/kpaŋ.ba/',
      grammaticalCategory: 'Nom masculin',
      definition: 'Histoire complexe, embrouille passionnelle, relation secrète tumultueuse ou affaire de cœur épicée.',
      frenchTranslation: 'Affaire amoureuse compliquée, intrigue de cœur, feuilleton passionnel',
      literalMeaning: 'Bruit d’assiettes / tumulte de ménage',
      originLanguage: 'Agni / Attié',
      etymologyDetails: 'Onomatopée évoquant le fracas des discussions de cour commune dans le Treichville populaire des années 80.',
      examples: [
        {
          nouchi: 'Laisse son kpangba là, ils vont se réconcilier demain.',
          french: 'Ne te mêle pas de leur dispute d’amoureux, ils vont se rabibocher demain.'
        }
      ],
      synonyms: ['Palabre', 'Goumin story', 'Dossier'],
      antonyms: ['Calme', 'Paix'],
      category: 'personnes',
      difficultyLevel: 'expert',
      tags: ['Amour', 'Quartier', 'Treichville', 'Cour commune'],
      isCommunity: true
    }
  },
  {
    id: 'sub-004',
    status: 'pending',
    confidenceScore: 82,
    neighborhood: 'Abobo (Gare d’Abobo)',
    submittedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
    submittedBy: {
      id: 'user-kouassi-abobo',
      username: 'Kouassi_Abobo_Kpata',
      email: 'kouassi@abobo.ci',
      role: 'user'
    },
    word: {
      id: 'custom-bloquer-le-gbaka',
      term: 'Bloquer le gbaka',
      phonetic: '/blɔ.ke lə ɡba.ka/',
      grammaticalCategory: 'Locution verbale',
      definition: 'Prendre le contrôle total d’une situation, stopper net une tentative d’intimidation ou s’imposer avec fermeté.',
      frenchTranslation: 'Prendre l’ascendant, neutraliser une tentative, poser ses limites',
      literalMeaning: 'Interdire au minibus de repartir',
      originLanguage: 'Adjamé / Abobo Transporteurs',
      etymologyDetails: 'Métaphore issue des apprentis gbaka (balanceurs) qui bloquent la porte coulissante pour exiger leur droit de place.',
      examples: [
        {
          nouchi: 'Le vieux père est venu, il a bloqué le gbaka direct !',
          french: 'Le grand frère est intervenu et a immédiatement réglé l’affaire avec autorité !'
        }
      ],
      synonyms: ['Cadrer', 'Positionner', 'Prendre le temps'],
      category: 'transport_lieux',
      difficultyLevel: 'intermediaire',
      tags: ['Gbaka', 'Abobo', 'Respect', 'Autorité'],
      isCommunity: true
    }
  },
  {
    id: 'sub-005',
    status: 'approved',
    confidenceScore: 98,
    neighborhood: 'Cocody (Angré 8e Tranche)',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    reviewerNotes: 'Excellente fiche lexicale vérifiée avec étymologie complète.',
    submittedBy: {
      id: 'user-koffi',
      username: 'Koffi_Abidjan',
      role: 'contributor'
    },
    word: {
      id: 'custom-chap-chap',
      term: 'Chap-chap',
      phonetic: '/tʃap.tʃap/',
      grammaticalCategory: 'Adverbe / Locution',
      definition: 'Faire quelque chose très vite, en express, sans perdre de temps.',
      frenchTranslation: 'Vite fait, en vitesse, expressément',
      originLanguage: 'Abidjan (Onomatopée)',
      examples: [
        { nouchi: 'Gbonhi, on gère ce dossier chap-chap et on décolle.', french: 'L’équipe, on règle cette affaire rapidement et on part.' }
      ],
      synonyms: ['Vite', 'Rapido'],
      category: 'actions',
      difficultyLevel: 'debutant',
      tags: ['Populaire', 'Vitesse'],
      isCommunity: true
    }
  },
  {
    id: 'sub-006',
    status: 'rejected',
    confidenceScore: 40,
    neighborhood: 'Marcory',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    rejectionReason: 'Doublon avec le terme existant "Enjaillement" et définition trop imprécise.',
    submittedBy: {
      id: 'user-inconnu',
      username: 'Anonyme_99',
      role: 'user'
    },
    word: {
      id: 'custom-enjaille-trop',
      term: 'Enjaille trop',
      phonetic: '/ɑ̃.ʒaj tʁo/',
      grammaticalCategory: 'Expression',
      definition: 'Quand on s’amuse trop beaucoup.',
      frenchTranslation: 'S’amuser fort',
      originLanguage: 'Français ivoirien',
      examples: [],
      synonyms: [],
      category: 'expressions',
      difficultyLevel: 'debutant',
      tags: ['Doublon'],
      isCommunity: true
    }
  }
];

export const INITIAL_MODERATION_COMMENTS: ModerationComment[] = [
  {
    id: 'mod-comm-1',
    wordId: 's-enjailler',
    wordTerm: "S'enjailler",
    author: {
      id: 'user-djibril',
      username: 'Djibril_Koumassi',
      role: 'user'
    },
    content: "Ce mot vient aussi de l'anglais 'enjoy' mélangé avec le préfixe réflexif français 's-'. C'est un pur chef-d'œuvre de créativité ivoirienne !",
    type: 'comment',
    status: 'approved',
    flagsCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    likesCount: 14
  },
  {
    id: 'mod-comm-2',
    wordId: 'mogo',
    wordTerm: 'Môgô',
    author: {
      id: 'user-spammer',
      username: 'Crypto_Promo_Bot',
      role: 'user'
    },
    content: 'GAGNEZ 500.000 FCFA EN 24H AVEC MON LIEN TELEGRAM CLIQUEZ ICI http://bit.ly/fake-invest',
    type: 'comment',
    status: 'flagged',
    flagsCount: 6,
    flagReason: 'Spam / Arnaque financière non sollicitée',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likesCount: 0
  },
  {
    id: 'mod-comm-3',
    wordId: 'boucantier',
    wordTerm: 'Boucantier',
    author: {
      id: 'user-troll',
      username: 'Hater_Babi',
      role: 'user'
    },
    content: 'Tous les boucantiers sont des menteurs sans argent réel dans leurs poches.',
    type: 'comment',
    status: 'flagged',
    flagsCount: 3,
    flagReason: 'Contenu provocateur et non constructif',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    likesCount: 1
  },
  {
    id: 'mod-comm-4',
    wordId: 'gaou',
    wordTerm: 'Gaou',
    author: {
      id: 'user-linguist',
      username: 'Prof_Linguistique_UFHB',
      role: 'contributor'
    },
    content: "Précision étymologique : Dans le morceau légendaire de Magic System 'Premier Gaou' (1999), le terme a été consacré mondialement.",
    type: 'correction',
    status: 'approved',
    flagsCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likesCount: 29
  },
  {
    id: 'mod-comm-5',
    wordId: 'kpakpato',
    wordTerm: 'Kpakpato',
    author: {
      id: 'user-aicha',
      username: 'Aicha_Cocody',
      role: 'user'
    },
    content: "À Treichville on dit aussi 'Kongossa' emprunté au Cameroun ou 'Radio Treich' pour parler du kpakpato.",
    type: 'suggestion',
    status: 'approved',
    flagsCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    likesCount: 8
  }
];

export const MOCK_PLATFORM_STATS: PlatformStatPoint[] = [
  { date: '16 Aoû', frToNouchi: 1240, nouchiToFr: 890, apiCalls: 3400, activeUsers: 450 },
  { date: '17 Aoû', frToNouchi: 1450, nouchiToFr: 980, apiCalls: 4100, activeUsers: 520 },
  { date: '18 Aoû', frToNouchi: 1890, nouchiToFr: 1210, apiCalls: 5200, activeUsers: 680 },
  { date: '19 Aoû', frToNouchi: 2100, nouchiToFr: 1450, apiCalls: 6800, activeUsers: 840 },
  { date: '20 Aoû', frToNouchi: 2680, nouchiToFr: 1820, apiCalls: 8900, activeUsers: 1120 },
  { date: '21 Aoû', frToNouchi: 3120, nouchiToFr: 2150, apiCalls: 11400, activeUsers: 1390 },
  { date: '22 Aoû', frToNouchi: 3840, nouchiToFr: 2790, apiCalls: 14250, activeUsers: 1680 }
];

export const MOCK_CATEGORY_STATS: CategoryStatPoint[] = [
  { category: 'Expressions & Rue', count: 142, percentage: 28, color: '#f59e0b' },
  { category: 'Actions & Verbes', count: 98, percentage: 20, color: '#ea580c' },
  { category: 'Personnes & Types', count: 85, percentage: 17, color: '#10b981' },
  { category: 'Argent & Biz', count: 64, percentage: 13, color: '#3b82f6' },
  { category: 'Musique & Fête', count: 58, percentage: 12, color: '#8b5cf6' },
  { category: 'Transport & Gbaka', count: 51, percentage: 10, color: '#ec4899' }
];

export const MOCK_NEIGHBORHOOD_STATS: NeighborhoodStatPoint[] = [
  { neighborhood: 'Adjamé (Code & Marché)', count: 185, popularTerm: 'Gbaka, Môgô, Drap' },
  { neighborhood: 'Yopougon (Poya / Ambiance)', count: 164, popularTerm: 'Coup de Marteau, Enjailler' },
  { neighborhood: 'Treichville (Origines 1970)', count: 142, popularTerm: 'Kpata, Kpakpato, Ziguehi' },
  { neighborhood: 'Abobo (Ghetto & Courage)', count: 119, popularTerm: 'Gbonhi, Chap-chap, Démarrer' },
  { neighborhood: 'Koumassi (Wassakara & Bruit)', count: 94, popularTerm: 'Gbass, Kpangba, Gnan' },
  { neighborhood: 'Cocody (Anglophone & Chic)', count: 76, popularTerm: 'Goumin, Fresh, Chill' }
];

export const MOCK_HOURLY_TRAFFIC = [
  { hour: '00h', requests: 120 },
  { hour: '03h', requests: 45 },
  { hour: '06h', requests: 310 },
  { hour: '09h', requests: 1280 },
  { hour: '12h', requests: 2450 },
  { hour: '15h', requests: 2190 },
  { hour: '18h', requests: 3450 },
  { hour: '21h', requests: 4120 },
  { hour: '23h', requests: 1890 }
];

export const MOCK_SUBSCRIPTION_METRICS = {
  totalRevenueXOF: 18450000,
  monthlyRecurringRevenueXOF: 3250000,
  activeVipUsers: 1284,
  activeB2BClients: 48,
  totalApiRequestsThisMonth: 1845230,
  cacheHitRatio: '96.4%',
  averageLatencyMs: 42,
  moderationPendingCount: 4,
  reportedCommentsCount: 2
};
