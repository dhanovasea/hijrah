import React, { useState } from 'react';
import { JourneyStop } from '../../types';
import { mapData } from '../../data/mapData';
import { 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  AlertCircle,
  Footprints,
  Info
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface JourneyMapProps {
  visitedStops: string[];
  onVisitStop: (stopId: string) => void;
  onGoHome: () => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  visitedStops,
  onVisitStop,
  onGoHome
}) => {
  const [selectedStopId, setSelectedStopId] = useState<string>('makkah');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  const activeStop = mapData.find(s => s.id === selectedStopId) || mapData[0];
  const isVisited = visitedStops.includes(activeStop.id);
  const currentQuizAnswer = quizAnswers[activeStop.id];

  const handleSelectStop = (stop: JourneyStop) => {
    sounds.playClick();
    setSelectedStopId(stop.id);
    onVisitStop(stop.id);
  };

  const handleNextCheckpoint = () => {
    sounds.playClick();
    onVisitStop(activeStop.id);
    const currentIndex = mapData.findIndex(s => s.id === activeStop.id);
    if (currentIndex < mapData.length - 1) {
      const nextStop = mapData[currentIndex + 1];
      setSelectedStopId(nextStop.id);
      onVisitStop(nextStop.id);
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* HEADER & DISCLAIMER */}
      <div className="bg-amber-100/70 p-5 rounded-3xl border-2 border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Peta Petualangan Ilustratif (5 Checkpoint)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Jejak Rute Perjalanan Hijrah ke Madinah
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Sentuh tiap titik singgah di peta untuk membaca peristiwa sejarah dan menjawab kuis mini.
          </p>
        </div>

        {/* Disclaimer badge */}
        <div className="bg-white/90 border border-amber-300 px-3.5 py-2 rounded-2xl text-[11px] font-semibold text-stone-600 max-w-xs self-start sm:self-auto flex items-start gap-2 shadow-2xs">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Catatan Edukatif:</strong> Peta ini merupakan ilustrasi belajar untuk anak, bukan rekonstruksi skala militer geografis presisi.
          </span>
        </div>
      </div>

      {/* CHECKPOINT STEPPER BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {mapData.map((stop) => {
          const isCurrent = stop.id === activeStop.id;
          const visited = visitedStops.includes(stop.id);
          return (
            <button
              key={stop.id}
              onClick={() => handleSelectStop(stop)}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? 'border-emerald-600 bg-emerald-700 text-white shadow-md scale-102'
                  : visited
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  : 'border-amber-200 bg-white text-stone-700 hover:bg-amber-100/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase opacity-80">Titik #{stop.stepNumber}</span>
                {visited ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-300' : 'text-emerald-600'}`} />
                ) : (
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm truncate">{stop.name}</h4>
              <p className={`text-[10px] truncate ${isCurrent ? 'text-amber-100' : 'text-stone-500'}`}>
                {stop.distanceInfo}
              </p>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE MAP CANVAS + DETAIL CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Map Parchment */}
        <div className="lg:col-span-7 bg-amber-50 rounded-3xl border-3 border-amber-300 shadow-xl p-4 sm:p-6 overflow-hidden relative">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner border border-amber-200">
            {/* SVG MAP BACKGROUND WITH RED SEA COAST & DESERT PATH */}
            <svg viewBox="0 0 600 500" className="w-full h-full object-cover select-none">
              <defs>
                <linearGradient id="mapBgGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="50%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#fed7aa" />
                </linearGradient>
              </defs>
              <rect width="600" height="500" fill="url(#mapBgGrad)" />

              {/* Red Sea waters along the west */}
              <path d="M0,0 L120,0 Q170,180 110,320 Q60,420 80,500 L0,500 Z" fill="#38bdf8" opacity="0.4" />
              <text x="35" y="260" transform="rotate(-90 35 260)" fill="#0369a1" fontSize="14" fontWeight="800" opacity="0.6">LAUT MERAH</text>

              {/* Desert dune hills contours */}
              <path d="M220,100 Q280,180 250,260 T300,480" stroke="#d97706" strokeWidth="2" strokeDasharray="3,3" fill="none" opacity="0.4" />
              <path d="M320,60 Q380,160 340,290 T420,490" stroke="#d97706" strokeWidth="2" strokeDasharray="3,3" fill="none" opacity="0.4" />

              {/* Compass Rose */}
              <g transform="translate(530, 70)">
                <circle cx="0" cy="0" r="30" fill="#fffbeb" stroke="#78350f" strokeWidth="2" />
                <polygon points="0,-25 5,-8 0,0 -5,-8" fill="#dc2626" />
                <polygon points="0,25 5,8 0,0 -5,8" fill="#78350f" />
                <polygon points="25,0 8,5 0,0 8,-5" fill="#78350f" />
                <polygon points="-25,0 -8,5 0,0 -8,-5" fill="#78350f" />
                <text x="0" y="-30" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">U</text>
              </g>

              {/* Hijrah Trail (Curved path avoiding central road, heading to Tsur first, then coastal path, then Quba & Madinah) */}
              <path 
                d="M320,380 L330,420 Q200,320 220,220 Q240,160 380,130 L430,90" 
                stroke="#15803d" 
                strokeWidth="4" 
                strokeDasharray="6,6" 
                fill="none" 
              />

              {/* 1. Makkah */}
              <g 
                transform="translate(320, 380)" 
                className="cursor-pointer group"
                onClick={() => handleSelectStop(mapData[0])}
              >
                <circle cx="0" cy="0" r={activeStop.id === 'makkah' ? 18 : 12} fill="#ea580c" className="transition-all" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" />
                <text x="0" y="24" textAnchor="middle" fill="#7c2d12" fontSize="12" fontWeight="bold">1. Makkah</text>
              </g>

              {/* 2. Jabal Tsur */}
              <g 
                transform="translate(330, 420)" 
                className="cursor-pointer group"
                onClick={() => handleSelectStop(mapData[1])}
              >
                <circle cx="0" cy="0" r={activeStop.id === 'tsur' ? 18 : 12} fill="#d97706" className="transition-all" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" />
                <text x="0" y="22" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">2. Gua Tsur</text>
              </g>

              {/* 3. Pesisir Rute Rahasia */}
              <g 
                transform="translate(220, 240)" 
                className="cursor-pointer group"
                onClick={() => handleSelectStop(mapData[2])}
              >
                <circle cx="0" cy="0" r={activeStop.id === 'pesisir' ? 18 : 12} fill="#0284c7" className="transition-all" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" />
                <text x="-5" y="22" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">3. Rute Pesisir</text>
              </g>

              {/* 4. Quba */}
              <g 
                transform="translate(380, 130)" 
                className="cursor-pointer group"
                onClick={() => handleSelectStop(mapData[3])}
              >
                <circle cx="0" cy="0" r={activeStop.id === 'quba' ? 18 : 12} fill="#059669" className="transition-all" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" />
                <text x="35" y="5" textAnchor="start" fill="#065f46" fontSize="12" fontWeight="bold">4. Quba</text>
              </g>

              {/* 5. Madinah */}
              <g 
                transform="translate(430, 90)" 
                className="cursor-pointer group"
                onClick={() => handleSelectStop(mapData[4])}
              >
                <circle cx="0" cy="0" r={activeStop.id === 'madinah' ? 20 : 14} fill="#16a34a" className="transition-all animate-pulse" />
                <circle cx="0" cy="0" r="7" fill="#ffffff" />
                <text x="0" y="-14" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="900">5. Madinah</text>
              </g>
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-stone-600">
            <span className="font-semibold text-emerald-800">Garis hijau putus-putus: Jalur Hijrah Melalui Pesisir</span>
            <span className="text-stone-500 font-medium">Klik pada titik kota untuk membuka detail</span>
          </div>
        </div>

        {/* Selected Checkpoint Information Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center">
                {activeStop.stepNumber}
              </span>
              <div>
                <h3 className="text-xl font-black text-stone-900">{activeStop.name}</h3>
                <span className="text-xs font-semibold text-emerald-800">
                  Nama Sejarah: {activeStop.historicalName}
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              {activeStop.distanceInfo}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-1">Peran & Gambaran Tempat</h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              {activeStop.description}
            </p>
          </div>

          {/* Event details list */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800">Peristiwa Penting di Tempat Ini:</h4>
            <div className="space-y-1.5">
              {activeStop.eventDetails.map((ev, eIdx) => (
                <div key={eIdx} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moral takeaway */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900">
            <strong>Nilai Teladan:</strong> {activeStop.moralLesson}
          </div>

          {/* Micro Quiz */}
          <div className="pt-3 border-t border-amber-100 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Kuis Singkat Checkpoint:</span>
            </div>
            <p className="text-xs font-bold text-stone-900">{activeStop.quiz.question}</p>
            <div className="space-y-1.5">
              {activeStop.quiz.options.map((opt, oIdx) => {
                const isSelected = currentQuizAnswer === oIdx;
                const isCorrect = oIdx === activeStop.quiz.correctIndex;
                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      setQuizAnswers(prev => ({ ...prev, [activeStop.id]: oIdx }));
                      if (isCorrect) sounds.playCorrect();
                      else sounds.playGentleHint();
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition border cursor-pointer ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-100 border-emerald-500 font-bold text-emerald-900'
                          : 'bg-rose-100 border-rose-300 text-rose-900'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next stop button */}
          <div className="pt-3 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {visitedStops.includes(activeStop.id) ? '✓ Telah Dikunjungi' : 'Belum Dikunjungi'}
            </span>
            <button
              onClick={handleNextCheckpoint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              <span>Lanjut ke Tempat Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
