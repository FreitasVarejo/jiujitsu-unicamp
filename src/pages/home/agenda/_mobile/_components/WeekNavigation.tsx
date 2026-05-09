import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekNavigationProps {
  rangeLabel: string;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Barra de navegação entre semanas com setas esquerda/direita e label do range.
 */
export const WeekNavigation = ({
  rangeLabel,
  onPrevious,
  onNext,
}: WeekNavigationProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <button
        onClick={onPrevious}
        aria-label="Semana anterior"
        className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="font-display text-sm uppercase tracking-widest text-zinc-300">
        {rangeLabel}
      </span>
      <button
        onClick={onNext}
        aria-label="Próxima semana"
        className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
