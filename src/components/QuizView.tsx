import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { DifficultyLevel, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Award, 
  ChevronRight, 
  Share2,
  Flame,
  Vibrate,
  VibrateOff
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface QuizViewProps {
  onOpenCertificate?: () => void;
  onOpenPricing?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onOpenCertificate, onOpenPricing }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(() => hapticManager.getEnabled());
  const isVibrationSupported = hapticManager.isSupported();

  // Filtered questions based on selected difficulty
  const questions = React.useMemo(() => {
    if (selectedDifficulty === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter(q => q.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const currentQ: QuizQuestion | undefined = questions[currentIndex];

  const handleToggleHaptics = () => {
    const next = !hapticsEnabled;
    setHapticsEnabled(next);
    hapticManager.setEnabled(next);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.correctIndex;
    // Trigger tactile vibration feedback for correct / incorrect answer
    hapticManager.quizAnswer(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      hapticManager.trigger('tap');
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      const isHighRank = score >= Math.floor(questions.length * 0.7);
      hapticManager.quizFinish(isHighRank);
      if (isHighRank) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = (diff?: DifficultyLevel | 'all') => {
    hapticManager.trigger('tap');
    if (diff !== undefined) setSelectedDifficulty(diff);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getRankBadge = (points: number, total: number) => {
    const percentage = (points / total) * 100;
    if (percentage === 100) {
      return { title: 'Légende Nouchi Suprême 👑', desc: "Tu as Abidjan dans tes veines ! Aucun mot ne t'échappe, tu es un vrai maître de Babi.", color: 'text-amber-500' };
    }
    if (percentage >= 70) {
      return { title: 'Vrai Nouchiman / Vraie Choco 🌟', desc: "Tu maîtrises le langage avec aisance et subtilité. Bravo !", color: 'text-emerald-500' };
    }
    if (percentage >= 40) {
      return { title: 'Grouilleur en Apprentissage 🚀', desc: "Tu as de bonnes bases mais il faut encore fréquenter les maquis de Yop City !", color: 'text-blue-500' };
    }
    return { title: 'Premier Gaou Sympathique 🌱', desc: "Pas de panique ! Consulte le dictionnaire A-Z et rejoue pour briller.", color: 'text-orange-500' };
  };

  return (
    <div id="quiz-view" className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Title Bento Banner */}
      <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-2 uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              03. Entraîneur Interactif de Nouchi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Le Test du Vrai Nouchiman 🇨🇮
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Évaluez votre niveau, apprenez les subtilités de la rue et décrochez votre brevet de Babi.
            </p>
          </div>

          {/* Controls: Difficulty Switcher & Haptic Feedback toggle */}
          <div className="flex flex-wrap items-center gap-2 self-start">
            <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              {(['all', 'debutant', 'intermediaire', 'expert'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleRestart(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                    selectedDifficulty === lvl
                      ? 'bg-amber-500 text-black shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl === 'all' ? 'Tous' : lvl}
                </button>
              ))}
            </div>

            {/* Haptic vibration feedback toggle */}
            <button
              id="btn-quiz-haptic-toggle"
              onClick={handleToggleHaptics}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-2xl border text-xs font-bold transition flex items-center gap-1.5 ${
                hapticsEnabled
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={
                isVibrationSupported
                  ? `Vibration tactile mobile : ${hapticsEnabled ? 'Activée' : 'Désactivée'}`
                  : 'Vibration tactile (non supportée sur ce navigateur)'
              }
            >
              {hapticsEnabled ? (
                <Vibrate className="w-4 h-4 text-amber-400" />
              ) : (
                <VibrateOff className="w-4 h-4 text-slate-500" />
              )}
              <span className="hidden sm:inline text-[11px]">
                {hapticsEnabled ? 'Vibration On' : 'Vibration Off'}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Stats */}
        {!quizFinished && currentQ && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Question {currentIndex + 1} sur {questions.length}</span>
              <span className="text-amber-500">Score actuel : {score} point{score > 1 ? 's' : ''}</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quiz Card */}
      {!quizFinished && currentQ ? (
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
              Niveau {currentQ.difficulty}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              const isAnswered = selectedOption !== null;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500/60 hover:text-white";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]";
                } else if (isSelected) {
                  btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300";
                } else {
                  btnStyle = "opacity-30 border-slate-800 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Explication & Contexte
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
              {currentQ.culturalNote && (
                <p className="text-xs text-amber-400/90 italic pt-2 border-t border-slate-800">
                  📜 Note culturelle : {currentQ.culturalNote}
                </p>
              )}

              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md flex items-center gap-2 transition"
                >
                  {currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir mon résultat final'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Score Card */
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-500">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
              Résultat Officiel Markkanich
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1">
              Score : {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </h3>
          </div>

          {/* Rank Badge */}
          {(() => {
            const rank = getRankBadge(score, questions.length);
            return (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto">
                <h4 className={`text-lg font-extrabold ${rank.color}`}>
                  {rank.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  {rank.desc}
                </p>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleRestart()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs shadow-md transition"
            >
              <RotateCcw className="w-4 h-4" />
              Rejouer le quiz
            </button>

            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition"
              >
                <Award className="w-4 h-4" />
                <span>Obtenir mon Diplôme Officiel</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
