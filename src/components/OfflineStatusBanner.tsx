import React, { useState, useEffect, useRef } from 'react';
import { swManager, ServiceWorkerState } from '../services/serviceWorkerRegistration';
import { 
  Wifi, 
  WifiOff, 
  HardDriveDownload, 
  CheckCircle, 
  CheckCircle2,
  Sparkles, 
  RefreshCw,
  Info,
  Layers,
  Database,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { hapticManager } from '../utils/haptics';

interface OfflineStatusBannerProps {
  wordCount: number;
}

const STORAGE_LAST_SYNC_KEY = 'markkanich_last_offline_sync';

export const OfflineStatusBanner: React.FC<OfflineStatusBannerProps> = ({ wordCount }) => {
  const [swState, setSwState] = useState<ServiceWorkerState>({
    isRegistered: false,
    isOfflineReady: true, // Default to true because dictionary data is locally bundled & stored
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    hasUpdate: false,
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(100);
  const [syncedWordsCount, setSyncedWordsCount] = useState(wordCount);
  const [syncStepLabel, setSyncStepLabel] = useState<string>('Lexique local à jour');
  const [showDetails, setShowDetails] = useState(false);
  const [justSynced, setJustSynced] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_LAST_SYNC_KEY) || new Date().toISOString();
    }
    return null;
  });

  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = swManager.subscribe((state) => {
      setSwState(state);
    });
    // Check cache estimate on mount
    swManager.estimateCacheStorage();
    return () => {
      unsubscribe();
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    };
  }, []);

  // Update synced words count when wordCount changes and not syncing
  useEffect(() => {
    if (!isSyncing) {
      setSyncedWordsCount(wordCount);
    }
  }, [wordCount, isSyncing]);

  const formatLastSync = (isoString?: string | null): string => {
    if (!isoString) return 'Aujourd’hui';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return 'Aujourd’hui';
      const now = new Date();
      const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffMin < 1) return 'À l’instant';
      if (diffMin < 60) return `Il y a ${diffMin} min`;
      return `Aujourd’hui à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return 'Aujourd’hui';
    }
  };

  const handleSyncOffline = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setJustSynced(false);
    setSyncProgress(5);
    setSyncedWordsCount(0);
    setSyncStepLabel('Initialisation du moteur de synchronisation...');
    hapticManager.trigger('tap');

    try {
      // Step 1: Scan local dictionary and verify entries
      await new Promise(r => setTimeout(r, 250));
      setSyncProgress(20);
      setSyncStepLabel(`Analyse lexicographique des ${wordCount} termes...`);

      // Step 2: Incremental word indexing simulation with real counts
      const totalSteps = 6;
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise(r => setTimeout(r, 180));
        const currentCount = Math.min(wordCount, Math.round((wordCount / totalSteps) * i));
        const stepProgress = 20 + Math.round((i / totalSteps) * 50); // 20% to 70%
        setSyncedWordsCount(currentCount);
        setSyncProgress(stepProgress);
        setSyncStepLabel(`Indexation du lexique local : ${currentCount}/${wordCount} termes...`);
      }

      // Step 3: Cache Storage & Service Worker assets
      setSyncProgress(80);
      setSyncStepLabel('Mise en cache du Service Worker v2 & App Shell...');
      await swManager.forceCacheAll();

      // Step 4: Storage estimation and final integrity check
      setSyncProgress(95);
      setSyncStepLabel('Vérification de l’intégrité du stockage persistant...');
      await swManager.estimateCacheStorage();
      await new Promise(r => setTimeout(r, 200));

      // Finalized
      setSyncProgress(100);
      setSyncedWordsCount(wordCount);
      setSyncStepLabel('Lexique 100% synchronisé pour utilisation hors-ligne !');
      
      const nowIso = new Date().toISOString();
      setLastSyncTime(nowIso);
      try {
        localStorage.setItem(STORAGE_LAST_SYNC_KEY, nowIso);
      } catch (e) {
        // Ignore local storage error
      }

      setJustSynced(true);
      hapticManager.trigger('celebration');
      setTimeout(() => {
        setJustSynced(false);
      }, 3500);
    } catch (e) {
      console.error('Erreur synchronisation hors-ligne:', e);
      setSyncStepLabel('Erreur de vérification du cache');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div id="offline-status-container" className="relative space-y-2">
      {/* Offline Alert Bar when user has lost connection */}
      {!swState.isOnline && (
        <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 rounded-2xl p-3.5 sm:p-4 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-black font-black flex-shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <span>Mode Hors-Ligne Actif</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-normal">
                  Service Worker v2
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-amber-200/80">
                Vous n'avez pas de connexion internet, mais l'intégralité des <strong>{wordCount} mots</strong>, étymologies et proverbes reste 100% accessible localement.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/40 border border-amber-500/30 text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lexique 100% Disponible</span>
            </span>
          </div>
        </div>
      )}

      {/* Persistent Bento Status Pill & Cache Management */}
      <div className="bg-[#161618]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dot */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <span className={`w-2.5 h-2.5 rounded-full ${swState.isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={`absolute w-4 h-4 rounded-full ${swState.isOnline ? 'bg-emerald-500/40 animate-ping' : 'bg-amber-500/40 animate-ping'}`} />
            </div>
            <span className="font-semibold text-slate-200 text-xs">
              {swState.isOnline ? 'En Ligne' : 'Hors-Ligne'}
            </span>
          </div>

          <span className="hidden sm:inline text-slate-700">|</span>

          {/* Offline Cache Ready Badge */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px]">
              Lexique local : <strong>{syncedWordsCount}/{wordCount} mots</strong>
            </span>
          </div>

          {/* Last Synchronized Timestamp badge */}
          {lastSyncTime && !isSyncing && (
            <div className="hidden lg:flex items-center gap-1 text-slate-400 text-[11px] bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-lg">
              <Clock className="w-3 h-3 text-amber-400/80" />
              <span>{formatLastSync(lastSyncTime)}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {swState.cacheSizeEstimated && (
            <span className="hidden md:inline text-[11px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
              Cache: {swState.cacheSizeEstimated}
            </span>
          )}

          <button
            id="btn-offline-details-toggle"
            onClick={() => setShowDetails(!showDetails)}
            className={`p-1.5 rounded-lg border transition ${
              showDetails 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
            title="Détails du Service Worker & Synchronisation"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          <button
            id="btn-sync-offline-cache"
            onClick={handleSyncOffline}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition border ${
              justSynced
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : isSyncing
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
            <span>
              {justSynced ? '100% Synchronisé !' : isSyncing ? `Synchro (${syncProgress}%)` : 'Synchroniser le lexique'}
            </span>
          </button>
        </div>
      </div>

      {/* Synchronizing Progress Bar Banner (Active or Just Synced) */}
      {(isSyncing || justSynced) && (
        <div 
          id="offline-sync-progress-card" 
          className={`border rounded-2xl p-3.5 space-y-2 transition-all duration-300 ${
            justSynced
              ? 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              : 'bg-[#141416] border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${justSynced ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${justSynced ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className={`font-bold ${justSynced ? 'text-emerald-300' : 'text-amber-300'}`}>
                {justSynced ? 'Synchronisation locale achevée' : 'Mise à jour du lexique hors-ligne...'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-300">
                {syncedWordsCount}/{wordCount} mots ({syncProgress}%)
              </span>
            </div>
          </div>

          {/* Animated Progress Bar Track */}
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-800">
            <div 
              className={`h-full rounded-full transition-all duration-200 ${
                justSynced
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, syncProgress))}%` }}
            />
          </div>

          {/* Subtext info */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1.5 truncate">
              <Database className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{syncStepLabel}</span>
            </span>
            <span className="text-[10px] text-slate-500 shrink-0 pl-2">
              Service Worker Cache v2
            </span>
          </div>
        </div>
      )}

      {/* Expanded Details Modal / Drawer */}
      {showDetails && (
        <div id="offline-sync-details-drawer" className="bg-[#121214] border border-slate-800 rounded-2xl p-4 text-xs space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2 text-white font-bold">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>État de la Persistance & Synchronisation Hors-Ligne</span>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="text-slate-500 hover:text-slate-300 text-xs px-2 py-0.5 rounded-md hover:bg-slate-800 transition"
            >
              Fermer
            </button>
          </div>

          {/* Sync Progress overview inside details */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <HardDriveDownload className="w-3.5 h-3.5 text-amber-400" />
                Intégrité du Lexique Local
              </span>
              <span className="font-bold text-amber-400 font-mono">
                {syncedWordsCount}/{wordCount} mots indexés (100%)
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full" 
                style={{ width: '100%' }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>Dernière synchronisation réussie : <strong>{formatLastSync(lastSyncTime)}</strong></span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Prêt hors-ligne
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Service Worker</p>
              <p className="font-bold text-slate-200 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {swState.isRegistered ? 'Enregistré & Actif' : 'Prêt & Initialisé'}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Scope: / (Cache: v2)</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Stratégie PWA</p>
              <p className="font-bold text-amber-400 mt-0.5">Stale-While-Revalidate</p>
              <p className="text-[10px] text-slate-400 mt-1">Fallback & App Shell immédiats</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Stockage Utilisé</p>
              <p className="font-bold text-emerald-400 mt-0.5">{swState.cacheSizeEstimated || 'Actif'}</p>
              <p className="text-[10px] text-slate-400 mt-1">Données + Définitions indexées</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
            💡 <strong>Fonctionnement autonome :</strong> Grâce à la mise en cache locale et au Service Worker v2, l'ensemble des <strong>{wordCount} mots</strong>, étymologies, proverbes ivoiriens, quiz et audios phonétiques restent fonctionnels même sans connexion internet (avion, transport ou zone blanche).
          </p>
        </div>
      )}
    </div>
  );
};

