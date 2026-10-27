import { NouchiWord, DailyQuizQuestion, DailyLeaderboardEntry } from '../types';

/**
 * Deterministic pseudo-random number generator using a string seed (e.g. '2026-10-22')
 */
function createSeededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Shuffle array deterministically with a seeded RNG
 */
function seededShuffle<T>(array: T[], rng: () => number): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get current date string formatted as YYYY-MM-DD in Abidjan time (UTC+0)
 */
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Generate 5 dynamic Daily Community Quiz questions based on recently added / community words
 */
export function generateDailyCommunityQuiz(words: NouchiWord[], dateStr: string = getTodayDateString()): DailyQuizQuestion[] {
  const rng = createSeededRandom(`daily-quiz-${dateStr}`);

  // 1. Prioritize community contributed words, supplement with rich dictionary entries
  const communityWords = words.filter(w => w.isCommunity || !!w.contributedBy);
  const regularWords = words.filter(w => !w.isCommunity && !w.contributedBy);
  
  // Create a priority pool
  const candidatePool = [...communityWords, ...regularWords];
  if (candidatePool.length < 5) return [];

  // Shuffle pool with day seed
  const shuffledCandidates = seededShuffle(candidatePool, rng);
  const selectedWords = shuffledCandidates.slice(0, 5);

  const questions: DailyQuizQuestion[] = [];

  selectedWords.forEach((word, idx) => {
    const contributorName = word.contributedBy?.username || 'Communauté_Babi';
    const otherWords = words.filter(w => w.id !== word.id && w.term !== word.term);
    const shuffledOthers = seededShuffle(otherWords, rng);

    if (idx === 0) {
      // Question 1: Direct Definition
      const correctMeaning = word.frenchTranslation || word.definition;
      const distractors = shuffledOthers.slice(0, 3).map(w => w.frenchTranslation || w.definition);
      const optionsWithCorrect = seededShuffle([correctMeaning, ...distractors], rng);
      const correctIndex = optionsWithCorrect.indexOf(correctMeaning);

      questions.push({
        id: `daily-${dateStr}-q1`,
        questionType: 'definition',
        sourceWordId: word.id,
        contributedBy: contributorName,
        difficulty: word.difficultyLevel || 'debutant',
        category: word.category,
        question: `Que signifie le mot nouchi « ${word.term} » ajouté par @${contributorName} ?`,
        options: optionsWithCorrect,
        correctIndex,
        explanation: `« ${word.term} » signifie : ${correctMeaning}. ${word.definition}`,
        culturalNote: word.etymologyDetails || `Expression vivante des rues de Babi partagée par @${contributorName}.`
      });
    } else if (idx === 1 && word.examples && word.examples.length > 0 && word.examples[0].nouchi) {
      // Question 2: Fill in the blank with the example
      const rawExample = word.examples[0].nouchi;
      const maskedExample = rawExample.replace(new RegExp(word.term, 'gi'), '_____');
      const distractors = shuffledOthers.slice(0, 3).map(w => w.term);
      const optionsWithCorrect = seededShuffle([word.term, ...distractors], rng);
      const correctIndex = optionsWithCorrect.indexOf(word.term);

      questions.push({
        id: `daily-${dateStr}-q2`,
        questionType: 'fill_in_the_blank',
        sourceWordId: word.id,
        contributedBy: contributorName,
        difficulty: word.difficultyLevel || 'intermediaire',
        category: word.category,
        question: `Complétez l'expression de la communauté : « ${maskedExample} »`,
        options: optionsWithCorrect,
        correctIndex,
        explanation: `La phrase correcte est : « ${rawExample} » (${word.examples[0].french}).`,
        culturalNote: `Exemple authentique rapporté de la commune de ${word.category === 'transport_lieux' ? 'Yopougon / Adjamé' : 'Cocody'}.`
      });
    } else if (idx === 2 && word.originLanguage) {
      // Question 3: Etymology / Origin
      const correctOrigin = word.originLanguage;
      const commonOrigins = [
        "Dioula / Malinké",
        "Baoulé / Akan",
        "Bété",
        "Anglais déformé",
        "Français ivoirien / Argot de rue",
        "Verlan abidjanais",
        "Espagnol / Populaire"
      ].filter(o => o.toLowerCase() !== correctOrigin.toLowerCase());

      const chosenDistractors = seededShuffle(commonOrigins, rng).slice(0, 3);
      const optionsWithCorrect = seededShuffle([correctOrigin, ...chosenDistractors], rng);
      const correctIndex = optionsWithCorrect.indexOf(correctOrigin);

      questions.push({
        id: `daily-${dateStr}-q3`,
        questionType: 'origin',
        sourceWordId: word.id,
        contributedBy: contributorName,
        difficulty: 'intermediaire',
        category: word.category,
        question: `D'après la contribution de @${contributorName}, quelle est l'origine du mot « ${word.term} » ?`,
        options: optionsWithCorrect,
        correctIndex,
        explanation: `« ${word.term} » tire son origine de : ${correctOrigin}. ${word.etymologyDetails || ''}`,
        culturalNote: "Le métissage linguistique est le cœur vivant du Nouchi ivoirien."
      });
    } else if (idx === 3 && word.synonyms && word.synonyms.length > 0) {
      // Question 4: Synonym challenge
      const correctSynonym = word.synonyms[0];
      const distractors = shuffledOthers.slice(0, 3).map(w => w.term);
      const optionsWithCorrect = seededShuffle([correctSynonym, ...distractors], rng);
      const correctIndex = optionsWithCorrect.indexOf(correctSynonym);

      questions.push({
        id: `daily-${dateStr}-q4`,
        questionType: 'synonym',
        sourceWordId: word.id,
        contributedBy: contributorName,
        difficulty: 'expert',
        category: word.category,
        question: `Quel est un synonyme nouchi direct de « ${word.term} » ?`,
        options: optionsWithCorrect,
        correctIndex,
        explanation: `« ${word.term} » a pour équivalent de rue « ${correctSynonym} ». Sens : ${word.frenchTranslation}.`,
        culturalNote: `Les synonymes permettent d'enrichir le flow dans les palabres et les maquis.`
      });
    } else {
      // Question 5: Reverse Guess (Guess the word from definition)
      const definitionClue = word.frenchTranslation || word.definition;
      const distractors = shuffledOthers.slice(0, 3).map(w => w.term);
      const optionsWithCorrect = seededShuffle([word.term, ...distractors], rng);
      const correctIndex = optionsWithCorrect.indexOf(word.term);

      questions.push({
        id: `daily-${dateStr}-q5`,
        questionType: 'reverse_guess',
        sourceWordId: word.id,
        contributedBy: contributorName,
        difficulty: 'intermediaire',
        category: word.category,
        question: `Devinez le terme nouchi correspondant à cette définition : « ${definitionClue} »`,
        options: optionsWithCorrect,
        correctIndex,
        explanation: `Le mot recherché est bien « ${word.term} » ! Proposé avec brio par @${contributorName}.`,
        culturalNote: word.examples?.[0]?.nouchi ? `Exemple : « ${word.examples[0].nouchi} »` : ''
      });
    }
  });

  return questions;
}

/**
 * Pre-seeded realistic daily leaderboard players
 */
const DEFAULT_DAILY_PLAYERS: Omit<DailyLeaderboardEntry, 'date'>[] = [
  { id: 'p1', username: 'Koffi_Le_Sage', score: 500, timeSeconds: 38, accuracy: 5, avatar: '👑', streak: 12 },
  { id: 'p2', username: 'Awa_Yopougon', score: 480, timeSeconds: 42, accuracy: 5, avatar: '⚡', streak: 8 },
  { id: 'p3', username: 'Marc_Cocody', score: 450, timeSeconds: 49, accuracy: 5, avatar: '🌟', streak: 5 },
  { id: 'p4', username: 'Babi_Girl_225', score: 410, timeSeconds: 54, accuracy: 4, avatar: '💃', streak: 14 },
  { id: 'p5', username: 'Soro_Diaspora_Paris', score: 390, timeSeconds: 61, accuracy: 4, avatar: '✈️', streak: 3 },
  { id: 'p6', username: 'Zouglou_King', score: 340, timeSeconds: 70, accuracy: 4, avatar: '🎶', streak: 7 },
  { id: 'p7', username: 'Gbonhi_Vainqueur', score: 290, timeSeconds: 82, accuracy: 3, avatar: '🔥', streak: 2 }
];

/**
 * Get the daily leaderboard from localStorage, seed if missing
 */
export function getDailyLeaderboard(dateStr: string = getTodayDateString()): DailyLeaderboardEntry[] {
  const key = `markkanich_daily_quiz_leaderboard_${dateStr}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return sortAndRankLeaderboard(parsed);
      }
    }
  } catch (e) {
    console.error('Error reading daily leaderboard:', e);
  }

  // Seed default leaderboard for today
  const seeded = DEFAULT_DAILY_PLAYERS.map(p => ({
    ...p,
    date: dateStr
  }));
  try {
    localStorage.setItem(key, JSON.stringify(seeded));
  } catch {}

  return sortAndRankLeaderboard(seeded);
}

/**
 * Add user result to the daily leaderboard
 */
export function saveDailyQuizResult(
  entry: { username: string; score: number; timeSeconds: number; accuracy: number; streak: number },
  dateStr: string = getTodayDateString()
): { leaderboard: DailyLeaderboardEntry[]; userRank: number } {
  const currentLeaderboard = getDailyLeaderboard(dateStr);
  const key = `markkanich_daily_quiz_leaderboard_${dateStr}`;

  // Filter out any previous attempt by this username for today
  const cleanList = currentLeaderboard.filter(item => item.username.toLowerCase() !== entry.username.toLowerCase());

  const newEntry: DailyLeaderboardEntry = {
    id: `user-${Date.now()}`,
    username: entry.username,
    score: entry.score,
    timeSeconds: entry.timeSeconds,
    accuracy: entry.accuracy,
    date: dateStr,
    avatar: '🎯',
    isCurrentUser: true,
    streak: entry.streak
  };

  cleanList.push(newEntry);
  const sorted = sortAndRankLeaderboard(cleanList);

  try {
    localStorage.setItem(key, JSON.stringify(sorted));
    // Save completion flag
    localStorage.setItem(`markkanich_daily_quiz_completed_${dateStr}`, JSON.stringify({
      score: entry.score,
      timeSeconds: entry.timeSeconds,
      accuracy: entry.accuracy,
      completedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Error saving daily result:', e);
  }

  const userRank = sorted.findIndex(item => item.isCurrentUser || item.username === entry.username) + 1;
  return { leaderboard: sorted, userRank: userRank || sorted.length };
}

/**
 * Check if user has already played today's quiz
 */
export function hasPlayedDailyQuizToday(dateStr: string = getTodayDateString()): {
  played: boolean;
  score?: number;
  timeSeconds?: number;
  accuracy?: number;
} {
  try {
    const raw = localStorage.getItem(`markkanich_daily_quiz_completed_${dateStr}`);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        played: true,
        score: data.score,
        timeSeconds: data.timeSeconds,
        accuracy: data.accuracy
      };
    }
  } catch {}
  return { played: false };
}

/**
 * Sorts by score (desc), then timeSeconds (asc), assigns 1-based ranks
 */
function sortAndRankLeaderboard(list: DailyLeaderboardEntry[]): DailyLeaderboardEntry[] {
  return list
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeSeconds - b.timeSeconds;
    })
    .map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
}
