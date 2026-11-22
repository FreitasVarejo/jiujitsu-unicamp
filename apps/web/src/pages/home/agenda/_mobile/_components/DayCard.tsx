import { ForwardedRef, forwardRef } from "react";
import { AgendaEvent } from "@/types/home";
import { DAY_LABELS, fmtDDMM } from "../../date-helpers";
import { Card } from "@/components/ui/card";
import { EventCard } from "./EventCard";

interface DayCardProps {
  dayDate: Date;
  events: AgendaEvent[];
  isToday: boolean;
}

/**
 * Card de um dia da semana contendo todos os eventos daquele dia.
 * Exibe o nome do dia, data DD/MM e lista de eventos.
 */
export const DayCard = forwardRef(
  (
    { dayDate, events, isToday }: DayCardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const dayOfWeek = dayDate.getDay(); // 0=Dom..6=Sáb
    const dateLabel = fmtDDMM(dayDate);

    return (
      <Card
        ref={ref}
        className={`gap-0 rounded-lg border-2 p-4 ring-0 ${
          isToday ? "border-primary bg-zinc-700" : "border-zinc-700 bg-zinc-800"
        }`}
      >
        <h3 className="mb-3 flex items-baseline gap-2 font-display text-lg text-white">
          {DAY_LABELS[dayOfWeek]}
          <span className="font-sans text-sm tracking-normal text-zinc-400 normal-case">
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
          <p className="text-sm text-zinc-400">Sem treino neste dia.</p>
        )}
      </Card>
    );
  }
);

DayCard.displayName = "DayCard";
