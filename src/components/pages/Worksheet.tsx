import React, { useState } from 'react';
import { 
  worksheetPGData, 
  worksheetIsianData, 
  evaluateIsianAnswer 
} from '../../data/worksheetData';
import { WorksheetSubmission } from '../../types';
import { 
  ClipboardCheck, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Printer, 
  Send, 
  Eye, 
  HelpCircle, 
  User, 
  Calendar, 
  School,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface WorksheetProps {
  onSaveSubmission: (submission: WorksheetSubmission) => void;
  lastSubmission: WorksheetSubmission | null;
}

export const Worksheet: React.FC<WorksheetProps> = ({
  onSaveSubmission,
  lastSubmission
}) => {
  // Student identification info
  const [studentName, setStudentName] = useState(lastSubmission?.studentName || '');
  const [studentClass, setStudentClass] = useState(lastSubmission?.studentClass || '4-A');
  const [submissionDate, setSubmissionDate] = useState(() => {
    return new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  // Answers state
  const [pgAnswers, setPgAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>(
    lastSubmission?.pgAnswers || {}
  );
  const [isianAnswers, setIsianAnswers] = useState<Record<number, string>>(
    lastSubmission?.isianAnswers || {}
  );

  // Review & result state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(lastSubmission !== null);
  const [submissionResult, setSubmissionResult] = useState<WorksheetSubmission | null>(lastSubmission);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSelectPG = (qId: number, val: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    sounds.playClick();
    setPgAnswers(prev => ({ ...prev, [qId]: val }));
    setValidationError(null);
  };

  const handleIsianChange = (qId: number, val: string) => {
    if (isSubmitted) return;
    setIsianAnswers(prev => ({ ...prev, [qId]: val }));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();

    // Check if at least some questions are answered
    const pgCount = Object.keys(pgAnswers).length;
    if (pgCount < 10) {
      setValidationError(`Kamu baru menjawab ${pgCount} dari 10 soal pilihan ganda. Yuk lengkapi semua soal terlebih dahulu!`);
      return;
    }

    // 1. Calculate PG Score (10 questions * 5 = 50 max)
    let pgScore = 0;
    let correctCountPG = 0;
    worksheetPGData.forEach(q => {
      if (pgAnswers[q.id] === q.correctAnswer) {
        pgScore += 5;
        correctCountPG += 1;
      }
    });

    // 2. Evaluate Isian Singkat (5 questions * 10 = 50 max)
    let isianScore = 0;
    const reviewedIsian: Record<number, { score: number; feedback: string; status: 'correct' | 'partial' | 'review_needed' | 'incorrect' }> = {};

    worksheetIsianData.forEach(q => {
      const evaluation = evaluateIsianAnswer(q.id, isianAnswers[q.id] || '');
      reviewedIsian[q.id] = evaluation;
      isianScore += evaluation.score;
    });

    const totalScore = Math.min(100, pgScore + isianScore);

    // Feedback category based on prompt requirements
    let feedbackCategory: 'hebat' | 'bagus' | 'berkembang' | 'semangat' = 'semangat';
    if (totalScore >= 90) feedbackCategory = 'hebat';
    else if (totalScore >= 80) feedbackCategory = 'bagus';
    else if (totalScore >= 70) feedbackCategory = 'berkembang';

    const strengths: string[] = [];
    const improvementAreas: string[] = [];
    const nextSteps: string[] = [];

    if (correctCountPG >= 8) strengths.push('Sangat memahami kronologi sejarah dan tokoh-tokoh penting hijrah.');
    if (reviewedIsian[11]?.score === 10) strengths.push('Mengenal peran setia Abu Bakar Ash-Shiddiq.');
    if (reviewedIsian[14]?.score >= 8) strengths.push('Mampu menganalisis contoh persaudaraan kaum Ansar (HOTS).');
    if (reviewedIsian[15]?.score >= 8) strengths.push('Memahami paduan ikhtiar dan tawakal saat belajar (HOTS).');

    if (correctCountPG < 7) improvementAreas.push('Perlu meninjau kembali Bab 3 dan Bab 4 mengenai urutan perjalanan dan peran pemandu jalan.');
    if ((reviewedIsian[14]?.score || 0) < 8) improvementAreas.push('Latihlah menuliskan tindakan nyata yang mencerminkan sikap kaum Ansar.');
    if ((reviewedIsian[15]?.score || 0) < 8) improvementAreas.push('Ingat kembali dua langkah penting saat menghadapi kesulitan: membuat rencana nyata dan berdoa.');

    nextSteps.push('Buka kembali menu Cerita Bergambar untuk mengingat visual perjalanan.');
    nextSteps.push('Terapkan nilai persaudaraan dan tolong-menolong kepada teman di kelas.');

    const submission: WorksheetSubmission = {
      studentName: studentName.trim() || 'Peserta Didik Hebat',
      studentClass: studentClass.trim() || 'Kelas 4',
      submissionDate,
      pgAnswers,
      isianAnswers,
      pgScore,
      isianScore,
      totalScore,
      correctCountPG,
      reviewedIsian,
      feedbackCategory,
      strengths: strengths.length > 0 ? strengths : ['Semangat belajar yang tinggi dan tekun menyelesaikan LKPD.'],
      improvementAreas: improvementAreas.length > 0 ? improvementAreas : ['Pertahankan prestasimu dan terus berbagi kebaikan dengan teman!'],
      nextSteps
    };

    setSubmissionResult(submission);
    setIsSubmitted(true);
    onSaveSubmission(submission);

    if (totalScore >= 80) {
      sounds.playCelebration();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      sounds.playCorrect();
    }
  };

  const handleReset = () => {
    sounds.playClick();
    if (window.confirm('Apakah kamu yakin ingin mengulang pengerjaan LKPD dari awal? Jawaban sebelumnya akan diatur ulang.')) {
      setPgAnswers({});
      setIsianAnswers({});
      setIsSubmitted(false);
      setSubmissionResult(null);
      setIsReviewOpen(false);
      setValidationError(null);
    }
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* HEADER LKPD */}
      <div className="bg-teal-100/70 p-5 rounded-3xl border-2 border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:border-none print:p-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-900 mb-1">
            <ClipboardCheck className="w-4 h-4 text-teal-700" />
            <span>Lembar Kerja Peserta Didik (LKPD) PAI Kelas 4 SD</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Kisah Hijrah Nabi Muhammad SAW ke Madinah
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Tepat 10 Pilihan Ganda (LOTS–MOTS–HOTS) & 5 Isian Singkat. Skor Maksimal: 100 Poin.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
          {isSubmitted && (
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-teal-300 text-teal-900 font-bold text-xs hover:bg-teal-50 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak LKPD</span>
            </button>
          )}

          {isSubmitted && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Worksheet</span>
            </button>
          )}
        </div>
      </div>

      {/* STUDENT IDENTIFIER CARD */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 p-5 sm:p-6 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-1">
            Nama Panggilan (Opsional)
          </label>
          <div className="flex items-center gap-2 bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2">
            <User className="w-4 h-4 text-amber-700 shrink-0" />
            <input
              type="text"
              disabled={isSubmitted}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Contoh: Ahmad"
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-1">
            Kelas (Opsional)
          </label>
          <div className="flex items-center gap-2 bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2">
            <School className="w-4 h-4 text-amber-700 shrink-0" />
            <input
              type="text"
              disabled={isSubmitted}
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              placeholder="Contoh: 4-B"
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-1">
            Tanggal Pengerjaan
          </label>
          <div className="flex items-center gap-2 bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
            <input
              type="text"
              disabled
              value={submissionDate}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* RESULT DASHBOARD CARD (SHOWS AFTER SUBMISSION) */}
      {isSubmitted && submissionResult && (
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl border-3 border-emerald-400 p-6 sm:p-8 shadow-xl space-y-6 animate-in zoom-in-95 duration-200 print:border print:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                  Hasil Evaluasi Resmi LKPD
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  {submissionResult.studentName} — {submissionResult.studentClass}
                </h3>
              </div>
            </div>

            {/* Score pill */}
            <div className="text-center sm:text-right bg-white px-5 py-3 rounded-2xl border-2 border-emerald-400 shadow-xs">
              <span className="text-xs font-bold text-stone-500 block">Nilai Akhir Siswa:</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-700">
                {submissionResult.totalScore}
                <span className="text-base text-stone-400 font-bold">/100</span>
              </span>
            </div>
          </div>

          {/* Category Feedback Badge */}
          <div className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center gap-3 ${
            submissionResult.totalScore >= 90
              ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
              : submissionResult.totalScore >= 80
              ? 'bg-teal-100 border-teal-400 text-teal-950'
              : submissionResult.totalScore >= 70
              ? 'bg-amber-100 border-amber-400 text-amber-950'
              : 'bg-rose-100 border-rose-400 text-rose-950'
          }`}>
            <Sparkles className="w-6 h-6 shrink-0" />
            <div>
              {submissionResult.totalScore >= 90 && '90–100: Hebat! Pemahamanmu sangat baik.'}
              {submissionResult.totalScore >= 80 && submissionResult.totalScore < 90 && '80–89: Bagus! Sedikit lagi menjadi ahli hijrah.'}
              {submissionResult.totalScore >= 70 && submissionResult.totalScore < 80 && '70–79: Terus berlatih, kamu semakin berkembang.'}
              {submissionResult.totalScore < 70 && 'Di bawah 70: Jangan menyerah. Pelajari kembali cerita dan coba lagi.'}
            </div>
          </div>

          {/* Breakdown cards: PG vs Isian */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-stone-500">Skor Bagian A (Pilihan Ganda):</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-black text-emerald-800">{submissionResult.pgScore} Poin</span>
                <span className="text-xs font-semibold text-stone-600">
                  {submissionResult.correctCountPG} dari 10 Benar
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-stone-500">Skor Bagian B (Isian Singkat):</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-black text-teal-800">{submissionResult.isianScore} Poin</span>
                <span className="text-xs font-semibold text-stone-600">
                  5 Soal Dievaluasi Rubrik
                </span>
              </div>
            </div>
          </div>

          {/* Strengths & Improvement Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kekuatan yang Sudah Dikuasai:</span>
              </h4>
              <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc font-medium">
                {submissionResult.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Materi yang Perlu Dipelajari Kembali:</span>
              </h4>
              <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc font-medium">
                {submissionResult.improvementAreas.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Toggle Review Answers Button */}
          <div className="flex justify-center pt-2 print:hidden">
            <button
              onClick={() => { sounds.playClick(); setIsReviewOpen(!isReviewOpen); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white border-2 border-emerald-500 text-emerald-900 font-extrabold text-xs sm:text-sm hover:bg-emerald-50 transition cursor-pointer shadow-xs"
            >
              <Eye className="w-4 h-4" />
              <span>{isReviewOpen ? 'Tutup Tinjauan Jawaban' : 'Tinjau Seluruh Jawaban & Kunci Pembahasan'}</span>
              {isReviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* FORM: SECTION A - PILIHAN GANDA (10 SOAL) */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-amber-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-teal-800">
              Bagian A • 10 Soal (Bobot: 50 Poin)
            </span>
            <h3 className="text-xl font-black text-stone-900">Pilihan Ganda (LOTS, MOTS, HOTS)</h3>
            <p className="text-xs text-stone-500">Pilihlah satu jawaban yang paling tepat (A, B, C, atau D).</p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-100 text-teal-900">
            5 Poin / Soal Benar
          </span>
        </div>

        <div className="space-y-6">
          {worksheetPGData.map((q, idx) => {
            const userChoice = pgAnswers[q.id];
            const isCorrect = userChoice === q.correctAnswer;
            const showReview = isSubmitted && isReviewOpen;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                  showReview
                    ? isCorrect
                      ? 'bg-emerald-50/60 border-emerald-400'
                      : 'bg-rose-50/50 border-rose-300'
                    : 'bg-amber-50/20 border-amber-200 hover:border-amber-300'
                }`}
              >
                {/* Question metadata badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-700 text-white font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      q.type === 'HOTS' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                      q.type === 'MOTS' ? 'bg-sky-100 text-sky-900 border border-sky-200' :
                      'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}>
                      Kategori {q.type}
                    </span>
                  </div>

                  {showReview && (
                    <span className={`text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>{isCorrect ? '+5 Poin (Benar)' : '0 Poin (Kurang Tepat)'}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-relaxed">
                  {q.question}
                </p>

                {/* 4 Options A, B, C, D */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const letter = opt.charAt(0) as 'A' | 'B' | 'C' | 'D';
                    const isSelected = userChoice === letter;
                    const isOptionKey = q.correctAnswer === letter;

                    return (
                      <button
                        key={letter}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectPG(q.id, letter)}
                        className={`text-left p-3 rounded-xl border-2 text-xs font-semibold transition cursor-pointer ${
                          showReview
                            ? isOptionKey
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold'
                              : isSelected
                              ? 'bg-rose-100 border-rose-400 text-rose-950'
                              : 'bg-white border-stone-200 text-stone-500 opacity-70'
                            : isSelected
                            ? 'bg-teal-700 border-teal-800 text-white shadow-xs font-bold'
                            : 'bg-white border-stone-200 hover:border-teal-400 text-stone-700 hover:bg-teal-50/40'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation in review mode */}
                {showReview && (
                  <div className="mt-2 bg-white/90 p-3 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                    <span className="font-bold text-stone-900 block">Kunci Jawaban: {q.correctAnswer}</span>
                    <p className="text-stone-600">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FORM: SECTION B - ISIAN SINGKAT (5 SOAL) */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-amber-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-teal-800">
              Bagian B • 5 Soal (Bobot: 50 Poin)
            </span>
            <h3 className="text-xl font-black text-stone-900">Isian Singkat (MOTS & HOTS)</h3>
            <p className="text-xs text-stone-500">Tuliskan jawaban singkat dan jelas dengan bahasamu sendiri.</p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-100 text-teal-900">
            10 Poin / Soal Max
          </span>
        </div>

        <div className="space-y-6">
          {worksheetIsianData.map((q, idx) => {
            const userText = isianAnswers[q.id] || '';
            const reviewInfo = submissionResult?.reviewedIsian[q.id];
            const showReview = isSubmitted && isReviewOpen;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                  showReview
                    ? reviewInfo && reviewInfo.score >= 8
                      ? 'bg-emerald-50/60 border-emerald-400'
                      : reviewInfo && reviewInfo.score > 0
                      ? 'bg-amber-50/60 border-amber-400'
                      : 'bg-rose-50/50 border-rose-300'
                    : 'bg-amber-50/20 border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-700 text-white font-black text-xs flex items-center justify-center">
                      {idx + 11}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      q.type === 'HOTS' ? 'bg-purple-100 text-purple-900 border border-purple-200' : 'bg-sky-100 text-sky-900 border border-sky-200'
                    }`}>
                      Kategori {q.type}
                    </span>
                  </div>

                  {showReview && reviewInfo && (
                    <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      Nilai: {reviewInfo.score}/10 Poin
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-relaxed">
                  {q.question}
                </p>

                {/* Text input / textarea */}
                <div>
                  {q.type === 'HOTS' ? (
                    <textarea
                      rows={2}
                      disabled={isSubmitted}
                      value={userText}
                      onChange={(e) => handleIsianChange(q.id, e.target.value)}
                      placeholder="Ketik jawabanmu di sini..."
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-teal-600 disabled:bg-stone-50"
                    />
                  ) : (
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={userText}
                      onChange={(e) => handleIsianChange(q.id, e.target.value)}
                      placeholder="Ketik jawaban singkatmu di sini..."
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-teal-600 disabled:bg-stone-50"
                    />
                  )}
                </div>

                {/* Rubric evaluation in review mode */}
                {showReview && (
                  <div className="mt-2 bg-white/95 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1.5">
                    {reviewInfo && (
                      <div className="font-semibold text-teal-900">
                        <strong>Umpan Balik Sistem:</strong> {reviewInfo.feedback}
                      </div>
                    )}
                    <div className="text-stone-600">
                      <strong>Jawaban Ideal:</strong> {q.idealAnswer}
                    </div>
                    <div className="text-[11px] text-stone-500 italic">
                      <strong>Panduan Rubrik Guru:</strong> {q.scoringGuide}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* VALIDATION ERROR ALERT */}
      {validationError && (
        <div className="bg-rose-100 border-2 border-rose-300 text-rose-900 p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-700" />
          <span>{validationError}</span>
        </div>
      )}

      {/* SUBMISSION ACTION BUTTON */}
      {!isSubmitted && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-teal-50 border-2 border-teal-200 p-6 rounded-3xl">
          <div className="text-xs sm:text-sm text-teal-950 font-medium">
            Pastikan seluruh soal pilihan ganda dan isian singkat telah kamu jawab dengan teliti sebelum mengirimkan lembar kerja.
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-black text-sm shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Lembar Jawaban (LKPD)</span>
          </button>
        </div>
      )}
    </div>
  );
};
