import { ArrowRight } from "lucide-react";
import { INFO_CARD_ITEMS } from "@/constants/home";
import { OutboundLink } from "@/components/OutboundLink.component";

export const InfoCard = () => {
  return (
    <div className="space-y-6 lg:col-span-4">
      {INFO_CARD_ITEMS.map((card) => (
        <div
          key={card.title}
          className={`rounded-lg border-t-4 bg-zinc-900 p-6 ${card.borderColor} flex gap-4`}
        >
          <card.icon className={`${card.iconColor} flex-shrink-0`} size={32} />
          <div>
            <h3 className="mb-2 font-display text-xl text-white">
              {card.title}
            </h3>
            <p className="text-sm text-gray-400">{card.description}</p>
            {card.link && (
              <OutboundLink
                href={card.link.href}
                trackLabel={card.link.trackLabel}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-orange-400"
              >
                {card.link.label}
                <ArrowRight size={16} />
              </OutboundLink>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
