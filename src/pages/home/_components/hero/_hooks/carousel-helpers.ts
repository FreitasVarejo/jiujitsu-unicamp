export const CAROUSEL_CONFIG = {
  INTERVAL_MS: 5000,
  FADE_MS: 1500,
} as const;

export type CarouselState = {
  current: number;
  next: number | null;
  nextVisible: boolean;
};
