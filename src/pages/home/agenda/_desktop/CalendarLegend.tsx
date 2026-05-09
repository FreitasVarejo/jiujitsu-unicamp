import { CALENDAR_TYPE_INFO, CalendarType } from "@/constants/home";

export const CalendarLegend = () => {
  // Filtra todos os tipos exceto FALLBACK
  const legendItems = Object.values(CalendarType)
    .filter((type) => type !== CalendarType.FALLBACK)
    .map((type) => ({
      type,
      ...CALENDAR_TYPE_INFO[type],
    }));

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
      {legendItems.map((item) => (
        <div key={item.type} className="flex items-center gap-2">
          {/* Swatch de cor minimalista */}
          <div
            className="h-3 w-3 flex-shrink-0 rounded-full"
            style={{ backgroundColor: item.darkColors.main }}
          />
          {/* Label discreto */}
          <span className="text-zinc-400">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
