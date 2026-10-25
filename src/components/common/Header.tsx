import React, { useState } from 'react';
import { NavTab, UserProgress } from '../../types';
import { 
  Home, 
  BookOpen, 
  Image as ImageIcon, 
  Video, 
  Compass, 
  Gamepad2, 
  ClipboardCheck, 
  BarChart3, 
  Star, 
  Volume2, 
  VolumeX, 
  Target, 
  HelpCircle, 
  Menu, 
  X 
} from 'lucide-react';
import { sounds } from '../../utils/audio';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  progress: UserProgress;
  onOpenObjectives: () => void;
  onOpenGuide: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  progress,
  onOpenObjectives,
  onOpenGuide,
  soundEnabled,
  onToggleSound
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: NavTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { tab: 'lessons', label: 'Kenali Kisah', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'stories', label: 'Cerita Bergambar', icon: <ImageIcon className="w-4 h-4" /> },
    { tab: 'video', label: 'Tonton Video', icon: <Video className="w-4 h-4" /> },
    { tab: 'map', label: 'Peta Perjalanan', icon: <Compass className="w-4 h-4" /> },
    { tab: 'games', label: 'Game Hijrah', icon: <Gamepad2 className="w-4 h-4" /> },
    { tab: 'worksheet', label: 'Worksheet (LKPD)', icon: <ClipboardCheck className="w-4 h-4" /> },
    { tab: 'results', label: 'Hasil Belajarku', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  // Calculate overall learning percentage
  const totalTasks = 6 + 8 + 5 + 3 + (progress.lastWorksheetScore !== null ? 1 : 0); // 6 lessons, 8 stories, 5 map stops, 3 games, 1 worksheet
  const completedTasks = 
    progress.completedLessons.length + 
    progress.completedStories.length + 
    progress.visitedMapStops.length + 
    (progress.gameCompleted.orderGame ? 1 : 0) +
    (progress.gameCompleted.characterMatch ? 1 : 0) +
    (progress.gameCompleted.valueMission ? 1 : 0) +
    (progress.lastWorksheetScore !== null ? 1 : 0);
  const overallPercent = Math.min(100, Math.round((completedTasks / totalTasks) * 100));

  const handleNavClick = (tab: NavTab) => {
    sounds.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-amber-50/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      {/* Top Banner with Badges & Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-amber-200 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
              HIJRAH <span className="text-emerald-700 font-extrabold">ADVENTURE</span>
            </h1>
            <p className="text-[11px] font-semibold text-stone-500 hidden sm:block">
              Perjalanan Menuju Madinah — PAI Kelas 4 SD
            </p>
          </div>
        </button>

        {/* Learning Progress & Stars Collection */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Bar indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-white/80 border border-amber-200 px-3 py-1.5 rounded-full shadow-2xs">
            <span className="text-xs font-bold text-stone-600">Progres:</span>
            <div className="w-24 h-2.5 bg-amber-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 rounded-full"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-emerald-800">{overallPercent}%</span>
          </div>

          {/* Stars Badge */}
          <div className="flex items-center gap-1.5 bg-amber-100/90 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-full font-black text-sm shadow-2xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-bounce" />
            <span>{progress.stars}</span>
            <span className="text-[11px] font-semibold text-amber-800 hidden sm:inline">Bintang</span>
          </div>

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
            className="p-2 rounded-xl bg-white border border-amber-200 text-stone-600 hover:text-emerald-700 hover:border-emerald-300 transition cursor-pointer"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Objectives modal trigger */}
          <button
            onClick={() => { sounds.playClick(); onOpenObjectives(); }}
            title="Tujuan Pembelajaran"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Tujuan</span>
          </button>

          {/* Guide modal trigger */}
          <button
            onClick={() => { sounds.playClick(); onOpenGuide(); }}
            title="Panduan Belajar"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900 hover:bg-amber-200 transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Panduan</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-amber-200 text-stone-700 hover:bg-amber-100 transition cursor-pointer"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden md:block bg-stone-900/5 border-t border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto py-1.5 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-800/30 ring-2 ring-emerald-500/30'
                    : 'text-stone-700 hover:text-emerald-800 hover:bg-amber-200/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-50/98 border-t-2 border-amber-200 px-4 py-3 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200">
            <span className="text-xs font-bold text-stone-600">Menu Pembelajaran:</span>
            <div className="flex gap-2">
              <button
                onClick={() => { onOpenObjectives(); setMobileMenuOpen(false); }}
                className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg"
              >
                Tujuan
              </button>
              <button
                onClick={() => { onOpenGuide(); setMobileMenuOpen(false); }}
                className="text-xs font-bold text-amber-900 bg-amber-200 px-2.5 py-1 rounded-lg"
              >
                Panduan
              </button>
            </div>
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-left transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-stone-700 hover:bg-amber-200/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
