import React, { useState } from 'react';
import { StorySlide } from '../../types';
import { storyData } from '../../data/storyData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Star, 
  BookMarked,
  Info
} from 'lucide-react';
import { IllustrationArt } from '../common/IllustrationArt';
import { sounds, speakIndonesian, stopSpeaking } from '../../utils/audio';

interface StoryGalleryProps {
  completedStories: number[];
  onCompleteStory: (id: number) => void;
  onGoHome: () => void;
}

export const StoryGallery: React.FC<StoryGalleryProps> = ({
  completedStories,
  onCompleteStory,
  onGoHome
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});

  const slide = storyData[currentSlideIndex];
  const isDone = completedStories.includes(slide.id);
  const userAnswer = selectedAnswers[slide.id];

  const handleNext = () => {
    sounds.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    onCompleteStory(slide.id);
    if (currentSlideIndex < storyData.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      sounds.playClick();
      setIsSpeaking(true);
      const textToRead = `${slide.title}. ${slide.narration}. Fakta sejarah: ${slide.historicalFact}`;
      speakIndonesian(textToRead, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-100/70 p-5 rounded-3xl border-2 border-amber-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 mb-1">
            <BookMarked className="w-4 h-4" />
            <span>Galeri Visual Cerita Bergambar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Jejak Sejarah: 8 Adegan Bersejarah
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Setiap adegan dilengkapi ilustrasi alami, narasi suara, fakta sejarah, dan kuis interaktif.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={toggleSpeech}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs transition cursor-pointer shadow-xs ${
              isSpeaking
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-white border-2 border-emerald-300 text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Hentikan' : 'Dengarkan Cerita'}</span>
          </button>
        </div>
      </div>

      {/* THUMBNAIL STEPPER */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {storyData.map((s, idx) => {
          const isActive = idx === currentSlideIndex;
          const done = completedStories.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                stopSpeaking();
                setIsSpeaking(false);
                setCurrentSlideIndex(idx);
              }}
              className={`p-2 rounded-2xl border-2 text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                isActive
                  ? 'border-emerald-600 bg-emerald-700 text-white shadow-md scale-105'
                  : done
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'border-amber-200 bg-white text-stone-600 hover:bg-amber-100/50'
              }`}
            >
              <span className="text-[10px] font-black uppercase">Adegan {s.id}</span>
              {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* MAIN STORY SCENE VIEWER */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Illustration Container with Zoom Option */}
          <div className="lg:col-span-6 relative group">
            <IllustrationArt
              sceneType={slide.sceneType}
              className="w-full h-64 sm:h-80 rounded-2xl shadow-md"
              altText={slide.altText}
            />

            {/* Zoom Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsZoomOpen(true);
              }}
              className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
              title="Perbesar Ilustrasi"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Perbesar Gambar</span>
            </button>
          </div>

          {/* Narrative & Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                Adegan #{slide.id} dari 8
              </span>
              {isDone && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai Disimak
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
              {slide.title}
            </h3>
            <h4 className="text-xs sm:text-sm font-bold text-emerald-800">
              {slide.subtitle}
            </h4>

            {/* Story narration */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
              {slide.narration}
            </p>

            {/* Historical Fact badge box */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex items-start gap-2.5">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-xs text-sky-900 leading-relaxed font-medium">
                <strong className="block font-bold mb-0.5">Fakta Sejarah:</strong>
                {slide.historicalFact}
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE QUESTION FOR THE SCENE */}
        <div className="mt-6 pt-6 border-t border-amber-100 bg-amber-50/50 p-5 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900 tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Kuis Pemahaman Adegan #{slide.id}:</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-stone-900">
            {slide.interactiveQuestion.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {slide.interactiveQuestion.options.map((opt, optIdx) => {
              const isSelected = userAnswer === optIdx;
              const isCorrect = optIdx === slide.interactiveQuestion.correctIndex;
              return (
                <button
                  key={optIdx}
                  onClick={() => {
                    setSelectedAnswers(prev => ({ ...prev, [slide.id]: optIdx }));
                    if (isCorrect) sounds.playCorrect();
                    else sounds.playGentleHint();
                  }}
                  className={`p-3 rounded-2xl text-xs font-semibold text-left transition border-2 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-rose-100 border-rose-400 text-rose-900'
                      : 'bg-white border-amber-200 hover:border-amber-400 text-stone-700'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {userAnswer !== undefined && (
            <div className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium animate-in fade-in duration-200 ${
              userAnswer === slide.interactiveQuestion.correctIndex
                ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}>
              {slide.interactiveQuestion.explanation}
            </div>
          )}
        </div>

        {/* BOTTOM NAV CONTROLS */}
        <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              currentSlideIndex === 0
                ? 'opacity-40 bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-white border-2 border-amber-200 text-stone-700 hover:bg-amber-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Adegan Sebelumnya</span>
          </button>

          <button
            onClick={() => {
              sounds.playCelebration();
              onCompleteStory(slide.id);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-200 transition cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{isDone ? 'Sudah Mendapat Bintang' : 'Koleksi Bintang Adegan Ini'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === storyData.length - 1}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition cursor-pointer ${
              currentSlideIndex === storyData.length - 1
                ? 'bg-emerald-800/80 text-white cursor-default'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
            }`}
          >
            <span>{currentSlideIndex === storyData.length - 1 ? 'Semua Adegan Selesai' : 'Lanjut ke Adegan Berikutnya'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border-4 border-amber-300 max-h-[92vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-black text-stone-900">{slide.title}</h3>
                <p className="text-xs text-stone-500">{slide.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsZoomOpen(false);
                }}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                aria-label="Tutup Zoom"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Large full illustration */}
            <IllustrationArt
              sceneType={slide.sceneType}
              className="w-full h-80 sm:h-96 rounded-2xl shadow-inner"
              altText={slide.altText}
            />

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              <strong className="block text-stone-900 mb-1">Keterangan Ilustrasi Sejarah:</strong>
              {slide.narration}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-semibold text-stone-500">
                Visualisasi edukatif sejarah tanpa penggambaran fisik sosok Rasulullah SAW demi adab dan penghormatan mulia.
              </span>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsZoomOpen(false);
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-xs"
              >
                Kembali ke Cerita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
