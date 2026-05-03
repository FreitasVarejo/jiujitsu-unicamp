import type { LocationData } from "@/types/home";
import { useIsDesktop } from "@/hooks/ui";

interface LocationCardProps {
  location: LocationData;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  const isDesktop = useIsDesktop();

  return (
    <div
      className={`grid gap-8 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 ${
        isDesktop ? "grid-cols-3" : "grid-cols-1"
      }`}
    >
      <div className="col-span-1 flex flex-col justify-center p-8">
        <h3 className="mb-2 font-display text-2xl text-white">
          {location.title}
        </h3>
        <p className="mb-6 whitespace-pre-line text-gray-400">
          {location.address}
        </p>
        <p className="text-sm italic text-gray-500">{location.reference}</p>
      </div>
      <div
        className={`col-span-1 ${
          isDesktop ? "col-span-2 h-auto" : "h-64 min-h-[300px]"
        }`}
      >
        <iframe
          src={location.mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden={false}
          tabIndex={0}
          className="brightness-75 contrast-125 grayscale invert filter transition-all duration-500 hover:filter-none"
        />
      </div>
    </div>
  );
};
