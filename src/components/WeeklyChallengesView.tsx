import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Medal, 
  Clock, 
  Zap, 
  Volume2, 
  ArrowRight, 
  BookOpen, 
  Check, 
  Flame, 
  HelpCircle, 
  Share2, 
  Star,
  RefreshCw
} from 'lucide-react';
import { WeeklyChallenge, WeeklyChallengeWord, Badge } from '../types';
import { speakWord } from '../utils/speech';
import { hapticManager } from '../utils/haptics';

interface WeeklyChallengesViewProps {
  challenges: WeeklyChallenge[];
  userEarnedBadgeIds: string[];
  onBadgeUnlocked: (badge: Badge, xpBonus: number) => void;
  onSelectWord?: (wordTerm: string) => void;
}

export const WeeklyChallengesView: React.FC<WeeklyChallengesViewProps> = ({
  challenges,
  userEarnedBadgeIds,
  onBadgeUnlocked,
  onSelectWord
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    challenges[0]?.id || ''
  );
  
  // Track mastered words per challenge (persisted in localStorage)
  const [masteredWordIds, setMasteredWordIds] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('markkanich_weekly_mastered_words');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default: give 1 word mastered initially for engaging feedback
    return {
      'challenge-semaine-actuelle': ['abidjan-cest-technique']
    };
  });

  // Track active test / quiz modal for a word
  const [quizWord, setQuizWord] = useState<WeeklyChallengeWord | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'success' | 'failure' | null>(null);

  // Success celebration banner
  const [celebrationBanner, setCelebrationBanner] = useState<{
    badge: Badge;
    xp: number;
  } | null>(null);

  const activeChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];

  useEffect(() => {
    try {
      localStorage.setItem('markkanich_weekly_mastered_words', JSON.stringify(masteredWordIds));
    } catch (e) {
      console.error(e);
    }
  }, [masteredWordIds]);

  if (!activeChallenge) {
    return null;
  }

  const currentChallengeMastered = masteredWordIds[activeChallenge.id] || [];
  const totalWords = activeChallenge.words.length;
  const masteredCount = activeChallenge.words.filter(w => currentChallengeMastered.includes(w.wordId)).length;
  const progressPercent = Math.round((masteredCount / totalWords) * 100);
  const isChallengeCompleted = masteredCount === totalWords;
  const hasClaimedBadge = userEarnedBadgeIds.includes(activeChallenge.badgeReward.id);

  const handleStartWordTest = (word: WeeklyChallengeWord) => {
    setQuizWord(word);
    setSelectedAnswer(null);
    setQuizResult(null);
  };

  const handleVerifyAnswer = () => {
    if (!quizWord || selectedAnswer === null) return;

    if (selectedAnswer === quizWord.quizPrompt.correctIndex) {
      hapticManager.trigger('quiz_correct');
      setQuizResult('success');

      // Update mastered words
      setMasteredWordIds(prev => {
        const existing = prev[activeChallenge.id] || [];
        if (!existing.includes(quizWord.wordId)) {
          const updated = [...existing, quizWord.wordId];
          
          // Check if this completes the entire challenge
          if (updated.length === activeChallenge.words.length && !hasClaimedBadge) {
            setTimeout(() => {
              onBadgeUnlocked(activeChallenge.badgeReward, activeChallenge.xpReward);
              setCelebrationBanner({
                badge: activeChallenge.badgeReward,
                xp: activeChallenge.xpReward
              });
            }, 600);
          }
          return { ...prev, [activeChallenge.id]: updated };
        }
        return prev;
      });
    } else {
      hapticManager.trigger('quiz_wrong');
      setQuizResult('failure');
    }
  };

  const handleClaimBadge = () => {
    if (!hasClaimedBadge && isChallengeCompleted) {
      hapticManager.trigger('celebration');
      onBadgeUnlocked(activeChallenge.badgeReward, activeChallenge.xpReward);
      setCelebrationBanner({
        badge: activeChallenge.badgeReward,
        xp: activeChallenge.xpReward
      });
    }
  };

  const handlePronounce = (term: string) => {
    speakWord(term);
  };

  return (
    <div className="space-y-6">
      {/* Celebration Banner when badge is unlocked */}
      {celebrationBanner && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-black shadow-2xl animate-fade-in relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-yellow-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-black text-amber-400 text-3xl flex items-center justify-center font-black shadow-lg">
              {celebrationBanner.badge.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-black text-amber-400 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full">
                  Badge Exclusif Débloqué !
                </span>
                <span className="font-extrabold text-xs text-black/80">+{celebrationBanner.xp} XP</span>
              </div>
              <h3 className="text-xl font-black mt-0.5">
                Félicitations ! Vous avez décroché : « {celebrationBanner.badge.name} »
              </h3>
              <p className="text-xs font-semibold text-black/90">
                {celebrationBanner.badge.description} Vous êtes officiellement reconnu par la communauté Nouchi.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCelebrationBanner(null)}
            className="px-5 py-2.5 bg-black hover:bg-neutral-900 text-amber-400 font-black rounded-xl text-xs transition shadow-md whitespace-nowrap"
          >
            Continuer la Progression
          </button>
        </div>
      )}

      {/* Challenge Selector Tabs (Current week, Next week, Archive) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {challenges.map(challenge => {
          const isSelected = challenge.id === activeChallenge.id;
          const wordsMastered = (masteredWordIds[challenge.id] || []).length;
          const isDone = wordsMastered === challenge.words.length;
          const hasBadge = userEarnedBadgeIds.includes(challenge.badgeReward.id);

          return (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallengeId(challenge.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10'
                  : 'bg-[#161618] border-slate-800 hover:border-slate-700 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Semaine {challenge.weekNumber}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isDone || hasBadge
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {hasBadge ? '👑 Badge Reçu' : isDone ? '✅ Complété' : `${wordsMastered}/${challenge.words.length} mots`}
                </span>
              </div>

              <h4 className="font-extrabold text-white text-sm line-clamp-1">
                {challenge.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {challenge.theme}
              </p>

              <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                <span className="text-slate-300 font-semibold flex items-center gap-1">
                  <span>Badge :</span>
                  <span className="text-amber-400 font-bold">{challenge.badgeReward.icon} {challenge.badgeReward.name}</span>
                </span>
                <span className="text-amber-400 font-black">+{challenge.xpReward} pts</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Challenge Hero Banner */}
      <div className="bg-[#161618] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/15 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Challenge Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                Défi Actif • Semaine {activeChallenge.weekNumber}
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Du {activeChallenge.startDate} au {activeChallenge.endDate}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {activeChallenge.tag}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeChallenge.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {activeChallenge.description}
            </p>

            {/* Progress Bar */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">
                  Progression de maîtrise ({masteredCount} / {totalWords} mots acquis)
                </span>
                <span className="text-amber-400 font-mono font-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-950 rounded-full p-0.5 border border-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Exclusive Badge Reward Box */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-5 text-center space-y-3 shadow-xl relative group">
            <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/20">
              Badge Exclusif de la Semaine
            </div>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-4xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
              {activeChallenge.badgeReward.icon}
            </div>

            <div>
              <h3 className="text-base font-black text-white">{activeChallenge.badgeReward.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {activeChallenge.badgeReward.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-amber-400 font-black">+{activeChallenge.xpReward} Points XP</span>
              <span className={`font-bold ${
                hasClaimedBadge 
                  ? 'text-emerald-400' 
                  : isChallengeCompleted 
                    ? 'text-amber-400 animate-pulse' 
                    : 'text-slate-500'
              }`}>
                {hasClaimedBadge ? '✅ Obtenu' : isChallengeCompleted ? '🎁 Prêt à réclamer' : '🔒 À débloquer'}
              </span>
            </div>

            {isChallengeCompleted && !hasClaimedBadge && (
              <button
                onClick={handleClaimBadge}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:scale-102 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Réclamer mon Badge Exclusif</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Words to Master Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              Liste des Mots au Programme ({totalWords})
            </h3>
            <p className="text-xs text-slate-400">
              Écoutez la prononciation, mémorisez l’astuce culturelle et validez le quiz express de chaque mot pour prouver votre maîtrise.
            </p>
          </div>
          <div className="text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Objectif : <strong className="text-amber-400">{totalWords}/{totalWords}</strong> validés
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeChallenge.words.map((word, index) => {
            const isMastered = currentChallengeMastered.includes(word.wordId);

            return (
              <div
                key={word.wordId}
                className={`p-5 rounded-3xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isMastered
                    ? 'bg-[#161618] border-emerald-500/40 shadow-sm'
                    : 'bg-[#161618] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Word Term + Mastered Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center">
                          #{index + 1}
                        </span>
                        <h4 className="text-lg font-black text-white">{word.term}</h4>
                        {word.phonetic && (
                          <span className="text-xs text-amber-400/80 font-mono">
                            {word.phonetic}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-emerald-400 mt-1">
                        🇫🇷 {word.frenchTranslation}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePronounce(word.term)}
                        title="Écouter la prononciation nouchi"
                        className="p-2 bg-slate-900 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 rounded-xl border border-slate-800 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {isMastered ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Maîtrisé</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold">
                          À tester
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Definition */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {word.definition}
                  </p>

                  {/* Cultural Mnemonic Hint */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-slate-300">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-400">Repère Mnémonique : </span>
                      <span>{word.mnemonicHint}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action: Test / Validation Button */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {onSelectWord && (
                    <button
                      onClick={() => onSelectWord(word.term)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Fiche Dictionnaire</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleStartWordTest(word)}
                    className={`ml-auto px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      isMastered
                        ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black shadow-md'
                    }`}
                  >
                    {isMastered ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Re-tester le mot</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Valider ma maîtrise</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Express Quiz Verification Modal */}
      {quizWord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-black text-white">Quiz Express de Maîtrise</h3>
                  <p className="text-xs text-slate-400">Mot cible : <strong className="text-amber-400">{quizWord.term}</strong></p>
                </div>
              </div>
              <button
                onClick={() => setQuizWord(null)}
                className="text-slate-400 hover:text-white text-xs font-bold p-2"
              >
                ✕ Fermer
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
              <p className="text-sm font-bold text-white leading-relaxed">
                {quizWord.quizPrompt.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              {quizWord.quizPrompt.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedAnswer(idx);
                      setQuizResult(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition flex items-center gap-3 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback result */}
            {quizResult === 'success' && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Excellente réponse ! Le mot « {quizWord.term} » est maintenant validé comme maîtrisé dans votre défi.</span>
              </div>
            )}

            {quizResult === 'failure' && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Ce n'est pas tout à fait ça. Relisez l'astuce mnémonique et réessayez !</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setQuizWord(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                {quizResult === 'success' ? 'Terminé' : 'Annuler'}
              </button>

              {quizResult !== 'success' && (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleVerifyAnswer}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-black font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/20"
                >
                  Valider ma Réponse
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
