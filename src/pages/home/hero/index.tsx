import { HeroSkeleton } from "./HeroSkeleton";
import { useHeroCarousel } from "./_hooks/useHeroCarousel";
import { HeroContent } from "./HeroContent";
import { HeroCarousel } from "./HeroCarousel";
import { HeroError } from "./HeroError";

export const Hero = () => {
  const { imagesToShow, logo, isLoading, error } = useHeroCarousel();

  if (!isLoading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return <HeroError logo={logo} />;
  }

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <HeroCarousel images={imagesToShow} />
      <HeroContent logo={logo} />
    </section>
  );
};
