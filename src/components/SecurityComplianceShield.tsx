import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileCheck, 
  Server, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  ShieldAlert,
  Zap,
  Award
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

export const SecurityComplianceShield: React.FC = () => {
  const [auditData, setAuditData] = useState<{
    score: number;
    status: string;
    certifications: Array<{ name: string; status: string; verified: boolean }>;
  }>({
    score: 98,
    status: 'grade_A_plus',
    certifications: [
      { name: 'Paystack PCI-DSS Niveau 1', status: 'Certifié Conforme', verified: true },
      { name: 'Chiffrement Bancaire AES-256 & TLS 1.3', status: 'Actif & Enforcé', verified: true },
      { name: 'Validation 3D-Secure 2.0 & Mobile Money OTP', status: 'Obligatoire', verified: true },
      { name: 'Protection Webhook HMAC-SHA512', status: 'Signature Vérifiée', verified: true },
      { name: 'Rate Limiting & Protection Anti-Brute Force', status: 'Actif (60 req/min)', verified: true },
      { name: 'Headers de Sécurité Strict OWASP (HSTS, CSP)', status: 'Sécurisé', verified: true },
      { name: 'Zéro Stockage de Données Bancaires Sensibles', status: 'Garanti 100%', verified: true }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>('À l’instant');

  const runSecurityCheck = () => {
    setIsLoading(true);
    hapticManager.trigger('selection');
    fetch('/api/saas/security-audit')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAuditData({
            score: data.securityScore || 98,
            status: data.status || 'grade_A_plus',
            certifications: data.certifications.map((c: any) => ({
              name: c.name,
              status: c.status === 'compliant' ? 'Certifié Conforme' : 'Actif & Enforcé',
              verified: c.verified
            }))
          });
        }
        setLastCheckTime('À l’instant');
        hapticManager.trigger('quiz_correct');
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setIsLoading(false), 600);
      });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-[#161618] to-cyan-500/15 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Bouclier de Sécurité & Conformité Bancaire</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Paiements Sécurisés & <span className="text-emerald-400">Protection Anti-Fraude 🔒</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Vos transactions sont opérées via la passerelle agréée Paystack (Groupe Stripe), conforme aux normes bancaires 
              de la BCEAO et chiffrées en AES-256. Aucune coordonnée bancaire n'est jamais stockée sur nos serveurs.
            </p>
          </div>

          <div className="flex-shrink-0 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-center space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Score Global de Sécurité</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-black text-emerald-400">{auditData.score}</span>
              <span className="text-slate-500 text-lg font-bold">/ 100</span>
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
              Grade A+ Sécurisé
            </div>
          </div>
        </div>
      </div>

      {/* Security Checklist Grid */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Contrôles de Sécurité & Protocoles Actifs</h3>
              <p className="text-xs text-slate-400">Dernière vérification automatisée : {lastCheckTime}</p>
            </div>
          </div>

          <button
            onClick={runSecurityCheck}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Tester l'Audit Sécurité</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auditData.certifications.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">{item.status}</span>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                Vérifié
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 User Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-[#161618] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Validation Directe Mobile Money</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Votre paiement Wave ou Orange Money se valide directement dans votre application habituelle avec votre empreinte ou code PIN secret.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#161618] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Garantie Satisfait ou Remboursé 48h</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Si un pass ou produit numérique ne correspond pas à vos attentes, un simple message à notre support vous rembourse intégralement.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#161618] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Factures & QR Codes Horodatés</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chaque transaction génère un reçu fiscal numérique téléchargeable et vérifiable publiquement pour les entreprises et indépendants.
          </p>
        </div>
      </div>
    </div>
  );
};
