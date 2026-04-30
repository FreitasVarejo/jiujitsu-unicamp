import { BaseEntity } from "./base";
import { Image } from "./base";

export interface Product extends BaseEntity {
  description: string;
  category: string;
  price: string;
  sizes: string[];
  coverImage: Image;
  gallery: Image[];
  formsLink?: string;
}
