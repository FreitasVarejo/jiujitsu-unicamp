export enum CalendarType {
  GERAL = "geral",
  COMPETICAO = "competicao",
  FEMININO = "feminino",
  NOTURNO = "noturno",
  EVENTO = "evento",
  FALLBACK = "fallback",
}

export const CALENDAR_TYPE_INFO: Record<
  CalendarType,
  {
    id: string;
    label: string;
    trainingTypeKeywords: string[];
    darkColors: {
      main: string;
      container: string;
      onContainer: string;
    };
    darkColorsRgba: {
      main: string;
      container: string;
      onContainer: string;
    };
    darkColorsRgbaPast: {
      main: string;
      container: string;
      onContainer: string;
    };
  }
> = {
  [CalendarType.GERAL]: {
    id: "GERAL",
    label: "Treino Geral",
    trainingTypeKeywords: ["geral"],
    darkColors: {
      main: "#d26030",
      container: "#d2603030",
      onContainer: "#f4a882",
    },
    darkColorsRgba: {
      main: "#d26030",
      container: "rgba(90, 42, 18, 1)",
      onContainer: "#ffd4bc",
    },
    darkColorsRgbaPast: {
      main: "#8B3F1E",
      container: "rgba(40, 15, 8, 0.6)",
      onContainer: "rgba(244, 168, 130, 0.6)",
    },
  },
  [CalendarType.COMPETICAO]: {
    id: "COMPETICAO",
    label: "Treino de Competição",
    trainingTypeKeywords: ["competição", "competicao"],
    darkColors: {
      main: "#dc2626",
      container: "#dc262630",
      onContainer: "#fca5a5",
    },
    darkColorsRgba: {
      main: "#dc2626",
      container: "rgba(85, 20, 20, 1)",
      onContainer: "#ffd5d5",
    },
    darkColorsRgbaPast: {
      main: "#8B1515",
      container: "rgba(35, 10, 10, 0.6)",
      onContainer: "rgba(252, 165, 165, 0.6)",
    },
  },
  [CalendarType.NOTURNO]: {
    id: "NOTURNO",
    label: "Treino Noturno",
    trainingTypeKeywords: ["noturno"],
    darkColors: {
      main: "#6366f1",
      container: "#6366f130",
      onContainer: "#a5b4fc",
    },
    darkColorsRgba: {
      main: "#6366f1",
      container: "rgba(38, 38, 95, 1)",
      onContainer: "#d4daff",
    },
    darkColorsRgbaPast: {
      main: "#3D3E8C",
      container: "rgba(15, 15, 35, 0.6)",
      onContainer: "rgba(165, 180, 252, 0.6)",
    },
  },
  [CalendarType.FEMININO]: {
    id: "FEMININO",
    label: "Treino Feminino",
    trainingTypeKeywords: ["feminino"],
    darkColors: {
      main: "#d946ef",
      container: "#d946ef30",
      onContainer: "#f0abfc",
    },
    darkColorsRgba: {
      main: "#d946ef",
      container: "rgba(70, 38, 78, 1)",
      onContainer: "#f5d0ff",
    },
    darkColorsRgbaPast: {
      main: "#8B2E8F",
      container: "rgba(40, 15, 45, 0.6)",
      onContainer: "rgba(240, 171, 252, 0.6)",
    },
  },
  [CalendarType.EVENTO]: {
    id: "EVENTO",
    label: "Evento",
    trainingTypeKeywords: ["evento"],
    darkColors: {
      main: "#f59e0b",
      container: "#f59e0b30",
      onContainer: "#fcd34d",
    },
    darkColorsRgba: {
      main: "#f59e0b",
      container: "rgba(92, 58, 12, 1)",
      onContainer: "#ffe99a",
    },
    darkColorsRgbaPast: {
      main: "#9D6209",
      container: "rgba(40, 25, 7, 0.6)",
      onContainer: "rgba(252, 211, 77, 0.6)",
    },
  },
  [CalendarType.FALLBACK]: {
    id: "FALLBACK",
    label: "Outro",
    trainingTypeKeywords: [],
    darkColors: {
      main: "#71717a",
      container: "#27272a",
      onContainer: "#e4e4e7",
    },
    darkColorsRgba: {
      main: "#71717a",
      container: "rgba(60, 60, 65, 1)",
      onContainer: "#f4f4f5",
    },
    darkColorsRgbaPast: {
      main: "#52525B",
      container: "rgba(24, 24, 27, 0.6)",
      onContainer: "rgba(228, 228, 231, 0.6)",
    },
  },
};
