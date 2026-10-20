import { DailyWordNotificationSettings, NouchiWord, PushNotificationPayload, User } from '../types';
import { buildDailyWordNotificationPayload, getDailyDateKey } from '../utils/dailyWordHelper';

const STORAGE_KEY_SETTINGS = 'markkanich_push_notification_settings';
const STORAGE_KEY_LAST_SENT = 'markkanich_push_last_sent_date';

const DEFAULT_SETTINGS: DailyWordNotificationSettings = {
  enabled: false,
  scheduledTime: '08:00',
  soundEnabled: true,
  streakReminder: true,
  categoryPreference: 'all',
  lastNotifiedDate: undefined,
  subscriptionEndpoint: undefined
};

class NotificationService {
  private settings: DailyWordNotificationSettings;
  private timerId: number | null = null;
  private messageListeners: Set<(action: string, data: any) => void> = new Set();

  constructor() {
    this.settings = this.loadSettings();
    this.initServiceWorkerMessageListener();
  }

  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      'serviceWorker' in navigator
    );
  }

  public getPermission(): NotificationPermission {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.saveSettings({ enabled: true });
      } else {
        this.saveSettings({ enabled: false });
      }
      return permission;
    } catch (e) {
      console.warn('[NotificationService] Request permission failed:', e);
      return 'denied';
    }
  }

  public loadSettings(): DailyWordNotificationSettings {
    if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS };
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      // Ignore parse error
    }
    return { ...DEFAULT_SETTINGS };
  }

  public getSettings(): DailyWordNotificationSettings {
    return { ...this.settings };
  }

  public saveSettings(updates: Partial<DailyWordNotificationSettings>): DailyWordNotificationSettings {
    this.settings = { ...this.settings, ...updates };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(this.settings));
      } catch (e) {
        console.warn('Failed to persist notification settings', e);
      }
    }
    return { ...this.settings };
  }

  /**
   * Registers or updates push subscription with the backend
   */
  public async subscribeToPush(user?: User | null): Promise<boolean> {
    if (!this.isSupported()) return false;

    try {
      const reg = await navigator.serviceWorker.ready;
      
      // Attempt to subscribe or get existing push subscription
      let sub: PushSubscription | null = null;
      if ('pushManager' in reg) {
        try {
          sub = await reg.pushManager.getSubscription();
        } catch (e) {
          console.log('[NotificationService] PushManager subscription lookup failed:', e);
        }
      }

      // Send to backend API
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: sub?.endpoint || `local-client-${Date.now()}`,
          keys: sub?.toJSON()?.keys || {},
          userId: user?.id || 'anonymous',
          username: user?.username || 'Nouchiman',
          settings: this.settings
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.saveSettings({
          subscriptionEndpoint: sub?.endpoint || 'local-active'
        });
        return true;
      }
      return true;
    } catch (err) {
      console.warn('[NotificationService] Backend push registration:', err);
      return true; // Still allow local service worker notifications
    }
  }

  /**
   * Sends or simulates an immediate test notification using the Service Worker
   */
  public async sendTestNotification(word: NouchiWord): Promise<boolean> {
    if (!this.isSupported()) return false;

    // Check permission
    let permission = this.getPermission();
    if (permission !== 'granted') {
      permission = await this.requestPermission();
      if (permission !== 'granted') return false;
    }

    const payload = buildDailyWordNotificationPayload(word, new Date());

    try {
      const reg = await navigator.serviceWorker.ready;
      
      // 1. Direct Service Worker showNotification
      const notifOptions: any = {
        body: payload.body,
        icon: payload.icon || '/logo.jpg',
        badge: payload.badge || '/logo.jpg',
        tag: 'nouchi-daily-test-' + Date.now(),
        renotify: true,
        vibrate: [150, 50, 150],
        data: payload.data,
        actions: payload.actions
      };
      await reg.showNotification(payload.title, notifOptions);

      // 2. Notify backend endpoint for analytics
      fetch('/api/notifications/send-daily-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wordId: word.id,
          term: word.term,
          frenchTranslation: word.frenchTranslation,
          isTest: true
        })
      }).catch(() => {});

      return true;
    } catch (e) {
      console.error('[NotificationService] Failed to show test notification:', e);
      return false;
    }
  }

  /**
   * Evaluates if the daily notification should fire today
   */
  public async checkAndTriggerDaily(word: NouchiWord, force: boolean = false): Promise<boolean> {
    if (!this.isSupported()) return false;
    if (this.getPermission() !== 'granted') return false;

    const settings = this.getSettings();
    if (!settings.enabled && !force) return false;

    const todayKey = getDailyDateKey(new Date());
    const lastSent = localStorage.getItem(STORAGE_KEY_LAST_SENT);

    if (!force && lastSent === todayKey) {
      // Already sent today
      return false;
    }

    // Check time condition (e.g. current hour:minute >= scheduledTime)
    if (!force && settings.scheduledTime) {
      const now = new Date();
      const [schedH, schedM] = settings.scheduledTime.split(':').map(Number);
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const schedMinutes = (schedH || 8) * 60 + (schedM || 0);

      if (currentMinutes < schedMinutes) {
        // Not time yet
        return false;
      }
    }

    // Fire Notification via Service Worker
    const payload = buildDailyWordNotificationPayload(word, new Date());
    try {
      const reg = await navigator.serviceWorker.ready;
      const notifOptions: any = {
        body: payload.body,
        icon: payload.icon || '/logo.jpg',
        badge: payload.badge || '/logo.jpg',
        tag: `nouchi-daily-word-${todayKey}`,
        renotify: true,
        vibrate: [200, 100, 200],
        data: payload.data,
        actions: payload.actions
      };
      await reg.showNotification(payload.title, notifOptions);

      localStorage.setItem(STORAGE_KEY_LAST_SENT, todayKey);
      this.saveSettings({ lastNotifiedDate: todayKey });
      return true;
    } catch (err) {
      console.warn('[NotificationService] Trigger daily notification failed:', err);
      return false;
    }
  }

  /**
   * Sets up an active scheduler that checks periodically (every 60s)
   */
  public startScheduleWatcher(getWordCallback: () => NouchiWord | null): () => void {
    if (typeof window === 'undefined') return () => {};

    if (this.timerId) {
      window.clearInterval(this.timerId);
    }

    const check = () => {
      const word = getWordCallback();
      if (word) {
        this.checkAndTriggerDaily(word, false);
      }
    };

    // Run initial check
    check();

    // Check every 60 seconds
    this.timerId = window.setInterval(check, 60000);

    return () => {
      if (this.timerId) {
        window.clearInterval(this.timerId);
        this.timerId = null;
      }
    };
  }

  /**
   * Handles messages sent from the Service Worker when a notification or action button is clicked
   */
  private initServiceWorkerMessageListener() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'NOTIFICATION_ACTION_CLICKED') {
        const { action, data } = event.data;
        this.messageListeners.forEach((listener) => {
          try {
            listener(action, data);
          } catch (e) {
            console.error('Notification click listener error:', e);
          }
        });
      }
    });
  }

  public onNotificationAction(callback: (action: string, data: any) => void): () => void {
    this.messageListeners.add(callback);
    return () => this.messageListeners.delete(callback);
  }
}

export const notificationService = new NotificationService();
