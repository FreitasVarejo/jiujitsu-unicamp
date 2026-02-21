import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl font-bold text-primary mb-2">404</p>
        <h1 className="text-3xl font-display text-white mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-400 mb-10">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-display uppercase tracking-wide px-6 py-3 rounded hover:bg-primary/80 transition-colors"
          >
            <Home size={18} />
            Ir para o início
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-surface font-display uppercase tracking-wide px-6 py-3 rounded hover:border-white/40 transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
