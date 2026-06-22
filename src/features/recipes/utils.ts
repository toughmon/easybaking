import type { RecipeDifficulty } from './types';

interface DifficultyMeta {
  label: string;
  tone: 'success' | 'warning' | 'danger';
}

export const DIFFICULTY_META: Record<RecipeDifficulty, DifficultyMeta> = {
  easy: { label: '쉬움', tone: 'success' },
  medium: { label: '보통', tone: 'warning' },
  hard: { label: '어려움', tone: 'danger' },
};

/** Total time = prep + bake, formatted for display. */
export function formatTotalTime(prepMinutes: number, bakeMinutes: number): string {
  const total = prepMinutes + bakeMinutes;
  if (total < 60) return `${total}분`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}
