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
      main: "#0ea5e9",
      container: "#0ea5e930",
      onContainer: "#bae6fd",
    },
    darkColorsRgba: {
      main: "#0ea5e9",
      container: "rgba(12, 60, 90, 1)",
      onContainer: "#e0f2fe",
    },
    darkColorsRgbaPast: {
      main: "#0369a1",
      container: "rgba(5, 25, 40, 0.6)",
      onContainer: "rgba(186, 230, 253, 0.6)",
    },
  },
  [CalendarType.FEMININO]: {
    id: "FEMININO",
    label: "Treino Feminino",
    trainingTypeKeywords: ["feminino"],
    darkColors: {
      main: "#14b8a6",
      container: "#14b8a630",
      onContainer: "#99f6e4",
    },
    darkColorsRgba: {
      main: "#14b8a6",
      container: "rgba(15, 65, 58, 1)",
      onContainer: "#ccfbf1",
    },
    darkColorsRgbaPast: {
      main: "#0f766e",
      container: "rgba(8, 30, 28, 0.6)",
      onContainer: "rgba(153, 246, 228, 0.6)",
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

export enum CalendarLocation {
  LABFEF = "labfef",
  GMU = "gmu",
}

export const CALENDAR_LOCATION_INFO: Record<
  CalendarLocation,
  { id: string; label: string; fullAddress: string }
> = {
  [CalendarLocation.LABFEF]: {
    id: "LABFEF",
    label: "LABFEF",
    fullAddress:
      "Faculdade de Educação Física da Unicamp, Av. Érico Veríssimo, 701 - Geraldo, Campinas - SP, 13083-851, Brasil",
  },
  [CalendarLocation.GMU]: {
    id: "GMU",
    label: "GMU",
    fullAddress:
      "GMU - Ginásio Multidisciplinar da Unicamp - Cidade Universitária, Campinas - SP, 13083-854, Brasil",
  },
};

/**
 * Mapeamento inverso: full address → CalendarLocation enum
 * Utilizado para lookup rápido durante o processamento de eventos.
 */
export const ADDRESS_TO_LOCATION: Record<string, CalendarLocation> = {
  [CALENDAR_LOCATION_INFO[CalendarLocation.LABFEF].fullAddress]:
    CalendarLocation.LABFEF,
  [CALENDAR_LOCATION_INFO[CalendarLocation.GMU].fullAddress]:
    CalendarLocation.GMU,
};
