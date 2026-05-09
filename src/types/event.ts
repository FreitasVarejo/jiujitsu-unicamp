import { BaseEntity } from "./base";
import { Image } from "./base";

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
