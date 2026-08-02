import { ScheduleXCalendar } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import { CalendarLegend } from "./CalendarLegend";
import { TimeGridEvent } from "./TimeGridEvent";
import { useScheduleXConfig } from "./useScheduleXConfig";

/**
 * Agenda desktop usando Schedule-X com visualização semanal.
 * Exibe eventos em um time grid com cores categorizadas e custom event component.
 */
export const AgendaDesktop = () => {
  const { calendar } = useScheduleXConfig();

  return (
    <div className="sx-react-calendar-wrapper">
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{ timeGridEvent: TimeGridEvent }}
      />
      <CalendarLegend />
    </div>
  );
};
