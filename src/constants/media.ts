export enum MediaType {
  EVENTS = "events",
  PRODUCTS = "products",
  MEMBERS = "members",
  TRAININGS = "trainings",
}

export const MEDIA_INFO = {
  [MediaType.EVENTS]: {
    root: "/eventos",
    index: "/eventos/index.json",
  },
  [MediaType.PRODUCTS]: {
    root: "/produtos",
    index: "/produtos/index.json",
  },
  [MediaType.MEMBERS]: {
    root: "/membros",
    index: "/membros/index.json",
  },
  [MediaType.TRAININGS]: {
    root: "/treinos",
    index: "/treinos/info.json",
  },
} as const;
