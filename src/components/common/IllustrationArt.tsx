import React, { useState } from 'react';
import { RefreshCw, ImageOff } from 'lucide-react';

interface IllustrationArtProps {
  sceneType: 
    | 'makkah' 
    | 'mountain_track' 
    | 'cave_tsur' 
    | 'desert_journey' 
    | 'oasis_outskirts' 
    | 'ansar_welcome' 
    | 'nabawi_building' 
    | 'brotherhood_today'
    | 'desert_map_bg';
  className?: string;
  altText?: string;
  interactiveGlow?: boolean;
}

export const IllustrationArt: React.FC<IllustrationArtProps> = ({
  sceneType,
  className = 'w-full h-64',
  altText = 'Ilustrasi Edukatif Sejarah Hijrah',
  interactiveGlow = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-100 border-2 border-dashed border-stone-300 rounded-2xl p-6 text-stone-500 ${className}`}>
        <ImageOff className="w-10 h-10 mb-2 text-stone-400" />
        <p className="text-sm font-medium">Media belum tersedia</p>
        <button 
          onClick={() => setHasError(false)} 
          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Coba Muat Ulang
        </button>
      </div>
    );
  }

  // Pure SVG natural historical illustration for absolute reliability, zero artificial hallucinated faces, no depiction of Prophet SAW
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl shadow-inner select-none ${className} ${interactiveGlow ? 'ring-2 ring-emerald-400' : ''}`}
      role="img"
      aria-label={altText}
    >
      {/* 1. MAKKAH VALLEY SCENE */}
      {sceneType === 'makkah' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="makkahSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="40%" stopColor="#fbbf24" />
              <stop offset="85%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>
            <linearGradient id="mountainFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="mountainMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9a3412" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="sandGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#makkahSky)" />
          {/* Gentle morning sun */}
          <circle cx="680" cy="120" r="45" fill="#fef08a" opacity="0.9" />
          <circle cx="680" cy="120" r="65" fill="#fef08a" opacity="0.3" />

          {/* Distant jagged Hijaz mountains */}
          <polygon points="0,320 80,240 160,280 240,210 360,290 450,220 540,270 660,190 750,260 800,230 800,500 0,500" fill="url(#mountainFar)" opacity="0.5" />
          
          {/* Midground rocky terrain of Makkah valley */}
          <polygon points="0,360 110,290 200,340 310,260 420,330 520,280 620,340 730,270 800,320 800,500 0,500" fill="url(#mountainMid)" opacity="0.8" />
          
          {/* Traditional ancient cubic stone architecture in valley */}
          <rect x="360" y="340" width="80" height="60" rx="3" fill="#44403c" />
          <polygon points="350,340 400,325 450,340" fill="#292524" />
          {/* Symbolic respectful representation of ancient stone buildings */}
          <rect x="260" y="365" width="55" height="40" fill="#78716c" rx="2" />
          <rect x="470" y="370" width="60" height="42" fill="#78716c" rx="2" />
          <rect x="550" y="380" width="50" height="35" fill="#a8a29e" rx="2" />
          
          {/* Foreground valley sands */}
          <path d="M0,400 Q200,380 400,410 T800,390 L800,500 L0,500 Z" fill="url(#sandGround)" />
          {/* Historic caravan trail */}
          <path d="M120,490 Q340,430 400,410 T680,440" stroke="#b45309" strokeWidth="4" strokeDasharray="6,8" fill="none" opacity="0.7" />
          
          <text x="30" y="470" fill="#451a03" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Lembah Makkah — Titik Awal Perjalanan Hijrah</text>
        </svg>
      )}

      {/* 2. MOUNTAIN TRACK NIGHT (JABAL TSUR) */}
      {sceneType === 'mountain_track' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="rockyPeak" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#nightSky)" />
          {/* Crescent moon and twinkling stars */}
          <path d="M680,80 A30,30 0 1 0 710,120 A24,24 0 1 1 680,80 Z" fill="#fef08a" />
          <circle cx="120" cy="90" r="2" fill="#ffffff" opacity="0.8" />
          <circle cx="240" cy="60" r="2.5" fill="#ffffff" opacity="0.9" />
          <circle cx="380" cy="110" r="1.5" fill="#ffffff" opacity="0.7" />
          <circle cx="490" cy="70" r="2" fill="#ffffff" opacity="0.85" />
          <circle cx="610" cy="130" r="1.5" fill="#ffffff" opacity="0.6" />
          
          {/* High rugged peak of Jabal Tsur */}
          <polygon points="0,480 180,240 320,340 480,180 620,290 800,210 800,500 0,500" fill="url(#rockyPeak)" />
          
          {/* Subtle warm glow on mountain path symbolizing divine guidance and companionship */}
          <path d="M150,500 Q320,400 480,300 T600,280" stroke="#fef08a" strokeWidth="4" strokeDasharray="8,6" fill="none" opacity="0.6" />
          <circle cx="480" cy="300" r="12" fill="#fef08a" opacity="0.2" />

          {/* Gentle footsteps on the secret path */}
          <ellipse cx="260" cy="430" rx="6" ry="3" fill="#f59e0b" opacity="0.5" />
          <ellipse cx="320" cy="390" rx="6" ry="3" fill="#f59e0b" opacity="0.5" />
          <ellipse cx="380" cy="350" rx="6" ry="3" fill="#f59e0b" opacity="0.5" />
          <ellipse cx="440" cy="315" rx="6" ry="3" fill="#f59e0b" opacity="0.5" />

          <text x="30" y="470" fill="#f8fafc" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Mendaki Jabal Tsur di Kegelapan Malam Penuh Tawakal</text>
        </svg>
      )}

      {/* 3. CAVE TSUR (SPIDERWEB & DOVES) */}
      {sceneType === 'cave_tsur' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="caveInterior" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="caveRock" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#57534e" />
              <stop offset="50%" stopColor="#44403c" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
          </defs>
          {/* Natural rocky cave frame */}
          <rect width="800" height="500" fill="#e7e5e4" />
          
          {/* Distant bright desert light outside cave */}
          <path d="M180,120 Q400,60 620,130 Q700,300 620,440 Q380,480 180,430 Q100,280 180,120 Z" fill="url(#caveRock)" />
          <path d="M220,150 Q400,100 580,160 Q650,290 580,400 Q380,440 220,390 Q160,270 220,150 Z" fill="url(#caveInterior)" />

          {/* Warm divine peaceful light inside */}
          <ellipse cx="400" cy="270" rx="140" ry="80" fill="#fef08a" opacity="0.15" />

          {/* Intricate spiderweb across cave entrance */}
          <path d="M220,170 Q320,220 400,190" stroke="#f1f5f9" strokeWidth="1.5" fill="none" opacity="0.75" />
          <path d="M230,220 Q330,260 410,210" stroke="#f1f5f9" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M260,150 Q310,240 340,310" stroke="#f1f5f9" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M300,140 Q360,230 380,300" stroke="#f1f5f9" strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle cx="330" cy="225" r="4" fill="#94a3b8" />

          {/* Peaceful dove sitting on rock ledge near entrance */}
          <path d="M530,340 Q545,315 570,320 Q595,315 605,335 Q600,360 560,360 Q535,355 530,340 Z" fill="#f8fafc" />
          <polygon points="605,328 618,332 605,336" fill="#f59e0b" />
          <circle cx="585" cy="326" r="2.5" fill="#0f172a" />
          {/* Small twig nest */}
          <path d="M515,360 Q565,375 620,360" stroke="#78350f" strokeWidth="4" fill="none" />

          {/* Acacia branch framing the cave */}
          <path d="M120,400 Q200,320 280,360" stroke="#57534e" strokeWidth="6" fill="none" />
          <circle cx="210" cy="335" r="6" fill="#15803d" opacity="0.7" />
          <circle cx="240" cy="340" r="5" fill="#15803d" opacity="0.7" />

          <text x="30" y="475" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Mulut Gua Tsur — Perlindungan Agung di Celah Bebatuan</text>
        </svg>
      )}

      {/* 4. DESERT JOURNEY (DUNES & COASTAL ROUTE) */}
      {sceneType === 'desert_journey' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="skyDesert" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>
            <linearGradient id="dune1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="dune2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#skyDesert)" />
          <circle cx="200" cy="110" r="40" fill="#fef08a" />

          {/* Distant Red Sea coastal blue strip */}
          <rect x="0" y="270" width="800" height="40" fill="#0284c7" opacity="0.5" />

          {/* Sweeping sand dunes */}
          <path d="M0,280 Q250,220 500,290 T800,260 L800,500 L0,500 Z" fill="url(#dune1)" opacity="0.7" />
          <path d="M0,330 Q300,270 550,350 T800,310 L800,500 L0,500 Z" fill="url(#dune2)" />
          <path d="M0,410 Q280,340 520,420 T800,380 L800,500 L0,500 Z" fill="#d97706" />

          {/* Camel footprints marking the courageous trail */}
          <g fill="#78350f" opacity="0.4">
            <ellipse cx="160" cy="460" rx="9" ry="6" />
            <ellipse cx="230" cy="445" rx="9" ry="6" />
            <ellipse cx="300" cy="430" rx="8" ry="5" />
            <ellipse cx="370" cy="418" rx="8" ry="5" />
            <ellipse cx="440" cy="405" rx="7" ry="5" />
            <ellipse cx="510" cy="395" rx="7" ry="4" />
            <ellipse cx="580" cy="385" rx="6" ry="4" />
          </g>

          <text x="30" y="475" fill="#451a03" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Menempuh Rute Pesisir Gurun Bersama Abdullah bin Uraiqit</text>
        </svg>
      )}

      {/* 5. OASIS OUTSKIRTS OF MADINAH */}
      {sceneType === 'oasis_outskirts' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="oasisSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="60%" stopColor="#ccfbf1" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#oasisSky)" />

          {/* Clear blue water pool / natural spring */}
          <ellipse cx="420" cy="420" rx="340" ry="80" fill="url(#waterGrad)" />
          
          {/* Date palm trees (Pohon Kurma) - Left cluster */}
          <g transform="translate(140, 210)">
            <path d="M0,170 Q15,80 5,0" stroke="#78350f" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M5,0 Q-60,-40 -100,10" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M5,0 Q-30,-70 -30,-90" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M5,0 Q40,-70 50,-85" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M5,0 Q80,-40 110,15" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Hanging dates clusters */}
            <circle cx="-15" cy="20" r="7" fill="#d97706" />
            <circle cx="15" cy="20" r="7" fill="#d97706" />
          </g>

          {/* Date palm trees - Right cluster */}
          <g transform="translate(620, 190)">
            <path d="M0,190 Q-20,90 -5,0" stroke="#78350f" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M-5,0 Q-70,-40 -110,15" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M-5,0 Q-40,-75 -40,-95" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M-5,0 Q40,-75 50,-90" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M-5,0 Q80,-35 120,20" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="-10" cy="22" r="7" fill="#d97706" />
            <circle cx="15" cy="22" r="7" fill="#d97706" />
          </g>

          <text x="30" y="475" fill="#042f2e" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Oasis & Perkebunan Kurma Yatsrib yang Sejuk dan Subur</text>
        </svg>
      )}

      {/* 6. ANSAR WELCOMING SCENE */}
      {sceneType === 'ansar_welcome' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="welcomeSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#welcomeSky)" />
          {/* Bright welcoming light */}
          <circle cx="400" cy="140" r="90" fill="#fef08a" opacity="0.6" />
          <circle cx="400" cy="140" r="140" fill="#fef08a" opacity="0.2" />

          {/* Simple clay traditional homes of Yathrib */}
          <rect x="80" y="270" width="130" height="90" fill="#d97706" rx="4" />
          <rect x="120" y="300" width="30" height="60" fill="#78350f" rx="12" />
          <rect x="580" y="260" width="140" height="100" fill="#d97706" rx="4" />
          <rect x="630" y="295" width="35" height="65" fill="#78350f" rx="12" />

          {/* Date palm backdrop */}
          <path d="M220,360 Q230,260 220,180" stroke="#854d0e" strokeWidth="10" fill="none" />
          <path d="M220,180 Q160,150 120,190" stroke="#15803d" strokeWidth="6" fill="none" />
          <path d="M220,180 Q270,140 310,190" stroke="#15803d" strokeWidth="6" fill="none" />

          {/* Joyful green banners and pathway */}
          <path d="M0,420 Q400,360 800,420 L800,500 L0,500 Z" fill="#fde68a" />
          <path d="M300,500 L380,390 L420,390 L500,500 Z" fill="#ecfdf5" opacity="0.9" />

          <text x="400" y="200" textAnchor="middle" fill="#065f46" fontSize="24" fontWeight="800" fontFamily="sans-serif">Thala'al Badru 'Alayna</text>
          <text x="400" y="235" textAnchor="middle" fill="#047857" fontSize="15" fontWeight="600" fontFamily="sans-serif">Sukacita dan Kehangatan Sambutan Kaum Ansar</text>
          <text x="30" y="475" fill="#1e293b" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Madinah Menyambut Kedatangan Rombongan Hijrah</text>
        </svg>
      )}

      {/* 7. NABAWI BUILDING (PALM TRUNKS & CLAY) */}
      {sceneType === 'nabawi_building' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="nabawiSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="60%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#nabawiSky)" />

          {/* Simple clay brick courtyard walls representing the early 7th century design */}
          <rect x="100" y="220" width="600" height="180" fill="#ca8a04" opacity="0.85" rx="6" />
          <rect x="130" y="200" width="540" height="25" fill="#a16207" rx="3" />

          {/* Palm trunk pillars */}
          <rect x="180" y="220" width="22" height="180" fill="#78350f" rx="3" />
          <rect x="280" y="220" width="22" height="180" fill="#78350f" rx="3" />
          <rect x="380" y="220" width="22" height="180" fill="#78350f" rx="3" />
          <rect x="480" y="220" width="22" height="180" fill="#78350f" rx="3" />
          <rect x="580" y="220" width="22" height="180" fill="#78350f" rx="3" />

          {/* Woven palm leaf roofing (pelepah kurma) */}
          <path d="M120,200 L680,200 L660,170 L140,170 Z" fill="#15803d" opacity="0.85" />
          <path d="M140,170 L660,170 L640,145 L160,145 Z" fill="#166534" opacity="0.9" />

          {/* Clean courtyard floor */}
          <rect x="0" y="400" width="800" height="100" fill="#fef08a" />
          <text x="30" y="475" fill="#713f12" fontSize="16" fontWeight="bold" fontFamily="sans-serif">Masjid Nabawi Awal Abad ke-7: Tiang Batang Kurma & Dinding Bersahaja</text>
        </svg>
      )}

      {/* 8. BROTHERHOOD TODAY */}
      {sceneType === 'brotherhood_today' && (
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="schoolSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#schoolSky)" />

          {/* Modern cheerful classroom / school yard environment */}
          <rect x="60" y="160" width="680" height="240" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" rx="16" />
          {/* Windows showing green trees */}
          <rect x="100" y="190" width="120" height="100" fill="#dcfce7" stroke="#94a3b8" strokeWidth="3" rx="8" />
          <rect x="580" y="190" width="120" height="100" fill="#dcfce7" stroke="#94a3b8" strokeWidth="3" rx="8" />

          {/* Study table with open books and friendly colorful stationery */}
          <rect x="220" y="310" width="360" height="90" fill="#f59e0b" rx="8" />
          <polygon points="280,340 330,320 380,340 330,360" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <polygon points="380,340 430,320 480,340 430,360" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />

          {/* Symbol of unity: Friendship and sharing */}
          <circle cx="400" cy="240" r="45" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />
          <path d="M380,240 Q400,210 420,240 Q400,270 380,240" fill="#ef4444" />
          
          <text x="400" y="445" textAnchor="middle" fill="#065f46" fontSize="20" fontWeight="bold" fontFamily="sans-serif">Menebar Kasih Sayang & Menolong Teman di Sekolah</text>
        </svg>
      )}

      {/* 9. DESERT MAP BACKGROUND */}
      {sceneType === 'desert_map_bg' && (
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="mapParchment" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#mapParchment)" />

          {/* Red Sea coast along the left */}
          <path d="M0,0 L180,0 Q240,200 160,350 Q90,480 120,600 L0,600 Z" fill="#0284c7" opacity="0.35" />
          <text x="40" y="300" transform="rotate(-90 40 300)" fill="#0369a1" fontSize="18" fontWeight="bold" opacity="0.7">LAUT MERAH (Bahrul Ahmar)</text>

          {/* Mountain contours of Hijaz */}
          <g stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.35">
            <path d="M260,100 Q320,180 300,280 T340,550" />
            <path d="M360,80 Q420,190 390,320 T440,520" />
            <path d="M460,90 Q510,210 480,360 T540,530" />
          </g>

          {/* Decorative wind compass rose */}
          <g transform="translate(860, 110)">
            <circle cx="0" cy="0" r="45" fill="none" stroke="#78350f" strokeWidth="2" strokeDasharray="3,3" />
            <polygon points="0,-40 8,-10 0,0 -8,-10" fill="#991b1b" />
            <polygon points="0,40 8,10 0,0 -8,10" fill="#78350f" />
            <polygon points="40,0 10,8 0,0 10,-8" fill="#78350f" />
            <polygon points="-40,0 -10,8 0,0 -10,-8" fill="#78350f" />
            <text x="0" y="-48" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">U</text>
          </g>
        </svg>
      )}
    </div>
  );
};
