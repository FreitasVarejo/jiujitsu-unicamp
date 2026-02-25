export enum Weekday {
  DOMINGO = 0,
  SEGUNDA = 1,
  TERCA = 2,
  QUARTA = 3,
  QUINTA = 4,
  SEXTA = 5,
  SABADO = 6,
}

export const WEEKDAYS = [
  Weekday.SEGUNDA,
  Weekday.TERCA,
  Weekday.QUARTA,
  Weekday.QUINTA,
  Weekday.SEXTA,
];

export const WEEKDAY_INFO: Record<
  Weekday,
  { id: string; label: string; weight: number; short: string }
> = {
  [Weekday.DOMINGO]: {
    id: "DOMINGO",
    label: "Domingo",
    weight: 0,
    short: "DOM",
  },
  [Weekday.SEGUNDA]: {
    id: "SEGUNDA",
    label: "Segunda",
    weight: 1,
    short: "SEG",
  },
  [Weekday.TERCA]: {
    id: "TERCA",
    label: "Terça",
    weight: 2,
    short: "TER",
  },
  [Weekday.QUARTA]: {
    id: "QUARTA",
    label: "Quarta",
    weight: 3,
    short: "QUA",
  },
  [Weekday.QUINTA]: {
    id: "QUINTA",
    label: "Quinta",
    weight: 4,
    short: "QUI",
  },
  [Weekday.SEXTA]: {
    id: "SEXTA",
    label: "Sexta",
    weight: 5,
    short: "SEX",
  },
  [Weekday.SABADO]: {
    id: "SABADO",
    label: "Sábado",
    weight: 6,
    short: "SAB",
  },
};
