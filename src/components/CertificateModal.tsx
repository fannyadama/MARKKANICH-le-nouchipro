import React, { useRef, useState } from 'react';
import { User } from '../types';
import { 
  Award, 
  X, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Printer,
  QrCode
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, user }) => {
  const [recipientName, setRecipientName] = useState(user?.username || 'Koffi_Abidjan');
  const [grade, setGrade] = useState<'Nouchiman Émérite' | 'Maître du Ghetto' | 'Ambassadeur Culturel'>('Nouchiman Émérite');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const certificateId = `CERT-BABI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const dateFormatted = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `🏆 Je viens d'obtenir mon Certificat Officiel de Nouchiman (${grade}) sur Markkanich Le NouchiPro ! 🇨🇮 #Nouchi #Abidjan`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        id="certificate-modal" 
        className="bg-[#161618] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute -top-10 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-black font-black">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Certificat Officiel de Maîtrise Nouchi</h3>
              <p className="text-xs text-slate-400">Délivré par le Haut Conseil de Markkanich Le NouchiPro</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nom sur le diplôme</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Grade Décerné</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-amber-400 focus:outline-none focus:border-amber-500"
            >
              <option value="Nouchiman Émérite">Nouchiman Émérite (Niveau 1)</option>
              <option value="Maître du Ghetto">Maître du Ghetto & de la Rue (Niveau 2)</option>
              <option value="Ambassadeur Culturel">Ambassadeur de la Culture Babi (Niveau 3)</option>
            </select>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="border-4 border-amber-500/40 rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#1c1811] via-[#121214] to-[#1a150c] relative shadow-2xl text-center space-y-6">
          {/* Ornate Corner Accents */}
          <div className="absolute top-3 left-3 text-amber-500/50 text-xs font-serif">✦ ✦ ✦</div>
          <div className="absolute top-3 right-3 text-amber-500/50 text-xs font-serif">✦ ✦ ✦</div>
          <div className="absolute bottom-3 left-3 text-amber-500/50 text-xs font-serif">✦ ✦ ✦</div>
          <div className="absolute bottom-3 right-3 text-amber-500/50 text-xs font-serif">✦ ✦ ✦</div>

          <div className="flex justify-center items-center gap-3.5">
            <div className="w-[60px] h-[60px] rounded-2xl overflow-hidden border-2 border-amber-500 bg-slate-950 p-1 shadow-[0_0_18px_rgba(245,158,11,0.4)] flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Sceau Officiel Markkanich"
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('markkanich_logo.jpg')) {
                    target.src = '/markkanich_logo.jpg';
                  }
                }}
              />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
              <p className="text-xs font-bold text-white">ACADÉMIE DE L'INTELLIGENCE CULTURELLE NOURIE</p>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 uppercase tracking-widest font-serif">
              DIPLÔME D'EXCELLENCE
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Attestation Officielle de Compétence Linguistique & Culturelle
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs text-slate-300 italic">Le présent certificat est solennellement décerné à :</p>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1 border-b border-amber-500/30 inline-block pb-1 px-6 tracking-wide">
              {recipientName || 'Un Vrai Nouchiman'}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Pour avoir démontré une maîtrise exceptionnelle des subtilités du <strong>Nouchi ivoirien</strong>, de son histoire, de son étymologie et des sagesses populaires de Babi, avec le titre honorifique de :
          </p>

          <div className="inline-block bg-amber-500/10 border border-amber-500/40 px-6 py-2 rounded-2xl">
            <span className="text-sm sm:text-base font-extrabold text-amber-400">
              ⚜️ {grade} ⚜️
            </span>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 items-center gap-4 text-[11px] text-slate-400">
            <div className="text-left space-y-1">
              <p className="text-slate-500">Date d'émission :</p>
              <p className="font-bold text-slate-200">{dateFormatted}</p>
              <p className="font-mono text-[9px] text-slate-500">N° {certificateId}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-500/60 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider mt-1">Sceau Authentique</span>
            </div>

            <div className="text-right space-y-1">
              <p className="text-slate-500">Le Vieux Père Markkanich :</p>
              <p className="font-serif italic text-amber-400 text-xs">« Y'a fohi, c'est validé ! »</p>
              <span className="inline-block text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Vérifié 🇨🇮
              </span>
            </div>
          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certificat numéroté et partageable sur LinkedIn / WhatsApp</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-500" />
              <span>{copied ? 'Lien de partage copié !' : 'Partager'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition shadow-lg"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / Sauvegarder PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
