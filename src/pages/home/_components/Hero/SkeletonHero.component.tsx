export const SkeletonHero = () => (
  <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-zinc-900">
    {/* Conteúdo */}
    <div className="relative z-[4] text-center px-4 max-w-4xl mx-auto">
      {/* Logo placeholder */}
      <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 rounded-full bg-zinc-800 animate-pulse" />

      {/* Título placeholder (3 linhas) */}
      <div className="space-y-4 mb-6 max-w-2xl mx-auto">
        <div className="h-12 bg-zinc-800 rounded animate-pulse" />
        <div className="h-12 bg-zinc-800 rounded animate-pulse w-5/6 mx-auto" />
        <div className="h-12 bg-zinc-800 rounded animate-pulse w-4/6 mx-auto" />
      </div>

      {/* Subtítulo placeholder (2 linhas) */}
      <div className="space-y-3 mb-10 max-w-2xl mx-auto">
        <div className="h-6 bg-zinc-800 rounded animate-pulse" />
        <div className="h-6 bg-zinc-800 rounded animate-pulse w-4/5 mx-auto" />
      </div>

      {/* Botões placeholder */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="h-14 px-8 bg-zinc-800 rounded animate-pulse" />
        <div className="h-14 px-8 bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  </section>
)
