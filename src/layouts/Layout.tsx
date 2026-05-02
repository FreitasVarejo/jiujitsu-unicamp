import { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, MapPin } from "lucide-react";
import { SkeletonNavbar } from "@/components/skeletons";
import { useFontsLoaded } from "@/hooks/ui/use-fonts-loaded.hook";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const fontsLoaded = useFontsLoaded();

  const navLinks = [
    { path: "/eventos", label: "Eventos" },
    { path: "/loja", label: "Loja" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-surface">
      {fontsLoaded ? (
        <>
          {/* Navbar */}
          <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-20 items-center justify-between">
                <div className="flex-shrink-0">
                  <Link
                    to="/"
                    className="font-display text-3xl font-bold tracking-wider text-primary"
                  >
                    BJJ <span className="text-white">UNICAMP</span>
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`font-display uppercase tracking-wide transition-colors duration-200 hover:text-primary ${
                          isActive(link.path) ? "text-primary" : "text-surface"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-surface hover:text-primary"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="border-t border-white/10 bg-black md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 font-display text-lg uppercase ${
                        isActive(link.path) ? "text-primary" : "text-surface"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <footer className="border-t border-white/10 bg-black py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl text-white">
                    Jiu-Jitsu Unicamp
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Desde 2018 - Campinas, SP
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <a
                    href="https://www.instagram.com/jiujitsu.unicamp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://maps.app.goo.gl/r88brrFBeAUawRVN8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <MapPin size={24} />
                  </a>
                </div>
              </div>
              <div className="mt-8 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Equipe de Jiu-Jitsu da
                Unicamp. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
          <SkeletonNavbar />
          <main className="flex-grow" />
          <footer className="border-t border-white/10 bg-black py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl text-white">
                    Jiu-Jitsu Unicamp
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Desde 2018 - Campinas, SP
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <a
                    href="https://www.instagram.com/jiujitsu.unicamp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://maps.app.goo.gl/r88brrFBeAUawRVN8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <MapPin size={24} />
                  </a>
                </div>
              </div>
              <div className="mt-8 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Equipe de Jiu-Jitsu da
                Unicamp. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
