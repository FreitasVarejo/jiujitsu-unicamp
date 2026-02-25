export enum TrainingType {
  GERAL = 0,
  COMPETICAO = 1,
  FEMININO = 2,
  NOTURNO = 3,
}

export const TRAINING_TYPE_INFO: Record<
  TrainingType,
  { id: string; label: string; color: string }
> = {
  [TrainingType.GERAL]: {
    id: "GERAL",
    label: "Geral",
    color: "text-orange-300",
  },
  [TrainingType.COMPETICAO]: {
    id: "COMPETICAO",
    label: "Competição",
    color: "text-yellow-300",
  },
  [TrainingType.FEMININO]: {
    id: "FEMININO",
    label: "Feminino",
    color: "text-red-400",
  },
  [TrainingType.NOTURNO]: {
    id: "NOTURNO",
    label: "Noturno",
    color: "text-blue-400",
  },
};
