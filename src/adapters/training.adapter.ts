import { TrainingSchedule } from '../types/media';
import { Weekday, TrainingType } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trainingAdapter = (raw: any): TrainingSchedule => ({
  id: raw.slug || String(raw.id),
  title: raw.title || '',
  weekday: raw.weekday as Weekday,
  category: raw.category as TrainingType,
  startTime: raw.startTime,
  endTime: raw.endTime,
  instructor: raw.instructor,
});
