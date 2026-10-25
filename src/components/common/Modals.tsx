import React from 'react';
import { X, CheckCircle, Target, BookOpen, Star, Volume2, Sparkles, Award } from 'lucide-react';

interface ObjectivesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ObjectivesModal: React.FC<ObjectivesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const objectives = [
    'Menjelaskan pengertian hijrah Nabi Muhammad SAW secara tepat dan sederhana.',
    'Mengetahui alasan mulia di balik hijrah kaum Muslimin dari Makkah ke Madinah.',
    'Menyebutkan dan mengenal tokoh-tokoh penting dalam peristiwa hijrah.',
    'Menjelaskan peran setia Abu Bakar Ash-Shiddiq dalam mendampingi perjalanan hijrah.',
    'Menjelaskan peristiwa persembunyian di Gua Tsur dan tanda pertolongan Allah SWT.',
    'Menjelaskan peran luhur kaum Muhajirin dan kaum Ansar.',
    'Memahami awal pembangunan masyarakat Islam yang damai dan rukun di Madinah.',
    'Meneladani sikap sabar, berani, amanah, tawakal, persaudaraan, dan kerja sama.',
    'Menganalisis contoh penerapan nilai-nilai hijrah dalam kehidupan sehari-hari di sekolah dan rumah.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-amber-50 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-stone-800">Tujuan Pembelajaran</h2>
              <p className="text-xs md:text-sm text-stone-600 font-medium">Materi PAI Kelas 4 SD: Kisah Hijrah ke Madinah</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-amber-200/50 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed mb-4">
          Hai adik-adik yang hebat! Setelah bertualang bersama aplikasi <strong>Hijrah Adventure</strong>, kamu diharapkan mampu:
        </p>

        <div className="space-y-3 mb-6">
          {objectives.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-amber-100 shadow-xs">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-stone-700 leading-snug">{item}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-emerald-600 shrink-0" />
          <p className="text-xs md:text-sm text-emerald-900 font-medium">
            Yuk, belajar dengan tekun, kumpulkan bintang kebaikan, dan amalkan sikap terpuji dalam keseharianmu!
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Siap Belajar!
          </button>
        </div>
      </div>
    </div>
  );
};

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <BookOpen className="w-6 h-6 text-amber-700" />,
      title: '1. Jelajahi 6 Bab Materi',
      desc: 'Buka menu "Kenali Kisah Hijrah". Baca cerita seru, balik kartu tokoh penting, dan coba jawab pertanyaan pemantik.'
    },
    {
      icon: <Volume2 className="w-6 h-6 text-sky-700" />,
      title: '2. Dengarkan Cerita & Peta',
      desc: 'Kamu bisa menekan tombol audio untuk mendengarkan narasi suara dalam Bahasa Indonesia yang ramah.'
    },
    {
      icon: <Star className="w-6 h-6 text-amber-500 fill-amber-400" />,
      title: '3. Mainkan 3 Game Petualangan',
      desc: 'Susun urutan waktu, pasangkan nama tokoh dengan perannya, dan pilih tindakan bijak dalam misi nilai hijrah.'
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: '4. Kerjakan LKPD & Raih Nilai 100',
      desc: 'Selesaikan 10 soal pilihan ganda dan 5 isian singkat (LOTS, MOTS, dan HOTS). Kamu bisa mencetak lembar hasil belajarmu!'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-amber-50 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-stone-800">Panduan Penggunaan</h2>
              <p className="text-xs md:text-sm text-stone-600 font-medium">Tips Belajar Mandiri untuk Siswa & Petunjuk untuk Guru</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-amber-200/50 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {steps.map((st, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-amber-50">
                  {st.icon}
                </div>
                <h3 className="font-bold text-stone-800 text-sm md:text-base">{st.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-4 text-xs md:text-sm text-stone-700 leading-relaxed mb-6">
          <strong>Catatan Keamanan & Privasi:</strong> Aplikasi ini tidak meminta data rahasia siswa atau pembuatan akun. Seluruh kemajuan bintang dan jawaban tersimpan aman di peramban (browser) kamu melalui localStorage.
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Mengerti, Lanjutkan!
          </button>
        </div>
      </div>
    </div>
  );
};
