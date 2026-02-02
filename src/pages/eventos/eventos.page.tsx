import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight, Medal, AlertCircle } from 'lucide-react';
import { data } from '@/data';

const EventosPage = () => {
  const [eventFolders, setEventFolders] = useState<{ id: string, date: string, year: string }[]>([]);
  const [eventInfo, setEventInfo] = useState<Record<string, any>>({});
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
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
    const fetchEventIndex = async () => {
      try {
        const indexResponse = await fetch(`${mediaBase}/eventos/index.json`);
        if (!indexResponse.ok) throw new Error("Falha ao carregar o índice de eventos");
        const folders: string[] = await indexResponse.json();

        if (!Array.isArray(folders)) {
          throw new Error("Formato inválido do índice de eventos");
        }

        const folderData = folders.map(folder => {
          // Format: YYYY-MM-DD-name
          const match = folder.match(/^(\d{4})-(\d{2})-(\d{2})/);
          const date = match ? `${match[1]}-${match[2]}-${match[3]}` : '2000-01-01';
          const year = match ? match[1] : 'Antigo';
          return { id: folder, date, year };
        });

        // Sort folders by date descending
        folderData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setEventFolders(folderData);
        
        // Initialize visible counts (4 per year)
        const years = Array.from(new Set(folderData.map(f => f.year)));
        const initialCounts: Record<string, number> = {};
        years.forEach(year => initialCounts[year] = 4);
        setVisibleCounts(initialCounts);

      } catch (error) {
        console.error("Erro ao carregar índice:", error);
        setError("Não foi possível carregar os registros de eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventIndex();
  }, [mediaBase]);

  // Fetch info.json only for visible events that aren't cached yet
  useEffect(() => {
    if (eventFolders.length === 0) return;

    const fetchVisibleInfo = async () => {
      const foldersToFetch: string[] = [];
      
      // Group folders by year to check visibility
      const grouped = eventFolders.reduce((acc: Record<string, typeof eventFolders>, f) => {
        if (!acc[f.year]) acc[f.year] = [];
        acc[f.year].push(f);
        return acc;
      }, {});

      Object.entries(grouped).forEach(([year, folders]) => {
        const count = visibleCounts[year] || 4;
        folders.slice(0, count).forEach(f => {
          if (!eventInfo[f.id]) {
            foldersToFetch.push(f.id);
          }
        });
      });

      if (foldersToFetch.length === 0) return;

      // Fetch in batches to avoid overwhelming the network
      const results = await Promise.all(
        foldersToFetch.map(async (id) => {
          try {
            const response = await fetch(`${mediaBase}/eventos/${id}/info.json`);
            if (!response.ok) return null;
            const info = await response.json();
            return { id, info };
          } catch (e) {
            return null;
          }
        })
      );

      const newInfo = { ...eventInfo };
      results.forEach(res => {
        if (res) newInfo[res.id] = res.info;
      });
      setEventInfo(newInfo);
    };

    fetchVisibleInfo();
  }, [eventFolders, visibleCounts, mediaBase]);

  // Speculative pre-fetching with prioritized phases and delay
  useEffect(() => {
    if (loading || eventFolders.length === 0) return;

    let isMounted = true;
    let imageWarmingIntervals: NodeJS.Timeout[] = [];
    let nextPhaseTimeout: NodeJS.Timeout;

    const prefetchLogic = async () => {
      // PHASE 1: Fetch all remaining info.json in background (Low priority metadata)
      const remainingFolders = eventFolders.filter(f => !eventInfo[f.id]);
      
      const scheduleFetch = (fn: () => void) => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(fn);
        } else {
          setTimeout(fn, 1000);
        }
      };

      scheduleFetch(async () => {
        if (!isMounted) return;
        
        // --- Phase 1: Metadata ---
        if (remainingFolders.length > 0) {
          const batchSize = 8;
          for (let i = 0; i < remainingFolders.length; i += batchSize) {
            if (!isMounted) break;
            const batch = remainingFolders.slice(i, i + batchSize);
            const results = await Promise.all(
              batch.map(async (f) => {
                try {
                  const response = await fetch(`${mediaBase}/eventos/${f.id}/info.json`);
                  if (!response.ok) return null;
                  const info = await response.json();
                  return { id: f.id, info };
                } catch (e) { return null; }
              })
            );
            if (isMounted) {
              setEventInfo(prev => {
                const next = { ...prev };
                results.forEach(res => { if (res) next[res.id] = res.info; });
                return next;
              });
            }
            await new Promise(resolve => setTimeout(resolve, 600));
          }
        }

        // --- Phase 2: Hidden Thumbnails ---
        // Pre-fetch 0000.jpg for events currently not visible
        nextPhaseTimeout = setTimeout(async () => {
          if (!isMounted) return;

          const hiddenFolders: typeof eventFolders = [];
          const grouped = eventFolders.reduce((acc: Record<string, typeof eventFolders>, f) => {
            if (!acc[f.year]) acc[f.year] = [];
            acc[f.year].push(f);
            return acc;
          }, {});

          Object.entries(grouped).forEach(([year, folders]) => {
            const count = visibleCounts[year] || 4;
            if (folders.length > count) {
              hiddenFolders.push(...folders.slice(count));
            }
          });

          if (hiddenFolders.length > 0) {
            const thumbBatchSize = 4;
            for (let i = 0; i < hiddenFolders.length; i += thumbBatchSize) {
              if (!isMounted) break;
              const batch = hiddenFolders.slice(i, i + thumbBatchSize);
              batch.forEach(f => {
                // Pre-warm 0000.webp for hidden thumbnails
                const img = new Image();
                img.src = `${mediaBase}/eventos/${f.id}/0000.webp`;
              });
              await new Promise(resolve => setTimeout(resolve, 1000)); // Be gentle with network
            }
          }

          // --- Phase 3: Top Event Internal Images ---
          nextPhaseTimeout = setTimeout(() => {
            if (!isMounted) return;
            const topEvents = eventFolders.slice(0, 2);
            topEvents.forEach(event => {
              const checkAndWarm = setInterval(() => {
                const info = eventInfo[event.id];
                if (info && info.IMAGENS_COUNT) {
                  clearInterval(checkAndWarm);
                  const count = Math.min(info.IMAGENS_COUNT, 4);
                  for (let i = 1; i <= count; i++) { // Start from 0001.webp/jpg
                    const webp = new Image();
                    webp.src = `${mediaBase}/eventos/${event.id}/${String(i).padStart(4, '0')}.webp`;
                    const jpg = new Image();
                    jpg.src = `${mediaBase}/eventos/${event.id}/${String(i).padStart(4, '0')}.jpg`;
                  }
                }
              }, 3000);
              imageWarmingIntervals.push(checkAndWarm);
              setTimeout(() => clearInterval(checkAndWarm), 20000);
            });
          }, 4000);
        }, 2000);
      });
    };

    // Initial 4-second delay to give absolute priority to visible thumbnails
    const mainTimeout = setTimeout(() => {
      if (isMounted) prefetchLogic();
    }, 4000);

    return () => {
      isMounted = false;
      clearTimeout(mainTimeout);
      clearTimeout(nextPhaseTimeout);
      imageWarmingIntervals.forEach(clearInterval);
    };
  }, [loading, eventFolders, mediaBase]);

  const handleSeeMore = (year: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisibleCounts(prev => ({
      ...prev,
      [year]: prev[year] + 6
    }));
  };

  // Group by year for rendering
  const years = Array.from(new Set(eventFolders.map(f => f.year))).sort((a, b) => Number(b) - Number(a));
  const groupedEventFolders = eventFolders.reduce((acc: Record<string, typeof eventFolders>, f) => {
    if (!acc[f.year]) acc[f.year] = [];
    acc[f.year].push(f);
    return acc;
  }, {});

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
          {years.map(year => {
            const folders = groupedEventFolders[year] || [];
            const visibleCount = visibleCounts[year] || 4;
            const visibleFolders = folders.slice(0, visibleCount);
            const hasMore = folders.length > visibleCount;

            return (
              <section key={year}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-display text-primary">{year}</h2>
                  <div className="h-px bg-zinc-800 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {visibleFolders.map((folder, index) => {
                    const info = eventInfo[folder.id];
                    const isLastVisible = index === visibleCount - 1 && hasMore;
                    const remaining = folders.length - visibleCount;

                    if (isLastVisible) {
                      return (
                        <button 
                          key={folder.id} 
                          onClick={(e) => handleSeeMore(year, e)}
                          className="group relative h-64 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-end text-left"
                        >
                          <div className="absolute inset-0">
                            <picture>
                              <source srcSet={`${mediaBase}/eventos/${folder.id}/0000.webp`} type="image/webp" />
                              <img 
                                src={`${mediaBase}/eventos/${folder.id}/0000.jpg`} 
                                alt={info?.NOME || folder.id}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 grayscale blur-[2px]"
                              />
                            </picture>
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
                          </div>

                          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <div className="bg-primary/20 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                              <ChevronRight size={32} className="text-primary rotate-90" />
                            </div>
                            <span className="text-white font-display text-xl uppercase tracking-widest">
                              Ver mais {year}
                            </span>
                            <span className="text-primary/80 text-sm font-sans mt-1">
                              +{remaining} eventos registrados
                            </span>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <Link 
                        key={folder.id} 
                        to={`/evento/${folder.id}`} 
                        className="group relative h-64 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-end"
                      >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <picture>
                            <source srcSet={`${mediaBase}/eventos/${folder.id}/0000.webp`} type="image/webp" />
                            <img 
                              src={`${mediaBase}/eventos/${folder.id}/0000.jpg`} 
                              alt={info?.NOME || folder.id}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </picture>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-6 md:p-8 w-full flex justify-between items-end">
                          <div className="max-w-2xl">
                            <div className="flex items-center gap-4 text-primary mb-2 text-sm font-semibold">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(folder.date).toLocaleDateString('pt-BR')}
                              </span>
                              {info && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {info.LOCAL}
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display text-white uppercase tracking-tight drop-shadow-sm">
                              {info?.NOME || 'Carregando...'}
                            </h3>
                          </div>
                          
                          <div className="hidden md:flex items-center gap-2 text-white/90 group-hover:text-primary transition-colors">
                            <span className="text-sm font-display uppercase tracking-widest font-medium">Ver Fotos</span>
                            <ChevronRight size={20} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventosPage;
