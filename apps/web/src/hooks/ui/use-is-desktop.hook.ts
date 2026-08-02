import { useMediaQuery } from "./use-media-query.hook";

// Breakpoint padrão do projeto: md (768px) do Tailwind
const DESKTOP_BREAKPOINT = "(min-width: 768px)";

export const useIsDesktop = (): boolean => {
  return useMediaQuery(DESKTOP_BREAKPOINT);
};
