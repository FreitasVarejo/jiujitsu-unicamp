import { EventDetailsInfoCard } from "./event-details-info.tsx";
import { EventDetailsThumbnail } from "./event-details-thumbnail.tsx";
import { Dispatch, SetStateAction } from "react";
import { Event } from "@/types/event";

type EventDetailsHeaderProps = {
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  details: Event;
};
export const EventDetailsHeader = ({
  setSelectedImage,
  details,
}: EventDetailsHeaderProps) => {
  return (
    <div className="mb-16 flex flex-col gap-12 lg:flex-row">
      {<EventDetailsInfoCard details={details} />}

      <EventDetailsThumbnail
        setSelectedImage={setSelectedImage}
        details={details}
      />
    </div>
  );
};
