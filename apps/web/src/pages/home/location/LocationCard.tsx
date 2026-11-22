import type { LocationData } from "@/types/home";
import { useIsDesktop } from "@/hooks/ui";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface LocationCardProps {
  location: LocationData;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  const isDesktop = useIsDesktop();

  return (
    <Card
      className={`grid gap-8 rounded-lg border border-border py-0 ring-0 ${
        isDesktop ? "grid-cols-3" : "grid-cols-1"
      }`}
    >
      <CardContent className="col-span-1 flex flex-col justify-center p-8">
        <CardTitle
          role="heading"
          aria-level={3}
          className="mb-2 text-2xl leading-8 text-white"
        >
          {location.title}
        </CardTitle>
        <p className="mb-6 text-base whitespace-pre-line text-gray-400">
          {location.address}
        </p>
        <p className="text-sm text-gray-500 italic">{location.reference}</p>
      </CardContent>
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
    </Card>
  );
};
