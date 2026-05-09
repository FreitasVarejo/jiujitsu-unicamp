import { EventSummaryInfo } from "@/services/mediaService";
import { EventCard } from "../event-card";
import { SeeMoreCard } from "../see-more-card";
import { useIsDesktop } from "@/hooks/ui";

interface YearSectionProps {
  year: string;
  events: EventSummaryInfo[];
  visibleCount: number;
  onSeeMore: (year: string) => void;
}

export const YearSection = ({
  year,
  events,
  visibleCount,
  onSeeMore,
}: YearSectionProps) => {
  const isDesktop = useIsDesktop();
  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = events.length > visibleCount;

  return (
    <section key={year}>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="font-display text-2xl text-primary">{year}</h2>
        <div className="h-px flex-grow bg-zinc-800"></div>
      </div>

      <div
        className={`grid gap-6 ${isDesktop ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {visibleEvents.map((event, index) => {
          const isLastVisible = index === visibleCount - 1 && hasMore;
          const remaining = events.length - visibleCount;

          if (isLastVisible) {
            return (
              <SeeMoreCard
                key={event.id}
                event={event}
                year={year}
                remaining={remaining}
                onClick={onSeeMore}
              />
            );
          }

          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </section>
  );
};
