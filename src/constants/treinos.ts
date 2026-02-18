export enum TrainingCategory {
  Geral = 0,
  Competicao = 1,
  Feminino = 2,
  Noturno = 3,
}

export const TRAINING_CATEGORY_LABELS: Record<TrainingCategory, string> = {
  [TrainingCategory.Geral]: "Geral",
  [TrainingCategory.Competicao]: "Competição",
  [TrainingCategory.Feminino]: "Feminino",
  [TrainingCategory.Noturno]: "Noturno",
};
