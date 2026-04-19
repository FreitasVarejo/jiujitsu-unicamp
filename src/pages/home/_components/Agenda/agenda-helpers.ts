import { CalendarType, CALENDAR_TYPE_INFO } from "@/constants";
import { CALENDAR_LOCATION_INFO, ADDRESS_TO_LOCATION } from "@/constants";

/**
 * Verifica se um evento foi cancelado.
 * Um evento é considerado cancelado se seu título começa com '*'.
 *
 * @param summary - Título do evento do Google Calendar
 * @returns true se o evento foi cancelado, false caso contrário
 */
export const isCancelledEvent = (summary: string): boolean => {
  return summary.trimStart().startsWith("*");
};

/**
 * Verifica se um evento é NoGi (sem kimono).
 * Um evento é considerado NoGi se seu título contém "(NoGi)" (case-insensitive).
 *
 * @example
 * "Treino Geral - Pablo Viana (NoGi)" → true
 * "Treino Geral - Pablo Viana"        → false
 *
 * @param summary - Título do evento do Google Calendar
 * @returns true se o evento é NoGi, false caso contrário
 */
export const isNoGiEvent = (summary: string): boolean => {
  return /\(nogi\)/i.test(summary);
};

/**
 * Infere o tipo de calendário (CalendarType) a partir do summary do evento.
 * Espera formato "Treino <Tipo> - Instrutor" ou "Treino <Tipo>" ou "Evento - Nome".
 * Retorna o CalendarType correspondente, ou CalendarType.FALLBACK como fallback.
 *
 * @param summary - Título do evento do Google Calendar
 * @returns CalendarType inferido
 */
export const inferCalendarType = (summary: string): CalendarType => {
  // Verifica se é um evento (começa com "Evento")
  if (summary.match(/^evento\s*(-|$)/i)) {
    return CalendarType.EVENTO;
  }

  // Procura por "Treino <Tipo>"
  const match = summary.match(/^treino\s+(\S+)/i);
  if (!match) return CalendarType.FALLBACK;

  const keyword = match[1]
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Procura o tipo nos keywords de cada CalendarType
  for (const [type, info] of Object.entries(CALENDAR_TYPE_INFO)) {
    if (info.trainingTypeKeywords.includes(keyword)) {
      return type as CalendarType;
    }
  }

  return CalendarType.FALLBACK;
};

/**
 * Extrai o tipo de treino (antes do '-') e o nome do instrutor ou evento (depois do '-')
 * a partir do título completo do evento.
 * Remove asterisco inicial se presente (marca de evento cancelado).
 *
 * Eventos (tipo "Evento") não possuem instrutor, apenas nome do evento.
 *
 * @example
 * "Treino Geral - Pablo Viana"            → { type: "TREINO GERAL", instructor: "Pablo Viana" }
 * "*Treino Geral - Pablo Viana"           → { type: "TREINO GERAL", instructor: "Pablo Viana" }
 * "Treino Geral - Pablo Viana (NoGi)"    → { type: "TREINO GERAL", instructor: "Pablo Viana" }
 * "Evento - Seminário Gracie"             → { type: "EVENTO", eventName: "Seminário Gracie" }
 * "Treino Noturno"                        → { type: "TREINO NOTURNO", instructor: undefined }
 * "Evento Qualquer"                       → { type: "EVENTO QUALQUER", instructor: undefined }
 *
 * @param raw - Título bruto do evento
 * @returns Objeto com tipo, instrutor (opcional) e eventName (opcional)
 */
export const parseEventTitle = (
  raw: string
): { type: string; instructor?: string; eventName?: string } => {
  // Remove asterisco inicial se presente e remove marcador NoGi em qualquer posição
  const cleaned = raw
    .trimStart()
    .replace(/^\*\s*/, "")
    .replace(/\s*\(nogi\)/gi, "")
    .trim();
  const dashIndex = cleaned.indexOf("-");

  if (dashIndex === -1) {
    return { type: cleaned.trim().toUpperCase() };
  }

  const typeSegment = cleaned.slice(0, dashIndex).trim().toUpperCase();
  const secondSegment = cleaned.slice(dashIndex + 1).trim() || undefined;

  // Se o tipo é "EVENTO", trata o segundo segmento como nome do evento
  if (typeSegment === "EVENTO") {
    return { type: typeSegment, eventName: secondSegment };
  }

  // Caso contrário, é um instrutor
  return { type: typeSegment, instructor: secondSegment };
};

/**
 * Verifica se um evento já passou (começou/terminou no passado).
 * Compara a hora de início do evento com a hora atual.
 *
 * @param startTime - Hora de início no formato "HH:MM" (ex: "14:30")
 * @returns true se o evento já começou/passou, false caso contrário
 */
export const isPastEvent = (startTime: string): boolean => {
  if (!startTime || startTime === "Dia inteiro") return false;

  const now = new Date();
  const [eventHours, eventMinutes] = startTime.split(":").map(Number);
  const eventTimeInMinutes = eventHours * 60 + eventMinutes;
  const nowTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  return nowTimeInMinutes >= eventTimeInMinutes;
};

/**
 * Verifica se um evento (com datetime completo) já passou.
 * Compara a hora de início do evento com a hora atual.
 *
 * @param dateTime - Datetime no formato ISO (ex: "2026-03-01T14:30:00") ou datetime completo
 * @returns true se o evento já começou, false caso contrário
 */
export const isPastEventFromDateTime = (dateTime?: string): boolean => {
  if (!dateTime) return false;

  try {
    const eventDate = new Date(dateTime);
    const now = new Date();
    return now >= eventDate;
  } catch {
    return false;
  }
};

/**
 * Retorna o nome amigável da localização se existir no mapa,
 * senão retorna o endereço original.
 *
 * @param rawAddress - Endereço completo retornado pelo Google Calendar
 * @returns Nome amigável (ex: "LABFEF") ou endereço original
 */
export const getDisplayLocation = (rawAddress: string): string => {
  const location = ADDRESS_TO_LOCATION[rawAddress];
  if (location) {
    return CALENDAR_LOCATION_INFO[location].label;
  }
  return rawAddress;
};

/**
 * Gera uma URL de busca do Google Maps a partir de um endereço.
 *
 * @param location - Endereço ou nome da localização
 * @returns URL de busca do Google Maps
 */
export const buildMapsUrl = (location: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
