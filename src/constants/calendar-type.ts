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
      container: "rgba(60, 28, 14, 1)",
      onContainer: "#f4a882",
    },
    darkColorsRgbaPast: {
      main: "#8B3F1E",
      container: "rgba(40, 15, 8, 0.6)",
      onContainer: "rgba(244, 168, 130, 0.6)",
    },
  },
  [CalendarType.COMPETICAO]: {
    id: "COMPETICAO",
    label: "Treino Competição",
    trainingTypeKeywords: ["competição", "competicao"],
    darkColors: {
      main: "#dc2626",
      container: "#dc262630",
      onContainer: "#fca5a5",
    },
    darkColorsRgba: {
      main: "#dc2626",
      container: "rgba(55, 15, 15, 1)",
      onContainer: "#fca5a5",
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
      container: "rgba(25, 25, 60, 1)",
      onContainer: "#a5b4fc",
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
      container: "rgba(60, 25, 70, 1)",
      onContainer: "#f0abfc",
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
      container: "rgba(60, 38, 10, 1)",
      onContainer: "#fcd34d",
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
      container: "rgba(39, 39, 42, 1)",
      onContainer: "#e4e4e7",
    },
    darkColorsRgbaPast: {
      main: "#52525B",
      container: "rgba(24, 24, 27, 0.6)",
      onContainer: "rgba(228, 228, 231, 0.6)",
    },
  },
};
