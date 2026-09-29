import { Instagram, MapPin, MessageSquareHeart } from "lucide-react";
import { FEEDBACK_FORM_URL } from "@/constants";
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
      <OutboundLink
        href={FEEDBACK_FORM_URL}
        trackLabel="feedback_footer"
        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary"
        aria-label="Feedback e canal de escuta anônimo"
      >
        <MessageSquareHeart size={24} />
        <span>Feedback</span>
      </OutboundLink>
    </div>
  );
};
