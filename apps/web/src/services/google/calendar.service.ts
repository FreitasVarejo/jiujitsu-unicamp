const CALENDAR_ID =
  "f481afb9999dfafe1079be33ac43d3ab2695409949b092b3d894ea42cc903f5c@group.calendar.google.com";
const BASE_URL = "https://www.googleapis.com/calendar/v3/calendars";

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
  description?: string;
}

interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
}

/**
 * Busca eventos do calendário público do Google dentro de um intervalo de datas.
 */
const fetchEvents = async (
  timeMin: string,
  timeMax: string
): Promise<GoogleCalendarEvent[]> => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;
  if (!apiKey) throw new Error("VITE_GOOGLE_API_KEY não configurada.");

  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    timeMax,
    orderBy: "startTime",
    singleEvents: "true",
    timeZone: "America/Fortaleza",
    maxResults: "250",
  });

  const url = `${BASE_URL}/${encodeURIComponent(CALENDAR_ID)}/events?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar eventos: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as GoogleCalendarResponse;
  return data.items ?? [];
};

export const calendarService = {
  /**
   * Busca eventos por intervalo de datas (usado pelo Schedule-X fetchEvents callback).
   * Aceita strings no formato YYYY-MM-DD.
   */
  getEventsByRange: async (
    start: string,
    end: string
  ): Promise<GoogleCalendarEvent[]> => {
    const timeMin = `${start}T00:00:00-03:00`;
    const timeMax = `${end}T23:59:59-03:00`;
    return fetchEvents(timeMin, timeMax);
  },
};
