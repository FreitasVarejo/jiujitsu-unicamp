export enum CalendarType {
  GERAL = 'geral',
  COMPETICAO = 'competicao',
  FEMININO = 'feminino',
  NOTURNO = 'noturno',
  EVENTO = 'evento',
  FALLBACK = 'fallback',
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
  }
> = {
  [CalendarType.GERAL]: {
    id: 'GERAL',
    label: 'Treino Geral',
    trainingTypeKeywords: ['geral'],
    darkColors: {
      main: '#d26030',
      container: '#d2603030',
      onContainer: '#f4a882',
    },
    darkColorsRgba: {
      main: '#d26030',
      container: 'rgba(60, 28, 14, 1)',
      onContainer: '#f4a882',
    },
  },
  [CalendarType.COMPETICAO]: {
    id: 'COMPETICAO',
    label: 'Treino Competição',
    trainingTypeKeywords: ['competição', 'competicao'],
    darkColors: {
      main: '#dc2626',
      container: '#dc262630',
      onContainer: '#fca5a5',
    },
    darkColorsRgba: {
      main: '#dc2626',
      container: 'rgba(55, 15, 15, 1)',
      onContainer: '#fca5a5',
    },
  },
  [CalendarType.NOTURNO]: {
    id: 'NOTURNO',
    label: 'Treino Noturno',
    trainingTypeKeywords: ['noturno'],
    darkColors: {
      main: '#6366f1',
      container: '#6366f130',
      onContainer: '#a5b4fc',
    },
    darkColorsRgba: {
      main: '#6366f1',
      container: 'rgba(25, 25, 60, 1)',
      onContainer: '#a5b4fc',
    },
  },
  [CalendarType.FEMININO]: {
    id: 'FEMININO',
    label: 'Treino Feminino',
    trainingTypeKeywords: ['feminino'],
    darkColors: {
      main: '#d946ef',
      container: '#d946ef30',
      onContainer: '#f0abfc',
    },
    darkColorsRgba: {
      main: '#d946ef',
      container: 'rgba(60, 25, 70, 1)',
      onContainer: '#f0abfc',
    },
  },
  [CalendarType.EVENTO]: {
    id: 'EVENTO',
    label: 'Evento',
    trainingTypeKeywords: ['evento'],
    darkColors: {
      main: '#f59e0b',
      container: '#f59e0b30',
      onContainer: '#fcd34d',
    },
    darkColorsRgba: {
      main: '#f59e0b',
      container: 'rgba(60, 38, 10, 1)',
      onContainer: '#fcd34d',
    },
  },
  [CalendarType.FALLBACK]: {
    id: 'FALLBACK',
    label: 'Outro',
    trainingTypeKeywords: [],
    darkColors: {
      main: '#71717a',
      container: '#27272a',
      onContainer: '#e4e4e7',
    },
    darkColorsRgba: {
      main: '#71717a',
      container: 'rgba(39, 39, 42, 1)',
      onContainer: '#e4e4e7',
    },
  },
};
