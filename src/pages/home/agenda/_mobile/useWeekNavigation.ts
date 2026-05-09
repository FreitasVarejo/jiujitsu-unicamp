import { useCallback, useState } from "react";
import { addDays, fmtDate, getSundayOf } from "../date-helpers";

/**
 * Hook para navegação entre semanas (Dom-Sáb).
 *
 * Retorna:
 * - `weekStart` — YYYY-MM-DD do domingo da semana atual
 * - `weekEnd` — YYYY-MM-DD do sábado da semana atual
 * - `today` — YYYY-MM-DD da data de hoje
 * - `goToPreviousWeek` — navega para a semana anterior
 * - `goToNextWeek` — navega para a semana seguinte
 */
export const useWeekNavigation = () => {
  const [weekStart, setWeekStart] = useState<string>(() =>
    getSundayOf(new Date())
  );
  const weekEnd = addDays(weekStart, 6);
  const today = fmtDate(new Date());

  const goToPreviousWeek = useCallback(() => {
    setWeekStart((prev) => addDays(prev, -7));
  }, []);

  const goToNextWeek = useCallback(() => {
    setWeekStart((prev) => addDays(prev, 7));
  }, []);

  return {
    weekStart,
    weekEnd,
    today,
    goToPreviousWeek,
    goToNextWeek,
  };
};
