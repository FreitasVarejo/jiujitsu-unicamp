/**
 * Componente sem renderização visual que rastreia mudanças de rota SPA.
 *
 * Deve ser colocado dentro de <Router> em App.tsx, ao lado de <ScrollToTop />.
 * Dispara trackPageview() em cada navegação (incluindo o carregamento inicial).
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { telemetry } from "@/services/telemetry";

export const TelemetryPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    telemetry.trackPageview(location.pathname);
  }, [location.pathname]);

  return null;
};
