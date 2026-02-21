import { MapPin } from "lucide-react";
import { SectionHeader } from "../shared";

export const Location = () => {
  return (
    <section className="container mx-auto px-4">
      <SectionHeader title="Localização" icon={MapPin} />

      <div className="grid md:grid-cols-3 gap-8 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
        <div className="p-8 col-span-1 flex flex-col justify-center">
          <h3 className="text-2xl font-display text-white mb-2">
            Ginásio da FEF
          </h3>
          <p className="text-gray-400 mb-6">
            Av. Érico Veríssimo, 701
            <br />
            Cidade Universitária
            <br />
            Campinas - SP
          </p>
          <p className="text-sm text-gray-500 italic">
            Dentro da Faculdade de Educação Física, próximo ao bandejão.
          </p>
        </div>
        <div className="col-span-1 md:col-span-2 h-64 md:h-auto min-h-[300px]">
          <iframe
            src="https://maps.google.com/maps?q=Av.+Érico+Veríssimo,+701+-+Geraldo,+Campinas+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden={false}
            tabIndex={0}
            className="filter grayscale invert contrast-125 brightness-75 hover:filter-none transition-all duration-500"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
