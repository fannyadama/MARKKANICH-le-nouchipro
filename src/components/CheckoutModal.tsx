import React, { useState, useEffect, useRef } from 'react';
import { PricingPlan, BillingCycle, Currency, PaymentMethodType, User, PaymentTransaction } from '../types';
import { PAYMENT_METHODS, PROMO_CODES } from '../data/pricingData';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  CreditCard, 
  ArrowRight, 
  Loader2, 
  Lock, 
  Tag, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Zap,
  Copy,
  Printer,
  AlertCircle,
  Maximize2,
  CheckCircle
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  billingCycle: BillingCycle;
  currency: Currency;
  user: User | null;
  onPaymentSuccess: (transaction: PaymentTransaction, updatedUser: User) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  billingCycle,
  currency,
  user,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('paystack');
  const [customerName, setCustomerName] = useState(user?.username || '');
  const [customerContact, setCustomerContact] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState('0700000000');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'authenticating' | 'success'>('details');
  const [completedTransaction, setCompletedTransaction] = useState<PaymentTransaction | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [showEmbedIframe, setShowEmbedIframe] = useState(false);
  const [simulationStep, setSimulationStep] = useState(1);

  // Paystack Integration States
  const [paystackConfig, setPaystackConfig] = useState<{
    connected: boolean;
    mode: 'live' | 'test' | 'sandbox';
    publicKey?: string | null;
    message?: string;
  } | null>(null);
  const [paystackAuthUrl, setPaystackAuthUrl] = useState<string | null>(null);
  const [activeReference, setActiveReference] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const pollingIntervalRef = useRef<any>(null);

  // Fetch Paystack configuration status when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormError(null);
      setVerificationError(null);
      setShowEmbedIframe(false);
      fetch('/api/paystack/config')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPaystackConfig({
              connected: data.connected,
              mode: data.mode,
              publicKey: data.publicKey,
              message: data.message
            });
          }
        })
        .catch(err => console.error('Erreur chargement config Paystack:', err));
    } else {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen || !selectedPlan) return null;

  const basePrice = selectedPlan.price[billingCycle][currency];
  const discountMultiplier = appliedPromo ? (1 - appliedPromo.discountPercent / 100) : 1;
  const rawPrice = Math.round(basePrice * discountMultiplier * 100) / 100;

  const formatAmount = (val: number) => {
    return currency === 'XOF' 
      ? `${Math.round(val).toLocaleString('fr-FR')} FCFA`
      : currency === 'EUR'
      ? `${val.toFixed(2)} €`
      : `$${val.toFixed(2)}`;
  };

  const formattedPrice = formatAmount(rawPrice);
  const formattedBasePrice = formatAmount(basePrice);

  const currentMethodObj = PAYMENT_METHODS.find(m => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setAppliedPromo({
        code,
        discountPercent: PROMO_CODES[code].discountPercent,
        label: PROMO_CODES[code].label
      });
      setPromoError(null);
      hapticManager.trigger('selection');
    } else {
      setPromoError('Code promo invalide. Essayez BABI2026 ou WAVE225');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError(null);
  };

  const completePaymentFlow = (reference: string) => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: PaymentTransaction = {
      id: `tx_${Date.now()}`,
      planId: selectedPlan.id,
      amount: rawPrice,
      currency: currency,
      paymentMethod: selectedMethod,
      billingCycle: billingCycle,
      status: 'completed',
      date: new Date().toISOString(),
      invoiceNumber: invoiceNumber,
      customerName: customerName,
      customerPhoneOrEmail: selectedMethod === 'card' || selectedMethod === 'paypal' ? customerContact : phoneNumber,
      paystackReference: reference
    };

    const updatedUser: User = {
      ...(user || {
        id: `user-${Date.now()}`,
        username: customerName.replace(/\s+/g, '_').toLowerCase(),
        email: customerContact || `${phoneNumber}@nouchipro.ci`,
        role: 'user'
      }),
      plan: selectedPlan.id,
      isVip: selectedPlan.id === 'pro_vip' || selectedPlan.id === 'business_api' || selectedPlan.id === 'pass_express',
      apiKey: selectedPlan.id === 'business_api' ? `nouchi_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}` : undefined
    };

    setCompletedTransaction(tx);
    setIsProcessing(false);
    setStep('success');
    hapticManager.trigger('celebration');
    onPaymentSuccess(tx, updatedUser);
  };

  const checkTransactionStatus = async (refToCheck: string) => {
    setIsCheckingStatus(true);
    setVerificationError(null);
    try {
      const res = await fetch(`/api/paystack/verify/${encodeURIComponent(refToCheck)}`);
      const data = await res.json();
      if (data.success && data.verified) {
        completePaymentFlow(refToCheck);
      } else {
        setVerificationError(data.message || 'Paiement en cours de traitement par Paystack. Veuillez finaliser la transaction.');
      }
    } catch (err: any) {
      setVerificationError('Erreur de communication avec le serveur.');
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || (!customerContact.trim() && !phoneNumber.trim())) {
      setFormError('Veuillez renseigner votre nom ainsi qu’un numéro de téléphone ou une adresse email.');
      hapticManager.trigger('tap');
      return;
    }

    setFormError(null);
    setVerificationError(null);
    setIsProcessing(true);
    setSimulationStep(1);
    hapticManager.trigger('tap');

    try {
      const clientEmail = customerContact.trim() || (phoneNumber ? `${phoneNumber.replace(/\D/g, '')}@nouchipro.ci` : 'client@nouchipro.ci');
      
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: clientEmail,
          amount: rawPrice,
          currency: currency,
          planId: selectedPlan.id,
          billingCycle: billingCycle,
          customerName: customerName.trim(),
          phoneNumber: phoneNumber.trim(),
          paymentMethod: selectedMethod,
          callbackUrl: window.location.href
        })
      });

      const initData = await response.json();

      if (!initData.success) {
        setFormError(initData.message || "Échec de l'initialisation du paiement Paystack");
        setIsProcessing(false);
        setStep('details');
        return;
      }

      setActiveReference(initData.reference);

      // Check if Paystack Inline SDK (PaystackPop) is available
      const pubKey = paystackConfig?.publicKey;
      const hasPaystackPop = typeof window !== 'undefined' && (window as any).PaystackPop;

      if (pubKey && hasPaystackPop) {
        setStep('authenticating');
        try {
          const handler = (window as any).PaystackPop.setup({
            key: pubKey,
            email: clientEmail,
            amount: Math.round(rawPrice * 100),
            currency: currency || 'XOF',
            ref: initData.reference,
            metadata: {
              planId: selectedPlan.id,
              billingCycle,
              customerName,
              phoneNumber,
              paymentMethod: selectedMethod
            },
            callback: (res: any) => {
              const ref = res?.reference || initData.reference;
              checkTransactionStatus(ref);
            },
            onClose: () => {
              setIsProcessing(false);
              setStep('details');
            }
          });
          handler.openIframe();
          return;
        } catch (popupErr) {
          console.warn('Fallback standard Paystack:', popupErr);
        }
      }

      if (initData.authorizationUrl) {
        setPaystackAuthUrl(initData.authorizationUrl);
        setStep('authenticating');

        // Attempt popup window (guarded against browser blocks)
        try {
          window.open(initData.authorizationUrl, '_blank');
        } catch {
          setShowEmbedIframe(true);
        }

        // Start background polling to verify payment automatically
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = setInterval(() => {
          checkTransactionStatus(initData.reference);
        }, 3500);
      } else {
        // Interactive demonstration / sandbox simulation flow
        setStep('authenticating');
        setTimeout(() => setSimulationStep(2), 900);
        setTimeout(() => setSimulationStep(3), 1800);
        setTimeout(() => {
          completePaymentFlow(initData.reference);
        }, 2700);
      }
    } catch (err: any) {
      console.error('Erreur checkout Paystack:', err);
      setFormError('Impossible d’initialiser le paiement Paystack. Vérifiez votre connexion et réessayez.');
      setIsProcessing(false);
      setStep('details');
    }
  };

  const handleFinish = () => {
    setStep('details');
    setPaystackAuthUrl(null);
    setActiveReference(null);
    onClose();
  };

  const getCycleLabel = () => {
    if (selectedPlan.id === 'pass_express') {
      return billingCycle === 'monthly' ? 'Pass 7 Jours' : 'Pass 24 Heures';
    }
    return billingCycle === 'monthly' ? 'Mensuel' : 'Annuel (2 mois offerts)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="checkout-modal" 
        className="bg-[#161618] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' && (
          <form onSubmit={handleStartPayment} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00C3F7]/15 text-[#00C3F7] border border-[#00C3F7]/30">
                  <Zap className="w-3 h-3 text-[#00C3F7]" />
                  <span>Passerelle Paystack Sécurisée 🇨🇮</span>
                </span>
                {paystackConfig?.connected && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Connecté {paystackConfig.mode === 'live' ? 'Production' : 'Test'}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                Finaliser votre formule <span className="text-amber-400">{selectedPlan.name}</span>
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Encaissement unifié via Paystack : Wave, Orange Money, MTN MoMo, Moov et Cartes Bancaires.
              </p>
            </div>

            {/* Plan Summary Card with Discount calculation */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium">Formule sélectionnée :</p>
                <p className="text-base font-bold text-white flex items-center gap-2">
                  <span>{selectedPlan.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">
                    {getCycleLabel()}
                  </span>
                </p>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    🎉 Code {appliedPromo.code} appliqué (-{appliedPromo.discountPercent}%)
                  </p>
                )}
              </div>
              <div className="text-right">
                {appliedPromo ? (
                  <div>
                    <span className="text-xs text-slate-500 line-through mr-1.5">{formattedBasePrice}</span>
                    <span className="text-2xl font-black text-emerald-400">{formattedPrice}</span>
                  </div>
                ) : (
                  <p className="text-2xl font-black text-amber-400">{formattedPrice}</p>
                )}
                <p className="text-[10px] text-slate-500">Toutes taxes comprises • 0% frais</p>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <label className="block text-[11px] font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Code promotionnel ou bon de réduction</span>
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span><strong>{appliedPromo.code}</strong> : {appliedPromo.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => {
                      setPromoCodeInput(e.target.value);
                      if (promoError) setPromoError(null);
                    }}
                    placeholder="Ex: BABI2026, WAVE225, VIPFLASH"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 uppercase font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition border border-slate-700 cursor-pointer"
                  >
                    Appliquer
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                  <span>{promoError}</span>
                </p>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  1. Mode de paiement sécurisé
                </label>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C3F7]" />
                  Propulsé par Paystack Africa
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-3 rounded-2xl border text-left transition flex items-start gap-3 relative cursor-pointer ${
                        isSelected 
                          ? 'bg-[#00C3F7]/10 border-[#00C3F7]/80 shadow-[0_0_15px_rgba(0,195,247,0.2)]' 
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${method.iconColor} font-black text-xs flex-shrink-0 mt-0.5`}>
                        {method.category === 'mobile_money' ? <Smartphone className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">{method.name}</p>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{method.description}</p>
                        <span className="inline-block mt-1.5 text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold">
                          {method.badge}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#00C3F7] shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Information Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Vos coordonnées
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nom complet / Raison Sociale</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Koffi Marc / Agence Abidjan"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Adresse E-mail pour la Facture</label>
                  <input
                    type="email"
                    required
                    value={customerContact}
                    onChange={(e) => setCustomerContact(e.target.value)}
                    placeholder="votre-email@exemple.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-1">Numéro Mobile Money / Téléphone</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-800 bg-slate-950 text-slate-400 text-xs font-mono">
                      🇨🇮 +225
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="07 00 00 00 00"
                      className="w-full bg-slate-900 border border-slate-800 rounded-r-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormError(null)}
                  className="text-rose-400 hover:text-white text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Security Guarantee Notice */}
            <div className="p-3 rounded-xl bg-[#00C3F7]/5 border border-[#00C3F7]/20 flex items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 text-[#00C3F7]" />
                <span>Paiement chiffré Paystack SSL 256-bit (PCI-DSS Niveau 1). Aucun frais caché.</span>
              </div>
              <span className="text-[10px] font-black uppercase text-[#00C3F7] tracking-wider">Paystack CI</span>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#00C3F7] hover:bg-[#00b0df] text-black font-extrabold text-sm transition shadow-[0_0_20px_rgba(0,195,247,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>Procéder au Paiement de {formattedPrice} via Paystack</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step: Authenticating Mobile Money / Paystack */}
        {step === 'authenticating' && (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#00C3F7]/10 border border-[#00C3F7]/30 flex items-center justify-center text-[#00C3F7] animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00C3F7]/15 border border-[#00C3F7]/30 text-[#00C3F7] text-[11px] font-black uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>Passerelle Paystack Active</span>
              </div>
              <h3 className="text-xl font-bold text-white">Traitement sécurisé de la transaction...</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                Montant : <strong className="text-white">{formattedPrice}</strong> pour la formule <strong className="text-amber-400">{selectedPlan.name}</strong>.
              </p>
              {activeReference && (
                <p className="text-[11px] font-mono text-slate-400 mt-1.5 flex items-center justify-center gap-1">
                  <span>Réf:</span>
                  <span className="text-[#00C3F7] font-semibold">{activeReference}</span>
                </p>
              )}
            </div>

            {/* If Paystack returned an authorization URL (Live or Test Mode) */}
            {paystackAuthUrl && (
              <div className="space-y-3 max-w-md mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-200">
                    Guichet Paystack Ouvert :
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowEmbedIframe(!showEmbedIframe)}
                    className="text-[11px] text-[#00C3F7] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{showEmbedIframe ? 'Masquer guichet intégré' : 'Afficher ici même'}</span>
                  </button>
                </div>

                {showEmbedIframe ? (
                  <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-800 bg-white shadow-inner">
                    <iframe 
                      src={paystackAuthUrl}
                      title="Guichet Paystack"
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Si la fenêtre sécurisée Paystack ne s’est pas ouverte automatiquement, cliquez sur le bouton ci-dessous :
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a
                    href={paystackAuthUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#00C3F7] hover:bg-[#00b0df] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-md cursor-pointer"
                  >
                    <span>Ouvrir Paystack</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => activeReference && checkTransactionStatus(activeReference)}
                    disabled={isCheckingStatus}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-700 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCheckingStatus ? 'animate-spin' : ''}`} />
                    <span>Vérifier le statut</span>
                  </button>
                </div>
              </div>
            )}

            {/* If in Demonstration / Sandbox Mode */}
            {!paystackAuthUrl && (
              <div className="space-y-3 max-w-md mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Simulateur Paystack CI</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Mode Sandbox</span>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <CheckCircle className={`w-4 h-4 ${simulationStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>1. Initialisation transaction Paystack ({formattedPrice})</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    {simulationStep >= 2 ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                    )}
                    <span>2. Autorisation bancaire ou Mobile Money</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-300">
                    {simulationStep >= 3 ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700" />
                    )}
                    <span>3. Validation et activation immédiate des droits VIP</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => activeReference && completePaymentFlow(activeReference)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Valider immédiatement la simulation</span>
                  </button>
                </div>
              </div>
            )}

            {verificationError && (
              <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 max-w-md mx-auto text-left">
                {verificationError}
              </p>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-slate-500 hover:text-slate-300 transition underline cursor-pointer"
              >
                Retour au formulaire
              </button>
            </div>
          </div>
        )}

        {/* Step: Success Invoice & Activation */}
        {step === 'success' && completedTransaction && (
          <div className="space-y-6 text-center py-2 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-400 block mb-1">
                Paiement Certifié par Paystack ⚡
              </span>
              <h3 className="text-2xl font-bold text-white">
                Félicitations, vous êtes désormais <span className="text-amber-400">{selectedPlan.name}</span> !
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Vos privilèges VIP et quotas illimités sont activés immédiatement sur votre compte.
              </p>
            </div>

            {/* Proforma Receipt Bento */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Facture N°</span>
                <span className="font-mono font-bold text-white">{completedTransaction.invoiceNumber}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Référence Paystack :</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00C3F7]">{completedTransaction.paystackReference || 'pstk_success'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (completedTransaction.paystackReference) {
                        navigator.clipboard.writeText(completedTransaction.paystackReference);
                        setCopiedRef(true);
                        setTimeout(() => setCopiedRef(false), 2000);
                      }
                    }}
                    title="Copier la référence"
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  >
                    {copiedRef ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Client :</span>
                <span className="font-bold text-white">{completedTransaction.customerName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Passerelle de Paiement :</span>
                <span className="text-[#00C3F7] font-semibold flex items-center gap-1">
                  <span>Paystack Africa ({currentMethodObj.name})</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Montant Réglé :</span>
                <span className="text-base font-black text-emerald-400">{formattedPrice}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer la quittance</span>
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition shadow-lg cursor-pointer"
              >
                Accéder à mes fonctionnalités VIP & Découvrir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

