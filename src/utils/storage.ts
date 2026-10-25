import { UserProgress, WorksheetSubmission } from '../types';

const STORAGE_KEY = 'hijrah_adventure_progress_v1';

export const defaultProgress: UserProgress = {
  stars: 0,
  completedLessons: [],
  completedStories: [],
  visitedMapStops: [],
  gameCompleted: {
    orderGame: false,
    characterMatch: false,
    valueMission: false,
  },
  lastWorksheetScore: null,
  lastWorksheetSubmission: null,
  audioNarrationEnabled: false,
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      gameCompleted: {
        ...defaultProgress.gameCompleted,
        ...(parsed.gameCompleted || {}),
      },
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // quota exceeded or private browsing
  }
}

export function addStars(count: number): UserProgress {
  const current = loadProgress();
  const updated: UserProgress = {
    ...current,
    stars: Math.max(0, current.stars + count),
  };
  saveProgress(updated);
  return updated;
}

export function markLessonCompleted(chapterId: number): UserProgress {
  const current = loadProgress();
  if (current.completedLessons.includes(chapterId)) return current;
  const updated: UserProgress = {
    ...current,
    completedLessons: [...current.completedLessons, chapterId],
    stars: current.stars + 5, // Reward 5 stars for completing a chapter
  };
  saveProgress(updated);
  return updated;
}

export function markStoryCompleted(storyId: number): UserProgress {
  const current = loadProgress();
  if (current.completedStories.includes(storyId)) return current;
  const updated: UserProgress = {
    ...current,
    completedStories: [...current.completedStories, storyId],
    stars: current.stars + 3, // Reward 3 stars for completing a story slide
  };
  saveProgress(updated);
  return updated;
}

export function markMapStopVisited(stopId: string): UserProgress {
  const current = loadProgress();
  if (current.visitedMapStops.includes(stopId)) return current;
  const updated: UserProgress = {
    ...current,
    visitedMapStops: [...current.visitedMapStops, stopId],
    stars: current.stars + 4, // Reward 4 stars for discovering a map checkpoint
  };
  saveProgress(updated);
  return updated;
}

export function markGameCompleted(gameKey: 'orderGame' | 'characterMatch' | 'valueMission', bonusStars: number = 10): UserProgress {
  const current = loadProgress();
  const alreadyDone = current.gameCompleted[gameKey];
  const updated: UserProgress = {
    ...current,
    stars: alreadyDone ? current.stars + 2 : current.stars + bonusStars,
    gameCompleted: {
      ...current.gameCompleted,
      [gameKey]: true,
    },
  };
  saveProgress(updated);
  return updated;
}

export function saveWorksheetResult(submission: WorksheetSubmission): UserProgress {
  const current = loadProgress();
  const bonus = Math.round(submission.totalScore / 10); // up to 10 bonus stars
  const updated: UserProgress = {
    ...current,
    stars: current.stars + bonus,
    lastWorksheetScore: submission.totalScore,
    lastWorksheetSubmission: submission,
  };
  saveProgress(updated);
  return updated;
}

export function resetAllProgress(): UserProgress {
  saveProgress(defaultProgress);
  return defaultProgress;
}
