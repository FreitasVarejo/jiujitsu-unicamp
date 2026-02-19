import { TrainingSchedule } from "../types/media";
import { Weekday, TrainingType } from "../constants";

export const trainingAdapter = (raw: any): TrainingSchedule => {
  return {
    id: raw.id,
    weekday: raw.weekday as Weekday,
    category: raw.category as TrainingType,
    startTime: raw.startTime,
    endTime: raw.endTime,
    member: raw.member,
  };
};
