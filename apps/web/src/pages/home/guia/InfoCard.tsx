import { ArrowRight } from "lucide-react";
import { INFO_CARD_ITEMS } from "@/constants/home";
import { OutboundLink } from "@/components/OutboundLink.component";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const InfoCard = () => {
  return (
    <div className="space-y-6 lg:col-span-4">
      {INFO_CARD_ITEMS.map((card) => (
        <Card
          key={card.title}
          className={cn(
            "rounded-lg border-t-4 ring-0 [--card-spacing:--spacing(6)]",
            card.borderColor
          )}
        >
          <CardContent className="flex gap-4">
            <card.icon className={`${card.iconColor} shrink-0`} size={32} />
            <div>
              <CardTitle
                role="heading"
                aria-level={3}
                className="mb-2 text-xl leading-7 text-white"
              >
                {card.title}
              </CardTitle>
              <p className="text-sm text-gray-400">{card.description}</p>
              {card.link && (
                <OutboundLink
                  href={card.link.href}
                  trackLabel={card.link.trackLabel}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-text transition-colors hover:text-orange-400"
                >
                  {card.link.label}
                  <ArrowRight size={16} />
                </OutboundLink>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
