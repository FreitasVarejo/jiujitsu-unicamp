import { EventSummaryInfo } from '@/services/mediaService';
import { EventCard } from './EventCard';
import { SeeMoreCard } from './SeeMoreCard';

interface YearSectionProps {
  year: string;
  events: EventSummaryInfo[];
  visibleCount: number;
  onSeeMore: (year: string) => void;
}

export const YearSection = ({ year, events, visibleCount, onSeeMore }: YearSectionProps) => {
  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = events.length > visibleCount;

  return (
    <section key={year}>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-display text-primary">{year}</h2>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
