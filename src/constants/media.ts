export enum MediaType {
  EVENTS = 'events',
  PRODUCTS = 'products',
}

export const MEDIA_PATHS = {
  [MediaType.EVENTS]: {
    root: '/eventos',
    index: '/eventos/index.json',
  },
  [MediaType.PRODUCTS]: {
    root: '/produtos',
    index: '/produtos/index.json',
  },
} as const;
