import React, { useState } from 'react';
import { LessonChapter } from '../../types';
import { lessonsData } from '../../data/lessonsData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  HelpCircle,
  Compass, 
  HeartHandshake, 
  Shield, 
  PackageCheck, 
  MessageSquare, 
  Footprints, 
  MapPin, 
  Home as HomeIcon, 
  Users, 
  Landmark, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { sounds, speakIndonesian, stopSpeaking } from '../../utils/audio';
import { IllustrationArt } from '../common/IllustrationArt';

interface LessonViewerProps {
  completedChapters: number[];
  onCompleteChapter: (id: number) => void;
  onGoHome: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  completedChapters,
  onCompleteChapter,
  onGoHome
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [characterAnswers, setCharacterAnswers] = useState<Record<string, number | null>>({});
  const [teaserSelected, setTeaserSelected] = useState<number | null>(null);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(1);
  const [timelineAnswers, setTimelineAnswers] = useState<Record<number, number | null>>({});
  const [reflectionAnswer, setReflectionAnswer] = useState<string>('');

  const currentChapter = lessonsData[currentChapterIndex];
  const isLastChapter = currentChapterIndex === lessonsData.length - 1;
  const isCurrentCompleted = completedChapters.includes(currentChapter.id);

  // Map icon name to Lucide Icon component
  const renderIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case 'Compass': return <Compass className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'PackageCheck': return <PackageCheck className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'Footprints': return <Footprints className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Home': return <HomeIcon className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const handleNext = () => {
    sounds.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    onCompleteChapter(currentChapter.id);
    if (!isLastChapter) {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetCurrent = () => {
    sounds.playClick();
    stopSpeaking();
    setIsSpeaking(false);
    setTeaserSelected(null);
    setSelectedCharacterId(null);
    setCharacterAnswers({});
    setActiveTimelineStep(1);
    setTimelineAnswers({});
    setReflectionAnswer('');
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      sounds.playClick();
      setIsSpeaking(true);
      const textToRead = `${currentChapter.title}. ${currentChapter.summary}. ${currentChapter.content.join('. ')}`;
      speakIndonesian(textToRead, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* CHAPTER PROGRESS TABS */}
      <div className="bg-amber-100/70 p-2 md:p-3 rounded-3xl border-2 border-amber-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {lessonsData.map((chap, idx) => {
            const isActive = idx === currentChapterIndex;
            const isDone = completedChapters.includes(chap.id);
            return (
              <button
                key={chap.id}
                onClick={() => {
                  sounds.playClick();
                  stopSpeaking();
                  setIsSpeaking(false);
                  setCurrentChapterIndex(idx);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/30'
                    : isDone
                    ? 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
                    : 'bg-white/80 text-stone-600 hover:bg-amber-200/50'
                }`}
              >
                <span>Bab {chap.id}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* CHAPTER CARD */}
      <article className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl overflow-hidden p-6 sm:p-8 md:p-10 space-y-6">
        {/* Header with Title, Read Time, and Narration Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Pembelajaran PAI • {currentChapter.readTime}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              {currentChapter.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-medium mt-1">
              {currentChapter.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Audio Read-Aloud Button */}
            <button
              onClick={toggleSpeech}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-xs transition cursor-pointer shadow-xs ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 border-2 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Hentikan Suara' : 'Dengarkan Bacaan'}</span>
            </button>

            {/* Reset Chapter Activity Button */}
            <button
              onClick={handleResetCurrent}
              title="Ulangi aktivitas bab ini"
              className="p-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chapter Summary Box */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center shrink-0 shadow-xs font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-0.5">Inti Ringkasan Materi:</h4>
            <p className="text-sm md:text-base text-stone-800 font-medium leading-relaxed">
              {currentChapter.summary}
            </p>
          </div>
        </div>

        {/* Paragraphs with high legibility for kids */}
        <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
          {currentChapter.content.map((paragraph, pIdx) => (
            <p key={pIdx} className="bg-amber-50/30 p-3.5 rounded-2xl border border-amber-100/60">
              {paragraph}
            </p>
          ))}
        </div>

        {/* ---------------- BAB 1: TEASER QUESTION ---------------- */}
        {currentChapter.teaser && (
          <div className="mt-8 bg-sky-50/70 border-2 border-sky-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <span>Pertanyaan Pemantik: Mari Berpikir Kritis!</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-stone-900">
              "{currentChapter.teaser.question}"
            </h3>

            <div className="space-y-2.5">
              {currentChapter.teaser.options.map((opt, optIdx) => {
                const isSelected = teaserSelected === optIdx;
                const isCorrect = optIdx === currentChapter.teaser?.correctIndex;
                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setTeaserSelected(optIdx);
                      if (isCorrect) sounds.playCorrect();
                      else sounds.playGentleHint();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition border-2 cursor-pointer ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                          : 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-white border-sky-100 hover:border-sky-300 text-stone-700'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {teaserSelected !== null && (
              <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium animate-in fade-in duration-200 ${
                teaserSelected === currentChapter.teaser.correctIndex
                  ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                  : 'bg-amber-100 border border-amber-300 text-amber-900'
              }`}>
                <strong>Umpan Balik Mendidik:</strong> {currentChapter.teaser.explanation}
              </div>
            )}
          </div>
        )}

        {/* ---------------- BAB 3: INTERACTIVE CHARACTER CARDS ---------------- */}
        {currentChapter.characters && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">Kartu Tokoh Bersejarah</h3>
                <p className="text-xs sm:text-sm text-stone-600">Tekan tombol "Pelajari Perannya" pada setiap tokoh untuk mempelajari keutamaan mereka.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentChapter.characters.map((char) => {
                const isOpen = selectedCharacterId === char.id;
                const charAnswer = characterAnswers[char.id];
                const isAnsweredCorrect = charAnswer === char.correctIndex;

                return (
                  <div
                    key={char.id}
                    className={`rounded-3xl border-2 transition-all p-5 flex flex-col justify-between ${
                      isOpen
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-lg'
                        : 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/80 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-200 text-emerald-700 flex items-center justify-center shrink-0">
                          {renderIcon(char.iconName)}
                        </div>
                        <div>
                          <h4 className="font-black text-stone-900 text-base leading-snug">{char.name}</h4>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {char.roleTitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        {char.description}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setSelectedCharacterId(isOpen ? null : char.id);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>{isOpen ? 'Tutup Kuis Mini' : 'Pelajari Perannya & Kuis'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Mini quiz inside character card */}
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-emerald-200 space-y-3 animate-in fade-in duration-200">
                          <p className="text-xs font-bold text-stone-800">
                            Pertanyaan: {char.question}
                          </p>
                          <div className="space-y-1.5">
                            {char.options.map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  setCharacterAnswers(prev => ({ ...prev, [char.id]: oIdx }));
                                  if (oIdx === char.correctIndex) sounds.playCorrect();
                                  else sounds.playGentleHint();
                                }}
                                className={`w-full text-left p-2 rounded-xl text-xs transition border cursor-pointer ${
                                  charAnswer === oIdx
                                    ? oIdx === char.correctIndex
                                      ? 'bg-emerald-200 border-emerald-500 font-bold text-emerald-900'
                                      : 'bg-rose-100 border-rose-300 text-rose-900'
                                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {charAnswer !== undefined && (
                            <p className="text-[11px] text-stone-700 bg-white/90 p-2.5 rounded-xl border border-emerald-200 font-medium">
                              {char.explanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- BAB 4: INTERACTIVE TIMELINE ---------------- */}
        {currentChapter.scenes && (
          <div className="mt-8 space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-stone-900">Kronologi Perjalanan: 6 Adegan Sejarah</h3>
            
            {/* Timeline selector step buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {currentChapter.scenes.map((sc) => {
                const isSelected = activeTimelineStep === sc.step;
                return (
                  <button
                    key={sc.step}
                    onClick={() => {
                      sounds.playClick();
                      setActiveTimelineStep(sc.step);
                    }}
                    className={`p-2.5 rounded-2xl border-2 text-center transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-700 text-white shadow-md'
                        : 'border-amber-200 bg-white hover:bg-amber-100/60 text-stone-700'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase block opacity-80">Tahap {sc.step}</span>
                    <span className="text-xs font-bold truncate block">{sc.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active scene card */}
            {(() => {
              const sc = currentChapter.scenes.find(s => s.step === activeTimelineStep) || currentChapter.scenes[0];
              const sceneAnswer = timelineAnswers[sc.step];
              
              // Map scene step to illustration
              const sceneMap: Record<number, 'makkah' | 'mountain_track' | 'cave_tsur' | 'desert_journey' | 'oasis_outskirts' | 'ansar_welcome'> = {
                1: 'makkah',
                2: 'mountain_track',
                3: 'cave_tsur',
                4: 'desert_journey',
                5: 'oasis_outskirts',
                6: 'ansar_welcome',
              };

              return (
                <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5">
                    <IllustrationArt 
                      sceneType={sceneMap[sc.step] || 'desert_journey'} 
                      className="w-full h-52 rounded-2xl shadow-sm"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Adegan #{sc.step} dari 6
                    </span>
                    <h4 className="text-lg font-black text-stone-900">{sc.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {sc.description}
                    </p>

                    <div className="pt-2 border-t border-amber-200/80">
                      <p className="text-xs font-bold text-stone-800 mb-2">{sc.question}</p>
                      <div className="space-y-1.5">
                        {sc.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setTimelineAnswers(prev => ({ ...prev, [sc.step]: oIdx }));
                              if (oIdx === sc.correctIndex) sounds.playCorrect();
                              else sounds.playGentleHint();
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                              sceneAnswer === oIdx
                                ? oIdx === sc.correctIndex
                                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                                  : 'bg-rose-100 border-rose-300 text-rose-900'
                                : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ---------------- BAB 6: MORAL VALUES & REFLECTION ---------------- */}
        {currentChapter.morals && (
          <div className="mt-8 space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-stone-900">Nilai-Nilai Luhur Teladan Hijrah</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentChapter.morals.map((m, mIdx) => (
                <div key={mIdx} className="bg-emerald-50/60 border-2 border-emerald-200 rounded-3xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2.5 text-emerald-800 font-black text-sm">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span>{m.title}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-semibold">
                    {m.meaning}
                  </p>
                  <div className="bg-white p-3 rounded-2xl border border-emerald-100 text-xs text-stone-600">
                    <strong className="text-emerald-900 block mb-0.5">Contoh di Sekolah:</strong>
                    {m.schoolExample}
                  </div>
                </div>
              ))}
            </div>

            {/* Reflection box */}
            {currentChapter.reflection && (
              <div className="mt-6 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-black text-base">
                  <HeartHandshake className="w-6 h-6 text-amber-700" />
                  <span>Pertanyaan Refleksi Diri:</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-stone-900">
                  "{currentChapter.reflection.question}"
                </p>
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={reflectionAnswer}
                    onChange={(e) => setReflectionAnswer(e.target.value)}
                    placeholder="Tuliskan renunganmu di sini (misal: Nilai persaudaraan, keramahan, dan kepedulian seperti kaum Ansar...)"
                    className="w-full p-3.5 rounded-2xl bg-white border-2 border-amber-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-1">
                    <strong className="text-amber-900 block">Inspirasi Jawaban Bijak:</strong>
                    {currentChapter.reflection.sampleThoughts.map((th, idx) => (
                      <p key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{th}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div className="pt-6 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              currentChapterIndex === 0
                ? 'opacity-40 bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-white border-2 border-amber-200 text-stone-700 hover:bg-amber-100/70'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bab Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playCelebration();
                onCompleteChapter(currentChapter.id);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-200 transition cursor-pointer"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{isCurrentCompleted ? 'Bab Ini Sudah Selesai' : 'Tandai Selesai (+5 Bintang)'}</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white shadow-md transition cursor-pointer"
          >
            <span>{isLastChapter ? 'Selesai Belajar Bab' : 'Lanjut ke Bab Berikutnya'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </article>
    </div>
  );
};
