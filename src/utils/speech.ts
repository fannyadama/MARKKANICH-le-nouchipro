/**
 * Web Speech API (SpeechSynthesis) wrapper for authentic Nouchi & French pronunciation
 * Supports normal, slow-motion phonetics, street flow speed, callbacks and voice detection.
 */

export interface SpeechOptions {
  lang?: string;
  rate?: number; // 0.1 to 10, default 0.95
  pitch?: number; // 0 to 2, default 1.0
  volume?: number; // 0 to 1, default 1.0
  voiceName?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices();
}

export function stopSpeech(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('Speech cancellation error:', e);
    }
  }
}

/**
 * Standard word speech with SpeechSynthesis
 */
export function speakWord(text: string, lang: string = 'fr-FR', rate: number = 0.95, callbacks?: { onStart?: () => void; onEnd?: () => void }) {
  speakNouchiWithStyle(text, 'standard', {
    lang,
    rate,
    onStart: callbacks?.onStart,
    onEnd: callbacks?.onEnd
  });
}

/**
 * High-control pronunciation runner with preconfigured Nouchi vocal styles
 */
export function speakNouchiWithStyle(
  text: string, 
  style: 'standard' | 'slow_phonetic' | 'street_flow' = 'standard',
  options?: SpeechOptions
) {
  if (!isSpeechSynthesisSupported()) {
    options?.onError?.(new Error('SpeechSynthesis non supporté sur ce navigateur'));
    return;
  }

  stopSpeech();

  // Give browser a microtask to settle after cancel()
  setTimeout(() => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);

      let targetRate = options?.rate ?? 0.95;
      let targetPitch = options?.pitch ?? 1.0;

      if (style === 'slow_phonetic') {
        targetRate = options?.rate ?? 0.72;
        targetPitch = options?.pitch ?? 1.05;
      } else if (style === 'street_flow') {
        targetRate = options?.rate ?? 1.15;
        targetPitch = options?.pitch ?? 1.1;
      }

      utterance.lang = options?.lang || 'fr-FR';
      utterance.rate = targetRate;
      utterance.pitch = targetPitch;
      utterance.volume = options?.volume ?? 1.0;

      // Select voice: prioritize French, Canadian or African French accents
      const voices = window.speechSynthesis.getVoices();
      if (options?.voiceName) {
        const found = voices.find(v => v.name.toLowerCase().includes(options.voiceName!.toLowerCase()));
        if (found) utterance.voice = found;
      } else if (voices.length > 0) {
        const frVoice = voices.find(v => v.lang === 'fr-FR' || v.lang.startsWith('fr') || v.name.toLowerCase().includes('french'));
        if (frVoice) {
          utterance.voice = frVoice;
        }
      }

      if (options?.onStart) {
        utterance.onstart = () => options.onStart!();
      }

      utterance.onend = () => {
        if (options?.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis utterance error:', e);
        if (options?.onError) options.onError(e);
        if (options?.onEnd) options.onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('SpeechSynthesis error:', err);
      if (options?.onError) options.onError(err);
      if (options?.onEnd) options.onEnd();
    }
  }, 20);
}
