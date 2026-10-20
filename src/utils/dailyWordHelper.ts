import { NouchiWord, PushNotificationPayload } from '../types';

/**
 * Deterministically computes the Word of the Day based on the calendar date.
 * Guarantees that every user on the same date sees the exact same Word of the Day.
 */
export function getDeterministicDailyWord(allWords: NouchiWord[], targetDate: Date = new Date()): NouchiWord | null {
  if (!allWords || allWords.length === 0) return null;

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  const daySeed = year * 10000 + month * 100 + day;

  let hash = 0;
  const str = `nouchi-word-of-the-day-seed-${daySeed}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  const index = Math.abs(hash) % allWords.length;
  return allWords[index] || allWords[0];
}

/**
 * Formats standard date string for daily word comparisons (YYYY-MM-DD).
 */
export function getDailyDateKey(targetDate: Date = new Date()): string {
  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const d = String(targetDate.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Human readable French date (ex: "Mercredi 2 Septembre")
 */
export function getHumanReadableDate(targetDate: Date = new Date()): string {
  return targetDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

/**
 * Builds the complete Push Notification Payload for a given Nouchi word.
 */
export function buildDailyWordNotificationPayload(
  word: NouchiWord, 
  targetDate: Date = new Date()
): PushNotificationPayload {
  const dateKey = getDailyDateKey(targetDate);
  const title = `🇨🇮 Mot Nouchi du Jour : "${word.term.toUpperCase()}"`;
  
  const bodyText = word.frenchTranslation 
    ? `« ${word.frenchTranslation} » — ${word.definition.length > 90 ? word.definition.slice(0, 87) + '...' : word.definition}`
    : word.definition;

  return {
    title,
    body: bodyText,
    icon: '/logo.jpg',
    badge: '/logo.jpg',
    tag: `nouchi-word-of-the-day-${dateKey}`,
    data: {
      url: `/?word=${encodeURIComponent(word.id)}&source=push_notification&date=${dateKey}`,
      wordId: word.id,
      term: word.term,
      frenchTranslation: word.frenchTranslation || '',
      date: dateKey
    },
    actions: [
      {
        action: 'open_word',
        title: '📖 Découvrir la fiche',
        icon: '/logo.jpg'
      },
      {
        action: 'pronounce_word',
        title: '🔊 Écouter',
        icon: '/logo.jpg'
      },
      {
        action: 'share_word',
        title: '🚀 Partager',
        icon: '/logo.jpg'
      }
    ]
  };
}
