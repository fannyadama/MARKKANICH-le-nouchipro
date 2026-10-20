import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Globe, 
  MessageCircle, 
  Facebook, 
  Twitter 
} from 'lucide-react';
import { NouchiWord } from '../types';

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyWord: NouchiWord | null;
}

export const ShareAppModal: React.FC<ShareAppModalProps> = ({
  isOpen,
  onClose,
  dailyWord
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://markkanich.ci';
  const shareText = dailyWord 
    ? `🇨🇮 Mot Nouchi du Jour sur Markkanich : "${dailyWord.term}" (${dailyWord.frenchTranslation || dailyWord.definition}). Venez enrichir votre vocabulaire de Babi !`
    : `🇨🇮 Découvrez Markkanich Le NouchiPro, le grand dictionnaire interactif du Nouchi ivoirien avec traducteur IA et notifications quotidiennes !`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${appUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Markkanich Le NouchiPro 🇨🇮',
          text: shareText,
          url: appUrl
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${appUrl}`)}`
    },
    {
      name: 'X (Twitter)',
      icon: '🐦',
      color: 'bg-sky-600 hover:bg-sky-500 text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-500 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`
    }
  ];

  return (
    <AnimatePresence>
      <div 
        id="share-app-modal-overlay"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          id="share-app-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#161618] border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-black relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-black flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-amber-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Partage & Culture
              </span>
            </div>
            <h3 className="text-xl font-black italic tracking-tight text-black">
              PARTAGER LE NOUCHIPRO 🇨🇮
            </h3>
            <p className="text-xs font-semibold text-black/90 mt-0.5">
              Partagez la richesse de l'argot ivoirien avec vos proches et votre communauté.
            </p>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {/* Daily word banner */}
            {dailyWord && (
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-3 text-xs">
                <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Mot du jour inclus dans le partage
                </div>
                <div className="font-bold text-white text-sm mt-0.5">
                  « {dailyWord.term} » — <span className="text-slate-300 font-normal">{dailyWord.frenchTranslation || dailyWord.definition}</span>
                </div>
              </div>
            )}

            {/* Social Share Grid */}
            <div className="grid grid-cols-2 gap-2">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${link.color}`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* Native Web Share Button if supported */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Partager via le menu système (iOS / Android)</span>
              </button>
            )}

            {/* Copy Link Section */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 bg-black border border-slate-700 text-slate-300 font-mono text-xs px-3 py-2 rounded-xl focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition border border-slate-700 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
