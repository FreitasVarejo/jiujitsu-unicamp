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
    <div className="mt-8 pt-8 border-t border-zinc-700">
      <h3 className="text-sm font-display uppercase tracking-widest text-zinc-400 mb-4">
        Legenda de cores
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {legendItems.map((item) => (
          <div
            key={item.type}
            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            {/* Swatch de cor */}
            <div
              className="w-6 h-6 rounded-md flex-shrink-0"
              style={{ backgroundColor: item.darkColors.main }}
              title={item.label}
            />
            {/* Label */}
            <span className="text-sm text-zinc-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
