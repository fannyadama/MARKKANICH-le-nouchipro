import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NouchiWord, User } from '../types';
import { 
  speakWord, 
  speakNouchiWithStyle, 
  isSpeechSynthesisSupported, 
  stopSpeech,
  getAvailableVoices
} from '../utils/speech';
import { 
  evaluatePronunciationScore, 
  decomposeNouchiSyllables,
  calculateRealTimePrecision,
  PronunciationScoreResult 
} from '../utils/pronunciationComparator';
import { hapticManager } from '../utils/haptics';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Square, 
  RefreshCw, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  Zap, 
  Share2, 
  ArrowRight, 
  Sliders, 
  Activity, 
  Volume1,
  HelpCircle,
  Headphones
} from 'lucide-react';

interface PronunciationStudioViewProps {
  words: NouchiWord[];
  initialWord?: NouchiWord | null;
  user: User | null;
  onOpenPricing?: () => void;
  onWordPracticed?: (wordId: string, score: number) => void;
}

export const PronunciationStudioView: React.FC<PronunciationStudioViewProps> = ({
  words,
  initialWord,
  user,
  onOpenPricing,
  onWordPracticed
}) => {
  // Preselected featured words by level
  const featuredWords = useMemo(() => {
    return [
      { id: 'mogo', term: 'Môgô', phonetic: '/mo.go/', level: 'debutant', tag: 'Classique', meaning: 'Une personne, un gars, un ami' },
      { id: 'ya-fohi', term: "Y'a fohi", phonetic: '/ja.fɔ.i/', level: 'debutant', tag: 'Incontournable', meaning: 'Il n\'y a rien, pas de souci' },
      { id: 'bara', term: 'Bara', phonetic: '/ba.ra/', level: 'debutant', tag: 'Quotdien', meaning: 'Le travail, bosser dur' },
      { id: 'senjailler', term: "S'enjailler", phonetic: '/sɑ̃.ʒa.je/', level: 'intermediaire', tag: 'Larousse', meaning: 'Faire la fête, prendre du plaisir' },
      { id: 'boucantier', term: 'Boucantier', phonetic: '/bu.kɑ̃.tje/', level: 'intermediaire', tag: 'Coupé-Décalé', meaning: 'Homme élégant qui flambe avec style' },
      { id: 'degamage', term: 'Dégamage', phonetic: '/de.ga.maʒ/', level: 'intermediaire', tag: 'Tendance', meaning: 'Déraper, faire des bêtises' },
      { id: 'kpetou', term: 'Kpétou', phonetic: '/kpe.tu/', level: 'intermediaire', tag: 'Populaire', meaning: 'Faire du bruit, commotion' },
      { id: 'kpata-kpata', term: 'Kpata-kpata', phonetic: '/kpa.ta.kpa.ta/', level: 'expert', tag: 'Guerrier', meaning: 'En désordre total, chaos magnifique' },
      { id: 'gbonhi', term: 'Gbonhi', phonetic: '/ɡbɔ̃.i/', level: 'expert', tag: 'Rue', meaning: 'La bande, le groupe fidèle' },
      { id: 'tchocoya', term: 'Tchocoya', phonetic: '/tʃɔ.kɔ.ja/', level: 'expert', tag: 'Subtil', meaning: 'Négocier en douce, magouiller discrètement' }
    ];
  }, []);

  // Selected word state
  const [selectedTerm, setSelectedTerm] = useState<string>(initialWord?.term || 'S\'enjailler');
  const [selectedPhonetic, setSelectedPhonetic] = useState<string>(initialWord?.phonetic || '/sɑ̃.ʒa.je/');
  const [selectedMeaning, setSelectedMeaning] = useState<string>(
    initialWord?.frenchTranslation || 'Faire la fête, s\'amuser intensément, prendre du plaisir'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(initialWord?.category || 'actions');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'debutant' | 'intermediaire' | 'expert'>(
    initialWord?.difficultyLevel || 'intermediaire'
  );

  // When initialWord prop changes
  useEffect(() => {
    if (initialWord) {
      setSelectedTerm(initialWord.term);
      setSelectedPhonetic(initialWord.phonetic || '');
      setSelectedMeaning(initialWord.frenchTranslation);
      setSelectedDifficulty(initialWord.difficultyLevel);
    }
  }, [initialWord]);

  // SpeechSynthesis states
  const [speechStyle, setSpeechStyle] = useState<'standard' | 'slow_phonetic' | 'street_flow'>('standard');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [aiSpeechProgress, setAiSpeechProgress] = useState(0);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedDurationMs, setRecordedDurationMs] = useState(0);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const [realTimePrecision, setRealTimePrecision] = useState<{
    score: number;
    matchedSyllables: { syllable: string; matched: boolean }[];
    feedback: string;
  } | null>(null);

  // Evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<PronunciationScoreResult | null>(null);
  const [practiceCount, setPracticeCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('markkanich_voice_practice_count') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Media references
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordStartTimeRef = useRef<number>(0);
  const recordTimerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Check SpeechSynthesis support
  const isSpeechSupported = isSpeechSynthesisSupported();

  // Handle word selection
  const handleSelectWord = (term: string, phonetic?: string, meaning?: string, diff?: any) => {
    hapticManager.trigger('selection');
    stopSpeech();
    setIsAiSpeaking(false);
    setSelectedTerm(term);
    setSelectedPhonetic(phonetic || '');
    setSelectedMeaning(meaning || '');
    if (diff) setSelectedDifficulty(diff);
    // Reset recording and score for fresh challenge
    setRecordedAudioUrl(null);
    setRecordedDurationMs(0);
    setUserTranscript('');
    setEvaluationResult(null);
  };

  // Play reference speech using browser SpeechSynthesis API
  const handlePlayAiBenchmark = (style: 'standard' | 'slow_phonetic' | 'street_flow' = speechStyle) => {
    if (!isSpeechSupported) return;
    hapticManager.trigger('tap');
    setIsAiSpeaking(true);
    setAiSpeechProgress(1);

    // Visual pulse timer
    const interval = setInterval(() => {
      setAiSpeechProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 100);

    speakNouchiWithStyle(selectedTerm, style, {
      onEnd: () => {
        clearInterval(interval);
        setIsAiSpeaking(false);
        setAiSpeechProgress(0);
      },
      onError: () => {
        clearInterval(interval);
        setIsAiSpeaking(false);
        setAiSpeechProgress(0);
      }
    });
  };

  // Start recording user voice
  const startRecording = async () => {
    hapticManager.trigger('selection');
    setMicPermissionDenied(false);
    setUserTranscript('');
    setRecordedAudioUrl(null);
    setEvaluationResult(null);
    setRealTimePrecision({
      score: 0,
      matchedSyllables: decomposeNouchiSyllables(selectedTerm).map(s => ({ syllable: s, matched: false })),
      feedback: `Microphone actif • Prononcez « ${selectedTerm} » distinctement...`
    });
    audioChunksRef.current = [];

    // Stop reference speech if running
    stopSpeech();
    setIsAiSpeaking(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      // 1. Setup Web Audio API for real-time visualizer canvas
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      drawVisualizer();

      // 2. Setup Web Speech Recognition if available (webkitSpeechRecognition)
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
              const rt = calculateRealTimePrecision(selectedTerm, clean);
              setRealTimePrecision(rt);
              if (rt.score >= 80) {
                hapticManager.trigger('selection');
              }
            }
          };

          recognition.onerror = (e: any) => {
            console.warn('SpeechRecognition event:', e);
          };

          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (e) {
          console.warn('Recognition init exception:', e);
        }
      }

      // 3. Setup MediaRecorder for audio recording
      const options = { mimeType: 'audio/webm' };
      const recorder = MediaRecorder.isTypeSupported('audio/webm') 
        ? new MediaRecorder(stream, options) 
        : new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        const duration = Math.max(300, Date.now() - recordStartTimeRef.current);
        setRecordedDurationMs(duration);

        // Stop media tracks
        stream.getTracks().forEach((track) => track.stop());

        // Stop visualizer loop
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {});
        }

        // Auto trigger evaluation
        triggerBenchmarkEvaluation(duration, userTranscript);
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      recordStartTimeRef.current = Date.now();
      setIsRecording(true);
      setRecordingSeconds(0);

      // Max recording duration: 6 seconds
      recordTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 5) {
            stopRecording();
            return 5;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err: any) {
      console.error('Microphone access failed:', err);
      setMicPermissionDenied(true);
      setIsRecording(false);
    }
  };

  // Stop recording user voice
  const stopRecording = () => {
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

  // Draw real-time frequency bars on Canvas
  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

        // Gradient from orange to amber
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#f59e0b');
        gradient.addColorStop(0.5, '#f97316');
        gradient.addColorStop(1, '#ef4444');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
        ctx.fill();

        x += barWidth;
      }
    };

    render();
  };

  // Run benchmark evaluation: tries backend AI route (/api/pronunciation/evaluate) then local algorithmic comparator
  const triggerBenchmarkEvaluation = async (durationMs: number, capturedTranscript: string) => {
    setIsEvaluating(true);

    try {
      const response = await fetch('/api/pronunciation/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term: selectedTerm,
          phonetic: selectedPhonetic,
          transcript: capturedTranscript,
          audioDurationMs: durationMs,
          userLevel: selectedDifficulty
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        // AI Gemini benchmark score
        const data = resData.data;
        const result: PronunciationScoreResult = {
          overallScore: data.overallScore ?? 85,
          phoneticAccuracy: data.phoneticAccuracy ?? 82,
          accentFlowScore: data.accentFlowScore ?? 88,
          rhythmScore: data.rhythmScore ?? 85,
          clarityScore: data.clarityScore ?? 85,
          streetVerdict: data.streetVerdict || {
            title: 'Môgô Calé 👌',
            badge: 'Accent Validé',
            vibe: 'Bonne intonation ivoirienne !',
            color: 'from-amber-400 to-orange-500'
          },
          syllables: data.syllables || [],
          coachAdvice: data.coachAdvice || "Garde cette vivacité sur l'accent d'Abidjan !",
          spokenFeedback: data.spokenFeedback || "Bien joué ! Ton accent nouchi est en bonne voie.",
          benchmarkDurationMs: data.benchmarkDurationMs || 1200,
          userDurationMs: durationMs
        };
        setEvaluationResult(result);
        applyScoreSideEffects(result.overallScore);
        setIsEvaluating(false);
        return;
      }
    } catch (e) {
      console.warn('Backend evaluation failed, using local linguistic engine:', e);
    }

    // Local benchmark engine fallback
    const localResult = evaluatePronunciationScore({
      targetWord: selectedTerm,
      userTranscript: capturedTranscript,
      userDurationMs: durationMs,
      audioQualityRatio: 0.88
    });

    setEvaluationResult(localResult);
    applyScoreSideEffects(localResult.overallScore);
    setIsEvaluating(false);
  };

  // Score celebrations, sound & persistent practice counters
  const applyScoreSideEffects = (score: number) => {
    if (score >= 80) {
      hapticManager.trigger('celebration');
    } else {
      hapticManager.trigger('tap');
    }

    const nextCount = practiceCount + 1;
    setPracticeCount(nextCount);
    try {
      localStorage.setItem('markkanich_voice_practice_count', nextCount.toString());
    } catch {}

    if (onWordPracticed) {
      const match = words.find((w) => w.term.toLowerCase() === selectedTerm.toLowerCase());
      if (match) {
        onWordPracticed(match.id, score);
      }
    }
  };

  // Speak AI Coach feedback aloud via browser SpeechSynthesis API
  const handleSpeakCoachFeedback = () => {
    if (!evaluationResult || !isSpeechSupported) return;
    hapticManager.trigger('tap');
    speakWord(evaluationResult.spokenFeedback, 'fr-FR', 1.05);
  };

  // Playback user's own recorded audio
  const handleTogglePlayUserAudio = () => {
    if (!recordedAudioUrl) return;
    hapticManager.trigger('tap');

    if (isPlayingUserAudio) {
      if (userAudioPlayerRef.current) {
        userAudioPlayerRef.current.pause();
        userAudioPlayerRef.current.currentTime = 0;
      }
      setIsPlayingUserAudio(false);
    } else {
      if (!userAudioPlayerRef.current) {
        userAudioPlayerRef.current = new Audio(recordedAudioUrl);
        userAudioPlayerRef.current.onended = () => setIsPlayingUserAudio(false);
      } else {
        userAudioPlayerRef.current.src = recordedAudioUrl;
      }
      userAudioPlayerRef.current.play().then(() => {
        setIsPlayingUserAudio(true);
      }).catch((e) => console.warn(e));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const syllables = useMemo(() => {
    return decomposeNouchiSyllables(selectedTerm);
  }, [selectedTerm]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1917] via-[#161618] to-[#0c0a09] border border-amber-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5" />
              <span>Studio Vocal & Étalon IA (SpeechSynthesis) 🇨🇮</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Maîtrise le <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300">Vrai Accent de Babi</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Écoutez l'étalon de prononciation généré par l'API vocale du navigateur, enregistrez votre voix et comparez votre flow, votre cadence et vos consonnes ivoiriennes face au benchmark IA !
            </p>
          </div>

          {/* Stats Widget */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Mots Pratiqués</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-white">{practiceCount}</span>
                <span className="text-[10px] text-emerald-400 font-bold">Nouchiman actif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Support Warning if needed */}
        {!isSpeechSupported && (
          <div className="mt-4 p-3 bg-amber-950/40 border border-amber-800 rounded-xl flex items-center gap-2.5 text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>L'API SpeechSynthesis n'est pas activée sur ce navigateur. La synthèse vocale sera simulée avec les instructions phonétiques.</span>
          </div>
        )}
      </div>

      {/* Word Quick Selector Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-200">Choisis une expression à défier :</h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Clique sur un mot pour charger l'étalon vocal
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {featuredWords.map((fw) => {
            const isSelected = selectedTerm.toLowerCase() === fw.term.toLowerCase();
            return (
              <button
                key={fw.id}
                onClick={() => handleSelectWord(fw.term, fw.phonetic, fw.meaning, fw.level)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105'
                    : 'bg-[#161618] text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-white'
                }`}
              >
                <span>{fw.term}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-slate-800 text-amber-400'
                }`}>
                  {fw.level === 'expert' ? '🔥 Guerrier' : fw.level === 'intermediaire' ? '⚡ Pro' : '🌱 Base'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Arena: Dual Bento (Benchmark vs User Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* LEFT BENTO: Reference Benchmark (SpeechSynthesis API) */}
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <Volume2 className="w-3.5 h-3.5" />
                <span>1. L'Étalon Vocal IA</span>
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SpeechSynthesis Prêt</span>
              </div>
            </div>

            {/* Word Display & Syllabic Breakdown */}
            <div className="mt-5 space-y-3">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {selectedTerm}
                </h3>
                {selectedPhonetic && (
                  <span className="text-sm font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                    {selectedPhonetic}
                  </span>
                )}
              </div>

              {/* Syllable badges */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] font-bold text-slate-400">Découpage :</span>
                {syllables.map((syl, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 shadow-sm"
                  >
                    {syl.toUpperCase()}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic pt-1">
                « {selectedMeaning} »
              </p>
            </div>
          </div>

          {/* Speech Control Panel */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            {/* Speed / Style Selectors */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Cadence de l'étalon :</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSpeechStyle('slow_phonetic')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    speechStyle === 'slow_phonetic'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🐢 0.75x Ralenti
                </button>
                <button
                  onClick={() => setSpeechStyle('standard')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    speechStyle === 'standard'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🎯 1.0x Standard
                </button>
                <button
                  onClick={() => setSpeechStyle('street_flow')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                    speechStyle === 'street_flow'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 1.2x Street Flow
                </button>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={() => handlePlayAiBenchmark(speechStyle)}
              disabled={isAiSpeaking}
              className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                isAiSpeaking
                  ? 'bg-amber-500 text-black animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black hover:scale-[1.02]'
              }`}
            >
              <Volume2 className={`w-5 h-5 ${isAiSpeaking ? 'animate-bounce' : ''}`} />
              <span>{isAiSpeaking ? 'Prononciation de l\'étalon en cours...' : 'Écouter l\'étalon de référence'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT BENTO: User Recording Studio */}
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                <Mic className="w-3.5 h-3.5" />
                <span>2. Ton Enregistrement Vocal</span>
              </span>
              <span className="text-xs text-slate-400">Microphone HD</span>
            </div>

            {/* Live Audio Visualizer Canvas */}
            <div className="mt-5 space-y-3">
              <div className="relative w-full h-32 rounded-2xl bg-[#0d0d0f] border border-slate-800 flex items-center justify-center overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={120}
                  className="w-full h-full object-contain"
                />

                {!isRecording && !recordedAudioUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-1.5">
                    <Activity className="w-6 h-6 text-slate-600" />
                    <span className="text-xs font-medium">Appuyez sur le micro pour enregistrer</span>
                  </div>
                )}

                {isRecording && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>00:0{recordingSeconds} / 00:05</span>
                  </div>
                )}
              </div>

              {/* Real-Time Precision Meter during recording */}
              {isRecording && (
                <div 
                  id="realtime-precision-meter"
                  className="p-4 bg-slate-900 border-2 border-amber-500/60 rounded-2xl space-y-2.5 animate-fadeIn shadow-[0_0_25px_rgba(245,158,11,0.2)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                        <span>Précision Vocale en Direct</span>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xl font-black font-mono transition-colors ${
                        (realTimePrecision?.score || 0) >= 80 ? 'text-emerald-400' :
                        (realTimePrecision?.score || 0) >= 50 ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {realTimePrecision?.score || 0}%
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">précision</span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        (realTimePrecision?.score || 0) >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                        (realTimePrecision?.score || 0) >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                        'bg-gradient-to-r from-rose-500 to-red-400'
                      }`}
                      style={{ width: `${Math.max(6, realTimePrecision?.score || 0)}%` }}
                    />
                  </div>

                  {/* Real-time matched syllables status */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Syllabes :</span>
                    {(realTimePrecision?.matchedSyllables || []).map((s, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg border transition-all ${
                          s.matched 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 scale-105 shadow-sm'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        {s.syllable} {s.matched ? '✓' : '...'}
                      </span>
                    ))}
                  </div>

                  {/* Speech Recognition Transcript Pill */}
                  <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium truncate">
                      {userTranscript ? (
                        <>Reconnu : <strong className="text-amber-300">« {userTranscript} »</strong></>
                      ) : (
                        <span className="text-slate-500 italic">En attente de voix dans le micro...</span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">Web Speech API</span>
                  </div>

                  <p className="text-[11px] text-amber-400 font-semibold italic">
                    {realTimePrecision?.feedback}
                  </p>
                </div>
              )}

              {/* Static transcript when finished recording */}
              {!isRecording && userTranscript && (
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Dernier essai capté :</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">« {userTranscript} »</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Web Speech API</span>
                </div>
              )}

              {/* Mic error prompt if denied */}
              {micPermissionDenied && (
                <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Accès au micro refusé. Veuillez autoriser le microphone dans les paramètres de votre navigateur pour enregistrer votre voix.</span>
                </div>
              )}
            </div>
          </div>

          {/* Recording & Replay Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="w-full py-3.5 px-4 rounded-2xl font-black text-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse"
              >
                <Square className="w-5 h-5 fill-white" />
                <span>Arrêter et Comparer à l'Étalon</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={startRecording}
                  className="flex-1 py-3.5 px-4 rounded-2xl font-black text-sm bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white flex items-center justify-center gap-2.5 transition-all shadow-lg hover:scale-[1.02]"
                >
                  <Mic className="w-5 h-5" />
                  <span>{recordedAudioUrl ? 'Réenregistrer ma voix' : 'Enregistrer ma voix'}</span>
                </button>

                {recordedAudioUrl && (
                  <button
                    onClick={handleTogglePlayUserAudio}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-400 transition"
                    title={isPlayingUserAudio ? 'Pause' : 'Réécouter mon enregistrement'}
                  >
                    {isPlayingUserAudio ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Evaluating loader banner */}
      {isEvaluating && (
        <div className="p-8 rounded-3xl bg-[#161618] border border-amber-500/40 text-center space-y-3 animate-pulse">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-400">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <h4 className="text-lg font-black text-white">Analyse de ton accent en cours...</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Comparaison acoustique de la fréquence, des voyelles nasales et de la cadence avec l'étalon d'Abidjan.
          </p>
        </div>
      )}

      {/* SECTION 3: Benchmark Comparison & Score Dashboard */}
      {evaluationResult && !isEvaluating && (
        <div className="bg-[#161618] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 animate-fadeIn shadow-2xl">
          {/* Top Score Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            {/* Verdict text */}
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verdict Officiel du Nouchiman</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-2 pt-1">
                <span>{evaluationResult.streetVerdict.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {evaluationResult.streetVerdict.vibe}
              </p>
            </div>

            {/* Score Ring / Radial */}
            <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-inner">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      evaluationResult.overallScore >= 80 
                        ? 'text-emerald-500' 
                        : evaluationResult.overallScore >= 60 
                        ? 'text-amber-500' 
                        : 'text-rose-500'
                    }
                    strokeDasharray={`${evaluationResult.overallScore}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-white leading-none">
                    {evaluationResult.overallScore}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">/100</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {evaluationResult.streetVerdict.badge}
                </span>
                <p className="text-[10px] text-slate-400">Score de conformité à l'étalon</p>
              </div>
            </div>
          </div>

          {/* 4 Detail Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400">Exactitude Phonétique</span>
              <div className="text-xl font-black text-amber-400">{evaluationResult.phoneticAccuracy}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${evaluationResult.phoneticAccuracy}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400">Flow & Intonation</span>
              <div className="text-xl font-black text-orange-400">{evaluationResult.accentFlowScore}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${evaluationResult.accentFlowScore}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400">Cadence & Timing</span>
              <div className="text-xl font-black text-emerald-400">{evaluationResult.rhythmScore}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${evaluationResult.rhythmScore}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400">Netteté Vocale</span>
              <div className="text-xl font-black text-cyan-400">{evaluationResult.clarityScore}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${evaluationResult.clarityScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Syllable-by-syllable analysis */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Analyse syllabique détaillée :</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {evaluationResult.syllables.map((syl, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-1.5 ${
                    syl.status === 'perfect'
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                      : syl.status === 'good'
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black font-mono tracking-wider">
                      {syl.syllable.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      syl.status === 'perfect'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : syl.status === 'good'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {syl.status === 'perfect' ? 'Parfait' : syl.status === 'good' ? 'Bien' : 'À revoir'}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-tight">
                    {syl.phoneticHint}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Spoken feedback trigger via SpeechSynthesis */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Volume1 className="w-4 h-4 text-amber-400" />
                <span>Conseil du Coach Linguiste :</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {evaluationResult.coachAdvice}
              </p>
            </div>

            <button
              onClick={handleSpeakCoachFeedback}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>Faire parler l'IA (SpeechSynthesis)</span>
            </button>
          </div>

          {/* Direct Comparison Bar: Compare Reference vs User */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handlePlayAiBenchmark('standard')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-bold text-amber-400 transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>1. Réécouter l'Étalon</span>
              </button>

              {recordedAudioUrl && (
                <button
                  onClick={handleTogglePlayUserAudio}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-400 text-xs font-bold text-rose-300 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>2. Réécouter Ma Voix</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                // Pick next word
                const currentIdx = featuredWords.findIndex((w) => w.term.toLowerCase() === selectedTerm.toLowerCase());
                const nextWord = featuredWords[(currentIdx + 1) % featuredWords.length];
                handleSelectWord(nextWord.term, nextWord.phonetic, nextWord.meaning, nextWord.level);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black transition shadow-md"
            >
              <span>Défi Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
