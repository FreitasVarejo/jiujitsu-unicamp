import { useRef } from "react";
import {
  WeekNavigation,
  DayCard,
  LoadingState,
  ErrorState,
} from "./_components";
import {
  addDaysToDateString,
  fmtDDMM,
  fmtDate,
  ALL_DAYS,
} from "../date-helpers";
import { useAgendaEvents } from "./use-agenda-events.hook";
import { useAutoScroll } from "./use-auto-scroll.hook";
import { useWeekNavigation } from "./use-week-navigation.hook";

export const AgendaMobile = () => {
  const { weekStart, weekEnd, today, goToPreviousWeek, goToNextWeek } =
    useWeekNavigation();
  const { eventsByDay, loading, error } = useAgendaEvents(weekStart, weekEnd);

  const containerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  useAutoScroll(containerRef, todayRef, today, weekStart, weekEnd);

  const weekStartDate = addDaysToDateString(weekStart, 0);
  const weekEndDate = addDaysToDateString(weekEnd, 0);
  const rangeLabel = `${fmtDDMM(weekStartDate)} – ${fmtDDMM(weekEndDate)}`;

  const navBar = (
    <WeekNavigation
      rangeLabel={rangeLabel}
      onPrevious={goToPreviousWeek}
      onNext={goToNextWeek}
    />
  );

  if (loading) {
    return <LoadingState navBar={navBar} />;
  }

  if (error) {
    return <ErrorState navBar={navBar} error={error} />;
  }

  return (
    <div className="flex flex-col md:hidden">
      {navBar}
      <div className="max-h-[70vh] overflow-y-auto" ref={containerRef}>
        <div className="space-y-4">
          {ALL_DAYS.map((dayOffset) => {
            const dayDate = addDaysToDateString(weekStart, dayOffset);
            const dayOfWeek = dayDate.getDay(); // 0=Dom..6=Sáb
            const events = eventsByDay[dayOfWeek] ?? [];
            const dayDateStr = fmtDate(dayDate);
            const isToday = dayDateStr === today;

            return (
              <DayCard
                key={dayOffset}
                ref={isToday ? todayRef : null}
                dayDate={dayDate}
                events={events}
                isToday={isToday}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
