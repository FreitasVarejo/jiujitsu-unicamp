import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => (
  <section className="relative flex h-[95vh] items-center justify-center overflow-hidden bg-zinc-900">
    {/* Conteúdo */}
    <div className="relative z-4 mx-auto max-w-4xl px-4 text-center">
      {/* Logo placeholder */}
      <Skeleton className="mx-auto mb-8 h-32 w-32 rounded-full md:h-48 md:w-48" />

      {/* Título placeholder (3 linhas) */}
      <div className="mx-auto mb-6 max-w-2xl space-y-4">
        <Skeleton className="h-12 rounded-sm" />
        <Skeleton className="mx-auto h-12 w-5/6 rounded-sm" />
        <Skeleton className="mx-auto h-12 w-4/6 rounded-sm" />
      </div>

      {/* Subtítulo placeholder (2 linhas) */}
      <div className="mx-auto mb-10 max-w-2xl space-y-3">
        <Skeleton className="h-6 rounded-sm" />
        <Skeleton className="mx-auto h-6 w-4/5 rounded-sm" />
      </div>

      {/* Botões placeholder */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Skeleton className="h-14 rounded-sm px-8" />
        <Skeleton className="h-14 rounded-sm px-8" />
      </div>
    </div>
  </section>
);
