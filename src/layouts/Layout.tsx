import { ReactNode } from "react";
import { SkeletonNavbar } from "@/components/skeletons";
import { useFontsLoaded } from "@/hooks/ui/use-fonts-loaded.hook";
import { useNavigation } from "@/hooks/ui/use-navigation.hook";
import { Navbar, Footer } from "./_components";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const fontsLoaded = useFontsLoaded();
  const { isMenuOpen, toggleMenu, closeMenu, isActive, navLinks } =
    useNavigation();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-surface">
      {fontsLoaded ? (
        <>
          <Navbar
            isMenuOpen={isMenuOpen}
            onToggleMenu={toggleMenu}
            onCloseMenu={closeMenu}
            isActive={isActive}
            navLinks={navLinks}
          />
          <main className="flex-grow">{children}</main>
          <Footer />
        </>
      ) : (
        <>
          <SkeletonNavbar />
          <main className="flex-grow" />
          <Footer />
        </>
      )}
    </div>
  );
};
