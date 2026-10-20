import React, { useState } from 'react';
import { NouchiWord, User } from '../types';
import { speakWord } from '../utils/speech';
import { CommentSection } from './CommentSection';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  Languages, 
  Layers, 
  Share2,
  BookOpen,
  Heart,
  Edit,
  Trash2,
  UserCheck
} from 'lucide-react';

interface WordDetailModalProps {
  word: NouchiWord | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (wordId: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLikeWord: (wordId: string) => void;
  isLiked?: boolean;
  likesCount?: number;
  onEditWord?: (word: NouchiWord) => void;
  onDeleteWord?: (wordId: string) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  user,
  onOpenAuth,
  onLikeWord,
  isLiked = false,
  likesCount = 0,
  onEditWord,
  onDeleteWord
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen || !word) return null;

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    speakWord(word.term);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleCopyCard = () => {
    const textToCopy = `✨ ${word.term} [${word.phonetic || ''}]\n📚 Définition : ${word.frenchTranslation}\n💡 Exemple : "${word.examples[0]?.nouchi || ''}" (${word.examples[0]?.french || ''})\n\nAppris sur Markkanich Le NouchiPro 🇨🇮`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canEdit = !!user && (user.role === 'admin' || (word.contributedBy && word.contributedBy.id === user.id));

  return (
    <div 
      id="modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id={`modal-card-${word.id}`}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161618] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
                {word.grammaticalCategory}
              </span>
              {word.officialStatus && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
                  <Award className="w-3 h-3 text-emerald-400" />
                  {word.officialStatus} {word.officialYear ? `(${word.officialYear})` : ''}
                </span>
              )}
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                Origine : {word.originLanguage}
              </span>
              {word.contributedBy && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <UserCheck className="w-3 h-3 text-amber-400" />
                  Par @{word.contributedBy.username}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mt-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {word.term}
              </h2>
              {word.phonetic && (
                <span className="text-sm font-mono text-slate-500">
                  {word.phonetic}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Like button */}
            <button
              id={`btn-like-${word.id}`}
              onClick={() => onLikeWord(word.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl border transition-all ${
                isLiked
                  ? 'bg-rose-950/80 text-rose-400 border-rose-800 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400'
              }`}
              title="Aimer ce mot"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span className="text-xs">{likesCount}</span>
            </button>

            {/* Audio Listen */}
            <button
              id={`btn-listen-${word.id}`}
              onClick={handlePlayAudio}
              className={`p-2.5 rounded-2xl border transition-all ${
                isPlayingAudio 
                  ? 'bg-amber-500 text-black border-amber-500 scale-105 shadow-md' 
                  : 'bg-slate-900 text-amber-400 border-slate-800 hover:bg-amber-500 hover:text-black'
              }`}
              title="Écouter la prononciation"
            >
              <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
            </button>

            {/* Bookmark */}
            <button
              id={`btn-bookmark-${word.id}`}
              onClick={() => onToggleBookmark(word.id)}
              className={`p-2.5 rounded-2xl border transition-all ${
                isBookmarked
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title={isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>

            {/* Can Edit & Delete Actions */}
            {canEdit && (
              <>
                {onEditWord && (
                  <button
                    onClick={() => {
                      onClose();
                      onEditWord(word);
                    }}
                    className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800 hover:bg-slate-800 transition"
                    title="Modifier ce mot"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {onDeleteWord && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Voulez-vous vraiment supprimer « ${word.term} » ?`)) {
                        onDeleteWord(word.id);
                        onClose();
                      }
                    }}
                    className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800 hover:bg-slate-800 transition"
                    title="Supprimer ce mot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}

            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 pt-5">
          {/* Main Meaning */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Signification en Français Standard
            </h4>
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {word.frenchTranslation}
            </p>
            {word.literalMeaning && (
              <p className="text-xs text-amber-400/80 mt-1 italic">
                Sens littéral : {word.literalMeaning}
              </p>
            )}
          </div>

          {/* Extended Definition */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2">
              Définition Détaillée & Nuance Culturelle
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {word.definition}
            </p>
          </div>

          {/* Etymology & Origins */}
          {word.etymologyDetails && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500 mb-1 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-amber-500" />
                Étymologie & Origine Linguistique
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {word.etymologyDetails}
              </p>
            </div>
          )}

          {/* Examples in Real Situations */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Exemples en Contexte Réel d'Abidjan
            </h4>
            <div className="space-y-3">
              {word.examples.map((ex, index) => (
                <div 
                  key={index}
                  className="p-3.5 rounded-2xl bg-slate-900 border-l-4 border-l-amber-500 border border-slate-800"
                >
                  <p className="text-sm font-medium text-white italic">
                    « {ex.nouchi} »
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    ➡️ {ex.french}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {word.synonyms && word.synonyms.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Synonymes & Équivalents
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.synonyms.map((syn, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {word.tags && word.tags.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2">
                  Thématiques & Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Community Comments & Suggestions Section */}
          <CommentSection
            wordId={word.id}
            wordTerm={word.term}
            user={user}
            onOpenAuth={onOpenAuth}
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            id="btn-copy-card"
            onClick={handleCopyCard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Carte copiée !' : 'Copier la fiche'}
          </button>

          <button
            id="btn-done-modal"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-md transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
