import { AlertCircle } from "lucide-react";
import { useEvents } from "./event.hook";
import { YearSection } from "./components";

export const Eventos = () => {
  const { years, groupedEvents, visibleCounts, loading, error, handleSeeMore } =
    useEvents();

  if (loading) {
    return (
      <div className="container py-24 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-gray-400">Carregando eventos...</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <header className="mb-12">
        <h1 className="mb-2 font-display text-4xl text-white">Eventos</h1>
        <p className="font-sans text-gray-400">
          Confira os registros oficiais da nossa trajetória no Jiu-Jitsu.
        </p>
      </header>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 font-display text-xl text-white">
            Ops! Algo deu errado
          </h3>
          <p className="mx-auto max-w-md text-gray-400">{error}</p>
        </div>
      ) : years.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
          <p className="text-lg text-gray-400">
            Nenhum evento registrado no momento.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <YearSection
              key={year}
              year={year}
              events={groupedEvents[year] || []}
              visibleCount={visibleCounts[year] || 4}
              onSeeMore={handleSeeMore}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export * from "./detalhes";
