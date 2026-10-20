import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Volume2, 
  Share2, 
  Shuffle, 
  Copy, 
  Check, 
  ArrowRight,
  Bookmark,
  Calendar,
  Bell,
  BellRing
} from 'lucide-react';
import { NouchiWord } from '../types';
import { getDeterministicDailyWord } from '../utils/dailyWordHelper';
import { notificationService } from '../services/notificationService';

interface WordOfTheDayViewProps {
  allWords: NouchiWord[];
  onSelectWord: (word: NouchiWord) => void;
  onBookmarkToggle?: (wordId: string) => void;
  isBookmarked?: boolean;
  onOpenNotificationModal?: () => void;
}

export const WordOfTheDayView: React.FC<WordOfTheDayViewProps> = ({
  allWords,
  onSelectWord,
  onBookmarkToggle,
  isBookmarked = false,
  onOpenNotificationModal
}) => {
  const [customIndex, setCustomIndex] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isNotifActive, setIsNotifActive] = useState<boolean>(false);

  useEffect(() => {
    const settings = notificationService.getSettings();
    setIsNotifActive(settings.enabled && notificationService.getPermission() === 'granted');
  }, []);

  // Deterministic daily word calculation based on current calendar date (Year + Month + Day)
  const wordOfTheDay = useMemo(() => {
    if (!allWords || allWords.length === 0) return null;
    if (customIndex !== null && allWords[customIndex]) {
      return allWords[customIndex];
    }
    return getDeterministicDailyWord(allWords, new Date());
  }, [allWords, customIndex]);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }, []);

  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!allWords || allWords.length === 0) return;
    const nextIdx = Math.floor(Math.random() * allWords.length);
    setCustomIndex(nextIdx);
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!wordOfTheDay) return;

    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordOfTheDay.term);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      utterance.pitch = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 1200);
    }
  };

  const handleShare = async (e: React.MouseEvent, platform?: 'native' | 'whatsapp' | 'twitter' | 'facebook' | 'copy') => {
    e.stopPropagation();
    if (!wordOfTheDay) return;

    const currentUrl = window.location.href;
    const shareText = `🇨🇮 Mot Nouchi du Jour : "${wordOfTheDay.term.toUpperCase()}" (${wordOfTheDay.frenchTranslation})\n\n📖 Définition : ${wordOfTheDay.definition}\n💬 Exemple : « ${wordOfTheDay.examples?.[0]?.nouchi || ''} » (${wordOfTheDay.examples?.[0]?.french || ''})\n\nDécouvre tout le dictionnaire Nouchi sur Markkanich Le NouchiPro ! 🚀\n${currentUrl}`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
      setShowShareMenu(false);
      return;
    }

    if (platform === 'twitter') {
      const tweetText = `🇨🇮 Mot Nouchi du Jour : "${wordOfTheDay.term.toUpperCase()}" - ${wordOfTheDay.frenchTranslation}\n\n« ${wordOfTheDay.definition} »\n\n#Nouchi #CotedIvoire #Abidjan #Babi`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
      setShowShareMenu(false);
      return;
    }

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
      setShowShareMenu(false);
      return;
    }

    if (platform === 'copy') {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareToast('📋 Mot du jour et citation copiés !');
        setTimeout(() => setShareToast(null), 3000);
      }
      setShowShareMenu(false);
      return;
    }

    // Web Share API native call with fallback to dropdown menu
    if (navigator.share) {
      try {
        await navigator.share({
          title: `🇨🇮 Mot Nouchi du Jour : ${wordOfTheDay.term}`,
          text: shareText,
          url: currentUrl
        });
      } catch (err) {
        // Fallback to menu if user cancelled or if error occurs
        if ((err as Error).name !== 'AbortError') {
          setShowShareMenu(prev => !prev);
        }
      }
    } else {
      setShowShareMenu(prev => !prev);
    }
  };

  if (!wordOfTheDay) return null;

  return (
    <motion.div 
      id="word-of-the-day-card"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      onClick={() => onSelectWord(wordOfTheDay)}
      className="md:col-span-4 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 text-black flex flex-col justify-between cursor-pointer group shadow-[0_0_28px_rgba(245,158,11,0.25)] relative overflow-visible animate-word-fade-in transition-all duration-300"
    >
      {/* Toast Notification */}
      {shareToast && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-amber-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-2xl z-50 border border-amber-500/40 flex items-center gap-1.5 animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{shareToast}</span>
        </div>
      )}

      <div>
        {/* Header bar inside card */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Mot du jour
            </span>
            <span className="bg-black/15 text-black px-2 py-0.5 rounded-md text-[9px] font-bold">
              {todayFormatted}
            </span>
          </div>

          {/* Action Toolbar: Audio, Web Share, Bookmark, Notification, Shuffle */}
          <div className="flex items-center gap-1.5 relative">
            {onOpenNotificationModal && (
              <button
                type="button"
                id="btn-daily-word-push-reminder"
                title={isNotifActive ? "Notifications quotidiennes actives (cliquez pour configurer)" : "Activer la notification push quotidienne"}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNotificationModal();
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition shadow-sm ${
                  isNotifActive
                    ? 'bg-black text-amber-400 border border-amber-300/40'
                    : 'bg-black/20 hover:bg-black/30 text-black'
                }`}
              >
                {isNotifActive ? <BellRing className="w-3.5 h-3.5 animate-bounce" /> : <Bell className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              type="button"
              title="Écouter la prononciation"
              onClick={handlePlayAudio}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 text-black flex items-center justify-center transition shadow-sm"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-white' : ''}`} />
            </button>

            {onBookmarkToggle && (
              <button
                type="button"
                title="Ajouter aux favoris"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkToggle(wordOfTheDay.id);
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition shadow-sm ${
                  isBookmarked 
                    ? 'bg-black text-amber-400' 
                    : 'bg-black/20 hover:bg-black/30 text-black'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </button>
            )}

            <div className="relative">
              <button
                type="button"
                title="Partager le mot du jour (Web Share)"
                onClick={(e) => handleShare(e)}
                className="bg-black/25 hover:bg-black/35 text-black px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition shadow-sm"
              >
                <Share2 className="w-3 h-3" />
                <span>Partager</span>
              </button>

              {/* Share Options Popup */}
              {showShareMenu && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-9 w-48 bg-[#18181b] border border-amber-500/40 rounded-2xl shadow-2xl p-2 z-50 text-white space-y-1 backdrop-blur-md"
                >
                  <div className="text-[10px] font-bold text-amber-400 px-2 py-1 uppercase tracking-wider border-b border-slate-800">
                    Partager le Mot du Jour
                  </div>

                  <button
                    onClick={(e) => handleShare(e, 'whatsapp')}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-left text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition font-semibold"
                  >
                    <span>💬</span> WhatsApp
                  </button>

                  <button
                    onClick={(e) => handleShare(e, 'twitter')}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-left text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition font-semibold"
                  >
                    <span>🐦</span> X (Twitter)
                  </button>

                  <button
                    onClick={(e) => handleShare(e, 'facebook')}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-left text-blue-400 hover:bg-blue-500/10 rounded-xl transition font-semibold"
                  >
                    <span>📘</span> Facebook
                  </button>

                  <button
                    onClick={(e) => handleShare(e, 'copy')}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-left text-slate-200 hover:bg-slate-800 rounded-xl transition font-semibold border-t border-slate-800/80 pt-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-400" /> Copier citation
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              title="Tirer un autre mot au sort"
              onClick={handleShuffle}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 text-black flex items-center justify-center transition shadow-sm"
            >
              <Shuffle className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Word Content with Fade-In Animation on Word Change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wordOfTheDay.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-3xl sm:text-4xl font-black italic tracking-tighter text-black uppercase">
                {wordOfTheDay.term}
              </h3>
              {wordOfTheDay.phonetic && (
                <span className="text-[11px] font-mono text-black/75 bg-black/10 px-2 py-0.5 rounded">
                  [{wordOfTheDay.phonetic}]
                </span>
              )}
            </div>

            <p className="text-xs font-black text-black/90 mt-1">
              « {wordOfTheDay.frenchTranslation} »
            </p>

            <p className="text-xs font-medium leading-snug mt-2 text-black/85 line-clamp-2">
              {wordOfTheDay.definition}
            </p>

            {wordOfTheDay.examples && wordOfTheDay.examples[0] && (
              <div className="mt-2.5 bg-black/10 p-2 rounded-xl text-[11px] font-medium text-black/90 border border-black/10">
                <span className="font-bold">Ex :</span> « {wordOfTheDay.examples[0].nouchi} »
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div> 

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-black/15 flex items-center justify-between text-[11px] font-bold text-black/80">
        <span>Origine : {wordOfTheDay.originLanguage || 'Ivoirienne'}</span>
        <span className="underline group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Fiche complète ➔
        </span>
      </div>
    </motion.div>
  );
};
