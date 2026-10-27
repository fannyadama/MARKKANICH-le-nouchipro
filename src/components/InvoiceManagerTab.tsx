import React, { useState } from 'react';
import { User, PricingPlan, BillingCycle, Currency, PaymentTransaction } from '../types';
import { PRICING_PLANS } from '../data/pricingData';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  QrCode, 
  Lock, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  FileCheck,
  Hash,
  ExternalLink,
  Crown
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface InvoiceManagerTabProps {
  user: User | null;
  onOpenInvoiceModal: (plan: PricingPlan, cycle: BillingCycle, currency: Currency) => void;
  onSelectPlan: (plan: PricingPlan, cycle: BillingCycle, currency: Currency) => void;
}

export const InvoiceManagerTab: React.FC<InvoiceManagerTabProps> = ({
  user,
  onOpenInvoiceModal,
  onSelectPlan
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'pro_vip' | 'business_api' | 'pass_express'>('pro_vip');
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('yearly');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('XOF');

  const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[2];

  // Default past transactions for user demonstration
  const sampleInvoices = [
    {
      invoiceNumber: 'FA-2026-CI-84920',
      date: '22 Octobre 2026',
      timestamp: '2026-10-22T10:14:28Z',
      planName: 'Abonnement NouchiPro PRO VIP Illimité',
      planId: 'pro_vip' as const,
      cycle: 'yearly' as const,
      amountHT: 25424,
      vatAmount: 4576,
      amountTTC: 30000,
      currency: 'XOF' as const,
      method: 'Wave CI Mobile Money',
      status: 'Acquittée',
      hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65d'
    },
    {
      invoiceNumber: 'FA-2026-CI-71842',
      date: '15 Septembre 2026',
      timestamp: '2026-09-15T14:32:05Z',
      planName: 'Pass Express Flash 24H (Quiz & Traducteur)',
      planId: 'pass_express' as const,
      cycle: 'monthly' as const,
      amountHT: 424,
      vatAmount: 76,
      amountTTC: 500,
      currency: 'XOF' as const,
      method: 'Orange Money Côte d’Ivoire',
      status: 'Acquittée',
      hash: 'sha256:4a92c30198de7105bc910248adfa8120'
    }
  ];

  const handleGenerateInvoice = () => {
    hapticManager.trigger('selection');
    onOpenInvoiceModal(selectedPlan, selectedCycle, selectedCurrency);
  };

  return (
    <div id="invoice-manager-tab" className="space-y-8 animate-fadeIn">
      {/* Top Banner with Fiscal Seal */}
      <div className="bg-gradient-to-r from-slate-900 via-[#18181b] to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Système de Facturation Fiscale Certifiée DGI Côte d'Ivoire & UEMOA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Factures Professionnelles & <span className="text-amber-400">Reçus Fiscaux Automatiques</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pour chaque abonnement VIP ou licence Entreprise, accédez au téléchargement instantané de vos quittances 
              comptables avec <strong>TVA 18% ventilée</strong>, <strong>QR Code d'authenticité</strong> et <strong>horodatage cryptographique SHA-256</strong>.
            </p>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>R.C.C.M. CI-ABJ-2026-B-14285</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>N.C.C. 2408912 P</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Déductible à 100% en charges d’exploitation</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              type="button"
              id="btn-generate-instant-invoice"
              onClick={handleGenerateInvoice}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Générer ma Facture Fiscale PDF</span>
            </button>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Statut Fiscal Utilisateur</span>
              <span className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>{user?.isVip ? 'Abonné VIP Certifié' : 'Compte Client Standard'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Generator & Options Box */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                Générateur Personnalisé de Facture Professionnelle
              </h3>
              <p className="text-xs text-slate-400">
                Sélectionnez le plan et les paramètres pour éditer votre quittance officielle.
              </p>
            </div>
          </div>

          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden sm:inline">
            TVA Déductible 18%
          </span>
        </div>

        {/* Options Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              1. Choix du Plan ou Licence
            </label>
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="pro_vip">👑 Abonnement PRO VIP (Illimité)</option>
              <option value="business_api">🏢 Licence B2B API Entreprise (50k req/mois)</option>
              <option value="pass_express">⚡ Pass Express Flash (500 FCFA)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              2. Périodicité de Facturation
            </label>
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value as BillingCycle)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="yearly">Annuelle (365 Jours) - Économisez 25%</option>
              <option value="monthly">Mensuelle (30 Jours)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              3. Devise de Règlement
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="XOF">FCFA (XOF) - Mobile Money Wave/Orange</option>
              <option value="EUR">Euros (€) - Stripe CB</option>
              <option value="USD">Dollars ($) - Stripe CB</option>
            </select>
          </div>
        </div>

        {/* Live Preview Summary Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black">
              📄
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Facture Proforma Préparée : <span className="text-amber-400">{selectedPlan.name}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Période : {selectedCycle === 'yearly' ? 'Annuelle' : 'Mensuelle'} • TVA 18% appliquée automatiquement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleGenerateInvoice}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Ouvrir & Télécharger le PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historical List of Certified Invoices */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-black text-white">
              Historique de vos Factures & Quittances d’Achat
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {sampleInvoices.length} factures enregistrées
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {sampleInvoices.map((inv) => (
            <div 
              key={inv.invoiceNumber}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/30 px-3 rounded-2xl transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-black text-white text-xs bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    {inv.invoiceNumber}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {inv.planName}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {inv.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                  <span>Date : {inv.date}</span>
                  <span>•</span>
                  <span>Mode : {inv.method}</span>
                  <span>•</span>
                  <span className="font-mono text-[10px] text-slate-500">{inv.hash}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400 block">
                    {inv.amountTTC.toLocaleString('fr-FR')} FCFA TTC
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Dont TVA 18% : {inv.vatAmount.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const matchedPlan = PRICING_PLANS.find(p => p.id === inv.planId) || selectedPlan;
                    onOpenInvoiceModal(matchedPlan, inv.cycle, inv.currency);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Télécharger cette facture en PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Legal Compliance Accordion / Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-xs text-slate-400 space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Cadre Réglementaire & Justificatif Comptable B2B</span>
        </h4>
        <p className="leading-relaxed">
          Toutes nos factures respectent strictement l'Ordonnance n° 2011-480 portant Code Général des Impôts de la République de Côte d'Ivoire. 
          Les quittances émises portent la mention de notre Numéro de Compte Contribuable (NCC 2408912 P) et de notre numéro RCCM d’Abidjan. 
          Pour toute demande spécifique de retenue à la source (BNC / BNC étranger) ou attestation fiscale de régularité, notre service comptabilité répond sous 24h ouvrées.
        </p>
      </div>
    </div>
  );
};
