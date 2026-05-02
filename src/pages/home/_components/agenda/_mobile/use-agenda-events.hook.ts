import { useEffect, useState } from "react";
import { calendarService } from "@/services/calendarService";
import { EventsByDay } from "@/types/home";
import {
  convertGoogleEventToAgendaEvent,
  getEventDayOfWeek,
} from "../event-converter";

/**
 * Hook para buscar e agrupar eventos do Google Calendar por dia da semana.
 * Responsabilidade única: fetching e agrupamento de dados.
 *
 * @param weekStart - Data de início da semana (YYYY-MM-DD)
 * @param weekEnd - Data de fim da semana (YYYY-MM-DD)
 * @returns Objeto com eventsByDay, loading e error
 */
export const useAgendaEvents = (weekStart: string, weekEnd: string) => {
  const [eventsByDay, setEventsByDay] = useState<EventsByDay>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const events = await calendarService.getEventsByRange(
          weekStart,
          weekEnd
        );

        // Inicializa todos os dias da semana com arrays vazios
        const grouped: EventsByDay = {};
        for (let i = 0; i <= 6; i++) grouped[i] = [];

        // Agrupa eventos por dia da semana e converte para AgendaEvent
        for (const event of events) {
          const day = getEventDayOfWeek(event);
          const converted = convertGoogleEventToAgendaEvent(event);
          grouped[day].push(converted);
        }

        // Ordena eventos de cada dia por horário de início
        for (const day of Object.keys(grouped)) {
          grouped[Number(day)].sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
          );
        }

        setEventsByDay(grouped);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar eventos da agenda:", err);
        setError(
          "Não foi possível carregar a agenda. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [weekStart, weekEnd]);

  return {
    eventsByDay,
    loading,
    error,
  };
};
