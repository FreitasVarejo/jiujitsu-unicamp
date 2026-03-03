export const SkeletonNavbar = () => (
  <nav className="border-b border-white/10 sticky top-0 bg-black/95 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        {/* Logo placeholder */}
        <div className="w-32 h-8 bg-zinc-800 rounded animate-pulse" />

        {/* Desktop menu placeholders */}
        <div className="hidden md:flex gap-8">
          <div className="w-20 h-6 bg-zinc-800 rounded animate-pulse" />
          <div className="w-20 h-6 bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Mobile menu button placeholder */}
        <div className="md:hidden w-10 h-10 bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  </nav>
)
