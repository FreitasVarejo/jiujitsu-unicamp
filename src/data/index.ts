import { Weekday } from "@/constants/date";
import { TrainingCategory } from "@/constants/treinos";

export interface Horario {
  id: string;
  weekday: Weekday;
  category: TrainingCategory;
  startTime: string;
  endTime: string;
  member: string;
}

export interface SiteData {
  horarios: Horario[];
}

export const data: SiteData = {
  horarios: [
    {
      id: "7092109e-7393-4706-8153-66258673f71c",
      weekday: Weekday.Segunda,
      category: TrainingCategory.Competicao,
      startTime: "10:30",
      endTime: "11:30",
      member: "kaua",
    },
    {
      id: "d9e8324e-1282-491b-9f93-55963959c84e",
      weekday: Weekday.Segunda,
      category: TrainingCategory.Geral,
      startTime: "12:00",
      endTime: "13:30",
      member: "pablo",
    },
    {
      id: "5f8b9e2a-0a41-4c1b-b1e1-9f9d7a2b3c4d",
      weekday: Weekday.Terca,
      category: TrainingCategory.Feminino,
      startTime: "10:30",
      endTime: "11:30",
      member: "rayla",
    },
    {
      id: "a1b2c3d4-e5f6-4789-abcd-ef0123456789",
      weekday: Weekday.Terca,
      category: TrainingCategory.Geral,
      startTime: "12:00",
      endTime: "13:30",
      member: "senno",
    },
    {
      id: "3b330364-773a-4814-9905-2763294025d2",
      weekday: Weekday.Quarta,
      category: TrainingCategory.Competicao,
      startTime: "10:30",
      endTime: "11:30",
      member: "kaua",
    },
    {
      id: "8c41f71a-6419-484a-9e12-32a2278477f7",
      weekday: Weekday.Quarta,
      category: TrainingCategory.Geral,
      startTime: "12:00",
      endTime: "13:30",
      member: "pablo",
    },
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      weekday: Weekday.Quarta,
      category: TrainingCategory.Noturno,
      startTime: "21:00",
      endTime: "22:30",
      member: "vitor",
    },
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      weekday: Weekday.Quinta,
      category: TrainingCategory.Geral,
      startTime: "12:00",
      endTime: "13:30",
      member: "senno",
    },
    {
      id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
      weekday: Weekday.Quinta,
      category: TrainingCategory.Noturno,
      startTime: "20:00",
      endTime: "21:30",
      member: "vitor",
    },
    {
      id: "27772643-4f93-43c2-a89e-4363a0335e23",
      weekday: Weekday.Sexta,
      category: TrainingCategory.Geral,
      startTime: "13:00",
      endTime: "13:30",
      member: "pablo",
    },
    {
      id: "10986754-3210-4842-b987-654321fedcba",
      weekday: Weekday.Sexta,
      category: TrainingCategory.Feminino,
      startTime: "14:30",
      endTime: "15:30",
      member: "rayla",
    },
  ],
};
