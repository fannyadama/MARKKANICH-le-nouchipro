import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  BellOff, 
  X, 
  Check, 
  Clock, 
  Sparkles, 
  Volume2, 
  Flame, 
  Send, 
  Smartphone, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { NouchiWord, User, DailyWordNotificationSettings, Category } from '../types';
import { notificationService } from '../services/notificationService';
import { buildDailyWordNotificationPayload } from '../utils/dailyWordHelper';

interface DailyWordNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDailyWord: NouchiWord | null;
  user: User | null;
  onAwardBonusPoints?: (points: number, reason: string) => void;
  onSelectWord?: (word: NouchiWord) => void;
}

const TIME_PRESETS = [
  { time: '07:00', label: '07:00 (Réveil & Premier Thé)', icon: '🌅' },
  { time: '08:30', label: '08:30 (En route dans le Gbaka / Wôrô)', icon: '🚌' },
  { time: '12:30', label: '12:30 (Pause Garba & Midi)', icon: '🍲' },
  { time: '19:30', label: '19:30 (Détente du Soir à Babi)', icon: '🌙' },
];

export const DailyWordNotificationModal: React.FC<DailyWordNotificationModalProps> = ({
  isOpen,
  onClose,
  currentDailyWord,
  user,
  onAwardBonusPoints,
  onSelectWord
}) => {
  const [settings, setSettings] = useState<DailyWordNotificationSettings>(notificationService.getSettings());
  const [permission, setPermission] = useState<NotificationPermission>(notificationService.getPermission());
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isTesting, setIsTesting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSettings(notificationService.getSettings());
      setPermission(notificationService.getPermission());
      setIsSupported(notificationService.isSupported());
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleEnable = async () => {
    if (!settings.enabled) {
      // User is trying to enable
      let currentPerm = notificationService.getPermission();
      if (currentPerm !== 'granted') {
        currentPerm = await notificationService.requestPermission();
        setPermission(currentPerm);
        if (currentPerm !== 'granted') {
          showToast('⚠️ Autorisation refusée dans le navigateur.');
          return;
        }
      }
      
      const newSettings = notificationService.saveSettings({ enabled: true });
      setSettings(newSettings);
      notificationService.subscribeToPush(user);
      showToast('🔔 Notifications quotidiennes activées à ' + newSettings.scheduledTime + ' !');
      
      if (onAwardBonusPoints && user) {
        onAwardBonusPoints(15, 'Activation du Mot du Jour quotidien');
      }
    } else {
      // User is disabling
      const newSettings = notificationService.saveSettings({ enabled: false });
      setSettings(newSettings);
      showToast('🔕 Notifications désactivées.');
    }
  };

  const handleTimeChange = (newTime: string) => {
    const newSettings = notificationService.saveSettings({ scheduledTime: newTime });
    setSettings(newSettings);
    notificationService.subscribeToPush(user);
    showToast(`⏰ Heure fixée à ${newTime}`);
  };

  const handleOptionToggle = (key: keyof DailyWordNotificationSettings) => {
    const updated = { [key]: !settings[key] };
    const newSettings = notificationService.saveSettings(updated);
    setSettings(newSettings);
  };

  const handleSendTest = async () => {
    if (!currentDailyWord) return;
    setIsTesting(true);

    try {
      const success = await notificationService.sendTestNotification(currentDailyWord);
      if (success) {
        showToast('🚀 Notification push envoyée via le Service Worker !');
      } else {
        showToast('⚠️ Impossible d\'afficher la notification. Vérifiez vos permissions.');
      }
    } catch (err) {
      showToast('❌ Erreur lors du test de notification.');
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  const previewPayload = currentDailyWord 
    ? buildDailyWordNotificationPayload(currentDailyWord, new Date())
    : null;

  return (
    <AnimatePresence>
      <div 
        id="daily-word-notif-modal-overlay"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      >
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-2 rounded-full font-black text-xs shadow-2xl flex items-center gap-2 z-50 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        <motion.div
          id="daily-word-notif-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#121214] border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.25)] flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="relative bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 p-6 text-black">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-black flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-amber-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                <Bell className="w-3 h-3" /> Service Worker Push
              </span>
              <span className="text-black/80 font-bold text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> +15 XP à l'activation
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-black">
              LE MOT DU JOUR CHAQUE MATIN 🇨🇮
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-black/90 mt-1 max-w-lg">
              Recevez automatiquement l'expression culte de Babi sur votre smartphone ou ordinateur pour enrichir votre vocabulaire et booster votre série d'apprentissage.
            </p>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Warning if notifications blocked by browser */}
            {permission === 'denied' && (
              <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-4 flex items-start gap-3 text-xs text-red-300">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-200">Notifications bloquées par le navigateur</h4>
                  <p className="mt-1 text-red-300/80">
                    Vous avez précédemment bloqué les notifications. Pour les réactiver, cliquez sur l'icône de cadenas ou de paramètres à gauche de la barre d'adresse de votre navigateur et autorisez les notifications pour ce site.
                  </p>
                </div>
              </div>
            )}

            {/* Master Activation Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  settings.enabled ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
                }`}>
                  {settings.enabled ? <Bell className="w-6 h-6 animate-pulse" /> : <BellOff className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span>Notifications Quotidiennes du Nouchi</span>
                    {settings.enabled && (
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Actif à {settings.scheduledTime}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Envoyé en arrière-plan via Service Worker même si l'application est fermée
                  </p>
                </div>
              </div>

              <button
                id="btn-toggle-daily-push"
                onClick={handleToggleEnable}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                  settings.enabled
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:scale-105 shadow-amber-500/20'
                }`}
              >
                {settings.enabled ? (
                  <>
                    <BellOff className="w-4 h-4" />
                    <span>Désactiver</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4" />
                    <span>Activer maintenant</span>
                  </>
                )}
              </button>
            </div>

            {/* Heure de Réception (Time Schedule) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Heure de réception quotidienne</span>
                </label>
                <span className="text-xs font-mono text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-slate-800">
                  {settings.scheduledTime} GMT
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIME_PRESETS.map((preset) => {
                  const isSelected = settings.scheduledTime === preset.time;
                  return (
                    <button
                      key={preset.time}
                      onClick={() => handleTimeChange(preset.time)}
                      className={`p-3 rounded-xl text-left text-xs font-bold transition flex items-center justify-between border ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{preset.icon}</span>
                        <span>{preset.label}</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Time Picker */}
              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                <span className="text-xs text-slate-400">Ou personnaliser l'heure exacte :</span>
                <input
                  type="time"
                  value={settings.scheduledTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="bg-black border border-slate-700 text-amber-400 font-mono text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Options d'Apprentissage
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleOptionToggle('soundEnabled')}
                  className={`p-3 rounded-xl text-left text-xs font-medium flex items-center justify-between border transition ${
                    settings.soundEnabled
                      ? 'bg-slate-900 border-amber-500/40 text-slate-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Prononciation audio au clic</span>
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${settings.soundEnabled ? 'border-amber-400 bg-amber-400 text-black' : 'border-slate-600'}`}>
                    {settings.soundEnabled && <Check className="w-3 h-3" />}
                  </div>
                </button>

                <button
                  onClick={() => handleOptionToggle('streakReminder')}
                  className={`p-3 rounded-xl text-left text-xs font-medium flex items-center justify-between border transition ${
                    settings.streakReminder
                      ? 'bg-slate-900 border-amber-500/40 text-slate-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>Rappel de série d'apprentissage (Streak)</span>
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${settings.streakReminder ? 'border-amber-400 bg-amber-400 text-black' : 'border-slate-600'}`}>
                    {settings.streakReminder && <Check className="w-3 h-3" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Live Notification Preview (Simulator) */}
            {previewPayload && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Aperçu en direct sur votre écran</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">Bannière Push Système</span>
                </div>

                <div className="bg-[#18181b] border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/logo.jpg" 
                      alt="Logo Markkanich" 
                      className="w-10 h-10 rounded-xl object-contain p-0.5 bg-slate-950 border border-amber-500/50 shrink-0" 
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('markkanich_logo.jpg')) {
                          target.src = '/markkanich_logo.jpg';
                        }
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span>Markkanich Le NouchiPro</span>
                          <span>•</span>
                          <span>{settings.scheduledTime}</span>
                        </span>
                        <span className="text-[10px] text-amber-400 font-mono">Push</span>
                      </div>
                      <h5 className="text-xs font-black text-white mt-0.5 truncate">
                        {previewPayload.title}
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                        {previewPayload.body}
                      </p>

                      {/* Interactive Action Chips */}
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                          📖 Voir la fiche
                        </span>
                        <span className="bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                          🔊 Écouter
                        </span>
                        <span className="bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                          🚀 Partager
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Test Trigger Button */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Tester immédiatement
                </span>
                <p className="text-[11px] text-slate-400">
                  Déclenche instantanément la notification push système du mot du jour via le Service Worker.
                </p>
              </div>

              <button
                id="btn-test-push-now"
                onClick={handleSendTest}
                disabled={isTesting || !currentDailyWord}
                className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition shrink-0 shadow-lg shadow-amber-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isTesting ? 'Envoi...' : 'Tester la notification'}</span>
              </button>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-black/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Respect de la vie privée • Zéro spam garanti</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
