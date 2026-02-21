import { TrainingSchedule } from '../types/media';
import { Weekday, TrainingType } from '../constants';

export const trainingAdapter = (raw: any): TrainingSchedule => {
  return {
    id: String(raw.id),
    weekday: raw.weekday as Weekday,
    category: raw.category as TrainingType,
    startTime: raw.startTime,
    endTime: raw.endTime,
    instructor: raw.instructor,
  };
};
