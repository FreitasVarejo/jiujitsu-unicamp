import { MapPin, User } from 'lucide-react';

/* ── Paleta de cores por tipo de treino (tema escuro, opacidade total) ── */

const CALENDAR_COLORS: Record<string, { main: string; container: string; onContainer: string }> = {
  geral: {
    main: '#d26030',
    container: 'rgba(60, 28, 14, 1)',
    onContainer: '#f4a882',
  },
  competicao: {
    main: '#dc2626',
    container: 'rgba(55, 15, 15, 1)',
    onContainer: '#fca5a5',
  },
  noturno: {
    main: '#6366f1',
    container: 'rgba(25, 25, 60, 1)',
    onContainer: '#a5b4fc',
  },
  feminino: {
    main: '#d946ef',
    container: 'rgba(60, 25, 70, 1)',
    onContainer: '#f0abfc',
  },
  evento: {
    main: '#f59e0b',
    container: 'rgba(60, 38, 10, 1)',
    onContainer: '#fcd34d',
  },
  fallback: {
    main: '#71717a',
    container: 'rgba(39, 39, 42, 1)',
    onContainer: '#e4e4e7',
  },
};

const DEFAULT_COLORS = CALENDAR_COLORS.fallback;

/* ── Mapeamento de endereço completo → nome amigável ── */

const LOCATION_DISPLAY_MAP: Record<string, string> = {
  'Faculdade de Educação Física da Unicamp, Av. Érico Veríssimo, 701 - Geraldo, Campinas - SP, 13083-851, Brasil': 'LABFEF',
  'GMU - Ginásio Multidisciplinar da Unicamp - Cidade Universitária, Campinas - SP, 13083-854, Brasil': 'GMU',
};

/**
 * Retorna o nome amigável do local se existir no mapa,
 * senão retorna o endereço original.
 */
const getDisplayLocation = (raw: string): string =>
  LOCATION_DISPLAY_MAP[raw] ?? raw;

/**
 * Gera uma URL de busca do Google Maps a partir de um endereço.
 */
const buildMapsUrl = (location: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

/**
 * Extrai o tipo do treino (antes do '-') e o nome do instrutor (depois do '-')
 * a partir do título completo do evento.
 *
 * "Treino Geral - Pablo Viana" → { type: "TREINO GERAL", instructor: "Pablo Viana" }
 * "Treino Noturno"             → { type: "TREINO NOTURNO", instructor: undefined }
 * "Evento Qualquer"            → { type: "EVENTO QUALQUER", instructor: undefined }
 */
const parseTitle = (raw: string): { type: string; instructor?: string } => {
  const dashIndex = raw.indexOf('-');

  if (dashIndex === -1) {
    return { type: raw.trim().toUpperCase() };
  }

  const type = raw.slice(0, dashIndex).trim().toUpperCase();
  const instructor = raw.slice(dashIndex + 1).trim() || undefined;
  return { type, instructor };
};

/* ── Tipos ── */

interface CalendarEventProps {
  id: string | number;
  title?: string;
  location?: string;
  description?: string;
  calendarId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface TimeGridEventProps {
  calendarEvent: CalendarEventProps;
}

/**
 * Componente customizado para eventos no time grid do Schedule-X.
 * Aplica as cores do calendário manualmente (Schedule-X remove os estilos
 * inline do wrapper quando um componente customizado é fornecido).
 * Exibe nome do instrutor (ou tipo do treino como fallback) e localização
 * como link clicável para o Google Maps. O tipo do treino é comunicado
 * pela cor do card — uma legenda externa mapeia cores a tipos.
 *
 * Deve ser definido no escopo do módulo (fora de componentes React)
 * conforme exigido pelo Schedule-X.
 */
export const TimeGridEvent = ({ calendarEvent }: TimeGridEventProps) => {
  const colors = CALENDAR_COLORS[calendarEvent.calendarId ?? ''] ?? DEFAULT_COLORS;
  const { type, instructor } = parseTitle(calendarEvent.title ?? 'Sem título');

  return (
    <div
      className="flex flex-col gap-px p-1 h-full overflow-hidden text-xs leading-tight rounded"
      style={{
        backgroundColor: colors.container,
        borderLeft: `3px solid ${colors.main}`,
        color: colors.onContainer,
      }}
    >
      <span className="inline-flex items-center gap-0.5 font-semibold truncate">
        {instructor ? (
          <>
            <User size={10} className="shrink-0" />
            <span className="truncate">{instructor}</span>
          </>
        ) : (
          <span className="font-bold uppercase truncate">{type}</span>
        )}
      </span>

      {calendarEvent.location && (
        <a
          href={buildMapsUrl(calendarEvent.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 opacity-80 hover:opacity-100 underline underline-offset-2 transition-opacity"
          onClick={(e) => e.stopPropagation()}
          title={calendarEvent.location}
          style={{ color: colors.onContainer }}
        >
          <MapPin size={10} className="shrink-0" />
          <span className="truncate">{getDisplayLocation(calendarEvent.location)}</span>
        </a>
      )}
    </div>
  );
};
