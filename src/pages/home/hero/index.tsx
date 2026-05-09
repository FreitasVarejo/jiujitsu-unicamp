import { SkeletonHero, ErrorHero } from "./skeleton.tsx";
import { useHeroCarousel } from "./hook.tsx";
import { HeroBackground } from "./hero-background.tsx";
import { HeroContent } from "./hero-content.tsx";

export const Hero = () => {
  const {
    imagesToShow,
    logo,
    current,
    next,
    nextVisible,
    isLoaded,
    error,
    fadeDuration,
  } = useHeroCarousel();

  if (error) {
    return <ErrorHero message={error} />;
  }

  if (!isLoaded) {
    return <SkeletonHero />;
  }

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <HeroBackground
        images={imagesToShow}
        current={current}
        next={next}
        nextVisible={nextVisible}
        fadeDuration={fadeDuration}
      />

      <HeroContent logo={logo} />
    </section>
  );
};
