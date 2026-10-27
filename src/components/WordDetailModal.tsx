import React, { useState, useRef, useEffect } from 'react';
import { NouchiWord, User } from '../types';
import { speakWord } from '../utils/speech';
import { CommentSection } from './CommentSection';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  Languages, 
  Layers, 
  Share2,
  BookOpen,
  Heart,
  Edit,
  Trash2,
  UserCheck,
  Mic,
  MicOff,
  Play,
  Square,
  Activity,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { calculateRealTimePrecision, decomposeNouchiSyllables } from '../utils/pronunciationComparator';
import { hapticManager } from '../utils/haptics';

interface WordDetailModalProps {
  word: NouchiWord | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (wordId: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLikeWord: (wordId: string) => void;
  isLiked?: boolean;
  likesCount?: number;
  onEditWord?: (word: NouchiWord) => void;
  onDeleteWord?: (wordId: string) => void;
  onTestPronunciation?: (word: NouchiWord) => void;
  onOpenStoryCard?: (word: NouchiWord) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  user,
  onOpenAuth,
  onLikeWord,
  isLiked = false,
  likesCount = 0,
  onEditWord,
  onDeleteWord,
  onTestPronunciation,
  onOpenStoryCard
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Live Voice Practice & Real-time Precision Scoring States
  const [showVoiceCoach, setShowVoiceCoach] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [micError, setMicError] = useState<string | null>(null);
  const [realTimePrecision, setRealTimePrecision] = useState<{
    score: number;
    matchedSyllables: { syllable: string; matched: boolean }[];
    feedback: string;
  } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<any>(null);
  const speechRecognitionRef = useRef<any>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Reset voice state when word changes or modal closes
  useEffect(() => {
    if (!isOpen) {
      stopVoiceRecording();
      setShowVoiceCoach(false);
      setRecordedAudioUrl(null);
      setUserTranscript('');
      setRealTimePrecision(null);
    }
  }, [isOpen, word?.id]);

  if (!isOpen || !word) return null;

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    speakWord(word.term);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleCopyCard = () => {
    const textToCopy = `✨ ${word.term} [${word.phonetic || ''}]\n📚 Définition : ${word.frenchTranslation}\n💡 Exemple : "${word.examples[0]?.nouchi || ''}" (${word.examples[0]?.french || ''})\n\nAppris sur Markkanich Le NouchiPro 🇨🇮`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startVoiceRecording = async () => {
    hapticManager.trigger('selection');
    setMicError(null);
    setUserTranscript('');
    setRecordedAudioUrl(null);
    setRealTimePrecision({
      score: 0,
      matchedSyllables: decomposeNouchiSyllables(word.term).map(s => ({ syllable: s, matched: false })),
      feedback: `Microphone actif • Prononcez « ${word.term} » maintenant...`
    });
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true }
      });

      // Initialize Web Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'fr-FR';
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.maxAlternatives = 3;

          recognition.onresult = (event: any) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              transcript += event.results[i][0].transcript;
            }
            if (transcript) {
              const clean = transcript.trim();
              setUserTranscript(clean);
              const rt = calculateRealTimePrecision(word.term, clean);
              setRealTimePrecision(rt);
              if (rt.score >= 80) {
                hapticManager.trigger('selection');
              }
            }
          };

          recognition.onerror = (e: any) => {
            console.warn('SpeechRecognition error:', e);
            if (e.error === 'not-allowed') {
              setMicError("Microphone non autorisé.");
            }
          };

          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (e) {
          console.warn('SpeechRecognition exception:', e);
        }
      }

      // Initialize MediaRecorder
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      recordTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 5) {
            stopVoiceRecording();
            return 5;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err: any) {
      console.error('Mic access failed:', err);
      setMicError("Accès au microphone refusé. Autorisez le micro dans votre navigateur.");
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    hapticManager.trigger('tap');
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleTogglePlayRecording = () => {
    if (!recordedAudioUrl) return;
    if (isPlayingRecording && userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      setIsPlayingRecording(false);
      return;
    }

    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingRecording(true);
    audio.play().catch(() => {});
    audio.onended = () => setIsPlayingRecording(false);
    audio.onerror = () => setIsPlayingRecording(false);
  };

  const canEdit = !!user && (user.role === 'admin' || (word.contributedBy && word.contributedBy.id === user.id));

  return (
    <div 
      id="modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id={`modal-card-${word.id}`}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161618] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
                {word.grammaticalCategory}
              </span>
              {word.officialStatus && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
                  <Award className="w-3 h-3 text-emerald-400" />
                  {word.officialStatus} {word.officialYear ? `(${word.officialYear})` : ''}
                </span>
              )}
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                Origine : {word.originLanguage}
              </span>
              {word.contributedBy && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <UserCheck className="w-3 h-3 text-amber-400" />
                  Par @{word.contributedBy.username}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mt-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {word.term}
              </h2>
              {word.phonetic && (
                <span className="text-sm font-mono text-slate-500">
                  {word.phonetic}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Like button */}
            <button
              id={`btn-like-${word.id}`}
              onClick={() => onLikeWord(word.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl border transition-all ${
                isLiked
                  ? 'bg-rose-950/80 text-rose-400 border-rose-800 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400'
              }`}
              title="Aimer ce mot"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span className="text-xs">{likesCount}</span>
            </button>

            {/* Audio Listen */}
            <button
              id={`btn-listen-${word.id}`}
              onClick={handlePlayAudio}
              className={`p-2.5 rounded-2xl border transition-all ${
                isPlayingAudio 
                  ? 'bg-amber-500 text-black border-amber-500 scale-105 shadow-md' 
                  : 'bg-slate-900 text-amber-400 border-slate-800 hover:bg-amber-500 hover:text-black'
              }`}
              title="Écouter la prononciation"
            >
              <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
            </button>

            {/* Test Voice Pronunciation Button */}
            {/* Test Voice Pronunciation Button */}
            <button
              id={`btn-pronounce-${word.id}`}
              onClick={() => {
                const nextState = !showVoiceCoach;
                setShowVoiceCoach(nextState);
                hapticManager.trigger('selection');
                if (nextState && !isRecording) {
                  startVoiceRecording();
                } else if (!nextState && isRecording) {
                  stopVoiceRecording();
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer border ${
                showVoiceCoach
                  ? 'bg-amber-500 text-black border-amber-500 font-black shadow-md'
                  : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500 hover:to-orange-500 hover:text-black text-amber-400 border border-amber-500/40'
              }`}
              title="Tester ma voix au micro avec score de précision en temps réel"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>{showVoiceCoach ? 'Masquer le coach' : 'Tester ma voix'}</span>
            </button>

            {/* Story Card Generator Button */}
            {onOpenStoryCard && (
              <button
                id={`btn-story-${word.id}`}
                onClick={() => onOpenStoryCard(word)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 hover:from-pink-500 hover:to-amber-500 hover:text-black text-amber-300 border border-amber-500/40"
                title="Générer une image Story HD pour Statut WhatsApp & Instagram"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Story HD</span>
              </button>
            )}

            {/* Bookmark */}
            <button
              id={`btn-bookmark-${word.id}`}
              onClick={() => onToggleBookmark(word.id)}
              className={`p-2.5 rounded-2xl border transition-all ${
                isBookmarked
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title={isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>

            {/* Can Edit & Delete Actions */}
            {canEdit && (
              <>
                {onEditWord && (
                  <button
                    onClick={() => {
                      onClose();
                      onEditWord(word);
                    }}
                    className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800 hover:bg-slate-800 transition"
                    title="Modifier ce mot"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {onDeleteWord && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Voulez-vous vraiment supprimer « ${word.term} » ?`)) {
                        onDeleteWord(word.id);
                        onClose();
                      }
                    }}
                    className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800 hover:bg-slate-800 transition"
                    title="Supprimer ce mot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}

            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 pt-5">
          {/* Live Voice Pronunciation Studio & Precision Scorer */}
          {showVoiceCoach && (
            <div 
              id="voice-coach-live-panel"
              className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-[#18181b] to-slate-950 border-2 border-amber-500/70 shadow-[0_0_35px_rgba(245,158,11,0.25)] space-y-4 animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500 text-black font-black">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                      <span>Coach Vocal en Direct • Précision Phonétique</span>
                      {isRecording && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          00:0{recordingSeconds}s
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Répétez <strong className="text-amber-400">« {word.term} »</strong> au micro pour mesurer votre accent en temps réel.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onTestPronunciation && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onTestPronunciation(word);
                      }}
                      className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold hidden sm:flex"
                    >
                      <span>Studio Avancé</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      stopVoiceRecording();
                      setShowVoiceCoach(false);
                    }}
                    className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Real-Time Precision Gauge & Meter */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Score de Précision Phonétique :</span>
                  </span>

                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-black font-mono transition-colors ${
                      (realTimePrecision?.score || 0) >= 80 ? 'text-emerald-400' :
                      (realTimePrecision?.score || 0) >= 50 ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      {realTimePrecision?.score || 0}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">/ 100</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      (realTimePrecision?.score || 0) >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                      (realTimePrecision?.score || 0) >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                      'bg-gradient-to-r from-rose-500 to-red-400'
                    }`}
                    style={{ width: `${Math.max(6, realTimePrecision?.score || 0)}%` }}
                  />
                </div>

                {/* Syllable comparison */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Découpage :</span>
                  {(realTimePrecision?.matchedSyllables || decomposeNouchiSyllables(word.term).map(s => ({ syllable: s, matched: false }))).map((syl, i) => (
                    <span
                      key={i}
                      className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-lg border transition-all ${
                        syl.matched 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 scale-105 shadow-sm' 
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {syl.syllable} {syl.matched ? '✓' : ''}
                    </span>
                  ))}
                </div>

                {/* Recognized Speech Transcript */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    {userTranscript ? (
                      <>Reconnaissance vocale : <strong className="text-emerald-300 font-bold">« {userTranscript} »</strong></>
                    ) : (
                      <span className="text-slate-500 italic">Parlez dans le micro pour afficher la transcription...</span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Web Speech API</span>
                </div>

                {realTimePrecision?.feedback && (
                  <p className="text-xs text-amber-300 font-medium italic">
                    {realTimePrecision.feedback}
                  </p>
                )}

                {micError && (
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{micError}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Record / Stop / Playback */}
              <div className="flex items-center gap-2.5 pt-1">
                {isRecording ? (
                  <button
                    type="button"
                    onClick={stopVoiceRecording}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse cursor-pointer"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>Arrêter l'enregistrement</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{recordedAudioUrl ? 'Réessayer une tentative' : 'Commencer l\'enregistrement au micro'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePlayAudio}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Écouter la voix de référence étalon"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Étalon</span>
                </button>

                {recordedAudioUrl && (
                  <button
                    type="button"
                    onClick={handleTogglePlayRecording}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    title={isPlayingRecording ? "Pause" : "Réécouter mon enregistrement"}
                  >
                    {isPlayingRecording ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>Mon audio</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Main Meaning */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Signification en Français Standard
            </h4>
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {word.frenchTranslation}
            </p>
            {word.literalMeaning && (
              <p className="text-xs text-amber-400/80 mt-1 italic">
                Sens littéral : {word.literalMeaning}
              </p>
            )}
          </div>

          {/* Extended Definition */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2">
              Définition Détaillée & Nuance Culturelle
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {word.definition}
            </p>
          </div>

          {/* Etymology & Origins */}
          {word.etymologyDetails && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500 mb-1 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-amber-500" />
                Étymologie & Origine Linguistique
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {word.etymologyDetails}
              </p>
            </div>
          )}

          {/* Examples in Real Situations */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Exemples en Contexte Réel d'Abidjan
            </h4>
            <div className="space-y-3">
              {word.examples.map((ex, index) => (
                <div 
                  key={index}
                  className="p-3.5 rounded-2xl bg-slate-900 border-l-4 border-l-amber-500 border border-slate-800"
                >
                  <p className="text-sm font-medium text-white italic">
                    « {ex.nouchi} »
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    ➡️ {ex.french}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {word.synonyms && word.synonyms.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Synonymes & Équivalents
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.synonyms.map((syn, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {word.tags && word.tags.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2">
                  Thématiques & Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {word.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Community Comments & Suggestions Section */}
          <CommentSection
            wordId={word.id}
            wordTerm={word.term}
            user={user}
            onOpenAuth={onOpenAuth}
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-copy-card"
              onClick={handleCopyCard}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Carte copiée !' : 'Copier la fiche'}
            </button>

            {onOpenStoryCard && (
              <button
                id="btn-footer-story-card"
                onClick={() => onOpenStoryCard(word)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition shadow-sm cursor-pointer"
                title="Générer une image Story HD pour statut WhatsApp & Instagram"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Créer Story / Statut HD</span>
              </button>
            )}
          </div>

          <button
            id="btn-done-modal"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-md transition cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
