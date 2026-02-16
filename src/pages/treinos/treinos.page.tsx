import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { data } from '@/data';
import { SectionHeader } from '../home/_components/SectionHeader';
import { Link } from 'react-router-dom';

const Treinos = () => {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* 1. Horários de Treinos */}
      <section className="w-full px-4">
        <div className="container mx-auto">
          <SectionHeader title="Horários de Treino" icon={Clock} />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-zinc-800 table-fixed">
            <thead>
              <tr>
                <th className="border border-zinc-800 p-3 bg-zinc-900 text-white font-display text-lg"style={{width: '150px'}}>Horários / Dias</th>
                {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map(dia => (
                  <th key={dia} className="border border-zinc-800 p-3 bg-zinc-900 text-white font-display text-lg">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const horariosSet = new Set();
                data.horarios.diurnos.forEach(item => {
                  if (item.comp !== '-') horariosSet.add(item.comp);
                  if (item.geral !== '-') horariosSet.add(item.geral);
                  if (item.feminino !== '-') horariosSet.add(item.feminino);
                });
                const horarios = Array.from(horariosSet).sort() as string[];
                
                return horarios.map((horario: string) => (
                  <tr key={horario}>
                    <td className="border border-zinc-800 p-3 bg-zinc-900/50 text-white font-bold text-center">{horario}</td>
                    {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(dia => {
                      const diaTreino = data.horarios.diurnos.find(d => d.dia === dia);
                      if (!diaTreino) return null;
                      
                      let tipo = null;
                      if (diaTreino.comp === horario) tipo = 'Competição';
                      else if (diaTreino.geral === horario) tipo = 'Geral';
                      else if (diaTreino.feminino === horario) tipo = 'Feminino';
                      
                      return (
                        <td 
                          key={`${dia}-${horario}`}
                          className="border border-zinc-800 p-3 text-center bg-zinc-900/30"
                        >
                          {tipo && (
                            <span className={`text-base font-semibold ${
                              tipo === 'Competição' ? 'text-yellow-300' :
                              tipo === 'Geral' ? 'text-orange-300' :
                              tipo === 'Feminino' ? 'text-red-400' : 
                              'text-white'
                            }`}>
                              {tipo === 'Geral' ? 'GERAL' : tipo}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
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
