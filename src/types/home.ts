import { Belt, Weekday, TrainingType } from "@/constants/home";
import { BaseEntity, Image } from "./base";

export interface TrainingSchedule {
  weekday: Weekday;
  category: TrainingType;
  startTime: string;
  endTime: string;
  instructor: string;
}

export interface Instructor extends BaseEntity {
  year: string;
  course: string;
  belt: Belt;
  photo: Image;
}

export interface AgendaEvent {
  id: string;
  type: string;
  instructor?: string;
  eventName?: string;
  startTime: string;
  endTime: string;
  location?: string;
  rawLocation?: string;
  calendarId: string;
  startDateTime?: string;
  cancelled: boolean;
  noGi: boolean;
}

export type EventsByDay = Record<number, AgendaEvent[]>;

export interface LocationData {
  id: string;
  title: string;
  address: string;
  reference: string;
  mapsEmbedUrl: string;
}
