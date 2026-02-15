export interface BaseEntity {
  id: string;
  slug: string;
  title: string;
}

export interface Member extends BaseEntity {
  year: string;
  course: string;
  belt: string;
  coverImage?: string;
}

export interface BaseGaleryEntity extends BaseEntity {
  coverImage?: string;
  gallery: string[];
}

export interface Event extends BaseGaleryEntity {
  description: string;
  category: string;
  date: string;
  location: string;
}

export interface Product extends BaseGaleryEntity {
  description: string;
  category: string;
  price: string;
  sizes: string[];
}
