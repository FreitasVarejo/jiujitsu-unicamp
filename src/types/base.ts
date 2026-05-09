export interface Image {
  url: string;
  alternativeText: string;
  focalPoint?: { x: number; y: number } | null;
}

export interface BaseEntity {
  id: string;
  title: string;
}
