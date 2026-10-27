/**
 * Pronunciation Scoring & Phonetic Comparison Engine
 * Evaluates speech transcript, phonetic accuracy, rhythm, and cadence
 * against benchmark Nouchi expressions.
 */

export interface SyllableEvaluation {
  syllable: string;
  status: 'perfect' | 'good' | 'needs_work';
  phoneticHint: string;
}

export interface PronunciationScoreResult {
  overallScore: number; // 0 - 100
  phoneticAccuracy: number; // 0 - 100
  accentFlowScore: number; // 0 - 100
  rhythmScore: number; // 0 - 100
  clarityScore: number; // 0 - 100
  streetVerdict: {
    title: string;
    badge: string;
    vibe: string;
    color: string;
  };
  syllables: SyllableEvaluation[];
  coachAdvice: string;
  spokenFeedback: string;
  benchmarkDurationMs: number;
  userDurationMs: number;
}

// Common Nouchi syllable patterns
export function decomposeNouchiSyllables(term: string): string[] {
  const clean = term.trim();
  if (!clean) return [];

  // Custom rule-based decomposition for famous Nouchi terms
  const knownDict: Record<string, string[]> = {
    "s'enjailler": ["s'en", "jail", "ler"],
    "boucantier": ["bou", "can", "tier"],
    "môgô": ["mô", "gô"],
    "mogo": ["mo", "go"],
    "dégamage": ["dé", "ga", "mage"],
    "degamage": ["de", "ga", "mage"],
    "djafoule": ["dja", "fou", "le"],
    "kpétou": ["kpé", "tou"],
    "kpetou": ["kpe", "tou"],
    "chap-chap": ["chap", "chap"],
    "kpata-kpata": ["kpa", "ta", "kpa", "ta"],
    "gbonhi": ["gbon", "hi"],
    "tchocoya": ["tcho", "co", "ya"],
    "gbafour": ["gba", "four"],
    "boucan": ["bou", "can"],
    "gaou": ["ga", "ou"],
    "y'a fohi": ["y'a", "fo", "hi"],
    "bara": ["ba", "ra"],
    "gnan": ["gnan"],
    "dja": ["dja"],
    "enjaillement": ["en", "jail", "le", "ment"],
    "babi": ["ba", "bi"],
    "kpa": ["kpa"],
    "djassa": ["djas", "sa"],
    "frou-frou": ["frou", "frou"],
    "chicotter": ["chi", "cot", "ter"]
  };

  const lower = clean.toLowerCase();
  if (knownDict[lower]) {
    return knownDict[lower];
  }

  // Fallback heuristic: split on hyphens, apostrophes, or 2-3 letter vowel boundaries
  if (clean.includes('-')) {
    return clean.split('-').filter(Boolean);
  }

  // Regex syllable approximation for French/Nouchi phonology
  const regex = /[^aeiouyéèêëàâôîïùû\s]+[aeiouyéèêëàâôîïùû]+(?:[^aeiouyéèêëàâôîïùû\s]+(?=$|[^aeiouyéèêëàâôîïùû\s]))?/gi;
  const matches = clean.match(regex);
  if (matches && matches.length > 0) {
    return matches;
  }

  return [clean];
}

// Levenshtein distance for string edit comparison
export function calculateLevenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

export function calculateSimilarity(s1: string, s2: string): number {
  const clean1 = normalizeNouchiPhonetics(s1);
  const clean2 = normalizeNouchiPhonetics(s2);

  if (clean1 === clean2) return 1.0;
  if (!clean1 || !clean2) return 0.0;

  const maxLen = Math.max(clean1.length, clean2.length);
  const distance = calculateLevenshteinDistance(clean1, clean2);
  return Math.max(0, (maxLen - distance) / maxLen);
}

// Normalize Nouchi sounds (vowels, accents, special consonant digraphs)
export function normalizeNouchiPhonetics(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/['’\-_]/g, '')
    .replace(/\s+/g, '')
    .replace(/ph/g, 'f')
    .replace(/qu/g, 'k')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c(?=[aou])/g, 'k')
    .replace(/tch/g, 'ch');
}

/**
 * Computes an AI-grade pronunciation score comparing recorded audio/transcript against benchmark
 */
export function evaluatePronunciationScore({
  targetWord,
  userTranscript,
  userDurationMs,
  audioQualityRatio = 0.85
}: {
  targetWord: string;
  userTranscript: string;
  userDurationMs: number;
  audioQualityRatio?: number;
}): PronunciationScoreResult {
  const targetClean = targetWord.trim().toLowerCase();
  const transcriptClean = (userTranscript || '').trim().toLowerCase();

  // 1. Phonetic matching score
  const similarity = calculateSimilarity(targetClean, transcriptClean);
  let phoneticAccuracy = Math.round(similarity * 100);

  // If transcript is empty (browser SpeechRecognition not active or noisy mic)
  // use duration & audio quality heuristics
  const hasTranscript = transcriptClean.length > 0;
  if (!hasTranscript) {
    // Estimative score when transcript is missing but audio was recorded
    phoneticAccuracy = Math.min(88, Math.max(62, Math.round(audioQualityRatio * 90)));
  }

  // 2. Rhythm and Timing Score (Optimal duration is roughly 350ms per syllable + 300ms base)
  const syllables = decomposeNouchiSyllables(targetWord);
  const benchmarkDurationMs = Math.max(600, syllables.length * 420 + 350);

  const durationDiff = Math.abs(userDurationMs - benchmarkDurationMs);
  const durationScoreRaw = Math.max(40, 100 - (durationDiff / benchmarkDurationMs) * 75);
  const rhythmScore = Math.min(100, Math.round(durationScoreRaw));

  // 3. Accent & Flow Score (Nouchi needs punch, not sluggish French)
  let accentFlowScore = Math.round((phoneticAccuracy * 0.6) + (rhythmScore * 0.4));
  if (targetClean.includes('kp') || targetClean.includes('gb') || targetClean.includes('gn') || targetClean.includes('dj')) {
    // Special bonus if user tackled a complex African digraph
    accentFlowScore = Math.min(98, accentFlowScore + 4);
  }

  // 4. Clarity
  const clarityScore = Math.min(100, Math.max(50, Math.round(audioQualityRatio * 95)));

  // 5. Overall weighted score
  const overallScore = Math.min(
    100,
    Math.max(
      35,
      Math.round(
        phoneticAccuracy * 0.45 +
        accentFlowScore * 0.25 +
        rhythmScore * 0.15 +
        clarityScore * 0.15
      )
    )
  );

  // Syllables breakdown evaluation
  const evaluatedSyllables: SyllableEvaluation[] = syllables.map((syl, idx) => {
    const normSyl = normalizeNouchiPhonetics(syl);
    const inTranscript = transcriptClean.includes(normSyl) || transcriptClean.includes(syl.toLowerCase());
    
    let status: 'perfect' | 'good' | 'needs_work' = 'good';
    if (overallScore >= 85 || (hasTranscript && inTranscript)) {
      status = 'perfect';
    } else if (overallScore < 60 && !inTranscript) {
      status = 'needs_work';
    }

    let hint = `Prononce bien [${syl}]`;
    if (syl.toLowerCase().startsWith('kp')) hint = "Fais claquer le 'KP' avec les deux lèvres";
    else if (syl.toLowerCase().startsWith('gb')) hint = "Fais sonner le 'GB' depuis la gorge";
    else if (syl.toLowerCase().includes('jail')) hint = "Accentue le 'JAIL' avec énergie";
    else if (syl.toLowerCase().includes('tier')) hint = "Allonge le 'TIER' avec fierté";

    return {
      syllable: syl,
      status,
      phoneticHint: hint
    };
  });

  // Street Verdict
  let streetVerdict = {
    title: "Vrai Enfant de Babi 🇨🇮",
    badge: "Accent 100% Validé",
    vibe: "Tu parles comme un authentique habitant de Marcory ou Treichville !",
    color: "from-emerald-500 to-green-600"
  };
  let coachAdvice = "Ton flow est au top ! L'intonation et le tonus nouchi sont parfaitement respectés.";
  let spokenFeedback = `Bravo ! ${overallScore} sur 100. Ton accent est propre comme un vrai môgô de Babi !`;

  if (overallScore >= 90) {
    streetVerdict = {
      title: "Chef du Djassa 🔥",
      badge: "Maître du Nouchi",
      vibe: "Intonation impeccable, frappe des consonnes parfaite !",
      color: "from-amber-400 to-orange-500"
    };
    coachAdvice = "Excellent ! Tu as la cadence exacte du nouchi moderne d'Abidjan.";
    spokenFeedback = `Magnifique ! ${overallScore} sur 100. Tu as le vrai flow de la capitale !`;
  } else if (overallScore >= 75) {
    streetVerdict = {
      title: "Môgô Calé 👌",
      badge: "Très Bon Flow",
      vibe: "Le sens du rythme est là, encore un petit effort sur l'articulation rapide.",
      color: "from-blue-400 to-cyan-500"
    };
    coachAdvice = "Très bonne diction ! Essaie d'accentuer légèrement la dernière syllabe pour donner le punch de la rue.";
    spokenFeedback = `Très bien ! ${overallScore} sur 100. Ton nouchi commence à être bien calé !`;
  } else if (overallScore >= 55) {
    streetVerdict = {
      title: "Débrouillard Courageux ⚡",
      badge: "En Apprentissage",
      vibe: "On comprend le mot, mais le tempo manque un peu de vigueur abidjanaise.",
      color: "from-amber-500 to-yellow-600"
    };
    coachAdvice = "Réécoute l'étalon vocal avec le bouton ralenti pour bien décomposer les sons nasaux avant de réenregistrer.";
    spokenFeedback = `Pas mal ! ${overallScore} sur 100. Réécoute encore l'étalon pour choper le rythme !`;
  } else {
    streetVerdict = {
      title: "Petit Gaou Détecté 😅",
      badge: "Niveau Découverte",
      vibe: "Tu as prononcé avec un accent un peu trop académique ou hésitant !",
      color: "from-rose-500 to-red-600"
    };
    coachAdvice = "Ne sois pas timide ! Lâche-toi, projette ta voix et donne de la vivacité à chaque syllabe.";
    spokenFeedback = `Attention ! ${overallScore} sur 100. Petit gaou détecté, mais on va travailler ça ensemble !`;
  }

  return {
    overallScore,
    phoneticAccuracy,
    accentFlowScore,
    rhythmScore,
    clarityScore,
    streetVerdict,
    syllables: evaluatedSyllables,
    coachAdvice,
    spokenFeedback,
    benchmarkDurationMs,
    userDurationMs
  };
}

/**
 * Calculates real-time precision score during live speech recognition streaming
 */
export function calculateRealTimePrecision(targetWord: string, transcript: string): {
  score: number;
  matchedSyllables: { syllable: string; matched: boolean }[];
  feedback: string;
} {
  const normTarget = normalizeNouchiPhonetics(targetWord);
  const normTrans = normalizeNouchiPhonetics(transcript);
  
  if (!normTrans) {
    return {
      score: 0,
      matchedSyllables: decomposeNouchiSyllables(targetWord).map(s => ({ syllable: s, matched: false })),
      feedback: "Microphone actif • Parlez maintenant face au micro..."
    };
  }

  const similarity = calculateSimilarity(targetWord, transcript);
  let score = Math.round(similarity * 100);

  // Partial match bonus if transcript contains or is contained in target
  if (normTarget.includes(normTrans) || normTrans.includes(normTarget)) {
    const ratio = Math.min(normTrans.length, normTarget.length) / Math.max(normTrans.length, normTarget.length);
    score = Math.max(score, Math.round(ratio * 95));
  }

  // Decompose syllables and test if each syllable sound is present
  const syllables = decomposeNouchiSyllables(targetWord);
  const matchedSyllables = syllables.map(s => {
    const normSyl = normalizeNouchiPhonetics(s);
    return {
      syllable: s,
      matched: normTrans.includes(normSyl) || similarity >= 0.72
    };
  });

  let feedback = "Détection vocale en cours...";
  if (score >= 88) {
    feedback = "Excellent ! Prononciation nouchi impeccable 🔥";
  } else if (score >= 70) {
    feedback = "Très bon accent, intonation validée 👌";
  } else if (score >= 45) {
    feedback = "Bonne amorce, accentuez bien la frappe ivoirienne ⚡";
  } else {
    feedback = "Voix captée, articulez plus distinctement 🎯";
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    matchedSyllables,
    feedback
  };
}

