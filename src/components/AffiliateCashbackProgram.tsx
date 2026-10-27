import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Smartphone, 
  DollarSign, 
  Users, 
  Sparkles, 
  Gift, 
  ArrowRight, 
  CheckCircle2, 
  Wallet, 
  Zap, 
  ShieldCheck,
  TrendingUp,
  Percent
} from 'lucide-react';
import { User } from '../types';
import { AFFILIATE_CONFIG } from '../data/pricingData';
import { hapticManager } from '../utils/haptics';

interface AffiliateCashbackProgramProps {
  user: User | null;
  onOpenCheckoutWithPromo?: (promoCode: string) => void;
}

export const AffiliateCashbackProgram: React.FC<AffiliateCashbackProgramProps> = ({
  user,
  onOpenCheckoutWithPromo
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [referralsCount, setReferralsCount] = useState<number>(10);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(user?.email || '07 00 00 00 00');
  const [selectedMobileOperator, setSelectedMobileOperator] = useState<'wave' | 'orange' | 'mtn'>('wave');

  const referralCode = `MOGOCASH_${(user?.username || 'BABI').replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase()}`;
  const referralUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?ref=${referralCode}&promo=MOGOCASH` 
    : `https://nouchipro.ci/?ref=${referralCode}`;

  // Earnings calculations
  // Average ticket: 2,500 FCFA (VIP) or 1,000 FCFA (Pass) => avg 2,000 FCFA * 25% = 500 FCFA commission per buyer
  const commissionPerSaleXOF = 625; // 25% on 2,500 FCFA VIP
  const totalEstimatedEarningsXOF = referralsCount * commissionPerSaleXOF;
  const friendSavingsXOF = referralsCount * 500; // -20% saved by friends

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('MOGOCASH');
      setCopiedCode(true);
      hapticManager.trigger('selection');
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
      setCopiedLink(true);
      hapticManager.trigger('selection');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    hapticManager.trigger('celebration');
    const message = encodeURIComponent(
      `🇨🇮 Salut mon môgô ! J'utilise l'application Markkanich Le NouchiPro pour maîtriser tout l'argot ivoirien d'Abidjan, traduire avec l'IA et passer le test certifié.\n\nPrends ton accès avec -20% de réduction immédiate en utilisant mon code promo exclusif « MOGOCASH » :\n👉 ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutRequested(true);
    hapticManager.trigger('celebration');
    setTimeout(() => {
      setPayoutRequested(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-[#161618] to-cyan-500/15 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" />
            <span>Programme Viral Gagnant-Gagnant</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Programme d’Affiliation & Parrainage <span className="text-amber-400">« Môgô Cash » 💸</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Partagez Markkanich avec votre entourage, vos abonnés WhatsApp ou TikTok. Vos amis profitent de <strong className="text-emerald-400">-20% immédiats</strong> et vous touchez <strong className="text-amber-400">{AFFILIATE_CONFIG.commissionPercent}% de commission cash</strong> versée directement sur votre compte Wave ou Orange Money !
          </p>
        </div>
      </div>

      {/* Referral Link & Promo Code Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Your Promo Code & Link */}
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Vos Identifiants de Parrain</span>
            </h3>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Actif & Validé
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Code Promo à donner à vos potes (-20%) :</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-900 border border-amber-500/40 rounded-xl px-4 py-2.5 font-mono font-black text-amber-400 text-sm tracking-wider flex items-center justify-between">
                  <span>MOGOCASH</span>
                  <span className="text-[10px] text-emerald-400 font-sans font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">-20% de remise</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Votre lien direct de parrainage :</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono truncate focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copié !' : 'Lien'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Share on WhatsApp Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Partager sur WhatsApp avec mes amis 🇨🇮</span>
          </button>
        </div>

        {/* Box 2: Commission Calculator */}
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Simulateur de vos Gains Cash</span>
              </h3>
              <span className="text-xs text-amber-400 font-bold font-mono">25% par vente</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Amis parrainés ayant pris un Pass :</span>
                <span className="font-mono font-black text-amber-400 text-sm">{referralsCount} môgôs</span>
              </div>
              <input
                type="range"
                min={2}
                max={50}
                step={1}
                value={referralsCount}
                onChange={(e) => {
                  setReferralsCount(parseInt(e.target.value, 10));
                  hapticManager.trigger('selection');
                }}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2 potes</span>
                <span>25 membres</span>
                <span>50+ (Influenceur)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Votre Commission Cash</span>
                <p className="text-xl font-black text-emerald-400 mt-1">
                  +{totalEstimatedEarningsXOF.toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-[9px] text-slate-500">Versés sans délai sur Wave</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Économie pour vos Amis</span>
                <p className="text-xl font-black text-amber-400 mt-1">
                  -{friendSavingsXOF.toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-[9px] text-slate-500">Grâce à votre code -20%</p>
              </div>
            </div>
          </div>

          {/* Instant Payout Modal Trigger */}
          <div className="pt-2">
            {payoutRequested ? (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Demande de virement Mobile Money transmise avec succès !</span>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="flex gap-2 items-center">
                <select
                  value={selectedMobileOperator}
                  onChange={(e) => setSelectedMobileOperator(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-2.5 py-2.5 focus:outline-none"
                >
                  <option value="wave">Wave 🇨🇮</option>
                  <option value="orange">Orange 🇨🇮</option>
                  <option value="mtn">MTN 🇨🇮</option>
                </select>
                <input
                  type="text"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Numéro Mobile Money"
                  className="flex-1 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold cursor-pointer whitespace-nowrap"
                >
                  Retirer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Rules & Transparency */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Règles & Transparence du Programme Môgô Cash</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-1">
            <strong className="text-slate-200 block text-xs">Paiement dès 5 000 FCFA</strong>
            <p className="text-[11px] leading-relaxed">
              Dès que vous cumulez 5 000 FCFA de commissions, vous pouvez demander votre virement automatique par Wave ou Orange Money.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-1">
            <strong className="text-slate-200 block text-xs">Attribution par Cookie 30 Jours</strong>
            <p className="text-[11px] leading-relaxed">
              Même si votre ami ne prend pas son pass le jour même, la commission vous est attribuée s’il commande dans les 30 jours suivants.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-1">
            <strong className="text-slate-200 block text-xs">Cumul Illimité</strong>
            <p className="text-[11px] leading-relaxed">
              Aucun plafond de parrainage : vous pouvez parrainer 10, 100 ou 1 000 personnes et bâtir une véritable rente mensuelle en Nouchi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
