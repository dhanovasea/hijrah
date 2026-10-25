import React from 'react';
import { NavTab, UserProgress } from '../../types';
import { 
  Compass, 
  BookOpen, 
  Image as ImageIcon, 
  Video, 
  Gamepad2, 
  ClipboardCheck, 
  BarChart3, 
  Target, 
  HelpCircle, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Heart,
  Users
} from 'lucide-react';
import { IllustrationArt } from '../common/IllustrationArt';
import { sounds } from '../../utils/audio';

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
  onOpenObjectives: () => void;
  onOpenGuide: () => void;
  progress: UserProgress;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenObjectives,
  onOpenGuide,
  progress
}) => {
  const modules = [
    {
      tab: 'lessons' as NavTab,
      number: '1',
      title: 'Kenali Kisah Hijrah',
      subtitle: '6 Bab Belajar Penuh Hikmah',
      desc: 'Pelajari arti hijrah, sebab perjalanan, tokoh-tokoh penting, hingga hikmah untuk kehidupan sehari-hari.',
      icon: <BookOpen className="w-6 h-6 text-emerald-700" />,
      color: 'border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80',
      badge: `${progress.completedLessons.length}/6 Bab Selesai`,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      tab: 'stories' as NavTab,
      number: '2',
      title: 'Cerita Bergambar',
      subtitle: '8 Adegan Visual Alami',
      desc: 'Jelajahi ilustrasi sejarah gurun dan bebatuan, dengarkan narasi suara, dan uji pemahaman dengan kuis mini.',
      icon: <ImageIcon className="w-6 h-6 text-amber-700" />,
      color: 'border-amber-200 bg-amber-50/70 hover:bg-amber-100/80',
      badge: `${progress.completedStories.length}/8 Adegan Terbuka`,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      tab: 'video' as NavTab,
      number: '3',
      title: 'Tonton Video Edukasi',
      subtitle: 'Narasi & Storyboard Interaktif',
      desc: 'Simak video dokumenter edukasi dan alur cerita perjalanan dengan subtitle Bahasa Indonesia yang jelas.',
      icon: <Video className="w-6 h-6 text-sky-700" />,
      color: 'border-sky-200 bg-sky-50/70 hover:bg-sky-100/80',
      badge: 'Video & Narasi Siap',
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      tab: 'map' as NavTab,
      number: '4',
      title: 'Peta Perjalanan Hijrah',
      subtitle: 'Makkah hingga Madinah',
      desc: 'Sentuh titik-titik perjalanan bersejarah: dari Jabal Tsur, pesisir pantai rahasia, Masjid Quba, hingga Madinah.',
      icon: <Compass className="w-6 h-6 text-amber-800" />,
      color: 'border-orange-200 bg-orange-50/70 hover:bg-orange-100/80',
      badge: `${progress.visitedMapStops.length}/5 Titik Disinggahi`,
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      tab: 'games' as NavTab,
      number: '5',
      title: 'Game Hijrah Adventure',
      subtitle: '3 Mini-Game Menantang',
      desc: 'Susun urutan peristiwa, pasangkan tokoh dan perannya, serta selesaikan misi nilai hijrah di sekolah.',
      icon: <Gamepad2 className="w-6 h-6 text-purple-700" />,
      color: 'border-purple-200 bg-purple-50/70 hover:bg-purple-100/80',
      badge: `${(progress.gameCompleted.orderGame ? 1 : 0) + (progress.gameCompleted.characterMatch ? 1 : 0) + (progress.gameCompleted.valueMission ? 1 : 0)}/3 Game Selesai`,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      tab: 'worksheet' as NavTab,
      number: '6',
      title: 'Worksheet & Evaluasi (LKPD)',
      subtitle: '10 PG & 5 Isian (LOTS–HOTS)',
      desc: 'Uji pemahamanmu dengan LKPD berstandar LOTS, MOTS, dan HOTS. Dapatkan penilaian langsung dan tinjauan.',
      icon: <ClipboardCheck className="w-6 h-6 text-teal-700" />,
      color: 'border-teal-200 bg-teal-50/70 hover:bg-teal-100/80',
      badge: progress.lastWorksheetScore !== null ? `Nilai: ${progress.lastWorksheetScore}/100` : 'Belum Dikerjakan',
      badgeColor: progress.lastWorksheetScore !== null ? 'bg-teal-100 text-teal-800 font-bold' : 'bg-stone-200 text-stone-700'
    },
    {
      tab: 'results' as NavTab,
      number: '7',
      title: 'Hasil Belajarku',
      subtitle: 'Laporan Belajar & Bintang',
      desc: 'Lihat ringkasan kemajuan belajar, kekuatan yang sudah kamu kuasai, dan saran latihan selanjutnya.',
      icon: <BarChart3 className="w-6 h-6 text-indigo-700" />,
      color: 'border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/80',
      badge: `${progress.stars} Bintang Dikoleksi`,
      badgeColor: 'bg-indigo-100 text-indigo-800'
    }
  ];

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-300">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-emerald-50 border-3 border-amber-200 shadow-xl p-6 sm:p-10 md:p-12">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700 text-amber-200 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Media Pembelajaran PAI Kelas 4 SD</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Yuk, Belajar Kisah Hijrah Nabi Muhammad SAW!
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
              Ikuti perjalanan bersejarah, temukan pelajarannya, dan kumpulkan bintang kebaikan!
            </p>

            {/* Quick 3 core values highlight */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-amber-200 rounded-xl text-xs font-bold text-stone-700 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sabar & Berani
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-amber-200 rounded-xl text-xs font-bold text-stone-700 shadow-2xs">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Persaudaraan Muhajirin & Ansar
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-amber-200 rounded-xl text-xs font-bold text-stone-700 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-sky-600" /> Kerja Sama & Amanah
              </span>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigate('lessons');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-extrabold text-base shadow-lg shadow-emerald-800/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Mulai Petualangan</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenObjectives();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-100/70 border-2 border-emerald-600/40 text-emerald-900 font-bold text-sm shadow-xs transition cursor-pointer"
              >
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Lihat Tujuan Pembelajaran</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenGuide();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-100/70 border-2 border-amber-300 text-amber-900 font-bold text-sm shadow-xs transition cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Panduan Penggunaan</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration (Pure Natural Respectful Historical Desert Landscape) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-3 bg-white/80 border-2 border-amber-200 shadow-xl">
              <IllustrationArt 
                sceneType="desert_journey" 
                className="w-full h-64 sm:h-72 rounded-2xl" 
                altText="Ilustrasi lanskap jalur hijrah melintasi padang pasir dan pegunungan berbatu alami"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-stone-600 px-2">
                <span className="font-semibold text-emerald-800">Rute Hijrah 622 Masehi</span>
                <span className="text-stone-500 italic">Makkah → Gua Tsur → Madinah</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING MODULES GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Pilih Menu Pembelajaran</h2>
            <p className="text-sm text-stone-600">Tekan salah satu menu di bawah ini untuk memulai aktivitas belajarmu secara mandiri.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Semua menu bebas diakses kapan saja</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <div
              key={m.tab}
              onClick={() => {
                sounds.playClick();
                onNavigate(m.tab);
              }}
              className={`group relative rounded-3xl p-6 border-2 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between ${m.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                </div>

                <span className="text-xs font-black text-stone-400 uppercase tracking-widest">
                  Aktivitas #{m.number}
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-1 mb-0.5 group-hover:text-emerald-800 transition-colors">
                  {m.title}
                </h3>
                <h4 className="text-xs font-bold text-stone-600 mb-2">
                  {m.subtitle}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {m.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200/50 mt-auto">
                <span className="text-xs font-bold text-stone-700 group-hover:text-emerald-800 flex items-center gap-1">
                  Buka Aktivitas
                </span>
                <div className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-stone-600 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK MOTIVATION BANNER */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-emerald-950/40 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>Koleksi Bintang Kebaikan</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black">Siap Menjadi Siswa Kelas 4 yang Cerdas & Berakhlak Mulia?</h3>
          <p className="text-xs md:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            "Setiap usaha adalah langkah menuju keberhasilan. Pelajari sejarah hijrah dan amalkan kebaikan setiap hari!"
          </p>
        </div>
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate('games');
          }}
          className="shrink-0 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-sm shadow-md transition transform hover:scale-105 cursor-pointer"
        >
          Mainkan Game Sekarang!
        </button>
      </section>
    </div>
  );
};
