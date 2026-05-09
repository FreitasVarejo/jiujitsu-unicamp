import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="container flex min-h-[calc(100vh-160px)] items-center justify-center">
      <div className="max-w-md text-center">
        <p className="mb-2 font-display text-8xl font-bold text-primary">404</p>
        <h1 className="mb-4 font-display text-3xl text-white">
          Página não encontrada
        </h1>
        <p className="mb-10 text-gray-400">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded bg-primary px-6 py-3 font-display uppercase tracking-wide text-white transition-colors hover:bg-primary/80"
          >
            <Home size={18} />
            Ir para o início
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-3 font-display uppercase tracking-wide text-surface transition-colors hover:border-white/40"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
