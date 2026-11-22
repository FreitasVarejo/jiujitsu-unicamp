import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonNavbar = () => (
  <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        {/* Logo placeholder */}
        <Skeleton className="h-8 w-32 rounded-sm" />

        {/* Desktop menu placeholders */}
        <div className="hidden gap-8 md:flex">
          <Skeleton className="h-6 w-20 rounded-sm" />
          <Skeleton className="h-6 w-20 rounded-sm" />
        </div>

        {/* Mobile menu button placeholder */}
        <Skeleton className="h-10 w-10 rounded-sm md:hidden" />
      </div>
    </div>
  </nav>
);
