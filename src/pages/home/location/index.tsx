import { MapPin } from "lucide-react";
import { LocationCard } from "./location-card";
import { LOCATIONS } from "@/constants/home";
import { SectionHeader } from "@/components/SectionHeader.component";

export const Location = () => {
  return (
    <section className="container">
      <SectionHeader title="Localizações" icon={MapPin} />

      <div className="flex flex-col gap-8">
        {Object.values(LOCATIONS).map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </section>
  );
};
