import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const ReturnToEventPageLink = () => {
  return (
    <Link
      to="/eventos"
      className="group mb-8 inline-flex items-center gap-2 text-zinc-500 transition-colors hover:text-primary"
    >
      <ChevronLeft
        size={20}
        className="transition-transform group-hover:-translate-x-1"
      />
      <span className="font-display text-sm uppercase tracking-widest">
        Voltar para Eventos
      </span>
    </Link>
  );
};
