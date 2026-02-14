import { EventFolder, EventInfo } from "@/services/mediaService";
import { EventCard } from "./EventCard";
import { SeeMoreCard } from "./SeeMoreCard";

interface YearSectionProps {
  year: string;
  folders: EventFolder[];
  eventInfo: Record<string, EventInfo>;
  visibleCount: number;
  onSeeMore: (year: string) => void;
}

export const YearSection = ({ year, folders, eventInfo, visibleCount, onSeeMore }: YearSectionProps) => {
  const visibleFolders = folders.slice(0, visibleCount);
  const hasMore = folders.length > visibleCount;

  return (
    <section key={year}>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-display text-primary">{year}</h2>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleFolders.map((folder, index) => {
          const isLastVisible = index === visibleCount - 1 && hasMore;
          const remaining = folders.length - visibleCount;

          if (isLastVisible) {
            return (
              <SeeMoreCard
                key={folder.id}
                folder={folder}
                info={eventInfo[folder.id]}
                year={year}
                remaining={remaining}
                onClick={onSeeMore}
              />
            );
          }

          return <EventCard key={folder.id} folder={folder} info={eventInfo[folder.id]} />;
        })}
      </div>
    </section>
  );
};
