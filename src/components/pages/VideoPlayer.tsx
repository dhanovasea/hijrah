import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Subtitles, 
  FileText, 
  Film, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Info
} from 'lucide-react';
import { IllustrationArt } from '../common/IllustrationArt';
import { sounds, speakIndonesian, stopSpeaking } from '../../utils/audio';

export const VideoPlayer: React.FC = () => {
  // Storyboard chapters simulating a high-quality educational mini-documentary
  const videoScenes = [
    {
      id: 1,
      title: 'Bagian 1: Situasi Kaum Muslimin di Makkah',
      timeLabel: '00:00 - 00:20',
      sceneType: 'makkah' as const,
      narrationText: 'Di Kota Makkah pada abad ke-7, kaum Muslimin awal berjuang mempertahankan keimanan tauhid di tengah boikot dan tekanan. Atas perintah Allah SWT, Rasulullah SAW merencanakan perpindahan mulia ke Yatsrib, tempat orang-orang beriman telah bersedia menyambut mereka.',
      subtitles: 'Situasi berat di Makkah mendorong kaum beriman melakukan hijrah mulia atas perintah Allah SWT.',
      soundtrackMood: 'Tenang dan khidmat'
    },
    {
      id: 2,
      title: 'Bagian 2: Persiapan Rahasia & Keberangkatan',
      timeLabel: '00:20 - 00:40',
      sceneType: 'mountain_track' as const,
      narrationText: 'Malam yang sunyi. Ali bin Abi Thalib dengan berani tidur di ranjang Rasulullah untuk mengecoh kaum musyrikin. Sementara itu, Rasulullah SAW dan Abu Bakar melangkah ke arah selatan menuju Jabal Tsur untuk menyusun persembunyian rahasia.',
      subtitles: 'Ali r.a. mengecoh musuh di ranjang, sementara Rasulullah dan Abu Bakar menuju Jabal Tsur.',
      soundtrackMood: 'Misterius dan penuh kehati-hatian'
    },
    {
      id: 3,
      title: 'Bagian 3: Perlindungan Agung di Gua Tsur',
      timeLabel: '00:40 - 01:00',
      sceneType: 'cave_tsur' as const,
      narrationText: 'Selama tiga hari tiga malam di Gua Tsur, Allah menurunkan ketenangan. Sarang laba-laba dan burung merpati menutupi pintu gua. Rasulullah menenangkan Abu Bakar: "Jangan berduka cita, sesungguhnya Allah bersama kita."',
      subtitles: '"La tahzan, innallaha ma\'ana" — Jangan berduka cita, sesungguhnya Allah bersama kita.',
      soundtrackMood: 'Menenangkan, hangat dan penuh harapan'
    },
    {
      id: 4,
      title: 'Bagian 4: Menembus Jalur Pesisir Gurun',
      timeLabel: '01:00 - 01:25',
      sceneType: 'desert_journey' as const,
      narrationText: 'Didampingi penunjuk jalan terpercaya Abdullah bin Uraiqit, rombongan menempuh jalur pesisir Laut Merah yang terjal dan jarang dilalui. Menahan panasnya terik gurun demi menjaga masa depan dakwah kebenaran.',
      subtitles: 'Dipandu Abdullah bin Uraiqit melewati rute pantai yang tersembunyi dan terjal.',
      soundtrackMood: 'Megah, penuh keteguhan'
    },
    {
      id: 5,
      title: 'Bagian 5: Singgah di Quba & Sambutan Madinah',
      timeLabel: '01:25 - 01:45',
      sceneType: 'oasis_outskirts' as const,
      narrationText: 'Rombongan tiba di desa Quba dan membangun masjid pertama dalam sejarah Islam. Tak lama kemudian, sampailah beliau di Madinah. Gema puji-pujian Thala\'al Badru \'Alayna menyambut kedatangan Rasulullah dengan penuh kebahagiaan.',
      subtitles: 'Mendirikan Masjid Quba, disusul sambutan sukacita penduduk Madinah (Kaum Ansar).',
      soundtrackMood: 'Gembira, ceria dan penuh syukur'
    },
    {
      id: 6,
      title: 'Bagian 6: Pesan Hikmah & Persaudaraan Abadi',
      timeLabel: '01:45 - 02:00',
      sceneType: 'brotherhood_today' as const,
      narrationText: 'Peristiwa hijrah mengajarkan kita nilai sabar, amanah, tawakal, dan persaudaraan. Kaum Muhajirin dan Ansar bersatu membangun peradaban damai. Hari ini, mari kita terapkan semangat tolong-menolong di sekolah dan kehidupan sehari-hari.',
      subtitles: 'Teladan persaudaraan, amanah, dan saling menolong untuk kita amalkan hari ini.',
      soundtrackMood: 'Inspiratif dan membangkitkan semangat'
    }
  ];

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [viewMode, setViewMode] = useState<'player' | 'storyboard'>('player');

  const currentScene = videoScenes[activeSceneIndex];

  // Auto progression when playing
  useEffect(() => {
    if (isPlaying) {
      // Speak the narration of the current scene
      speakIndonesian(currentScene.narrationText, () => {
        // When speech finishes, move to next scene
        if (activeSceneIndex < videoScenes.length - 1) {
          setActiveSceneIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          sounds.playCelebration();
        }
      });
    } else {
      stopSpeaking();
    }

    return () => {
      stopSpeaking();
    };
  }, [isPlaying, activeSceneIndex]);

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    sounds.playClick();
    setIsPlaying(false);
    stopSpeaking();
    setActiveSceneIndex(0);
  };

  const handleSceneSelect = (idx: number) => {
    sounds.playClick();
    setIsPlaying(false);
    stopSpeaking();
    setActiveSceneIndex(idx);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sky-100/70 p-5 rounded-3xl border-2 border-sky-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-800 mb-1">
            <Film className="w-4 h-4" />
            <span>Media Pembelajaran Audio-Visual (Durasi: ~2 Menit)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Perjalanan Bersejarah: Hijrah Menuju Madinah
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Dokumenter naratif interaktif dengan ilustrasi lanskap alami abad ke-7, audio pembaca Bahasa Indonesia, dan teks subtitle.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-sky-300 shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => { sounds.playClick(); setViewMode('player'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'player' ? 'bg-sky-600 text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Mode Video Player</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); setViewMode('storyboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'storyboard' ? 'bg-sky-600 text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Naskah & Storyboard</span>
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE DOCUMENTARY PLAYER */}
      {viewMode === 'player' && (
        <div className="bg-stone-900 rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden">
          {/* Main Display Stage */}
          <div className="relative aspect-video w-full bg-stone-950 flex items-center justify-center overflow-hidden">
            <IllustrationArt
              sceneType={currentScene.sceneType}
              className="w-full h-full object-cover scale-105 transition-all duration-700"
              altText={currentScene.title}
            />

            {/* Dark vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

            {/* Scene Chapter Title Badge */}
            <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-amber-200 px-3.5 py-1 rounded-full text-xs font-bold border border-amber-400/40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{currentScene.title}</span>
              <span className="text-stone-400">({currentScene.timeLabel})</span>
            </div>

            {/* Subtitles Overlay */}
            {showSubtitles && (
              <div className="absolute bottom-6 inset-x-4 sm:inset-x-12 text-center pointer-events-none">
                <div className="inline-block bg-stone-950/85 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl border border-stone-700/80 text-xs sm:text-sm md:text-base font-semibold shadow-xl">
                  {currentScene.subtitles}
                </div>
              </div>
            )}

            {/* Respectful Adab Notice */}
            <div className="absolute top-4 right-4 bg-stone-950/70 text-[10px] sm:text-xs text-stone-300 px-3 py-1 rounded-full hidden sm:block border border-stone-700">
              Penggambaran simbolis tanpa sosok fisik Rasulullah SAW
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="bg-stone-900 p-4 sm:p-5 text-white space-y-3">
            {/* Timeline scrubber segments */}
            <div className="grid grid-cols-6 gap-1.5">
              {videoScenes.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => handleSceneSelect(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSceneIndex
                      ? 'bg-amber-400 shadow-sm'
                      : idx < activeSceneIndex
                      ? 'bg-emerald-500'
                      : 'bg-stone-700 hover:bg-stone-600'
                  }`}
                  title={`${sc.title} (${sc.timeLabel})`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 flex items-center justify-center font-bold shadow-lg transition transform hover:scale-105 cursor-pointer"
                  aria-label={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-stone-950" /> : <Play className="w-6 h-6 fill-stone-950 ml-0.5" />}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
                  title="Ulangi dari Awal"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <span className="text-xs font-semibold text-stone-300 hidden sm:inline">
                  {currentScene.timeLabel} • Bagian {activeSceneIndex + 1} dari 6
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { sounds.playClick(); setShowSubtitles(!showSubtitles); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    showSubtitles ? 'bg-emerald-700 text-white' : 'bg-stone-800 text-stone-400'
                  }`}
                  title="Tampilkan Subtitle Bahasa Indonesia"
                >
                  <Subtitles className="w-4 h-4" />
                  <span>Subtitles</span>
                </button>

                <button
                  onClick={() => {
                    if (activeSceneIndex > 0) handleSceneSelect(activeSceneIndex - 1);
                  }}
                  disabled={activeSceneIndex === 0}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (activeSceneIndex < videoScenes.length - 1) handleSceneSelect(activeSceneIndex + 1);
                  }}
                  disabled={activeSceneIndex === videoScenes.length - 1}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-300 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: STORYBOARD & NARATIVE SCRIPT (Sesuai Persyaratan No. 7 & 10) */}
      {viewMode === 'storyboard' && (
        <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 text-emerald-800 font-bold border-b border-amber-100 pb-4">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-black text-stone-900">Naskah Lengkap & Storyboard Edukasi Hijrah</h3>
          </div>

          <div className="space-y-4">
            {videoScenes.map((sc, idx) => (
              <div 
                key={sc.id}
                className="bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-3">
                  <IllustrationArt 
                    sceneType={sc.sceneType}
                    className="w-full h-32 rounded-xl"
                  />
                  <span className="text-[11px] font-bold text-amber-800 block text-center mt-1">
                    {sc.timeLabel}
                  </span>
                </div>
                <div className="md:col-span-9 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-stone-900 text-sm md:text-base">
                      {sc.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                      Suasana: {sc.soundtrackMood}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {sc.narrationText}
                  </p>
                  <div className="text-xs text-sky-900 bg-sky-50 p-2.5 rounded-xl border border-sky-200">
                    <strong>Teks Subtitle:</strong> "{sc.subtitles}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational Note */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          <strong>Keunggulan Pembelajaran:</strong> Alur video dirancang khusus tanpa memperlihatkan wajah atau sosok Nabi Muhammad SAW secara fisik. Penggambaran berfokus pada keindahan alam ciptaan Allah, keteguhan hati para sahabat, dan nilai-nilai persaudaraan yang abadi.
        </div>
      </div>
    </div>
  );
};
