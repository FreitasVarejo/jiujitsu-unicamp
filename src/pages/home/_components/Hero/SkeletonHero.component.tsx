export const SkeletonHero = () => (
  <section className="relative flex h-[95vh] items-center justify-center overflow-hidden bg-zinc-900">
    {/* Conteúdo */}
    <div className="relative z-[4] mx-auto max-w-4xl px-4 text-center">
      {/* Logo placeholder */}
      <div className="mx-auto mb-8 h-32 w-32 animate-pulse rounded-full bg-zinc-800 md:h-48 md:w-48" />

      {/* Título placeholder (3 linhas) */}
      <div className="mx-auto mb-6 max-w-2xl space-y-4">
        <div className="h-12 animate-pulse rounded bg-zinc-800" />
        <div className="mx-auto h-12 w-5/6 animate-pulse rounded bg-zinc-800" />
        <div className="mx-auto h-12 w-4/6 animate-pulse rounded bg-zinc-800" />
      </div>

      {/* Subtítulo placeholder (2 linhas) */}
      <div className="mx-auto mb-10 max-w-2xl space-y-3">
        <div className="h-6 animate-pulse rounded bg-zinc-800" />
        <div className="mx-auto h-6 w-4/5 animate-pulse rounded bg-zinc-800" />
      </div>

      {/* Botões placeholder */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <div className="h-14 animate-pulse rounded bg-zinc-800 px-8" />
        <div className="h-14 animate-pulse rounded bg-zinc-800 px-8" />
      </div>
    </div>
  </section>
);
