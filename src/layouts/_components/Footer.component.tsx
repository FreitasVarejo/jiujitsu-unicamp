import { FooterContent } from "./FooterContent.component";
import { FooterLinks } from "./FooterLinks.component";
import { FooterCopyright } from "./FooterCopyright.component";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <FooterContent />
          <FooterLinks />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};
