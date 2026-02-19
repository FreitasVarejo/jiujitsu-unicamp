import { TrainingSchedule } from "@/types/media";
import { Weekday, TRAINING_TYPE_INFO } from "@/constants";

/**
 * Converte um horário no formato "HH:MM" para minutos desde meia-noite
 * @param horario - Horário no formato "HH:MM"
 * @returns Número total de minutos desde meia-noite
 */
export const getHorarioInicioEmMinutos = (horario: string): number => {
  const match = horario.match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.MAX_SAFE_INTEGER;

  const horas = Number(match[1]);
  const minutos = Number(match[2]);
  return horas * 60 + minutos;
};

/**
 * Filtra e formata os treinos de um dia específico, ordenados por horário
 * @param trainings - Lista completa de treinos
 * @param dia - Dia da semana para filtrar
 * @returns Lista de treinos formatados para o dia específico
 */
export const getTreinosPorDia = (trainings: TrainingSchedule[], dia: Weekday) => {
  return trainings
    .filter((h) => h.weekday === dia)
    .map((h) => ({
      tipo: TRAINING_TYPE_INFO[h.category].label,
      cor: TRAINING_TYPE_INFO[h.category].color,
      horario: h.startTime,
      horarioFim: h.endTime,
      professor: h.member,
    }))
    .sort(
      (a, b) =>
        getHorarioInicioEmMinutos(a.horario) -
        getHorarioInicioEmMinutos(b.horario),
    );
};

/**
 * Extrai todos os horários únicos dos treinos e retorna ordenados
 * @param trainings - Lista completa de treinos
 * @returns Array de horários únicos ordenados
 */
export const getHorariosUnicos = (trainings: TrainingSchedule[]): string[] => {
  const horariosSet = new Set<string>();
  trainings.forEach((item) => {
    horariosSet.add(item.startTime);
  });
  
  return Array.from(horariosSet).sort(
    (a, b) => getHorarioInicioEmMinutos(a) - getHorarioInicioEmMinutos(b),
  );
};
