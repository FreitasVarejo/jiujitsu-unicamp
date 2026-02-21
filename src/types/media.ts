import { Belt } from "@/constants";

export interface BaseEntity {
  id: string;
  title: string;
}

export interface Member extends BaseEntity {
  year: string;
  course: string;
  belt: Belt;
  coverImage?: string;
}

export interface BaseGalleryEntity extends BaseEntity {
  coverImage?: string;
  gallery: string[];
}

export interface Event extends BaseGalleryEntity {
  description: string;
  category: string;
  date: string;
  location: string;
}

export interface Product extends BaseGalleryEntity {
  description: string;
  category: string;
  price: string;
  sizes: string[];
}

import { Weekday, TrainingType } from "../constants";

export interface TrainingSchedule {
  id: string;
  weekday: Weekday;
  category: TrainingType;
  startTime: string;
  endTime: string;
  instructor: string;
}
