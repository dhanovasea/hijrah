import React from 'react';
import { UserProgress, NavTab } from '../../types';
import { 
  BarChart3, 
  Star, 
  Award, 
  BookOpen, 
  Gamepad2, 
  ClipboardCheck, 
  CheckCircle2, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  ArrowRight,
  Heart,
  ShieldCheck,
  Target
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface ResultsDashboardProps {
  progress: UserProgress;
  onNavigate: (tab: NavTab) => void;
  onResetProgress: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  progress,
  onNavigate,
  onResetProgress
}) => {
  // Calculations
  const lessonPercent = Math.round((progress.completedLessons.length / 6) * 100);
  const storyPercent = Math.round((progress.completedStories.length / 8) * 100);
  const mapPercent = Math.round((progress.visitedMapStops.length / 5) * 100);
  
  const gamesDone = 
    (progress.gameCompleted.orderGame ? 1 : 0) + 
    (progress.gameCompleted.characterMatch ? 1 : 0) + 
    (progress.gameCompleted.valueMission ? 1 : 0);

  const totalTasks = 6 + 8 + 5 + 3 + (progress.lastWorksheetScore !== null ? 1 : 0);
  const completedTasks = 
    progress.completedLessons.length + 
    progress.completedStories.length + 
    progress.visitedMapStops.length + 
    gamesDone + 
    (progress.lastWorksheetScore !== null ? 1 : 0);
  const overallPercent = Math.min(100, Math.round((completedTasks / totalTasks) * 100));

  // Determine next recommended step
  let nextRecommendation = {
    title: 'Kerjakan Worksheet (LKPD)',
    desc: 'Uji pemahamanmu dengan 10 soal pilihan ganda dan 5 isian singkat untuk meraih nilai 100.',
    tab: 'worksheet' as NavTab,
    btnText: 'Buka Worksheet Sekarang'
  };

  if (progress.completedLessons.length < 6) {
    nextRecommendation = {
      title: 'Lanjutkan Membaca Bab Materi',
      desc: `Kamu telah menyelesaikan ${progress.completedLessons.length} dari 6 Bab. Yuk pelajari bab berikutnya!`,
      tab: 'lessons' as NavTab,
      btnText: 'Buka Materi Pembelajaran'
    };
  } else if (gamesDone < 3) {
    nextRecommendation = {
      title: 'Mainkan Game Hijrah Adventure',
      desc: `Kamu telah menuntaskan ${gamesDone} dari 3 mini-game. Uji ketelitianmu di game berikutnya!`,
      tab: 'games' as NavTab,
      btnText: 'Buka Arena Game'
    };
  } else if (progress.lastWorksheetScore === null) {
    nextRecommendation = {
      title: 'Kerjakan Evaluasi LKPD Resmi',
      desc: 'Saatnya membuktikan penguasaan materimu dalam evaluasi LOTS–MOTS–HOTS berbobot 100 poin.',
      tab: 'worksheet' as NavTab,
      btnText: 'Mulai Kerjakan LKPD'
    };
  } else {
    nextRecommendation = {
      title: 'Koleksi Bintang di Cerita Bergambar',
      desc: 'Hebat! Semua aktivitas utama telah kamu coba. Buka kembali cerita bergambar atau tonton video.',
      tab: 'stories' as NavTab,
      btnText: 'Jelajahi Galeri Cerita'
    };
  }

  const handlePrintCertificate = () => {
    sounds.playClick();
    window.print();
  };

  const handleResetConfirm = () => {
    sounds.playClick();
    if (window.confirm('Apakah kamu ingin mengatur ulang seluruh data progres dan bintang untuk belajar dari awal?')) {
      onResetProgress();
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="bg-indigo-100/70 p-5 rounded-3xl border-2 border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-900 mb-1">
            <BarChart3 className="w-4 h-4 text-indigo-700" />
            <span>Dasbor & Rekapitulasi Pembelajaran</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Hasil Belajarku — Hijrah Adventure
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Pantau perolehan bintang kebaikan, ketuntasan bab, serta nilai evaluasi LKPD pribadimu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrintCertificate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-indigo-300 text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Rekap Hasil</span>
          </button>

          <button
            onClick={handleResetConfirm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progres</span>
          </button>
        </div>
      </div>

      {/* 4 PRIMARY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Progress */}
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase">Total Ketuntasan</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-stone-900">{overallPercent}%</span>
            <div className="w-full h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                style={{ width: `${overallPercent}%` }} 
              />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 mt-2 block">
            {completedTasks} dari {totalTasks} Aktivitas Belajar
          </span>
        </div>

        {/* Stat 2: Bintang Kebaikan */}
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase">Bintang Kebaikan</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-amber-600">{progress.stars}</span>
            <span className="text-xs font-bold text-stone-500 ml-1.5">Bintang</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 mt-2 block">
            Dikumpulkan dari kuis & game
          </span>
        </div>

        {/* Stat 3: Games Completed */}
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase">Game Dituntaskan</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-purple-700">{gamesDone}</span>
            <span className="text-xs font-bold text-stone-500 ml-1.5">dari 3 Game</span>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 mt-2 block">
            Urutan, Tokoh, & Misi Nilai
          </span>
        </div>

        {/* Stat 4: Nilai LKPD Terakhir */}
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase">Nilai LKPD Terakhir</span>
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-teal-700">
              {progress.lastWorksheetScore !== null ? progress.lastWorksheetScore : '-'}
            </span>
            <span className="text-xs font-bold text-stone-400 ml-1">/100</span>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 mt-2 block">
            {progress.lastWorksheetScore !== null ? 'Sudah dinilai sistem' : 'Belum mengerjakan'}
          </span>
        </div>
      </div>

      {/* DETAILED PROGRESS BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Materi Pembelajaran (6 Bab)</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${lessonPercent}%` }} />
          </div>
          <div className="flex justify-between text-xs text-stone-600 font-semibold">
            <span>{progress.completedLessons.length} Bab Selesai</span>
            <span>{lessonPercent}%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Cerita Bergambar (8 Adegan)</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${storyPercent}%` }} />
          </div>
          <div className="flex justify-between text-xs text-stone-600 font-semibold">
            <span>{progress.completedStories.length} Adegan Disimak</span>
            <span>{storyPercent}%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
            <Target className="w-4 h-4 text-sky-700" />
            <span>Peta Perjalanan (5 Checkpoint)</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-sky-600 rounded-full" style={{ width: `${mapPercent}%` }} />
          </div>
          <div className="flex justify-between text-xs text-stone-600 font-semibold">
            <span>{progress.visitedMapStops.length} Titik Disinggahi</span>
            <span>{mapPercent}%</span>
          </div>
        </div>
      </div>

      {/* RECOMMENDED NEXT ACTIVITY */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
            Rekomendasi Langkah Berikutnya:
          </span>
          <h3 className="text-xl sm:text-2xl font-black">{nextRecommendation.title}</h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-medium leading-relaxed">
            {nextRecommendation.desc}
          </p>
        </div>
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate(nextRecommendation.tab);
          }}
          className="shrink-0 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-black text-xs sm:text-sm shadow-md transition transform hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <span>{nextRecommendation.btnText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* INSPIRATIONAL MOTTO CARD */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-center space-y-2">
        <Heart className="w-7 h-7 text-rose-500 mx-auto" />
        <h4 className="text-base sm:text-lg font-black text-stone-900">
          "Setiap usaha adalah langkah menuju keberhasilan. Terus belajar dan berbuat baik!"
        </h4>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          Ingatlah keteguhan kaum Muhajirin dan kedermawanan kaum Ansar dalam setiap langkah belajarmu di sekolah.
        </p>
      </div>
    </div>
  );
};
