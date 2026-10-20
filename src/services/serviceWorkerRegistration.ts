// Service Worker Registration and Network Status Management

export type NetworkStatus = 'online' | 'offline';

export interface ServiceWorkerState {
  isRegistered: boolean;
  isOfflineReady: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  cacheSizeEstimated?: string;
}

type StatusCallback = (state: ServiceWorkerState) => void;

class ServiceWorkerManager {
  private listeners: Set<StatusCallback> = new Set();
  private state: ServiceWorkerState = {
    isRegistered: false,
    isOfflineReady: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    hasUpdate: false,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
      this.checkOfflineReadiness();
    }
  }

  public subscribe(callback: StatusCallback): () => void {
    this.listeners.add(callback);
    callback(this.state);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((callback) => callback({ ...this.state }));
  }

  private handleOnline = () => {
    this.state.isOnline = true;
    this.notify();
  };

  private handleOffline = () => {
    this.state.isOnline = false;
    this.notify();
  };

  public async register(): Promise<void> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('[ServiceWorker] Service Workers are not supported in this browser.');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[ServiceWorker] Registered with scope:', registration.scope);
      this.state.isRegistered = true;

      // Check if already active and caching
      if (registration.active) {
        this.state.isOfflineReady = true;
      }

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('[ServiceWorker] New content available; please refresh.');
              this.state.hasUpdate = true;
            } else {
              console.log('[ServiceWorker] Content is cached for offline use.');
              this.state.isOfflineReady = true;
            }
            this.notify();
          }
        });
      });

      this.notify();
      this.estimateCacheStorage();
    } catch (error) {
      console.error('[ServiceWorker] Registration failed:', error);
    }
  }

  public async checkOfflineReadiness(): Promise<boolean> {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return false;
    }

    try {
      const hasCacheV2 = await caches.has('markkanich-nouchipro-v2');
      const hasCacheV1 = await caches.has('markkanich-nouchipro-v1');
      const hasCache = hasCacheV2 || hasCacheV1;
      if (hasCache) {
        this.state.isOfflineReady = true;
        this.notify();
      }
      return hasCache;
    } catch (e) {
      return false;
    }
  }

  public async estimateCacheStorage(): Promise<void> {
    if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        if (estimate.usage) {
          const mb = (estimate.usage / (1024 * 1024)).toFixed(1);
          this.state.cacheSizeEstimated = `${mb} Mo`;
          this.notify();
        }
      } catch (e) {
        // Ignore estimate error
      }
    }
  }

  public async forceCacheAll(): Promise<boolean> {
    if (typeof window === 'undefined' || !('caches' in window)) return false;

    try {
      const cache = await caches.open('markkanich-nouchipro-v2');
      const criticalUrls = ['/', '/index.html', '/logo.jpg', '/manifest.webmanifest'];
      await cache.addAll(criticalUrls);
      this.state.isOfflineReady = true;
      this.notify();
      return true;
    } catch (e) {
      console.error('Failed to pre-cache explicitly:', e);
      return false;
    }
  }
}

export const swManager = new ServiceWorkerManager();
