import { HeroContent } from "./HeroContent";
import { HeroCarousel } from "./HeroCarousel";
import { Image } from "@/types";

type HeroErrorProps = {
  logo: Image | null;
};

export const HeroError = ({ logo }: HeroErrorProps) => {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <HeroCarousel images={[]} />
      <HeroContent logo={logo} />
    </section>
  );
};
