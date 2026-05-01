import { INFO_CARD_ITEMS } from "@/constants/home";

export const InfoCard = () => {
  return (
    <div className="space-y-6 lg:col-span-4">
      {INFO_CARD_ITEMS.map((card) => (
        <div
          className={`rounded-lg border-t-4 bg-zinc-900 p-6 ${card.borderColor} flex gap-4`}
        >
          <card.icon className={`${card.iconColor} flex-shrink-0`} size={32} />
          <div>
            <h3 className="mb-2 font-display text-xl text-white">
              {card.title}
            </h3>
            <p className="text-sm text-gray-400">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
