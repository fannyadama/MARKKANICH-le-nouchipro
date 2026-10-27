import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NouchiWord, User, DailyQuizQuestion, DailyLeaderboardEntry } from '../types';
import { 
  generateDailyCommunityQuiz, 
  getTodayDateString, 
  getDailyLeaderboard, 
  saveDailyQuizResult, 
  hasPlayedDailyQuizToday 
} from '../utils/dailyQuizGenerator';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Share2, 
  RotateCcw, 
  Award, 
  Users, 
  Calendar, 
  Check, 
  ArrowRight,
  Crown,
  Medal,
  Timer,
  Zap,
  Info
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface DailyCommunityQuizViewProps {
  words: NouchiWord[];
  user: User | null;
  onOpenCertificate?: () => void;
  onSelectWord?: (word: NouchiWord) => void;
  onOpenAddWord?: () => void;
}

export const DailyCommunityQuizView: React.FC<DailyCommunityQuizViewProps> = ({
  words,
  user,
  onOpenCertificate,
  onSelectWord,
  onOpenAddWord
}) => {
  const todayStr = useMemo(() => getTodayDateString(), []);
  
  // Format today's date in French
  const todayFormatted = useMemo(() => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }, []);

  // Countdown timer to midnight
  const [timeLeftUntilMidnight, setTimeLeftUntilMidnight] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diffMs = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeLeftUntilMidnight(
        `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate 5 questions for today
  const dailyQuestions = useMemo(() => {
    return generateDailyCommunityQuiz(words, todayStr);
  }, [words, todayStr]);

  // Check if user already played today
  const playedInfo = useMemo(() => {
    return hasPlayedDailyQuizToday(todayStr);
  }, [todayStr]);

  const [hasCompleted, setHasCompleted] = useState(playedInfo.played);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<{ isCorrect: boolean }[]>([]);
  const [totalSecondsSpent, setTotalSecondsSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(!playedInfo.played);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<DailyLeaderboardEntry[]>(() => getDailyLeaderboard(todayStr));
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'quiz' | 'leaderboard'>('quiz');

  const timerRef = useRef<any>(null);

  // Stop / Start Timer
  useEffect(() => {
    if (isTimerRunning && !hasCompleted) {
      timerRef.current = setInterval(() => {
        setTotalSecondsSpent(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, hasCompleted]);

  const currentQ: DailyQuizQuestion | undefined = dailyQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    hapticManager.quizAnswer(isCorrect);

    const newHistory = [...answersHistory, { isCorrect }];
    setAnswersHistory(newHistory);

    if (isCorrect) {
      // 100 base pts per answer
      setScore(prev => prev + 100);
    }
  };

  const handleNext = () => {
    if (currentIndex < dailyQuestions.length - 1) {
      hapticManager.trigger('tap');
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Finish quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsTimerRunning(false);
    setHasCompleted(true);
    setActiveTab('quiz');

    // Calculate accuracy
    const correctCount = answersHistory.filter(a => a.isCorrect).length + (selectedOption === currentQ?.correctIndex ? 1 : 0);
    const finalScore = score + (selectedOption === currentQ?.correctIndex ? 100 : 0);

    // Speed bonus: up to 50 bonus pts if finished quickly (< 60s)
    const speedBonus = Math.max(0, Math.floor((80 - Math.min(80, totalSecondsSpent)) * 0.6));
    const totalWithBonus = finalScore + speedBonus;

    // Confetti on good score
    if (correctCount >= 3) {
      hapticManager.quizFinish(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      hapticManager.quizFinish(false);
    }

    // Save result to daily leaderboard
    const username = user?.username || `Môgô_${Math.floor(100 + Math.random() * 900)}`;
    const { leaderboard: updatedLeaderboard, userRank: rank } = saveDailyQuizResult({
      username,
      score: totalWithBonus,
      timeSeconds: totalSecondsSpent,
      accuracy: correctCount,
      streak: 7 // active streak
    }, todayStr);

    setLeaderboard(updatedLeaderboard);
    setUserRank(rank);
  };

  const handleShareResult = () => {
    const correctCount = answersHistory.filter(a => a.isCorrect).length;
    const squares = answersHistory.map(a => a.isCorrect ? '🟩' : '🟥').join('');
    const text = `🎯 Mon score au Quiz Quotidien NouchiPro (${todayFormatted}) :\n` +
      `🔥 ${score} points en ${totalSecondsSpent}s (Rang #${userRank || 1})\n` +
      `Progression : ${squares}\n` +
      `Défiez-moi sur Markkanich Le NouchiPro 🇨🇮 !`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      hapticManager.trigger('selection');
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div id="daily-community-quiz-view" className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Banner with Today's Date, Countdown & Community Badge */}
      <div className="bg-gradient-to-r from-[#18181b] via-[#1a1714] to-[#18181b] border border-amber-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quiz Quotidien de la Communauté</span>
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-slate-400 capitalize">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>{todayFormatted}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Le Défi Express des <span className="text-amber-400">5 Mots du Jour 🇨🇮</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Chaque jour, 5 nouvelles questions sont générées automatiquement à partir des derniers mots ajoutés par la communauté. 
              Défiez les autres Môgôs et hissez-vous au sommet du classement d'Abidjan !
            </p>
          </div>

          {/* Countdown & Stats Widget */}
          <div className="flex sm:items-center gap-3 shrink-0 flex-wrap">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[140px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block flex items-center justify-center gap-1">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                <span>Prochain Quiz</span>
              </span>
              <span className="text-sm font-black font-mono text-amber-300 mt-0.5 block">
                {timeLeftUntilMidnight || 'Calcul...'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Série Active</span>
              </span>
              <span className="text-sm font-black text-orange-400 mt-0.5 block">
                7 Jours 🔥
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Switcher Tab: Quiz vs Classement du Jour */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-[#161618] border border-slate-800 rounded-2xl max-w-md mx-auto shadow-md">
        <button
          type="button"
          onClick={() => {
            setActiveTab('quiz');
            hapticManager.trigger('selection');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{hasCompleted ? 'Mon Résultat du Jour' : 'Faire le Quiz (5 Q)'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('leaderboard');
            hapticManager.trigger('selection');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-900" />
          <span>Classement du Jour 🏆</span>
        </button>
      </div>

      {/* ================= TAB 1: QUIZ PLAY ARENA ================= */}
      {activeTab === 'quiz' && (
        <>
          {!hasCompleted && currentQ ? (
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              {/* Question Header & Step Progression */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm border border-amber-500/40">
                    {currentIndex + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Question {currentIndex + 1} sur {dailyQuestions.length}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-amber-500" />
                      <span>Mot proposé par <strong className="text-amber-400">@{currentQ.contributedBy}</strong></span>
                    </span>
                  </div>
                </div>

                {/* Question Timer */}
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{totalSecondsSpent}s</span>
                </div>
              </div>

              {/* 5-Step Dots Progress */}
              <div className="grid grid-cols-5 gap-2">
                {dailyQuestions.map((_, i) => {
                  const answered = answersHistory[i];
                  const isCurrent = i === currentIndex;
                  return (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        answered !== undefined
                          ? answered.isCorrect
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : isCurrent
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>

              {/* The Question Card */}
              <div className="py-2">
                <h3 className="text-lg sm:text-xl font-black text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const showResult = selectedOption !== null;

                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500/60 hover:text-white';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showResult}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{option}</span>
                      </div>

                      {showResult && (
                        <div>
                          {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                          {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button Drawer */}
              {selectedOption !== null && (
                <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Explication & Contexte de Rue :</span>
                    </p>
                    <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                    {currentQ.culturalNote && (
                      <p className="text-[11px] text-amber-400/90 pt-1 italic">
                        💡 {currentQ.culturalNote}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>{currentIndex < dailyQuestions.length - 1 ? 'Question suivante' : 'Terminer & Voir mon Rang'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ================= Score Card Finished ================= */
            <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-2xl space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 block">
                  Quiz Quotidien Terminé • {todayFormatted}
                </span>
                <h3 className="text-3xl font-black text-white">
                  Score : <span className="text-amber-400">{score} Points</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Temps réalisé : <strong className="text-white">{totalSecondsSpent}s</strong> • Questions réussies : <strong className="text-emerald-400">{answersHistory.filter(a => a.isCorrect).length} / 5</strong>
                </p>
              </div>

              {/* User Rank Card in Today's Leaderboard */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Votre Position au Classement :</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-black font-black text-xs flex items-center gap-1 shadow">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Rang #{userRank || 1} d'Abidjan</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Bravo ! Votre score est enregistré sur le tableau d'honneur du jour.
                </p>
              </div>

              {/* Action Buttons: Share & View Leaderboard */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleShareResult}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs transition flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShare ? 'Copié pour WhatsApp ! ✓' : 'Partager mon score'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('leaderboard')}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 font-extrabold text-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Voir le Classement Complet</span>
                </button>

                {onOpenAddWord && (
                  <button
                    type="button"
                    onClick={onOpenAddWord}
                    className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proposer un mot pour demain</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= TAB 2: DAILY LEADERBOARD ================= */}
      {activeTab === 'leaderboard' && (
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Classement des Meilleurs Scores du Jour</span>
              </h3>
              <p className="text-xs text-slate-400">
                Top des Nouchimen & Nouchiレディース ayant relevé le défi du {todayFormatted}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">
                Mise à jour en temps réel
              </span>
            </div>
          </div>

          {/* Podium Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {leaderboard.slice(0, 3).map((item, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;

              let medalBadge = '🥉 3ème';
              let borderStyle = 'border-amber-900/60 bg-amber-950/20';
              if (isFirst) {
                medalBadge = '👑 1er (Champion)';
                borderStyle = 'border-amber-500/80 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]';
              } else if (isSecond) {
                medalBadge = '🥈 2ème';
                borderStyle = 'border-slate-500/60 bg-slate-800/30';
              }

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border text-center space-y-2 relative ${borderStyle}`}
                >
                  <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block">
                    {medalBadge}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xl mx-auto shadow">
                    {item.avatar || '🎯'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.username}
                    </h4>
                    <p className="text-xs font-black text-amber-300 font-mono mt-0.5">
                      {item.score} pts
                    </p>
                    <p className="text-[10px] text-slate-400">
                      en {item.timeSeconds}s • {item.accuracy}/5 juste
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leaderboard Table */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Rang</th>
                  <th className="py-3 px-4">Joueur / Môgô</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Temps</th>
                  <th className="py-3 px-4 text-right">Série</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {leaderboard.map((player) => {
                  const isCurrent = player.isCurrentUser;
                  return (
                    <tr
                      key={player.id}
                      className={`hover:bg-slate-900/50 transition ${
                        isCurrent ? 'bg-amber-500/15 font-bold text-white border-l-4 border-amber-400' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold">
                        {player.rank === 1 ? '🥇 1' : player.rank === 2 ? '🥈 2' : player.rank === 3 ? '🥉 3' : `#${player.rank}`}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{player.avatar || '🎯'}</span>
                          <span className={isCurrent ? 'text-amber-400 font-black' : 'text-white'}>
                            {player.username} {isCurrent ? '(Vous)' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-black text-amber-300">
                        {player.score} pts
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-400">
                        {player.timeSeconds}s
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-orange-400">
                        {player.streak} 🔥
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
