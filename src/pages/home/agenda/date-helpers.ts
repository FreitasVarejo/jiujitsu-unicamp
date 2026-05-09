/**
 * Utilitários para manipulação e formatação de datas.
 * Centralizados para evitar duplicação entre mobile e desktop.
 */

/**
 * Formata um Date como "YYYY-MM-DD".
 */
export const fmtDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * Formata um Date como "DD/MM".
 */
export const fmtDDMM = (d: Date): string =>
  `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

/**
 * Adiciona `days` a uma data YYYY-MM-DD e retorna o Date resultante.
 */
export const addDaysToDateString = (dateStr: string, days: number): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Adiciona `days` a uma data YYYY-MM-DD e retorna YYYY-MM-DD.
 */
export const addDays = (dateStr: string, days: number): string => {
  const d = addDaysToDateString(dateStr, days);
  return fmtDate(d);
};

/**
 * Retorna a data do domingo da semana que contém `now`.
 * Resultado como YYYY-MM-DD.
 */
export const getSundayOf = (now: Date): string => {
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay()); // getDay(): 0=Dom
  return fmtDate(sunday);
};

/**
 * Retorna o dia da semana (0=Dom..6=Sáb) a partir de um datetime ou date ISO.
 */
export const getDayOfWeek = (dateTime?: string, date?: string): number => {
  const raw = dateTime ?? date ?? "";
  if (!raw) return 0;

  const dateStr = raw.slice(0, 10);
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.getDay(); // 0=Dom..6=Sáb
};

/**
 * Extrai HH:MM de um datetime ISO.
 * Ex: "2026-03-01T14:00:00-03:00" → "14:00"
 */
export const extractTime = (dateTime?: string, date?: string): string => {
  if (dateTime) {
    const match = dateTime.match(/T(\d{2}:\d{2})/);
    return match ? match[1] : "";
  }
  if (date) return "Dia inteiro";
  return "";
};

/**
 * Labels para os dias da semana (português brasileiro).
 */
export const DAY_LABELS: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
};

/**
 * Array com todos os offsets de dias da semana (0-6).
 */
export const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];
