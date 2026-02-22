import { Belt, Weekday, TrainingType } from '@/constants';

export interface Image {
  url: string;
  alternativeText: string;
}

export interface BaseEntity {
  id: string;
  title: string;
}

export interface Instructor extends BaseEntity {
  year: string;
  course: string;
  belt: Belt;
  photo: Image;
}

export interface EventSummary extends BaseEntity {
  date: string;
  location: string;
  coverImage: Image;
}

export interface Event extends EventSummary {
  description: string;
  category: string;
  gallery: Image[];
}

export interface Product extends BaseEntity {
  description: string;
  category: string;
  price: string;
  sizes: string[];
  coverImage: Image;
  gallery: Image[];
}

export interface TrainingSchedule extends BaseEntity {
  startTime: string;
  endTime: string;
  instructor: string;
  weekday: Weekday;
  category: TrainingType;
}
