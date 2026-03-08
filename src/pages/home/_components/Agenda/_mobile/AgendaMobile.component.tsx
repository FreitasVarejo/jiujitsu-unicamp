import { useEffect, useRef } from 'react';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventsByDay } from '../agenda.hook';
import { EventCard } from './EventCard.component';
import { performScroll, addDays, fmtDDMM, fmtDate, DAY_LABELS, ALL_DAYS } from './mobile-helpers';

interface AgendaMobileProps {
  eventsByDay: EventsByDay;
  loading: boolean;
  error: string | null;
  weekStart: string;
  weekEnd: string;
  today: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export const AgendaMobile = ({
  eventsByDay,
  loading,
  error,
  weekStart,
  weekEnd,
  today,
  onPreviousWeek,
  onNextWeek,
}: AgendaMobileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  const weekStartDate = addDays(weekStart, 0);
  const weekEndDate = addDays(weekEnd, 0);
  const rangeLabel = `${fmtDDMM(weekStartDate)} – ${fmtDDMM(weekEndDate)}`;

  /**
   * Auto-scroll para o dia de hoje quando a semana contém today.
   * Posicionamento adaptativo: domingo = topo, seg-sex = 35% do topo, sábado = máximo possível.
   */
  useEffect(() => {
    // Verifica se hoje está na semana sendo exibida
    const isTodayInWeek = today >= weekStart && today <= weekEnd;
    console.log('[AgendaMobile] Auto-scroll check:', { today, weekStart, weekEnd, isTodayInWeek });

    if (!isTodayInWeek) {
      console.log('[AgendaMobile] Today not in current week, skipping auto-scroll');
      return;
    }

    // Aguarda DOM estar pronto e refs disponíveis (300ms com retry logic)
    const scrollTimer = setTimeout(() => {
      const container = containerRef.current;
      const todayCard = todayRef.current;

      console.log('[AgendaMobile] Checking refs after timeout:', { containerRef: !!container, todayRef: !!todayCard });

      if (!container || !todayCard) {
        console.log('[AgendaMobile] Refs not available, retrying in 100ms');
        // Retry uma vez se as refs ainda não estiverem prontas
        const retryTimer = setTimeout(() => {
          const retryContainer = containerRef.current;
          const retryCard = todayRef.current;

          console.log('[AgendaMobile] Retry check:', { containerRef: !!retryContainer, todayRef: !!retryCard });

          if (!retryContainer || !retryCard) {
            console.log('[AgendaMobile] Refs still not available, giving up');
            return;
          }

          performScroll(retryContainer, retryCard, today);
        }, 100);

        return () => clearTimeout(retryTimer);
      }

      performScroll(container, todayCard, today);
    }, 300);

    return () => clearTimeout(scrollTimer);
  }, [today, weekStart, weekEnd]);

  const navBar = (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onPreviousWeek}
        aria-label="Semana anterior"
        className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-sm font-display uppercase tracking-widest text-zinc-300">
        {rangeLabel}
      </span>
      <button
        onClick={onNextWeek}
        aria-label="Próxima semana"
        className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="md:hidden flex flex-col">
        {navBar}
        <div className="flex justify-center py-12 flex-1">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:hidden flex flex-col">
        {navBar}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center flex-1">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-display text-white mb-1">Ops! Algo deu errado</h3>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden flex flex-col">
      {navBar}
      <div className="max-h-[70vh] overflow-y-auto" ref={containerRef}>
        <div className="space-y-4">
          {ALL_DAYS.map((dayOffset) => {
            const dayDate = addDays(weekStart, dayOffset);
            const dayOfWeek = dayDate.getDay(); // 0=Dom..6=Sáb
            const events = eventsByDay[dayOfWeek] ?? [];
            const dateLabel = fmtDDMM(dayDate);
            const dayDateStr = fmtDate(dayDate);
            const isToday = dayDateStr === today;

            return (
              <div
                key={dayOffset}
                ref={isToday ? todayRef : null}
                className={`rounded-lg border-2 p-4 ${
                  isToday
                    ? 'border-primary bg-zinc-800'
                    : 'border-zinc-800 bg-zinc-900'
                }`}
              >
                <h3 className="font-display text-lg text-white mb-3 flex items-baseline gap-2">
                  {DAY_LABELS[dayOfWeek]}
                  <span className="text-sm font-sans normal-case text-zinc-500 tracking-normal">
                    {dateLabel}
                  </span>
                </h3>

                {events.length > 0 ? (
                  <div className="space-y-2">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Sem treino neste dia.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
