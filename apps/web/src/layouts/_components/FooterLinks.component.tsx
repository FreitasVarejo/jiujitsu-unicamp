import { MapPin, MessageSquareHeart } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon.component";
import { FEEDBACK_FORM_URL } from "@/constants";
import { OutboundLink } from "@/components/OutboundLink.component";

export const FooterLinks = () => {
  return (
    <div className="flex items-center gap-6">
      <OutboundLink
        href="https://www.instagram.com/jiujitsu.unicamp/"
        trackLabel="instagram_footer"
        className="text-gray-400 transition-colors hover:text-primary-text"
        aria-label="Instagram"
      >
        <InstagramIcon size={24} />
      </OutboundLink>
      <OutboundLink
        href="https://maps.app.goo.gl/r88brrFBeAUawRVN8"
        trackLabel="maps_footer"
        className="text-gray-400 transition-colors hover:text-primary-text"
        aria-label="Localização"
      >
        <MapPin size={24} />
      </OutboundLink>
      <OutboundLink
        href={FEEDBACK_FORM_URL}
        trackLabel="feedback_footer"
        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-text"
        aria-label="Feedback e canal de escuta anônimo"
      >
        <MessageSquareHeart size={24} />
        <span>Feedback</span>
      </OutboundLink>
    </div>
  );
};
