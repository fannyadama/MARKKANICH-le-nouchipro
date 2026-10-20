/**
 * Haptic feedback utility utilizing the HTML5 Vibration API (navigator.vibrate).
 * Provides responsive tactile feedback for mobile and PWA interactions:
 * - Word & comment likes
 * - Adding/removing favorite words (lexicon bookmarks)
 * - Quiz answers (success & error patterns)
 * - Quiz completion celebrations
 */

export type HapticType = 
  | 'like' 
  | 'unlike' 
  | 'favorite_add' 
  | 'favorite_remove' 
  | 'quiz_correct' 
  | 'quiz_wrong' 
  | 'quiz_finish_success' 
  | 'quiz_finish_standard'
  | 'tap'
  | 'selection'
  | 'warning'
  | 'celebration';

// Standardized millisecond vibration patterns (optimized for tactile clarity without being jarring)
const HAPTIC_PATTERNS: Record<HapticType, number | number[]> = {
  // Snappy double-tap heart pulse
  like: [35, 30, 45],
  // Subtle soft release
  unlike: 20,
  // Uplifting ascending pulse
  favorite_add: [30, 40, 65],
  // Brief single pulse
  favorite_remove: 25,
  // Triumphant sharp double-pulse
  quiz_correct: [45, 35, 75],
  // Dissonant alert warning pattern
  quiz_wrong: [100, 45, 100],
  // Victory fanfare pattern
  quiz_finish_success: [60, 40, 60, 40, 140],
  quiz_finish_standard: [80, 50, 80],
  // Ultra-light tactile click
  tap: 15,
  // Clean UI selection
  selection: 25,
  // Subtle alert warning
  warning: [60, 40, 80],
  // High-energy celebration
  celebration: [70, 40, 70, 40, 70, 40, 180],
};

const STORAGE_KEY = 'markkanich_haptics_enabled';

class HapticManager {
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          this.isEnabled = stored === 'true';
        } else {
          // Default enabled unless user explicitly prefers reduced motion
          const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
          this.isEnabled = !prefersReduced;
        }
      } catch {
        this.isEnabled = true;
      }
    }
  }

  /**
   * Check if the device/browser supports the Vibration API
   */
  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function';
  }

  /**
   * Get current preference state
   */
  public getEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Toggle or set user preference
   */
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, String(enabled));
      } catch {
        // Ignore storage errors
      }
    }
    // Provide a subtle feedback pulse when enabled
    if (enabled && this.isSupported()) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore
      }
    }
  }

  /**
   * Trigger a vibration pattern by key
   */
  public trigger(type: HapticType): boolean {
    if (!this.isEnabled || !this.isSupported()) {
      return false;
    }

    try {
      const pattern = HAPTIC_PATTERNS[type];
      return navigator.vibrate(pattern);
    } catch (e) {
      console.debug('[Haptics] Vibration not executed or blocked by browser policy:', e);
      return false;
    }
  }

  // Convenient semantic helper methods
  public like(isLikedNow: boolean): boolean {
    return this.trigger(isLikedNow ? 'like' : 'unlike');
  }

  public favorite(isAddedNow: boolean): boolean {
    return this.trigger(isAddedNow ? 'favorite_add' : 'favorite_remove');
  }

  public quizAnswer(isCorrect: boolean): boolean {
    return this.trigger(isCorrect ? 'quiz_correct' : 'quiz_wrong');
  }

  public quizFinish(isSuccess: boolean): boolean {
    return this.trigger(isSuccess ? 'quiz_finish_success' : 'quiz_finish_standard');
  }
}

export const hapticManager = new HapticManager();
export const triggerHaptic = (type: HapticType) => hapticManager.trigger(type);
