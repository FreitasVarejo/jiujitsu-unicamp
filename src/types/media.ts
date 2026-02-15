export interface BaseEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage?: string;
  gallery: string[];
}

export interface Event extends BaseEntity {
  date: string;
  location: string;
}

export interface Product extends BaseEntity {
  price: string;
  sizes: string[];
}
