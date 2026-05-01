import {
  EventsPageNone,
  EventsPageTitle,
  YearSection,
  EventsPageLoading,
} from "./components";
import { EventsPageError } from "./components/events-page-error.tsx";
import { useEvents } from "./event.hook";

export const EventsPage = () => {
  const { years, groupedEvents, visibleCounts, loading, error, handleSeeMore } =
    useEvents();

  if (loading) {
    return <EventsPageLoading />;
  }

  return (
    <div className="container py-12">
      <EventsPageTitle />

      {error ? (
        <EventsPageError error={error} />
      ) : years.length === 0 ? (
        <EventsPageNone />
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <YearSection
              key={year}
              year={year}
              events={groupedEvents[year] || []}
              visibleCount={visibleCounts[year] || 4}
              onSeeMore={handleSeeMore}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export * from "./detalhes";
