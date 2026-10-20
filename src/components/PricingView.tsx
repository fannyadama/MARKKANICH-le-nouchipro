import React, { useState, useEffect } from 'react';
import { PRICING_PLANS, PAYMENT_METHODS, DIGITAL_PRODUCTS, SPONSOR_PACKAGES } from '../data/pricingData';
import { PricingPlan, BillingCycle, Currency, User, DigitalProduct } from '../types';
import { 
  CheckCircle, 
  Sparkles, 
  Zap, 
  Crown, 
  Building2, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  HelpCircle, 
  ArrowRight, 
  Award,
  ChevronDown,
  Layers,
  Code2,
  Lock,
  Globe,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Calculator,
  Megaphone,
  Download,
  BookOpen,
  Check,
  Star,
  MessageCircle
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface PricingViewProps {
  user: User | null;
  onSelectPlan: (plan: PricingPlan, cycle: BillingCycle, currency: Currency) => void;
  onOpenApiConsole: () => void;
  onOpenCertificate: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  user,
  onSelectPlan,
  onOpenApiConsole,
  onOpenCertificate
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [currency, setCurrency] = useState<Currency>('XOF');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [roiRequestsPerMonth, setRoiRequestsPerMonth] = useState<number>(1500);
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [selectedSponsorPackage, setSelectedSponsorPackage] = useState(SPONSOR_PACKAGES[0]);
  const [sponsorBrandName, setSponsorBrandName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [sponsorSent, setSponsorSent] = useState(false);
  const [paystackStatus, setPaystackStatus] = useState<{
    connected: boolean;
    mode: string;
    message?: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/paystack/config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPaystackStatus({
            connected: data.connected,
            mode: data.mode,
            message: data.message
          });
        }
      })
      .catch(() => {});
  }, []);

  // Financial ROI Calculator
  const freelanceCostPerRequest = 150; // FCFA per phrase with a traditional human copywriter
  const freelanceTotalCost = roiRequestsPerMonth * freelanceCostPerRequest;
  const nouchiProApiCost = 25000; // Flat monthly plan
  const netMonthlySavings = Math.max(0, freelanceTotalCost - nouchiProApiCost);
  const roiPercentage = Math.round((netMonthlySavings / nouchiProApiCost) * 100);

  const formatPrice = (xof: number, eur: number, usd: number) => {
    if (currency === 'XOF') return `${Math.round(xof).toLocaleString('fr-FR')} FCFA`;
    if (currency === 'EUR') return `${eur.toFixed(2)} €`;
    return `$${usd.toFixed(2)}`;
  };

  const faqs = [
    {
      q: "Comment s'effectue le paiement avec Wave ou Orange Money en Côte d'Ivoire ?",
      a: "Le paiement est 100% automatisé et sans aucun frais additionnel. Dès que vous choisissez votre formule et saisissez votre numéro Mobile Money (+225), vous recevez instantanément une invite ou un QR code à valider sur votre téléphone. Vos privilèges VIP sont activés en 10 secondes."
    },
    {
      q: "Qu'est-ce que le Pass Flash Mobile Money ?",
      a: "C'est une formule ultra-accessible sans abonnement récurrent. Pour seulement 500 FCFA (24 heures) ou 1 000 FCFA (7 jours), vous débloquez immédiatement toutes les fonctionnalités VIP sans engagement et sans renouvellement automatique."
    },
    {
      q: "Puis-je changer de formule ou résilier mon abonnement à tout moment ?",
      a: "Oui, absolument. Vous conservez vos accès VIP jusqu'à la fin de la période facturée, sans aucun engagement de durée. Vous pouvez basculer d'une formule mensuelle à annuelle quand vous le souhaitez."
    },
    {
      q: "Comment fonctionne l'accès à l'API Développeur & Entreprise ?",
      a: "Avec le forfait Business & API Studio, vous obtenez une clé REST personnelle délivrant jusqu'à 100 000 requêtes par mois avec documentation Swagger, SDKs JavaScript/Python et un support dédié pour vos chatbots WhatsApp, CRM ou applications mobiles."
    },
    {
      q: "Comment sponsoriser le 'Mot du Jour' ou lancer une campagne de marque ?",
      a: "NouchiPro regroupe plus de 15 000 Ivoiriens actifs chaque jour. Vous pouvez réserver une semaine de sponsoring pour afficher votre bannière native, votre lien promotionnel et être mentionné dans la notification push du matin."
    }
  ];

  const handleBuyProduct = (product: DigitalProduct) => {
    hapticManager.trigger('selection');
    // Map product to a PricingPlan structure so checkout can process it
    const virtualPlan: PricingPlan = {
      id: 'pro_vip',
      name: product.name,
      tagline: product.tagline,
      badge: product.badge,
      isPopular: false,
      price: {
        monthly: product.price,
        yearly: product.price
      },
      features: product.features,
      ctaText: `Commander (${formatPrice(product.price.XOF, product.price.EUR, product.price.USD)})`,
      highlightColor: 'amber'
    };
    onSelectPlan(virtualPlan, 'monthly', currency);
  };

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorBrandName || !sponsorEmail) return;
    setSponsorSent(true);
    hapticManager.trigger('celebration');
    setTimeout(() => {
      setSponsorSent(false);
      setSponsorModalOpen(false);
      setSponsorBrandName('');
      setSponsorEmail('');
    }, 2500);
  };

  return (
    <div id="pricing-view" className="space-y-12 animate-fadeIn max-w-7xl mx-auto">
      {/* Hero Header Bento */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden text-center shadow-2xl">
        {/* Glow lights */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            <span>Monétisation & Formules Avantageuses</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Tarifs Transparents & <span className="text-amber-400">Micro-Paiements Wave 🇨🇮</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Du Pass Flash à 500 FCFA pour débloquer immédiatement, jusqu’à l’API Entreprise pour vos campagnes publicitaires et chatbots.
          </p>

          {/* Currency & Billing Cycle Switchers */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            {/* Billing Cycle Pill */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-2xl shadow-inner">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Paiement Standard / Mensuel
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Formule Annuelle / Flash 24H</span>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-black uppercase">
                  -20% Réduction
                </span>
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setCurrency('XOF')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  currency === 'XOF' ? 'bg-slate-800 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇨🇮 FCFA (XOF)
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  currency === 'EUR' ? 'bg-slate-800 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇪🇺 EUR (€)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  currency === 'USD' ? 'bg-slate-800 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇺🇸 USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid (4 Plans) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => {
          const rawPrice = plan.price[billingCycle][currency];
          const formattedPrice = formatPrice(
            plan.price[billingCycle].XOF,
            plan.price[billingCycle].EUR,
            plan.price[billingCycle].USD
          );

          const isCurrentPlan = user?.plan === plan.id || (!user?.plan && plan.id === 'free');

          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#1e1a12] via-[#161618] to-[#161618] border-amber-500/80 shadow-[0_0_35px_rgba(245,158,11,0.18)] lg:-translate-y-2'
                  : plan.id === 'pass_express'
                  ? 'bg-gradient-to-b from-[#0d1d17] via-[#161618] to-[#161618] border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.12)]'
                  : 'bg-[#161618] border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${
                    plan.isPopular 
                      ? 'bg-amber-500 text-black' 
                      : plan.id === 'pass_express'
                      ? 'bg-emerald-500 text-black'
                      : plan.id === 'business_api'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-4 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    {plan.id === 'pro_vip' && <Crown className="w-5 h-5 text-amber-400" />}
                    {plan.id === 'pass_express' && <Zap className="w-5 h-5 text-emerald-400" />}
                    {plan.id === 'business_api' && <Building2 className="w-5 h-5 text-orange-400" />}
                    <h3 className="text-lg font-extrabold text-white">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-slate-800/80 mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {formattedPrice}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {plan.id === 'pass_express' 
                        ? (billingCycle === 'monthly' ? '/ 7 jours' : '/ 24 heures')
                        : (billingCycle === 'monthly' ? '/ mois' : '/ an')}
                    </span>
                  </div>
                  {plan.id === 'pass_express' && (
                    <p className="text-[10px] text-emerald-400 font-semibold mt-1">
                      ⚡ Paiement direct sans renouvellement
                    </p>
                  )}
                  {billingCycle === 'yearly' && plan.price.yearly[currency] > 0 && plan.id !== 'pass_express' && (
                    <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                      Économisez 2 mois entiers
                    </p>
                  )}
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-300">
                    Avantages inclus :
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                          plan.isPopular 
                            ? 'text-amber-400' 
                            : plan.id === 'pass_express'
                            ? 'text-emerald-400'
                            : 'text-emerald-400'
                        }`} />
                        <span className="leading-snug text-[11px]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={() => {
                    if (plan.id === 'free') return;
                    onSelectPlan(plan, billingCycle, currency);
                  }}
                  disabled={isCurrentPlan && plan.id === 'free'}
                  className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : plan.id === 'pass_express'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : plan.id === 'business_api'
                      ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg'
                      : isCurrentPlan
                      ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{isCurrentPlan ? 'Formule Actuelle' : plan.ctaText}</span>
                  {!isCurrentPlan && <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                <p className="text-center text-[10px] text-slate-500 mt-2">
                  {plan.id === 'free' 
                    ? 'Sans inscription requise' 
                    : 'Paiement Wave & Mobile Money sécurisé'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Boutique Produits Numériques & Certificats (Achat Unique - Forte Marge) */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Boutique Officielle NouchiPro</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Produits Numériques & Packs à l'Unité (Sans Abonnement)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Commandez des packs spécialisés avec livraison immédiate et certificat officiel attesté.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <Check className="w-4 h-4" />
            <span>Téléchargement direct après règlement Mobile Money</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIGITAL_PRODUCTS.map((product) => {
            const formatted = formatPrice(product.price.XOF, product.price.EUR, product.price.USD);
            return (
              <div 
                key={product.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 transition duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase">
                      {product.badge}
                    </span>
                    <span className="text-base font-black text-amber-400">{formatted}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{product.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{product.tagline}</p>

                  <div className="space-y-2 mb-6">
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <p className="text-[10px] text-slate-500 mb-2">Livraison : {product.deliverable}</p>
                  <button
                    onClick={() => handleBuyProduct(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-amber-500"
                  >
                    <span>Acheter ({formatted})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulateur de Rentabilité & ROI Entreprise / Agences */}
      <div className="bg-gradient-to-br from-[#161618] to-[#1a1712] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Simulateur de Rentabilité & ROI Entreprise
            </h3>
            <p className="text-xs text-slate-400">
              Calculez combien votre agence de communication ou startup économise chaque mois grâce à NouchiPro API.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Slider input */}
          <div className="lg:col-span-2 space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">Volume de requêtes / traductions mensuelles :</span>
              <span className="text-amber-400 font-mono font-bold text-sm">{roiRequestsPerMonth.toLocaleString('fr-FR')} requêtes</span>
            </div>

            <input 
              type="range"
              min={100}
              max={10000}
              step={100}
              value={roiRequestsPerMonth}
              onChange={(e) => setRoiRequestsPerMonth(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>100 req. (Petite campagne)</span>
              <span>5 000 req. (Chatbot actif)</span>
              <span>10 000 req. (Média / Marque)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Coût Rédacteur Externe / Agence</p>
                <p className="text-lg font-black text-red-400 mt-0.5">{freelanceTotalCost.toLocaleString('fr-FR')} FCFA</p>
                <p className="text-[9px] text-slate-500">Estimé à ~150 FCFA / phrase argotique</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Coût Forfait NouchiPro Business</p>
                <p className="text-lg font-black text-amber-400 mt-0.5">25 000 FCFA</p>
                <p className="text-[9px] text-slate-500">Accès API illimité jusqu’à 100k requêtes</p>
              </div>
            </div>
          </div>

          {/* Result Net Savings Bento */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 block">
              Économie Nette Estimée
            </span>
            <p className="text-3xl sm:text-4xl font-black text-emerald-400">
              +{netMonthlySavings.toLocaleString('fr-FR')} FCFA
            </p>
            <p className="text-xs text-emerald-300 font-semibold">
              Soit un retour sur investissement de <span className="underline">+{roiPercentage}%</span> !
            </p>
            <button
              onClick={() => {
                const bPlan = PRICING_PLANS.find(p => p.id === 'business_api')!;
                onSelectPlan(bPlan, 'monthly', currency);
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition shadow-lg cursor-pointer"
            >
              Déployer l’API Entreprise
            </button>
          </div>
        </div>
      </div>

      {/* Section Sponsoring & Partenariats de Marque 🇨🇮 (Monétisation B2B) */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/30">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Sponsorisez NouchiPro & Touchez 15 000+ Ivoiriens Quotidiennement
              </h3>
              <p className="text-xs text-slate-400">
                Idéal pour les marques de télécoms, fintechs (Wave, Djamo, Orange Money) et événements à Abidjan.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSponsorModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Réserver un Créneau Sponsoring</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SPONSOR_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-white">{pkg.name}</h4>
                  <span className="text-sm font-black text-amber-400">
                    {formatPrice(pkg.price.XOF, pkg.price.EUR, pkg.price.USD)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{pkg.tagline}</p>

                <div className="flex items-center gap-4 text-xs text-slate-300 mb-3">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" /> {pkg.reach}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{pkg.period}</span>
                </div>

                <div className="space-y-1.5">
                  {pkg.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSponsorPackage(pkg);
                  setSponsorModalOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <span>Choisir cette formule de visibilité</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsoring Modal */}
      {sponsorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#161618] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-1">
              Demande de Partenariat & Sponsoring
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Pack sélectionné : <strong className="text-amber-400">{selectedSponsorPackage.name}</strong> ({formatPrice(selectedSponsorPackage.price.XOF, selectedSponsorPackage.price.EUR, selectedSponsorPackage.price.USD)})
            </p>

            {sponsorSent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Demande transmise avec succès !</h4>
                <p className="text-xs text-slate-400">
                  Notre équipe commerciale vous contactera sous 24h ouvrées pour valider vos visuels et activer la campagne.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nom de votre Marque / Entreprise</label>
                  <input
                    type="text"
                    required
                    value={sponsorBrandName}
                    onChange={(e) => setSponsorBrandName(e.target.value)}
                    placeholder="Ex: Wave Côte d'Ivoire / Agence Pub Babi"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">E-mail ou Téléphone du contact</label>
                  <input
                    type="text"
                    required
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    placeholder="contact@votre-entreprise.ci / 07 00 00 00 00"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSponsorModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold shadow-md cursor-pointer"
                  >
                    Envoyer ma demande
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Payment Ecosystem Ribbon */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00C3F7]/15 text-[#00C3F7] border border-[#00C3F7]/30">
                <Zap className="w-3 h-3 text-[#00C3F7]" />
                <span>Passerelle Paystack Intégrée 🇨🇮</span>
              </span>
              {paystackStatus?.connected && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Connecté ({paystackStatus.mode === 'live' ? 'Live' : 'Test'})
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-500" />
              <span>Moyens de Paiement Paystack Côte d'Ivoire & International</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Wave, Orange Money, MTN MoMo, Moov Money et Cartes Visa/Mastercard chiffrés en 256-bit.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4" />
            <span>Sécurité PCI-DSS Niveau 1 & 3DS</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PAYMENT_METHODS.map((pm) => (
            <div
              key={pm.id}
              onClick={() => {
                const defaultPlan = PRICING_PLANS.find(p => p.id === 'pro_vip') || PRICING_PLANS[0];
                onSelectPlan(defaultPlan, billingCycle, currency);
              }}
              className={`p-3 rounded-2xl bg-slate-900/60 border ${pm.id === 'paystack' ? 'border-[#00C3F7]/50 bg-[#00C3F7]/5 ring-1 ring-[#00C3F7]/30' : 'border-slate-800/80'} flex flex-col items-center text-center space-y-1.5 transition hover:border-[#00C3F7] cursor-pointer group`}
            >
              <div className={`p-2 rounded-xl ${pm.iconColor} font-bold text-xs group-hover:scale-110 transition-transform`}>
                {pm.category === 'mobile_money' ? <Smartphone className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
              </div>
              <p className="text-[11px] font-bold text-slate-200">{pm.name.split(' ')[0]}</p>
              <span className={`text-[9px] font-semibold ${pm.id === 'paystack' ? 'text-[#00C3F7] font-black' : 'text-amber-400'}`}>
                {pm.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-white">Questions Fréquentes sur la Monétisation</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-900/40 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-amber-400 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
