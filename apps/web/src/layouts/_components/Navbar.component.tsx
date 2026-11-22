import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLinkList } from "./NavLinkList.component";

interface NavbarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  isActive: (path: string) => boolean;
  navLinks: Array<{ path: string; label: string }>;
}

export const Navbar = ({
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  isActive,
  navLinks,
}: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              to="/"
              className="font-display text-3xl font-bold tracking-wider text-primary"
            >
              BJJ <span className="text-white">UNICAMP</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavLinkList
              navLinks={navLinks}
              isActive={isActive}
              isMobile={false}
              onClose={onCloseMenu}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMenu}
              className="text-foreground hover:bg-transparent hover:text-primary dark:hover:bg-transparent"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 bg-black md:hidden">
            <NavLinkList
              navLinks={navLinks}
              isActive={isActive}
              isMobile={true}
              onClose={onCloseMenu}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
