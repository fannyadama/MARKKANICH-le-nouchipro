import { PricingPlan, DigitalProduct } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Griot Découverte',
    tagline: 'Pour apprendre les bases et explorer le lexique abidjanais.',
    badge: 'Gratuit',
    price: {
      monthly: { XOF: 0, EUR: 0, USD: 0 },
      yearly: { XOF: 0, EUR: 0, USD: 0 },
    },
    features: [
      'Accès au dictionnaire 100+ mots de base',
      '5 traductions IA quotidiennes',
      'Recherche et filtres par thématiques',
      'Mode Hors-ligne PWA embarqué',
      'Quiz de niveau Débutant',
      'Écoute vocale de prononciation'
    ],
    limitations: [
      'Quota de 5 traductions par jour',
      'Pas d’accès aux expressions secrètes de rue',
      'Pas de génération de certificats officiels',
      'Pas d’accès aux clés API développeur'
    ],
    ctaText: 'Commencer Gratuitement',
    highlightColor: 'slate'
  },
  {
    id: 'pass_express',
    name: 'Pass Flash Mobile Money 🇨🇮',
    tagline: 'Idéal pour débloquer immédiatement sans abonnement récurrent.',
    badge: 'Micro-Paiement Wave / Orange',
    isPopular: false,
    price: {
      monthly: { XOF: 1000, EUR: 1.79, USD: 1.99 }, // 7 Jours
      yearly: { XOF: 500, EUR: 0.99, USD: 1.10 },   // 24 Heures Flash
    },
    features: [
      'Paiement sans engagement ni renouvellement automatique',
      'Traductions IA bilingues 100% illimitées',
      'Accès à l’Assistant Conversationnel Le Vieux Père',
      'Déblocage des expressions rares et proverbes mystiques',
      'Validation instantanée par Wave, Orange ou MTN MoMo'
    ],
    ctaText: 'Prendre le Pass Flash',
    highlightColor: 'emerald'
  },
  {
    id: 'pro_vip',
    name: 'Nouchiman VIP Pro',
    tagline: 'L’expérience ultime pour maîtriser et vivre le Nouchi sans aucune limite.',
    badge: 'Plus Populaire ⚡',
    isPopular: true,
    price: {
      monthly: { XOF: 2500, EUR: 4.99, USD: 5.50 },
      yearly: { XOF: 25000, EUR: 49.00, USD: 54.00 }, // 2 months free
    },
    features: [
      'Traducteur Bilingue IA ILLIMITÉ (Français ↔ Nouchi)',
      'Assistant Conversationnel "Le Vieux Père" illimité',
      'Accès à TOUS les 300+ termes rares, argot de rue & sagesses',
      'Certificat Officiel "Nouchiman Certifié" téléchargeable',
      'Badge VIP Or 👑 sur vos commentaires et contributions',
      'Générateur de fiches visuelles partageables (WhatsApp/Insta)',
      'Accès aux Masterclasses & Proverbes mystiques',
      'Support client prioritaire 7j/7'
    ],
    ctaText: 'Devenir Nouchiman VIP',
    highlightColor: 'amber'
  },
  {
    id: 'business_api',
    name: 'Business & API Studio',
    tagline: 'Pour les entreprises, agences créatives, médias et développeurs de chatbots.',
    badge: 'B2B & Développeurs',
    price: {
      monthly: { XOF: 25000, EUR: 49.00, USD: 55.00 },
      yearly: { XOF: 250000, EUR: 490.00, USD: 550.00 },
    },
    features: [
      'Clé d’API REST NouchiPro sécurisée (Endpoints /v1)',
      'Quota de 100 000 requêtes / mois',
      'Intégration Chatbots WhatsApp, CRM et E-commerce',
      'Export complet du dictionnaire en JSON / CSV structuré',
      'Licence d’utilisation commerciale pour campagnes publicitaires',
      'Génération personnalisée de slogans et lexiques de marque',
      'SLA garanti à 99.9% et support technique ingénieur dédié'
    ],
    ctaText: 'Déployer l’API Entreprise',
    highlightColor: 'orange'
  }
];

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod_certificat_officiel',
    name: 'Attestation & Diplôme Nouchiman Officiel',
    tagline: 'Certificat officiel numéroté avec sceau d’or et QR Code de vérification en ligne.',
    badge: 'Achat Unique',
    category: 'certification',
    price: { XOF: 1500, EUR: 2.99, USD: 3.20 },
    features: [
      'PDF Haute Résolution 300 DPI prêt pour impression',
      'Numéro de certificat unique vérifiable par QR Code',
      'Signature calligraphiée de l’Académie NouchiPro',
      'Format optimisé pour LinkedIn, Instagram & WhatsApp'
    ],
    deliverable: 'Téléchargement immédiat + Lien permanent',
    icon: 'Award'
  },
  {
    id: 'prod_masterclass_ebook',
    name: 'E-Book & Masterclass Audio "Le Grand Argot de Babi"',
    tagline: 'Guide illustré complet de 300 expressions cultes + 100 audios de prononciation native.',
    badge: 'Bestseller Culturel',
    category: 'content',
    price: { XOF: 2500, EUR: 4.99, USD: 5.50 },
    features: [
      'Livre numérique 160 pages (PDF, EPUB & liseuses)',
      '100 pistes audio MP3 haute fidélité de prononciation',
      'Dossier spécial : Origines de 1970 à nos jours',
      'Lexique secret des quartiers chauds (Adjamé, Treich, Yop)'
    ],
    deliverable: 'Pack ZIP instantané (E-book + Audios)',
    icon: 'BookOpen'
  },
  {
    id: 'prod_brand_slogans',
    name: 'Pack Slogans de Marque & Licence Commerciale',
    tagline: 'Génération IA de slogans percutants en Nouchi avec licence d’exploitation publicitaire.',
    badge: 'Agences & Créateurs',
    category: 'b2b_tools',
    price: { XOF: 15000, EUR: 29.00, USD: 32.00 },
    features: [
      'Générateur de 20 propositions de slogans sur-mesure pour votre produit',
      'Licence de droits commerciaux pour diffusion TV, Radio, Panneaux & Digital',
      'Fiches de validation socioculturelle pour éviter les impairs',
      'Assistance linguistique de 30 minutes avec un expert'
    ],
    deliverable: 'Dossier stratégique sous 24h ouvrées',
    icon: 'Sparkles'
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; label: string }> = {
  'BABI2026': { discountPercent: 20, label: 'Offre Bienvenue Abidjan (-20%)' },
  'WAVE225': { discountPercent: 15, label: 'Réduction Spéciale Wave (-15%)' },
  'NOUCHIPRO': { discountPercent: 25, label: 'Super Promo Membre (-25%)' },
  'VIPFLASH': { discountPercent: 30, label: 'Vente Flash VIP (-30%)' }
};

export const SPONSOR_PACKAGES = [
  {
    id: 'sponsor_daily_word',
    name: 'Sponsor Officiel "Mot du Jour"',
    tagline: 'Associez votre marque au terme quotidien consulté par plus de 15 000 Ivoiriens chaque matin.',
    price: { XOF: 50000, EUR: 85, USD: 95 },
    period: 'Par semaine (7 jours)',
    reach: '15 000+ vues / jour',
    metrics: ['Bannière native interactive', 'Lien direct vers votre offre', 'Mention dans la notification push']
  },
  {
    id: 'sponsor_quiz_cup',
    name: 'Tournoi Sponsorisé "Grand Quiz Nouchi"',
    tagline: 'Créez un quiz thématique aux couleurs de votre produit ou service avec récompenses.',
    price: { XOF: 120000, EUR: 195, USD: 215 },
    period: 'Par campagne (14 jours)',
    reach: '40 000+ participants',
    metrics: ['Questions personnalisées de marque', 'Génération de leads qualifiés', 'Rapport d’engagement analytique']
  }
];

export const PAYMENT_METHODS = [
  {
    id: 'paystack' as const,
    name: 'Paystack Checkout (Guichet Unique 🇨🇮)',
    category: 'paystack',
    badge: 'Passerelle Officielle ⚡',
    description: 'Paiement direct sécurisé : Wave, Orange Money, MTN, Moov et Cartes Bancaires',
    iconColor: 'bg-[#00C3F7] text-black font-black',
    accentColor: '#00C3F7'
  },
  {
    id: 'wave' as const,
    name: 'Wave Côte d’Ivoire',
    category: 'mobile_money',
    badge: 'Recommandé 🇨🇮 (0% frais)',
    description: 'Paiement instantané par QR Code ou numéro Wave',
    iconColor: 'bg-cyan-500 text-black',
    accentColor: '#00D1FF'
  },
  {
    id: 'orange_money' as const,
    name: 'Orange Money Côte d’Ivoire',
    category: 'mobile_money',
    badge: '*144# Express',
    description: 'Paiement direct via code OTP ou notification Orange Money',
    iconColor: 'bg-orange-500 text-white',
    accentColor: '#FF6600'
  },
  {
    id: 'mtn_momo' as const,
    name: 'MTN Mobile Money (MoMo)',
    category: 'mobile_money',
    badge: '*133# MoMo Pay',
    description: 'Validation immédiate sur votre mobile MTN',
    iconColor: 'bg-yellow-400 text-black',
    accentColor: '#FFCC00'
  },
  {
    id: 'moov_money' as const,
    name: 'Moov Money Flooz',
    category: 'mobile_money',
    badge: '*155#',
    description: 'Paiement sécurisé via portefeuille Moov',
    iconColor: 'bg-blue-600 text-white',
    accentColor: '#005BAA'
  },
  {
    id: 'card' as const,
    name: 'Carte Bancaire (Visa / Mastercard)',
    category: 'card',
    badge: 'International',
    description: 'Paiement sécurisé 3D-Secure par carte de crédit ou débit',
    iconColor: 'bg-emerald-600 text-white',
    accentColor: '#10B981'
  },
  {
    id: 'paypal' as const,
    name: 'PayPal / Stripe Global',
    category: 'international',
    badge: 'Diaspora',
    description: 'Pour la diaspora ivoirienne en Europe, USA et Canada',
    iconColor: 'bg-indigo-600 text-white',
    accentColor: '#6366F1'
  }
];

export const MOCK_API_SAMPLE_RESPONSE = {
  status: 'success',
  data: {
    query: "Je vais faire la fête avec mes meilleurs amis ce soir",
    direction: "fr_to_nouchi",
    translated_text: "Ce soir je vais m'enjailler avec mon gbonhi de môgôs sûrs !",
    cultural_context: "Terme 's'enjailler' (fêter) et 'gbonhi' (groupe d'amis intimes).",
    confidence: 0.98,
    vocabulary: [
      { term: "s'enjailler", sense: "Faire la fête / Jouir de l'instant" },
      { term: "gbonhi", sense: "L'équipe / Le groupe d'amis" },
      { term: "môgô sûr", sense: "Ami fidèle et de confiance" }
    ],
    audio_phonetic_url: "https://api.markkanich-nouchipro.com/audio/v1/enjailler.mp3"
  },
  meta: {
    latency_ms: 28,
    rate_limit_remaining: 99842,
    api_version: "v1.2-babi"
  }
};
