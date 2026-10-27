import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Smartphone, 
  Square, 
  Palette, 
  MessageCircle, 
  Flame,
  Award
} from 'lucide-react';
import { NouchiWord, User } from '../types';
import { hapticManager } from '../utils/haptics';

export type StoryTheme = 'elephant' | 'neon' | 'gold' | 'wax';
export type StoryFormat = 'story' | 'square';

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: NouchiWord | null;
  user?: User | null;
}

const THEMES: { id: StoryTheme; label: string; previewColor: string; description: string }[] = [
  { 
    id: 'elephant', 
    label: 'Éléphant Prestige', 
    previewColor: 'from-amber-500 via-emerald-600 to-emerald-950',
    description: 'Couleurs nationales ivoiriennes avec accents dorés'
  },
  { 
    id: 'neon', 
    label: 'Babi Night Club', 
    previewColor: 'from-fuchsia-600 via-amber-500 to-cyan-500',
    description: 'Ambiance néon cyberpunk de nuit à Abidjan'
  },
  { 
    id: 'gold', 
    label: 'Môgô d\'Or VIP', 
    previewColor: 'from-amber-300 via-amber-500 to-amber-700',
    description: 'Or impérial 24 carats et carbone luxueux'
  },
  { 
    id: 'wax', 
    label: 'Wax & Bogolan', 
    previewColor: 'from-orange-600 via-amber-600 to-stone-900',
    description: 'Motifs géométriques traditionnels afro-modernes'
  }
];

export const StoryCardModal: React.FC<StoryCardModalProps> = ({
  isOpen,
  onClose,
  word,
  user
}) => {
  const [selectedFormat, setSelectedFormat] = useState<StoryFormat>('story');
  const [selectedTheme, setSelectedTheme] = useState<StoryTheme>('elephant');
  const [includeAuthor, setIncludeAuthor] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Helper function to wrap text inside canvas
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  // Helper to draw rounded rectangle
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Render canvas graphic
  const generateCanvas = useCallback(() => {
    if (!word) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isStory = selectedFormat === 'story';
    const width = 1080;
    const height = isStory ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;

    // 1. Background Fill
    if (selectedTheme === 'elephant') {
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0d1512');
      bgGrad.addColorStop(0.5, '#091e16');
      bgGrad.addColorStop(1, '#05110d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Top decorative Ivorian stripe glow
      const stripeGrad = ctx.createLinearGradient(0, 0, width, 0);
      stripeGrad.addColorStop(0, '#f97316');
      stripeGrad.addColorStop(0.5, '#ffffff');
      stripeGrad.addColorStop(1, '#10b981');
      ctx.fillStyle = stripeGrad;
      ctx.fillRect(0, 0, width, 18);

      // Radial subtle ambient glow
      const radial = ctx.createRadialGradient(width * 0.5, height * 0.25, 40, width * 0.5, height * 0.25, 600);
      radial.addColorStop(0, 'rgba(249, 115, 22, 0.25)');
      radial.addColorStop(0.5, 'rgba(16, 185, 129, 0.12)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    } else if (selectedTheme === 'neon') {
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090a12');
      bgGrad.addColorStop(0.5, '#120d1c');
      bgGrad.addColorStop(1, '#07080f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Neon dual light spots
      const radial1 = ctx.createRadialGradient(180, 260, 20, 180, 260, 500);
      radial1.addColorStop(0, 'rgba(217, 70, 239, 0.35)');
      radial1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial1;
      ctx.fillRect(0, 0, width, height);

      const radial2 = ctx.createRadialGradient(width - 200, height * 0.6, 20, width - 200, height * 0.6, 600);
      radial2.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
      radial2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial2;
      ctx.fillRect(0, 0, width, height);
    } else if (selectedTheme === 'gold') {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#16140e');
      bgGrad.addColorStop(0.4, '#1b1711');
      bgGrad.addColorStop(1, '#0e0c08');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle gold frame border
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.35)';
      ctx.lineWidth = 4;
      roundRect(ctx, 40, 40, width - 80, height - 80, 32);
      ctx.stroke();

      const radial = ctx.createRadialGradient(width * 0.5, height * 0.3, 30, width * 0.5, height * 0.3, 500);
      radial.addColorStop(0, 'rgba(234, 179, 8, 0.25)');
      radial.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Wax & Bogolan
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#1c100a');
      bgGrad.addColorStop(0.5, '#2b1407');
      bgGrad.addColorStop(1, '#140803');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle geometric accents
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
      ctx.lineWidth = 3;
      for (let i = 0; i < width; i += 90) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 45, 90);
        ctx.lineTo(i + 90, 0);
        ctx.stroke();
      }
    }

    // 2. Brand Header
    const contentStartY = isStory ? 180 : 110;
    
    // Top mini logo & flag badge
    ctx.textAlign = 'center';
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = selectedTheme === 'gold' ? '#fde047' : '#f59e0b';
    ctx.fillText('🇨🇮  MARKKANICH • LE NOUCHIPRO', width / 2, contentStartY);

    ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('L’ACADÉMIE OFFICIELLE DU NOUCHI IVOIRIEN', width / 2, contentStartY + 32);

    // 3. Category & Level Badge
    const badgeY = contentStartY + (isStory ? 100 : 75);
    const categoryLabel = (word.category || 'Argot').toUpperCase();
    const badgeText = `⚡ ${categoryLabel} • ${word.difficultyLevel ? word.difficultyLevel.toUpperCase() : 'POPULAIRE'}`;
    
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 50;
    const badgeHeight = 44;
    const badgeX = (width - badgeWidth) / 2;

    ctx.fillStyle = selectedTheme === 'neon' 
      ? 'rgba(217, 70, 239, 0.2)' 
      : 'rgba(245, 158, 11, 0.15)';
    roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 22);
    ctx.fill();

    ctx.strokeStyle = selectedTheme === 'neon' 
      ? 'rgba(217, 70, 239, 0.6)' 
      : 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 2;
    roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 22);
    ctx.stroke();

    ctx.fillStyle = selectedTheme === 'neon' ? '#f5d0fe' : '#fbbf24';
    ctx.fillText(badgeText, width / 2, badgeY + 29);

    // 4. Main Term Title
    const termY = badgeY + (isStory ? 150 : 120);
    ctx.textAlign = 'center';
    
    // Auto-scale font size if term is long
    let termFontSize = isStory ? 86 : 72;
    if (word.term.length > 14) termFontSize = isStory ? 64 : 54;
    if (word.term.length > 20) termFontSize = isStory ? 48 : 42;

    ctx.font = `900 ${termFontSize}px "Plus Jakarta Sans", sans-serif`;
    
    // Text drop shadow
    ctx.shadowColor = selectedTheme === 'neon' 
      ? 'rgba(217, 70, 239, 0.6)' 
      : 'rgba(245, 158, 11, 0.5)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;

    const termGrad = ctx.createLinearGradient(width * 0.2, termY - 50, width * 0.8, termY);
    if (selectedTheme === 'gold') {
      termGrad.addColorStop(0, '#fef08a');
      termGrad.addColorStop(0.5, '#facc15');
      termGrad.addColorStop(1, '#ca8a04');
    } else if (selectedTheme === 'neon') {
      termGrad.addColorStop(0, '#ffffff');
      termGrad.addColorStop(0.5, '#f472b6');
      termGrad.addColorStop(1, '#fbbf24');
    } else {
      termGrad.addColorStop(0, '#ffffff');
      termGrad.addColorStop(0.6, '#fef3c7');
      termGrad.addColorStop(1, '#f59e0b');
    }

    ctx.fillStyle = termGrad;
    ctx.fillText(`« ${word.term} »`, width / 2, termY);

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // 5. Phonetic and Origin Subtitle
    let metaY = termY + 54;
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    const phoneticStr = word.phonetic ? `[ ${word.phonetic} ]` : '';
    const originStr = word.originLanguage ? `Origine : ${word.originLanguage}` : '';
    const grammStr = word.grammaticalCategory || '';
    const metaLine = [phoneticStr, grammStr, originStr].filter(Boolean).join('  •  ');
    if (metaLine) {
      ctx.fillText(metaLine, width / 2, metaY);
    } else {
      metaY -= 20;
    }

    // 6. French Translation Highlight Box
    const transBoxY = metaY + (isStory ? 60 : 45);
    const transBoxWidth = width - 160;
    const transBoxX = 80;
    
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    
    // Draw french translation banner
    const transHeight = 84;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    roundRect(ctx, transBoxX, transBoxY, transBoxWidth, transHeight, 20);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, transBoxX, transBoxY, transBoxWidth, transHeight, 20);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`💡 Sens : ${word.frenchTranslation}`, width / 2, transBoxY + 52);

    // 7. Definition Box
    const defBoxY = transBoxY + transHeight + (isStory ? 45 : 30);
    const textMaxWidth = width - 200;
    
    ctx.font = 'normal 26px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e2e8f0';
    const afterDefY = wrapText(ctx, word.definition, width / 2, defBoxY, textMaxWidth, 40);

    // 8. Example Card (Punchline)
    if (word.examples && word.examples.length > 0) {
      const example = word.examples[0];
      const exCardY = afterDefY + (isStory ? 45 : 25);
      const exCardWidth = width - 160;
      const exCardX = 80;
      const exCardHeight = isStory ? 320 : 210;

      // Card Background
      ctx.fillStyle = selectedTheme === 'wax' 
        ? 'rgba(43, 20, 7, 0.75)' 
        : 'rgba(15, 23, 42, 0.7)';
      roundRect(ctx, exCardX, exCardY, exCardWidth, exCardHeight, 28);
      ctx.fill();

      ctx.strokeStyle = selectedTheme === 'gold' 
        ? 'rgba(234, 179, 8, 0.4)' 
        : 'rgba(245, 158, 11, 0.35)';
      ctx.lineWidth = 2;
      roundRect(ctx, exCardX, exCardY, exCardWidth, exCardHeight, 28);
      ctx.stroke();

      // Mini Header inside example box
      ctx.textAlign = 'left';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('🗣️ EN SITUATION DANS LA RUE (EXEMPLE) :', exCardX + 40, exCardY + 48);

      // Nouchi Example
      ctx.font = 'italic 700 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      const exampleY = exCardY + 98;
      const afterExY = wrapText(ctx, `« ${example.nouchi} »`, exCardX + 40, exampleY, exCardWidth - 80, 40);

      // French Translation of example
      ctx.font = 'normal 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      wrapText(ctx, `↳ Traduction : "${example.french}"`, exCardX + 40, afterExY + 8, exCardWidth - 80, 32);
    }

    // 9. Community Author Tag if enabled
    if (includeAuthor && word.contributedBy) {
      const authorY = height - (isStory ? 240 : 150);
      ctx.textAlign = 'center';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`✨ Mot proposé par @${word.contributedBy.username} sur la plateforme`, width / 2, authorY);
    }

    // 10. Footer Call To Action & Watermark
    const footerY = height - (isStory ? 110 : 70);
    
    // Bottom separator
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(120, footerY - 45);
    ctx.lineTo(width - 120, footerY - 45);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('📲 markkanich.ci • Testez vos connaissances du Nouchi', width / 2, footerY);

    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('Dictionnaire interactif • Quiz quotidien • Traducteur IA • Audio officiel', width / 2, footerY + 28);

    // Save preview data URL
    setPreviewDataUrl(canvas.toDataURL('image/png'));
  }, [word, selectedFormat, selectedTheme, includeAuthor]);

  useEffect(() => {
    if (isOpen && word) {
      // Allow DOM to settle then draw canvas
      const timer = setTimeout(() => {
        generateCanvas();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, word, generateCanvas]);

  if (!isOpen || !word) return null;

  // Handle Download PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    hapticManager.trigger('celebration');
    setDownloading(true);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const cleanTerm = word.term.toLowerCase().replace(/[^a-z0-9]/g, '_');
      link.download = `markkanich_${cleanTerm}_${selectedFormat}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Download failed:', e);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  // Handle Native Share / WhatsApp
  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    hapticManager.trigger('tap');

    const shareText = `🇨🇮 Découvre « ${word.term} » (${word.frenchTranslation}) sur Markkanich Le NouchiPro ! https://markkanich.ci`;

    // Try Web Share API with File
    if (navigator.share && canvas.toBlob) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            const file = new File([blob], `nouchi_${word.term}.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: `Markkanich - ${word.term}`,
                text: shareText,
                files: [file]
              });
              return;
            }
          } catch (err) {
            console.log('File sharing skipped or cancelled:', err);
          }
        }

        // Fallback to text Web Share
        try {
          await navigator.share({
            title: `Markkanich - ${word.term}`,
            text: shareText,
            url: window.location.href
          });
        } catch (err) {
          // Fallback direct WhatsApp URL
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
        }
      }, 'image/png');
    } else {
      // Fallback direct WhatsApp URL
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.toBlob) return;

    hapticManager.trigger('selection');

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        if (navigator.clipboard && (window as any).ClipboardItem) {
          await navigator.clipboard.write([
            new (window as any).ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          hapticManager.trigger('celebration');
          setTimeout(() => setCopied(false), 2500);
        } else {
          // Fallback copy text
          await navigator.clipboard.writeText(`« ${word.term} » : ${word.frenchTranslation} - https://markkanich.ci`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      } catch (e) {
        console.error('Clipboard copy failed:', e);
      }
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto bg-[#141416] border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7 text-slate-100 scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-black shadow-lg">
              <Sparkles className="w-5 h-5 font-black" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Studio Story & Statuts HD</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Viral
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Générez une carte visuelle prête à publier sur WhatsApp, Instagram & X pour « <strong className="text-white">{word.term}</strong> »
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800 cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Layout: 2 Columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Preview Box */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              
              {/* Aspect Ratio Container */}
              <div 
                className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 border border-slate-700/50 ${
                  selectedFormat === 'story' 
                    ? 'w-[250px] sm:w-[280px] h-[444px] sm:h-[498px]' 
                    : 'w-[280px] sm:w-[320px] h-[280px] sm:h-[320px]'
                }`}
              >
                {previewDataUrl ? (
                  <img 
                    src={previewDataUrl} 
                    alt={`Story Card ${word.term}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 gap-2">
                    <Sparkles className="w-6 h-6 animate-spin text-amber-500" />
                    <span className="text-xs">Génération du rendu HD...</span>
                  </div>
                )}
              </div>

              {/* Format Badge overlay */}
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                <span>Rendu 1080x{selectedFormat === 'story' ? '1920' : '1080'}px</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">Haute Définition PNG</span>
              </div>
            </div>

            {/* Hidden native canvas used for rendering */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Right Customization Controls */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Format Selector */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                1. Choisissez le format
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFormat('story');
                    hapticManager.trigger('selection');
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    selectedFormat === 'story'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-black shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Story 9:16</div>
                    <div className="text-[10px] text-slate-400">Statut WhatsApp, Insta, TikTok</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFormat('square');
                    hapticManager.trigger('selection');
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    selectedFormat === 'square'
                      ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-black shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Square className="w-5 h-5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Post Carré 1:1</div>
                    <div className="text-[10px] text-slate-400">X (Twitter), Feed, LinkedIn</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Theme Selector */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                2. Ambiance & Thème Visuel
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => {
                      setSelectedTheme(th.id);
                      hapticManager.trigger('selection');
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                      selectedTheme === th.id
                        ? 'bg-slate-800 border-amber-500 ring-2 ring-amber-500/30'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${th.previewColor} shrink-0 border border-white/20`} />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{th.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{th.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Options Toggle */}
            {word.contributedBy && (
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Créditer l'auteur</div>
                  <div className="text-[11px] text-slate-400">Afficher « Mot proposé par @{word.contributedBy.username} »</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeAuthor}
                  onChange={(e) => setIncludeAuthor(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              {/* Primary Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Téléchargement...' : 'Télécharger l\'Image HD (PNG)'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Share Native / WhatsApp */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Statut WhatsApp</span>
                </button>

                {/* Copy Image to Clipboard */}
                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copié !' : 'Copier Image'}</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                Idéal pour alimenter vos stories Instagram, statuts WhatsApp et faire découvrir le Nouchi à vos contacts !
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
