export enum TrainingType {
  Geral = 0,
  Competicao = 1,
  Feminino = 2,
  Noturno = 3,
}

export const TRAINING_TYPE_INFO: Record<
  TrainingType,
  { label: string; color: string }
> = {
  [TrainingType.Geral]: {
    label: "Geral",
    color: "text-orange-300",
  },
  [TrainingType.Competicao]: {
    label: "Competição",
    color: "text-yellow-300",
  },
  [TrainingType.Feminino]: {
    label: "Feminino",
    color: "text-red-400",
  },
  [TrainingType.Noturno]: {
    label: "Noturno",
    color: "text-blue-400",
  },
};
