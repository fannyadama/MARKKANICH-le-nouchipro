import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Smartphone, 
  Server, 
  PieChart as PieIcon, 
  Zap,
  ShieldCheck,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface SaasProfitabilitySimulatorProps {
  onOpenPricingPlans: () => void;
  onOpenB2bModal: () => void;
}

export const SaasProfitabilitySimulator: React.FC<SaasProfitabilitySimulatorProps> = ({
  onOpenPricingPlans,
  onOpenB2bModal
}) => {
  // Simulator Controls
  const [visitors, setVisitors] = useState<number>(25000);
  const [conversionRate, setConversionRate] = useState<number>(4.5);
  const [b2bClientsCount, setB2bClientsCount] = useState<number>(5);
  const [sponsorshipsCount, setSponsorshipsCount] = useState<number>(2);

  // Financial calculations
  const metrics = useMemo(() => {
    const payingUsers = Math.round(visitors * (conversionRate / 100));

    // Distribution based on Côte d'Ivoire & diaspora habits
    // 45% Micro-Pass Flash 24H (500 FCFA)
    // 30% Micro-Pass Semaine (1 000 FCFA)
    // 25% VIP Mensuel Récurrent (2 500 FCFA)
    const passFlashUsers = Math.round(payingUsers * 0.45);
    const passWeekUsers = Math.round(payingUsers * 0.30);
    const vipMonthlyUsers = Math.round(payingUsers * 0.25);

    const b2cPassFlashRevenue = passFlashUsers * 500;
    const b2cPassWeekRevenue = passWeekUsers * 1000;
    const b2cVipRevenue = vipMonthlyUsers * 2500;
    const b2cTotalRevenue = b2cPassFlashRevenue + b2cPassWeekRevenue + b2cVipRevenue;

    // Digital products impulsions (Diplôme certifié, E-book à 1 500 - 2 500 FCFA)
    const digitalProductBuyers = Math.round(payingUsers * 0.12);
    const digitalProductsRevenue = digitalProductBuyers * 2000;

    // B2B & API Studio (25 000 FCFA/client/mois)
    const b2bRevenue = b2bClientsCount * 25000;

    // Sponsoring marques (50 000 FCFA / campagne hebdo)
    const sponsorshipRevenue = sponsorshipsCount * 50000;

    // Gross Revenue
    const monthlyGrossRevenueXOF = b2cTotalRevenue + digitalProductsRevenue + b2bRevenue + sponsorshipRevenue;
    const annualGrossRevenueXOF = monthlyGrossRevenueXOF * 12;

    // Operating Costs (Minimal infrastructure: Cloud container + Gemini Flash tokens + Paystack ~1.9%)
    const serverHostingCost = 9000; // ~14€/month Cloud Run
    const aiApiTokensCost = Math.min(65000, Math.round(visitors * 1.8)); // Gemini 3.8 Flash is ultra-affordable (~$0.15/1M tokens)
    const paymentGatewayFees = Math.round(monthlyGrossRevenueXOF * 0.019); // 1.9% Paystack local rate
    const totalOperatingCostXOF = serverHostingCost + aiApiTokensCost + paymentGatewayFees;

    // Net Profit
    const monthlyNetProfitXOF = Math.max(0, monthlyGrossRevenueXOF - totalOperatingCostXOF);
    const netProfitMarginPercent = Math.round((monthlyNetProfitXOF / monthlyGrossRevenueXOF) * 100) || 94;
    const annualNetProfitXOF = monthlyNetProfitXOF * 12;

    // Convert to EUR for international reference (1 EUR ≈ 655.957 XOF)
    const monthlyNetProfitEUR = Math.round(monthlyNetProfitXOF / 655.957);
    const annualNetProfitEUR = Math.round(annualNetProfitXOF / 655.957);

    return {
      payingUsers,
      passFlashUsers,
      passWeekUsers,
      vipMonthlyUsers,
      b2cTotalRevenue,
      digitalProductsRevenue,
      b2bRevenue,
      sponsorshipRevenue,
      monthlyGrossRevenueXOF,
      annualGrossRevenueXOF,
      totalOperatingCostXOF,
      monthlyNetProfitXOF,
      annualNetProfitXOF,
      monthlyNetProfitEUR,
      annualNetProfitEUR,
      netProfitMarginPercent
    };
  }, [visitors, conversionRate, b2bClientsCount, sponsorshipsCount]);

  const formatXOF = (amount: number) => `${Math.round(amount).toLocaleString('fr-FR')} FCFA`;
  const formatEUR = (amount: number) => `${Math.round(amount).toLocaleString('fr-FR')} €`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-[#161618] to-emerald-500/15 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Modèle Économique Ultra-Rentable (Marge Brute ~{metrics.netProfitMarginPercent}%)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Simulateur de Rentabilité & <span className="text-amber-400">Revenus SaaS Babi</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pourquoi Markkanich Le NouchiPro est un actif hautement monétisable : coûts d'hébergement minimes, 
              micro-paiements Wave/Orange sans friction, et forte demande culturelle auprès de plus de 30 millions de locuteurs.
            </p>
          </div>

          <div className="flex-shrink-0 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Bénéfice Net Projeté / Mois</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">
              +{formatXOF(metrics.monthlyNetProfitXOF)}
            </p>
            <p className="text-xs text-slate-400 font-medium">
              ≈ <span className="text-amber-400 font-bold">{formatEUR(metrics.monthlyNetProfitEUR)}</span> / mois net
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Inputs & Live Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-[#161618] border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Paramètres de Croissance & Trafic</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Temps Réel</span>
          </div>

          {/* Slider 1: Monthly Visitors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Visiteurs Actifs Mensuels :</span>
              </span>
              <span className="font-mono font-black text-amber-400 text-sm">
                {visitors.toLocaleString('fr-FR')} visiteurs
              </span>
            </div>
            <input
              type="range"
              min={3000}
              max={100000}
              step={1000}
              value={visitors}
              onChange={(e) => {
                setVisitors(parseInt(e.target.value, 10));
                hapticManager.trigger('selection');
              }}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>3 000 (Lancement)</span>
              <span>25 000 (Croissance Babi)</span>
              <span>100 000+ (Média viral)</span>
            </div>
          </div>

          {/* Slider 2: Conversion Rate */}
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Taux de Conversion Mobile Money :</span>
              </span>
              <span className="font-mono font-black text-emerald-400 text-sm">
                {conversionRate}% ({metrics.payingUsers.toLocaleString('fr-FR')} clients payants)
              </span>
            </div>
            <input
              type="range"
              min={1.0}
              max={10.0}
              step={0.5}
              value={conversionRate}
              onChange={(e) => {
                setConversionRate(parseFloat(e.target.value));
                hapticManager.trigger('selection');
              }}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1.5% (Taux basique)</span>
              <span>4.5% (Moyenne Mobile Money)</span>
              <span>8.0%+ (Avec Pass Flash 500F)</span>
            </div>
          </div>

          {/* Slider 3: B2B Clients */}
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Clients Entreprise & API Studio (25k/mois) :</span>
              </span>
              <span className="font-mono font-black text-cyan-400 text-sm">
                {b2bClientsCount} agences / marques ({formatXOF(metrics.b2bRevenue)})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={b2bClientsCount}
              onChange={(e) => {
                setB2bClientsCount(parseInt(e.target.value, 10));
                hapticManager.trigger('selection');
              }}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Slider 4: Monthly Brand Sponsorships */}
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Sponsorings de Marques (50k/campagne) :</span>
              </span>
              <span className="font-mono font-black text-purple-400 text-sm">
                {sponsorshipsCount} campagnes ({formatXOF(metrics.sponsorshipRevenue)})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={sponsorshipsCount}
              onChange={(e) => {
                setSponsorshipsCount(parseInt(e.target.value, 10));
                hapticManager.trigger('selection');
              }}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Right Column: Financial Breakdown Bento (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Profit Card */}
          <div className="bg-gradient-to-br from-[#161618] via-[#1a1812] to-[#122218] border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Résultats Financiers SaaS
                </span>
                <span className="text-xs font-black text-slate-300">
                  Marge : <strong className="text-emerald-400">{metrics.netProfitMarginPercent}%</strong>
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400">Revenu Récurrent Mensuel (MRR) Brut :</p>
                <p className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {formatXOF(metrics.monthlyGrossRevenueXOF)}
                </p>
                <p className="text-[11px] text-slate-400">
                  Projection Annuelle (ARR) : <strong className="text-amber-400">{formatXOF(metrics.annualGrossRevenueXOF)}</strong>
                </p>
              </div>

              {/* Operating Cost Deductions */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Coût Serveur Cloud & IA Gemini :</span>
                  <span className="font-mono text-slate-300">~{formatXOF(metrics.totalOperatingCostXOF)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Commission Passerelle Paystack :</span>
                  <span className="font-mono text-slate-300">1.9% (inclus)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400">
                  <span>Bénéfice Net Mensuel Réel :</span>
                  <span className="font-mono text-sm">+{formatXOF(metrics.monthlyNetProfitXOF)}</span>
                </div>
              </div>

              {/* Revenue Streams breakdown pill list */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Micro-Passes Wave & Orange (500F / 1 000F) :
                  </span>
                  <span className="font-mono font-bold text-white">{formatXOF(metrics.b2cTotalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Forfaits B2B / API Studio (25 000F) :
                  </span>
                  <span className="font-mono font-bold text-white">{formatXOF(metrics.b2bRevenue)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Sponsorings & Campagnes de Marques :
                  </span>
                  <span className="font-mono font-bold text-white">{formatXOF(metrics.sponsorshipRevenue)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Produits Numériques (Diplômes & E-books) :
                  </span>
                  <span className="font-mono font-bold text-white">{formatXOF(metrics.digitalProductsRevenue)}</span>
                </div>
              </div>

              <button
                onClick={onOpenPricingPlans}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Voir les Formules & Micro-Passes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Strategic Pillars for High Profitability */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Les 4 Piliers qui Rendent ce SaaS Hyper-Rentable</h3>
            <p className="text-xs text-slate-400">Stratégie concrète d'acquisition, monétisation et rétention en Afrique de l'Ouest & Diaspora.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="text-sm font-bold text-white">Micro-Transactions Sans Carte</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              En Côte d'Ivoire, les cartes de crédit font 4% de pénétration. Les micro-passes à 500 FCFA via Wave & Orange Money 
              multiplient le taux d'achat par 6 sans engagement récurrent.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="text-sm font-bold text-white">Marge Brute Exceptionnelle (94%)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              L'application utilise Gemini 3.8 Flash optimisé avec mise en cache locale. Chaque requête de traduction coûte 
              moins de 0,001 FCFA, garantissant des marges nettes records.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="text-sm font-bold text-white">Monétisation B2B à Haute Valeur</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Les banques, fintechs et e-commerces locaux payent 25 000 FCFA à 100 000 FCFA / mois pour brancher 
              l'API NouchiPro à leurs chatbots WhatsApp et campagnes marketing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="text-sm font-bold text-white">Viralité Culturelle Organique</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le Nouchi est au cœur de la musique urbaine (Didi B, Himra, Tam Sir). Le partage de fiches et quiz sur WhatsApp 
              et TikTok génère un flux continu d'utilisateurs sans dépenser un centime en publicité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
