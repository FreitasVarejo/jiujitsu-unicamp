/**
 * Adiciona `days` a uma data YYYY-MM-DD e retorna o Date resultante.
 */
export const addDays = (dateStr: string, days: number): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Formata um Date como "DD/MM".
 */
export const fmtDDMM = (d: Date): string =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

/**
 * Formata um Date como "YYYY-MM-DD".
 */
export const fmtDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Labels para os dias da semana (português brasileiro).
 */
export const DAY_LABELS: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

/**
 * Array com todos os offsets de dias da semana (0-6).
 */
export const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

/**
 * Executa o scroll adaptativo para o card de hoje.
 * Posicionamento adaptativo: domingo = topo, seg-sex = 35% do topo, sábado = máximo possível.
 */
export const performScroll = (
  container: HTMLDivElement,
  todayCard: HTMLDivElement,
  today: string,
): void => {
  // Calcula a posição do card dentro do container
  const cardOffsetTop = todayCard.offsetTop;
  const containerHeight = container.clientHeight;
  const scrollHeight = container.scrollHeight;
  const maxScroll = scrollHeight - containerHeight;

  console.log('[AgendaMobile] Container metrics:', {
    cardOffsetTop,
    containerHeight,
    scrollHeight,
    maxScroll,
    hasScroll: scrollHeight > containerHeight,
  });

  // Determina dia da semana parseando YYYY-MM-DD manualmente (ignora timezone)
  const [year, month, day] = today.split('-').map(Number);
  const todayDate = new Date(year, month - 1, day);
  const dayOfWeek = todayDate.getDay();

  console.log('[AgendaMobile] Date parsing:', { today, year, month, day, dayOfWeek, dayName: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][dayOfWeek] });

  let targetScroll: number;

  if (dayOfWeek === 0) {
    // Domingo (primeiro card): scroll para topo
    targetScroll = 0;
    console.log('[AgendaMobile] Sunday detected → scroll to top');
  } else if (dayOfWeek === 6) {
    // Sábado (último card): scroll máximo (mostra sábado no final do viewport)
    targetScroll = maxScroll;
    console.log('[AgendaMobile] Saturday detected → scroll to max', { targetScroll });
  } else {
    // Segunda-feira a sexta-feira: posiciona card em 35% do topo
    targetScroll = Math.max(0, Math.min(maxScroll, cardOffsetTop - containerHeight * 0.35));
    console.log('[AgendaMobile] Weekday (Mon-Fri) detected → scroll to 35% position', { targetScroll });
  }

  // Executa scroll suave
  console.log('[AgendaMobile] Executing scroll:', { targetScroll, behavior: 'smooth' });
  container.scrollTo({ top: targetScroll, behavior: 'smooth' });
};
