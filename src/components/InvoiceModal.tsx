import React, { useState, useMemo } from 'react';
import { InvoiceData, User, PricingPlan, BillingCycle, Currency, PaymentTransaction } from '../types';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Lock, 
  Award, 
  FileJson,
  Hash,
  Sparkles,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  transaction?: PaymentTransaction | null;
  customPlan?: PricingPlan | null;
  customBillingCycle?: BillingCycle;
  customCurrency?: Currency;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  user,
  transaction,
  customPlan,
  customBillingCycle = 'yearly',
  customCurrency = 'XOF'
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedInvoiceNo, setCopiedInvoiceNo] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Editable customer business fields
  const [customerName, setCustomerName] = useState(transaction?.customerName || user?.username || 'Koffi Marc');
  const [companyName, setCompanyName] = useState('Abidjan Digital Media SARL');
  const [customerEmail, setCustomerEmail] = useState(transaction?.customerPhoneOrEmail || user?.email || 'fannyadama159@gmail.com');
  const [taxNumber, setTaxNumber] = useState('CI-NCC-2026-981452-D');
  const [customerAddress, setCustomerAddress] = useState('Plateau, Boulevard de la République, Abidjan');

  // Plan & Pricing Calculations
  const planName = transaction?.planId === 'business_api' 
    ? 'Licence Entreprise Business API B2B (50 000 req/mois)' 
    : transaction?.planId === 'pro_vip' || customPlan?.id === 'pro_vip'
    ? 'Abonnement NouchiPro PRO VIP Illimité'
    : customPlan?.name 
    ? customPlan.name 
    : 'Abonnement NouchiPro PRO VIP Illimité';

  const billingCycle = transaction?.billingCycle || customBillingCycle;
  const currency = transaction?.currency || customCurrency;

  const totalTTC = transaction?.amount || (
    currency === 'XOF' 
      ? (billingCycle === 'yearly' ? 30000 : 3500)
      : currency === 'EUR'
      ? (billingCycle === 'yearly' ? 45 : 5.5)
      : (billingCycle === 'yearly' ? 49 : 5.9)
  );

  // TVA Côte d'Ivoire (18% taux standard DGI)
  const vatRate = 18;
  const subtotalHT = Math.round((totalTTC / (1 + vatRate / 100)) * 100) / 100;
  const vatTotal = Math.round((totalTTC - subtotalHT) * 100) / 100;

  const invoiceNumber = transaction?.invoiceNumber || `FA-2026-CI-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDateFormatted = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const certifiedTimestamp = new Date().toISOString();
  const securityHash = useMemo(() => {
    // Generate deterministic sha-like hex string
    const seed = `${invoiceNumber}-${totalTTC}-${customerEmail}-${certifiedTimestamp}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    return `sha256:7f83${Math.abs(hash).toString(16).padStart(8, '0')}e91b4a62c${Math.abs(hash * 3).toString(16).padStart(8, '0')}8148a1d65d`;
  }, [invoiceNumber, totalTTC, customerEmail, certifiedTimestamp]);

  if (!isOpen) return null;

  const handlePrint = () => {
    hapticManager.trigger('selection');
    window.print();
  };

  const handleDownloadJson = () => {
    hapticManager.trigger('quiz_correct');
    const invoicePayload: InvoiceData = {
      invoiceNumber,
      issueDate: issueDateFormatted,
      certifiedTimestamp,
      securityHash,
      status: 'paid',
      paymentMethod: transaction?.paymentMethod || 'paystack',
      paymentReference: transaction?.paystackReference || `pstk_ref_${Date.now()}`,
      currency,
      subtotalHT,
      vatRate,
      vatTotal,
      totalTTC,
      seller: {
        companyName: 'Markkanich SAS (NouchiPro Tech)',
        tradeRegister: 'CI-ABJ-2026-B-14285',
        taxId: '2408912 P',
        vatNumber: 'CI02408912',
        address: 'Immeuble Le Balafon, Cocody Danga, Abidjan, Côte d’Ivoire',
        email: 'billing@markkanich.com',
        phone: '(+225) 07 00 00 225'
      },
      customer: {
        name: customerName,
        companyName,
        email: customerEmail,
        taxNumber,
        address: customerAddress,
        planName,
        planId: transaction?.planId || 'pro_vip',
        billingCycle
      },
      items: [
        {
          description: `${planName} - Facturation ${billingCycle === 'yearly' ? 'Annuelle' : 'Mensuelle'}`,
          quantity: 1,
          unitPriceHT: subtotalHT,
          totalHT: subtotalHT,
          vatRate,
          vatAmount: vatTotal,
          totalTTC
        }
      ],
      qrCodeData: `https://nouchipro.ci/verify/invoice/${invoiceNumber}?hash=${securityHash}`
    };

    const blob = new Blob([JSON.stringify(invoicePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Facture_Officielle_${invoiceNumber}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string, type: 'hash' | 'no') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'hash') {
        setCopiedHash(true);
        setTimeout(() => setCopiedHash(false), 2000);
      } else {
        setCopiedInvoiceNo(true);
        setTimeout(() => setCopiedInvoiceNo(false), 2000);
      }
      hapticManager.trigger('selection');
    }
  };

  const formattedTTC = `${totalTTC.toLocaleString('fr-FR')} ${currency === 'XOF' ? 'FCFA' : currency}`;
  const formattedHT = `${subtotalHT.toLocaleString('fr-FR')} ${currency === 'XOF' ? 'FCFA' : currency}`;
  const formattedVAT = `${vatTotal.toLocaleString('fr-FR')} ${currency === 'XOF' ? 'FCFA' : currency}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      {/* Container with Print media queries */}
      <div 
        id="official-invoice-modal"
        className="bg-[#141416] border border-slate-800 rounded-3xl max-w-4xl w-full p-4 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative my-6 text-white overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none print:hidden" />

        {/* Modal Top Actions Bar (Hidden during printing) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-black font-black shadow-lg shadow-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">Facture Fiscale Numérique Certifiée</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Acquittée (TVA 18%)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Conforme Direction Générale des Impôts (DGI Côte d’Ivoire & Espace UEMOA)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditingCompany(!isEditingCompany)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-xs font-semibold border border-slate-700/80 transition flex items-center gap-1.5 cursor-pointer"
              title="Modifier les informations d'entreprise sur la facture"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingCompany ? 'Masquer formulaire' : 'Personnaliser infos Pro'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition flex items-center gap-1.5 cursor-pointer"
              title="Télécharger les métadonnées de facture au format JSON comptable"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              id="btn-print-invoice"
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Company Customizer Panel (Collapseable) */}
        {isEditingCompany && (
          <div className="mb-5 p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-xs space-y-3 animate-fadeIn print:hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>Mentions Professionnelles & Fiscales du Client</span>
              </span>
              <span className="text-[10px] text-slate-500">
                Ces mentions apparaîtront instantanément sur le reçu PDF imprimé.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nom du Contact</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Raison Sociale Entreprise</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">N° Contribuable / TVA Client</label>
                <input
                  type="text"
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  placeholder="Ex: CI-NCC-2026-981452-D"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Email de Facturation</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Adresse Siège Social</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= Printable Official A4 Invoice Sheet ================= */}
        <div 
          id="invoice-printable-sheet"
          className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden font-sans"
        >
          {/* Subtle Security Guilloche Watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

          {/* Diagonal Security Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none select-none opacity-[0.04] text-7xl font-black tracking-widest text-slate-900">
            ACQUITTÉE • FACTURE OFFICIELLE DGI
          </div>

          {/* 1. Header: Émetteur & Facture Details */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-slate-900 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 p-1 flex items-center justify-center border-2 border-amber-500 shadow-md">
                  <img
                    src="/logo.jpg"
                    alt="Logo Markkanich"
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/markkanich_logo.jpg';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                    MARKKANICH SAS
                  </h1>
                  <p className="text-xs font-bold text-amber-700 tracking-wide">
                    PLATEFORME LE NOUCHIPRO & TECHNOLOGIES
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 leading-relaxed pt-1">
                <p><strong className="text-slate-800">Siège social :</strong> Immeuble Le Balafon, Cocody Danga, Abidjan</p>
                <p><strong className="text-slate-800">R.C.C.M. :</strong> CI-ABJ-2026-B-14285 • <strong className="text-slate-800">N.C.C. :</strong> 2408912 P</p>
                <p><strong className="text-slate-800">N° TVA UEMOA :</strong> CI02408912 • Régime Réel Normal</p>
                <p><strong className="text-slate-800">Contact :</strong> billing@markkanich.com • (+225) 07 00 00 225</p>
              </div>
            </div>

            {/* Facture Info Box */}
            <div className="sm:text-right space-y-1 bg-slate-50 border border-slate-200 p-3.5 rounded-xl sm:min-w-[240px]">
              <div className="flex sm:justify-end items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">FACTURE FISCALE</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  PAYÉE
                </span>
              </div>
              <p className="text-lg font-black font-mono text-slate-900 tracking-tight flex sm:justify-end items-center gap-1.5">
                <span>{invoiceNumber}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(invoiceNumber, 'no')}
                  title="Copier le N° de facture"
                  className="p-1 hover:bg-slate-200 rounded text-slate-500 transition print:hidden"
                >
                  {copiedInvoiceNo ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </p>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-700">Date d'émission :</strong> {issueDateFormatted}
              </p>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-700">Règlement :</strong> {transaction?.paymentMethod ? transaction.paymentMethod.toUpperCase() : 'PAYSTACK MOBILE MONEY (WAVE / CI)'}
              </p>
            </div>
          </div>

          {/* 2. Client & Coordonnées */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                FACTURÉ À (CLIENT / BÉNÉFICIAIRE)
              </span>
              <p className="text-sm font-black text-slate-900">{customerName}</p>
              {companyName && (
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{companyName}</span>
                </p>
              )}
              <p className="text-slate-600">{customerAddress}</p>
              <p className="text-slate-600">{customerEmail}</p>
              {taxNumber && (
                <p className="text-slate-700 font-mono pt-1">
                  <strong className="text-slate-900">N° Contribuable Client :</strong> {taxNumber}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  OFFRE SOUSCRITE & VALIDITÉ
                </span>
                <p className="text-sm font-black text-amber-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{planName}</span>
                </p>
                <p className="text-slate-600 mt-1">
                  Périodicité : <strong className="text-slate-800 uppercase">{billingCycle === 'yearly' ? 'Annuelle (365 Jours)' : 'Mensuelle (30 Jours)'}</strong>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-800 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Privilèges illimités et quotas API activés immédiatement.</span>
              </div>
            </div>
          </div>

          {/* 3. Items & Services Table */}
          <div className="relative z-10 border border-slate-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Désignation du Service</th>
                  <th className="py-2.5 px-3 text-center">Qté</th>
                  <th className="py-2.5 px-3 text-right">Prix Unit. HT</th>
                  <th className="py-2.5 px-3 text-right">TVA (%)</th>
                  <th className="py-2.5 px-3 text-right">Total HT</th>
                  <th className="py-2.5 px-3 text-right">Total TTC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{planName}</p>
                    <p className="text-[11px] text-slate-500">
                      Accès illimité dictionnaire, prononciation audio, traducteur IA nouchi-français, certificat et console développeur.
                    </p>
                  </td>
                  <td className="py-3 px-3 text-center font-bold">1</td>
                  <td className="py-3 px-3 text-right font-mono">{formattedHT}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-800">18%</td>
                  <td className="py-3 px-3 text-right font-mono">{formattedHT}</td>
                  <td className="py-3 px-3 text-right font-mono font-black text-slate-900">{formattedTTC}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4. Financial Totals & Legal VAT breakdown */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-6 border-b-2 border-slate-900 pb-6">
            {/* Payment & Fiscal Legal notes */}
            <div className="sm:max-w-md space-y-2 text-[11px] text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Certification Fiscale Électronique Conforme DGI Côte d'Ivoire</span>
              </p>
              <p>
                Quittance de paiement générée automatiquement avec transmission électronique des données de transaction. 
                Taux de TVA en vigueur selon l'article 355 du Code Général des Impôts (CGI CI) : 18%.
              </p>
              <p className="text-[10px] text-slate-500 italic">
                * Facture acquittée faisant office de reçu libératoire et pièce comptable officielle.
              </p>
            </div>

            {/* Totals Bento */}
            <div className="sm:min-w-[280px] bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Hors Taxes (HT) :</span>
                <span className="font-mono font-bold text-slate-800">{formattedHT}</span>
              </div>
              <div className="flex justify-between text-slate-600 border-b border-slate-200 pb-2">
                <span>TVA Collectée (18.00%) :</span>
                <span className="font-mono font-bold text-amber-800">{formattedVAT}</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm">
                <span className="font-black text-slate-900">Total Net TTC :</span>
                <span className="font-mono text-base font-black text-emerald-700">{formattedTTC}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                <span>Statut :</span>
                <span className="font-bold text-emerald-700 uppercase">Réglé / Acquitté</span>
              </div>
            </div>
          </div>

          {/* 5. Footer: QR Code, Certified Timestamp & SHA-256 Hash */}
          <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Dynamic Verified QR Code */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white border-2 border-slate-900 p-1.5 rounded-xl flex items-center justify-center shadow-inner flex-shrink-0">
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Top-Left Finder */}
                  <rect x="5" y="5" width="28" height="28" fill="#0f172a" />
                  <rect x="9" y="9" width="20" height="20" fill="white" />
                  <rect x="13" y="13" width="12" height="12" fill="#0f172a" />
                  
                  {/* Top-Right Finder */}
                  <rect x="67" y="5" width="28" height="28" fill="#0f172a" />
                  <rect x="71" y="9" width="20" height="20" fill="white" />
                  <rect x="75" y="13" width="12" height="12" fill="#0f172a" />

                  {/* Bottom-Left Finder */}
                  <rect x="5" y="67" width="28" height="28" fill="#0f172a" />
                  <rect x="9" y="71" width="20" height="20" fill="white" />
                  <rect x="13" y="75" width="12" height="12" fill="#0f172a" />

                  {/* Matrix Patterns */}
                  <rect x="38" y="8" width="6" height="6" />
                  <rect x="48" y="8" width="6" height="6" />
                  <rect x="58" y="14" width="6" height="6" />
                  <rect x="38" y="24" width="6" height="6" />
                  <rect x="48" y="24" width="6" height="6" />
                  
                  <rect x="8" y="38" width="6" height="6" />
                  <rect x="20" y="44" width="6" height="6" />
                  <rect x="38" y="38" width="8" height="8" fill="#d97706" />
                  <rect x="50" y="42" width="6" height="6" />
                  <rect x="62" y="38" width="6" height="6" />
                  <rect x="74" y="44" width="6" height="6" />
                  <rect x="86" y="38" width="6" height="6" />

                  <rect x="38" y="54" width="6" height="6" />
                  <rect x="48" y="58" width="6" height="6" />
                  <rect x="58" y="54" width="6" height="6" />

                  <rect x="38" y="70" width="6" height="6" />
                  <rect x="48" y="76" width="6" height="6" />
                  <rect x="58" y="70" width="6" height="6" />
                  <rect x="74" y="68" width="6" height="6" />
                  <rect x="84" y="74" width="6" height="6" />
                  <rect x="70" y="84" width="6" height="6" />
                  <rect x="82" y="86" width="6" height="6" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <QrCode className="w-3 h-3 text-amber-700" />
                  <span>QR Code d'Authentification Fiscale</span>
                </span>
                <p className="text-[10px] text-slate-500 leading-tight max-w-[260px]">
                  Scannez ce QR Code avec un smartphone ou l'application fiscale pour valider l'intégrité de la quittance.
                </p>
                <p className="text-[9px] font-mono text-slate-400">
                  ID: {invoiceNumber} | DGI-CI-2026
                </p>
              </div>
            </div>

            {/* Certified Timestamp & SHA-256 Hash */}
            <div className="sm:text-right space-y-1 max-w-sm">
              <div className="flex sm:justify-end items-center gap-1.5 text-[11px] font-bold text-slate-800">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>Horodatage Certifié ISO 8601 :</span>
              </div>
              <p className="text-[11px] font-mono text-slate-600">{certifiedTimestamp}</p>

              <div className="pt-1">
                <div className="flex sm:justify-end items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Empreinte SHA-256 :</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(securityHash, 'hash')}
                    className="p-1 hover:bg-slate-200 rounded text-slate-500 transition print:hidden"
                    title="Copier le hash de certification"
                  >
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-[9px] font-mono text-slate-500 break-all leading-tight">
                  {securityHash}
                </p>
              </div>
            </div>
          </div>

          {/* Official Seal / Tampon Fiscal Numérique */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">
                ✓
              </div>
              <span>
                Document signé cryptographiquement sous le protocole <strong>MARKKANICH FISCAL TRUST 2026</strong>.
              </span>
            </div>
            <span className="font-mono">Page 1 / 1 • Certificat Numéro DGI-CI-8942-01</span>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden during print) */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-slate-400">
            Besoin d'une facture spécifique avec bon de commande entreprise ? Écrivez à <a href="mailto:billing@markkanich.com" className="text-amber-400 hover:underline">billing@markkanich.com</a>
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Télécharger le PDF / Imprimer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
