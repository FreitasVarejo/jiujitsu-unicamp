import { Instagram, MapPin } from "lucide-react";

export const FooterLinks = () => {
  return (
    <div className="flex items-center gap-6">
      <a
        href="https://www.instagram.com/jiujitsu.unicamp/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 transition-colors hover:text-primary"
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </a>
      <a
        href="https://maps.app.goo.gl/r88brrFBeAUawRVN8"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 transition-colors hover:text-primary"
        aria-label="Localização"
      >
        <MapPin size={24} />
      </a>
    </div>
  );
};
