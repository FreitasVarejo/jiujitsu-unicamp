import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        aria-label="Semana anterior"
        className="rounded-md text-zinc-400 hover:bg-zinc-700 hover:text-white dark:hover:bg-zinc-700"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <span className="font-display text-sm tracking-widest text-zinc-300 uppercase">
        {rangeLabel}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        aria-label="Próxima semana"
        className="rounded-md text-zinc-400 hover:bg-zinc-700 hover:text-white dark:hover:bg-zinc-700"
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
};
