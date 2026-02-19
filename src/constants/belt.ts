export enum Belt {
  Preta = "Preta",
  Marrom = "Marrom",
  Roxa = "Roxa",
  Azul = "Azul",
  Branca = "Branca",
}

export const BELT_INFO: Record<Belt, { weight: number; color: string }> = {
  [Belt.Preta]: {
    weight: 5,
    color: "border-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
  },
  [Belt.Marrom]: {
    weight: 4,
    color: "border-amber-900",
  },
  [Belt.Roxa]: {
    weight: 3,
    color: "border-purple-700",
  },
  [Belt.Azul]: {
    weight: 2,
    color: "border-blue-600",
  },
  [Belt.Branca]: {
    weight: 1,
    color: "border-white",
  },
};
