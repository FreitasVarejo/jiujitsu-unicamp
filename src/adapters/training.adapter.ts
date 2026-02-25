import { TrainingSchedule } from '../types/media';
import { Weekday, WEEKDAY_INFO, TrainingType, TRAINING_TYPE_INFO } from '../constants';

const parseWeekday = (value: unknown): Weekday => {
  if (value == null) return Weekday.SEGUNDA;
  const normalized = String(value).toUpperCase();
  const entry = (Object.entries(WEEKDAY_INFO) as [string, { id: string }][]).find(
    ([, info]) => info.id === normalized,
  );
  if (entry) return Number(entry[0]) as Weekday;
  const asInt = Number(value);
  return Number.isInteger(asInt) && asInt in WEEKDAY_INFO
    ? (asInt as Weekday)
    : Weekday.SEGUNDA;
};

const parseTrainingType = (value: unknown): TrainingType => {
  if (value == null) return TrainingType.GERAL;
  const normalized = String(value).toUpperCase();
  const entry = (Object.entries(TRAINING_TYPE_INFO) as [string, { id: string }][]).find(
    ([, info]) => info.id === normalized,
  );
  if (entry) return Number(entry[0]) as TrainingType;
  const asInt = Number(value);
  return Number.isInteger(asInt) && asInt in TRAINING_TYPE_INFO
    ? (asInt as TrainingType)
    : TrainingType.GERAL;
};

// "07:30:00.000" → "07:30"  |  "07:30" → "07:30"  |  null/undefined → ''
const formatTime = (value: unknown): string => {
  const match = String(value ?? '').match(/^(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, '0')}:${match[2]}` : '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trainingAdapter = (raw: any): TrainingSchedule => ({
  weekday: parseWeekday(raw.weekday),
  category: parseTrainingType(raw.category),
  startTime: formatTime(raw.startTime),
  endTime: formatTime(raw.endTime),
  instructor: raw.instructor,
});
