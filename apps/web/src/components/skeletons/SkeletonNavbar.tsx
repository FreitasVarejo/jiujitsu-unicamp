export const SkeletonNavbar = () => (
  <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        {/* Logo placeholder */}
        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800" />

        {/* Desktop menu placeholders */}
        <div className="hidden gap-8 md:flex">
          <div className="h-6 w-20 animate-pulse rounded bg-zinc-800" />
          <div className="h-6 w-20 animate-pulse rounded bg-zinc-800" />
        </div>

        {/* Mobile menu button placeholder */}
        <div className="h-10 w-10 animate-pulse rounded bg-zinc-800 md:hidden" />
      </div>
    </div>
  </nav>
);
