import { AlertCircle } from "lucide-react";
import { useEvents } from "./event.hook";
import { EventStats } from "./components/EventStats";
import { YearSection } from "./components/YearSection";

export const Eventos = () => {
  const {
    years,
    groupedEvents,
    eventInfo,
    visibleCounts,
    loading,
    error,
    handleSeeMore,
  } = useEvents();

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
        <p className="text-gray-400 font-sans">
          Confira os registros oficiais da nossa trajetória no Jiu-Jitsu.
        </p>
      </header>

      <EventStats />

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-display text-white mb-2">
            Ops! Algo deu errado
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">{error}</p>
        </div>
      ) : years.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">
            Nenhum evento registrado no momento.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <YearSection
              key={year}
              year={year}
              folders={groupedEvents[year] || []}
              eventInfo={eventInfo}
              visibleCount={visibleCounts[year] || 4}
              onSeeMore={handleSeeMore}
            />
          ))}
        </div>
      )}
    </div>
  );
};
