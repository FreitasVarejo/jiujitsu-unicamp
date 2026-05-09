import { Instagram, MapPin } from "lucide-react";
import { OutboundLink } from "@/components/OutboundLink.component";

export const FooterLinks = () => {
  return (
    <div className="flex items-center gap-6">
      <OutboundLink
        href="https://www.instagram.com/jiujitsu.unicamp/"
        trackLabel="instagram_footer"
        className="text-gray-400 transition-colors hover:text-primary"
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </OutboundLink>
      <OutboundLink
        href="https://maps.app.goo.gl/r88brrFBeAUawRVN8"
        trackLabel="maps_footer"
        className="text-gray-400 transition-colors hover:text-primary"
        aria-label="Localização"
      >
        <MapPin size={24} />
      </OutboundLink>
    </div>
  );
};
