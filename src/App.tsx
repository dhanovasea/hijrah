import React, { useState, useEffect } from 'react';
import { NavTab, UserProgress, WorksheetSubmission } from './types';
import { 
  loadProgress, 
  saveProgress, 
  markLessonCompleted, 
  markStoryCompleted, 
  markMapStopVisited, 
  markGameCompleted, 
  saveWorksheetResult, 
  resetAllProgress,
  defaultProgress
} from './utils/storage';
import { sounds, stopSpeaking } from './utils/audio';

import { Header } from './components/common/Header';
import { ObjectivesModal, GuideModal } from './components/common/Modals';
import { HomePage } from './components/pages/HomePage';
import { LessonViewer } from './components/pages/LessonViewer';
import { StoryGallery } from './components/pages/StoryGallery';
import { VideoPlayer } from './components/pages/VideoPlayer';
import { JourneyMap } from './components/pages/JourneyMap';
import { GameCenter } from './components/pages/GameCenter';
import { Worksheet } from './components/pages/Worksheet';
import { ResultsDashboard } from './components/pages/ResultsDashboard';

import { Compass, Heart, BookOpen, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync progress on tab changes and load from localStorage
  useEffect(() => {
    const saved = loadProgress();
    setProgress(saved);
  }, []);

  // When changing tabs, stop any speaking voices
  const handleSelectTab = (tab: NavTab) => {
    stopSpeaking();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sounds.setSoundEnabled(nextVal);
    if (!nextVal) {
      stopSpeaking();
    }
  };

  const handleCompleteChapter = (chapterId: number) => {
    const updated = markLessonCompleted(chapterId);
    setProgress(updated);
  };

  const handleCompleteStory = (storyId: number) => {
    const updated = markStoryCompleted(storyId);
    setProgress(updated);
  };

  const handleVisitMapStop = (stopId: string) => {
    const updated = markMapStopVisited(stopId);
    setProgress(updated);
  };

  const handleCompleteGame = (gameKey: 'orderGame' | 'characterMatch' | 'valueMission', stars: number) => {
    const updated = markGameCompleted(gameKey, stars);
    setProgress(updated);
  };

  const handleSaveWorksheet = (submission: WorksheetSubmission) => {
    const updated = saveWorksheetResult(submission);
    setProgress(updated);
  };

  const handleResetProgress = () => {
    const reset = resetAllProgress();
    setProgress(reset);
    handleSelectTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-800">
      {/* GLOBAL HEADER */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        progress={progress}
        onOpenObjectives={() => setIsObjectivesOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleSelectTab}
            onOpenObjectives={() => setIsObjectivesOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
            progress={progress}
          />
        )}

        {currentTab === 'lessons' && (
          <LessonViewer
            completedChapters={progress.completedLessons}
            onCompleteChapter={handleCompleteChapter}
            onGoHome={() => handleSelectTab('home')}
          />
        )}

        {currentTab === 'stories' && (
          <StoryGallery
            completedStories={progress.completedStories}
            onCompleteStory={handleCompleteStory}
            onGoHome={() => handleSelectTab('home')}
          />
        )}

        {currentTab === 'video' && (
          <VideoPlayer />
        )}

        {currentTab === 'map' && (
          <JourneyMap
            visitedStops={progress.visitedMapStops}
            onVisitStop={handleVisitMapStop}
            onGoHome={() => handleSelectTab('home')}
          />
        )}

        {currentTab === 'games' && (
          <GameCenter
            onCompleteGame={handleCompleteGame}
            gameStatus={progress.gameCompleted}
          />
        )}

        {currentTab === 'worksheet' && (
          <Worksheet
            onSaveSubmission={handleSaveWorksheet}
            lastSubmission={progress.lastWorksheetSubmission}
          />
        )}

        {currentTab === 'results' && (
          <ResultsDashboard
            progress={progress}
            onNavigate={handleSelectTab}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t-2 border-amber-200 bg-white/70 py-6 px-4 text-center print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2 font-bold text-stone-800">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Hijrah Adventure — Media Pembelajaran PAI Kelas 4 SD</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-stone-500">
            <span>Sesuai Kurikulum PAI Kelas 4 SD</span>
            <span>•</span>
            <span>Berbasis Nilai & Adab Islami</span>
            <span>•</span>
            <span>Simbolis Tanpa Visual Sosok Nabi SAW</span>
          </div>

          <p className="text-[11px] text-stone-500">
            Disusun untuk pembelajaran interaktif di kelas dan mandiri di rumah.
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <ObjectivesModal
        isOpen={isObjectivesOpen}
        onClose={() => setIsObjectivesOpen(false)}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
