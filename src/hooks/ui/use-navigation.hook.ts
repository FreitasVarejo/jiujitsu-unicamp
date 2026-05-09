import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

interface NavLink {
  path: string;
  label: string;
}

interface UseNavigationReturn {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  isActive: (path: string) => boolean;
  navLinks: NavLink[];
}

export const useNavigation = (): UseNavigationReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks: NavLink[] = [
    { path: "/eventos", label: "Eventos" },
    { path: "/loja", label: "Loja" },
  ];

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    isActive,
    navLinks,
  };
};
