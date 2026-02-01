import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { data } from '@/data';
import { SectionHeader } from './_components/SectionHeader';

const Home = () => {

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080/1a1a1a/d26030?text=Jiu-Jitsu+Unicamp')" }}
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
            Jiu-Jitsu <span className="text-primary">Unicamp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Defesa pessoal, competição e comunidade. Junte-se à equipe oficial da universidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/guia"
              className="px-8 py-4 bg-primary text-white font-display uppercase tracking-widest text-lg hover:bg-orange-700 transition-colors rounded"
            >
              Comece Agora
            </Link>
            <Link
              to="/membros"
              className="px-8 py-4 border border-white text-white font-display uppercase tracking-widest text-lg hover:bg-white/10 transition-colors rounded"
            >
              Conheça a Equipe
            </Link>
          </div>
        </div>
      </section>

      {/* Mini Guia Preview */}
      <section className="container mx-auto px-4">
        <div className="bg-zinc-900 border-l-4 border-primary p-8 rounded-r-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-display text-white mb-2">Novo no Tatame?</h2>
              <p className="text-gray-400">
                Preparamos um guia completo para iniciantes. O que levar, como se comportar e o que esperar do primeiro treino.
              </p>
            </div>
            <Link to="/guia" className="flex items-center gap-2 text-primary hover:text-white transition-colors font-bold uppercase">
              Ler o Guia Completo <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Horários */}
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

      {/* Localização */}
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
    </div>
  );
};

export default Home;
