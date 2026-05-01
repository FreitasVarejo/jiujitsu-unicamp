export enum Belt {
  PRETA = 0,
  MARROM = 1,
  ROXA = 2,
  AZUL = 3,
  BRANCA = 4,
}

export const BELT_INFO: Record<
  Belt,
  { id: string; label: string; weight: number; color: string }
> = {
  [Belt.PRETA]: {
    id: "PRETA",
    label: "Preta",
    weight: 5,
    color: "border-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
  },
  [Belt.MARROM]: {
    id: "MARROM",
    label: "Marrom",
    weight: 4,
    color: "border-amber-900",
  },
  [Belt.ROXA]: {
    id: "ROXA",
    label: "Roxa",
    weight: 3,
    color: "border-purple-700",
  },
  [Belt.AZUL]: {
    id: "AZUL",
    label: "Azul",
    weight: 2,
    color: "border-blue-600",
  },
  [Belt.BRANCA]: {
    id: "BRANCA",
    label: "Branca",
    weight: 1,
    color: "border-white",
  },
};
