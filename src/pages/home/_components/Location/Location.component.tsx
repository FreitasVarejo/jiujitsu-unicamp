import { MapPin } from 'lucide-react';
import { SectionHeader } from '../shared';
import { LocationCard } from './_components';
import { LOCATIONS } from './location.constants';

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
