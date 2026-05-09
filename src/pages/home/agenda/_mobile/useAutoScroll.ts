import { useEffect, RefObject } from "react";

/**
 * Executa o scroll adaptativo para o card de hoje.
 * Posicionamento adaptativo: domingo = topo, seg-sex = 35% do topo, sábado = máximo possível.
 */
const performScroll = (
  container: HTMLDivElement,
  todayCard: HTMLDivElement,
  today: string
): void => {
  // Calcula a posição do card dentro do container
  const cardOffsetTop = todayCard.offsetTop;
  const containerHeight = container.clientHeight;
  const scrollHeight = container.scrollHeight;
  const maxScroll = scrollHeight - containerHeight;

  console.log("[useAutoScroll] Container metrics:", {
    cardOffsetTop,
    containerHeight,
    scrollHeight,
    maxScroll,
    hasScroll: scrollHeight > containerHeight,
  });

  // Determina dia da semana parseando YYYY-MM-DD manualmente (ignora timezone)
  const [year, month, day] = today.split("-").map(Number);
  const todayDate = new Date(year, month - 1, day);
  const dayOfWeek = todayDate.getDay();

  console.log("[useAutoScroll] Date parsing:", {
    today,
    year,
    month,
    day,
    dayOfWeek,
    dayName: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"][dayOfWeek],
  });

  let targetScroll: number;

  if (dayOfWeek === 0) {
    // Domingo (primeiro card): scroll para topo
    targetScroll = 0;
    console.log("[useAutoScroll] Sunday detected → scroll to top");
  } else if (dayOfWeek === 6) {
    // Sábado (último card): scroll máximo (mostra sábado no final do viewport)
    targetScroll = maxScroll;
    console.log("[useAutoScroll] Saturday detected → scroll to max", {
      targetScroll,
    });
  } else {
    // Segunda-feira a sexta-feira: posiciona card em 35% do topo
    targetScroll = Math.max(
      0,
      Math.min(maxScroll, cardOffsetTop - containerHeight * 0.35)
    );
    console.log(
      "[useAutoScroll] Weekday (Mon-Fri) detected → scroll to 35% position",
      { targetScroll }
    );
  }

  // Executa scroll suave
  console.log("[useAutoScroll] Executing scroll:", {
    targetScroll,
    behavior: "smooth",
  });
  container.scrollTo({ top: targetScroll, behavior: "smooth" });
};

/**
 * Hook para auto-scroll até o card de hoje quando a semana atual é exibida.
 * Usa retry logic para garantir que os refs estejam disponíveis antes de scrollar.
 *
 * @param containerRef - Ref do container scrollável
 * @param todayRef - Ref do card de hoje
 * @param today - Data de hoje (YYYY-MM-DD)
 * @param weekStart - Data de início da semana (YYYY-MM-DD)
 * @param weekEnd - Data de fim da semana (YYYY-MM-DD)
 */
export const useAutoScroll = (
  containerRef: RefObject<HTMLDivElement | null>,
  todayRef: RefObject<HTMLDivElement | null>,
  today: string,
  weekStart: string,
  weekEnd: string
) => {
  useEffect(() => {
    // Verifica se hoje está na semana sendo exibida
    const isTodayInWeek = today >= weekStart && today <= weekEnd;
    console.log("[useAutoScroll] Auto-scroll check:", {
      today,
      weekStart,
      weekEnd,
      isTodayInWeek,
    });

    if (!isTodayInWeek) {
      console.log(
        "[useAutoScroll] Today not in current week, skipping auto-scroll"
      );
      return;
    }

    // Aguarda DOM estar pronto e refs disponíveis (300ms com retry logic)
    const scrollTimer = setTimeout(() => {
      const container = containerRef.current;
      const todayCard = todayRef.current;

      console.log("[useAutoScroll] Checking refs after timeout:", {
        containerRef: !!container,
        todayRef: !!todayCard,
      });

      if (!container || !todayCard) {
        console.log("[useAutoScroll] Refs not available, retrying in 100ms");
        // Retry uma vez se as refs ainda não estiverem prontas
        const retryTimer = setTimeout(() => {
          const retryContainer = containerRef.current;
          const retryCard = todayRef.current;

          console.log("[useAutoScroll] Retry check:", {
            containerRef: !!retryContainer,
            todayRef: !!retryCard,
          });

          if (!retryContainer || !retryCard) {
            console.log("[useAutoScroll] Refs still not available, giving up");
            return;
          }

          performScroll(retryContainer, retryCard, today);
        }, 100);

        return () => clearTimeout(retryTimer);
      }

      performScroll(container, todayCard, today);
    }, 300);

    return () => clearTimeout(scrollTimer);
  }, [containerRef, todayRef, today, weekStart, weekEnd]);
};
