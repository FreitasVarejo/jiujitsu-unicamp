import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { data } from '@/data';
import { SectionHeader } from '../home/_components/SectionHeader';
import { Link } from 'react-router-dom';

const Treinos = () => {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* 1. Horários de Treinos */}
      <section className="container mx-auto px-4">
        <SectionHeader title="Horários de Treino" icon={Clock} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Diurnos */}
          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-2xl font-display text-primary mb-6 border-b border-zinc-800 pb-2">Treinos Diurnos</h3>
            <div className="space-y-4">
              {data.horarios.diurnos.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 text-sm border-b border-zinc-800 pb-3 last:border-0">
                  <span className="font-bold text-white col-span-1">{item.dia}</span>
                  <div className="col-span-3 space-y-1">
                    {item.comp !== '-' && <div className="flex justify-between"><span className="text-gray-400">Competição:</span> <span className="text-white">{item.comp}</span></div>}
                    {item.geral !== '-' && <div className="flex justify-between"><span className="text-gray-400">Geral:</span> <span className="text-white">{item.geral}</span></div>}
                    {item.feminino !== '-' && <div className="flex justify-between"><span className="text-primary">Feminino:</span> <span className="text-white">{item.feminino}</span></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Noturnos */}
          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 h-fit">
            <h3 className="text-2xl font-display text-primary mb-6 border-b border-zinc-800 pb-2">Treinos Noturnos</h3>
            <div className="space-y-4">
              {data.horarios.noturnos.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-zinc-800 pb-3 last:border-0">
                  <span className="font-bold text-white">{item.dia}</span>
                  <div className="text-right">
                    <div className="text-white">{item.hora}</div>
                    <div className="text-xs text-primary uppercase tracking-wider">{item.tipo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Localização */}
      <section className="container mx-auto px-4">
        <SectionHeader title="Localização" icon={MapPin} />

        <div className="grid md:grid-cols-3 gap-8 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
          <div className="p-8 col-span-1 flex flex-col justify-center">
            <h3 className="text-2xl font-display text-white mb-2">Ginásio da FEF</h3>
            <p className="text-gray-400 mb-6">
              Av. Érico Veríssimo, 701<br />
              Cidade Universitária<br />
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
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden={false}
              tabIndex={0}
              className="filter grayscale invert contrast-125 brightness-75 hover:filter-none transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 3. Aviso Novo no Tatame */}
      <section className="container mx-auto px-4">
        <div className="bg-zinc-900 border-l-4 border-primary p-8 rounded-r-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-display text-white mb-2">Novo no Tatame?</h2>
              <p className="text-gray-400">
                Preparamos um guia completo para iniciantes. O que levar, como se comportar e o que esperar do primeiro treino.
              </p>
            </div>
            <Link to="/guia" className="flex items-center gap-2 text-primary hover:text-white transition-colors font-bold uppercase whitespace-nowrap">
              Ler o Guia Completo <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treinos;
