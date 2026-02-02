import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight, Medal, AlertCircle } from 'lucide-react';
import { data, Evento } from '@/data';

const EventosPage = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mediaBase = import.meta.env.VITE_MEDIA_BASE_URL || '/media';

  // Calculate total medals from team data
  const totalMedals = data.equipe.reduce((acc, member) => {
    acc.ouro += member.medalhas.ouro;
    acc.prata += member.medalhas.prata;
    acc.bronze += member.medalhas.bronze;
    return acc;
  }, { ouro: 0, prata: 0, bronze: 0 });

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Fetch index first to get list of folders dynamically
        const indexResponse = await fetch(`${mediaBase}/eventos/index.json`);
        if (!indexResponse.ok) throw new Error("Falha ao carregar o índice de eventos");
        const eventFolders: string[] = await indexResponse.json();

        if (!Array.isArray(eventFolders)) {
          throw new Error("Formato inválido do índice de eventos");
        }

        const promises = eventFolders.map(async (folder) => {
          const response = await fetch(`${mediaBase}/eventos/${folder}/info.json`);
          if (!response.ok) throw new Error(`Failed to fetch info for ${folder}`);
          const info = await response.json();
          
          return {
            id: folder,
            nome: info.NOME,
            data: info.DATA,
            local: info.LOCAL,
            descricao: info.DESCRIÇÃO,
            thumbnail: `${mediaBase}/eventos/${folder}/0000.jpg`
          };
        });

        const results = await Promise.all(promises);
        // Sort by date descending
        results.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setEventos(results as Evento[]);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        setError("Não foi possível carregar os registros de eventos no momento. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [mediaBase]);

  // Group by year
  const groupedEventos = eventos.reduce((acc: { [key: string]: any[] }, evento) => {
    const year = new Date(evento.data).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(evento);
    return acc;
  }, {});

  const years = Object.keys(groupedEventos).sort((a, b) => Number(b) - Number(a));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando eventos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-display text-white mb-2">Eventos</h1>
        <p className="text-gray-400 font-sans">Confira os registros oficiais da nossa trajetória no Jiu-Jitsu.</p>
      </header>

      {/* Stats Summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-display text-white mb-1">Hall de Conquistas</h2>
            <p className="text-zinc-500 text-sm">Somatório de medalhas da nossa equipe em competições oficiais.</p>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <Medal className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-white">{totalMedals.ouro}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Ouro</div>
            </div>
            <div className="text-center">
              <Medal className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-white">{totalMedals.prata}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Prata</div>
            </div>
            <div className="text-center">
              <Medal className="w-10 h-10 text-amber-700 mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-white">{totalMedals.bronze}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Bronze</div>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-display text-white mb-2">Ops! Algo deu errado</h3>
          <p className="text-gray-400 max-w-md mx-auto">{error}</p>
        </div>
      ) : years.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">Nenhum evento registrado no momento.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map(year => (
            <section key={year}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-display text-primary">{year}</h2>
                <div className="h-px bg-zinc-800 flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {groupedEventos[year].map((evento: any) => (
                  <Link 
                    key={evento.id} 
                    to={`/evento/${evento.id}`} 
                    className="group relative h-48 md:h-64 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-end"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={evento.thumbnail} 
                        alt={evento.nome}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 w-full flex justify-between items-end">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-4 text-primary mb-2 text-sm font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {evento.local}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display text-white uppercase tracking-tight">
                          {evento.nome}
                        </h3>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-2 text-white/50 group-hover:text-primary transition-colors">
                        <span className="text-sm font-display uppercase tracking-widest">Ver Fotos</span>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventosPage;
