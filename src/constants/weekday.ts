export enum Weekday {
  Domingo = 0,
  Segunda = 1,
  Terca = 2,
  Quarta = 3,
  Quinta = 4,
  Sexta = 5,
  Sabado = 6,
}

export const WEEKDAYS = [
  Weekday.Segunda,
  Weekday.Terca,
  Weekday.Quarta,
  Weekday.Quinta,
  Weekday.Sexta,
];

export const WEEKDAY_INFO: Record<Weekday, { label: string; short: string }> = {
  [Weekday.Domingo]: {
    label: "Domingo",
    short: "DOM",
  },
  [Weekday.Segunda]: {
    label: "Segunda",
    short: "SEG",
  },
  [Weekday.Terca]: {
    label: "Terça",
    short: "TER",
  },
  [Weekday.Quarta]: {
    label: "Quarta",
    short: "QUA",
  },
  [Weekday.Quinta]: {
    label: "Quinta",
    short: "QUI",
  },
  [Weekday.Sexta]: {
    label: "Sexta",
    short: "SEX",
  },
  [Weekday.Sabado]: {
    label: "Sábado",
    short: "SAB",
  },
};
