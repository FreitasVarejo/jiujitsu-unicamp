import { CALENDAR_TYPE_INFO, CalendarType } from '@/constants'

export const CalendarLegend = () => {
  // Filtra todos os tipos exceto FALLBACK
  const legendItems = Object.values(CalendarType)
    .filter((type) => type !== CalendarType.FALLBACK)
    .map((type) => ({
      type,
      ...CALENDAR_TYPE_INFO[type],
    }))

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
      {legendItems.map((item) => (
        <div key={item.type} className="flex items-center gap-2">
          {/* Swatch de cor minimalista */}
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.darkColors.main }}
          />
          {/* Label discreto */}
          <span className="text-zinc-500">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
