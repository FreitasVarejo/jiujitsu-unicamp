import { EventDetailsInfoCard } from "./event-details-info.tsx";
import { EventDetailsThumbnail } from "./event-details-thumbnail.tsx";
import { Dispatch, SetStateAction } from "react";
import { Event } from "@/types/event";
import { useIsDesktop } from "@/hooks/ui";

type EventDetailsHeaderProps = {
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  details: Event;
};
export const EventDetailsHeader = ({
  setSelectedImage,
  details,
}: EventDetailsHeaderProps) => {
  const isDesktop = useIsDesktop();

  return (
    <div className={`mb-16 flex gap-12 ${isDesktop ? "flex-row" : "flex-col"}`}>
      {<EventDetailsInfoCard details={details} />}

      <EventDetailsThumbnail
        setSelectedImage={setSelectedImage}
        details={details}
      />
    </div>
  );
};
