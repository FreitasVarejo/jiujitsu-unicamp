import { useEffect } from "react";

/**
 * Hook que gerencia escape key e body overflow do modal
 */
export const useProductModalEscape = (onClose: () => void): void => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);
};
