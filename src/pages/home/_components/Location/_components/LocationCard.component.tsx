import type { LocationData } from '../location.constants';

interface LocationCardProps {
  location: LocationData;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
      <div className="p-8 col-span-1 flex flex-col justify-center">
        <h3 className="text-2xl font-display text-white mb-2">
          {location.title}
        </h3>
        <p className="text-gray-400 mb-6 whitespace-pre-line">
          {location.address}
        </p>
        <p className="text-sm text-gray-500 italic">
          {location.reference}
        </p>
      </div>
      <div className="col-span-1 md:col-span-2 h-64 md:h-auto min-h-[300px]">
        <iframe
          src={location.mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden={false}
          tabIndex={0}
          className="filter grayscale invert contrast-125 brightness-75 hover:filter-none transition-all duration-500"
        />
      </div>
    </div>
  );
};
