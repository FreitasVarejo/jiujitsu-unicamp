import { Image } from "@/types";

interface HeroContentProps {
  logo: Image | null;
}

export const HeroContent = ({ logo }: HeroContentProps) => (
  <div className="relative z-[4] mx-auto max-w-4xl px-4 text-center">
    {logo && (
      <img
        src={logo.url}
        alt={logo.alternativeText || "Logo"}
        className="mx-auto mb-8 h-32 w-32 drop-shadow-2xl md:h-48 md:w-48"
      />
    )}
    <h1 className="mb-6 font-display text-6xl font-bold tracking-tighter text-white md:text-8xl">
      Jiu-Jitsu <span className="text-primary">Unicamp</span>
    </h1>
    <p className="mx-auto mb-10 max-w-2xl text-xl font-light text-gray-300 md:text-2xl">
      Defesa pessoal, competição e comunidade. Junte-se à equipe oficial da
      universidade.
    </p>
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <a
        href="#treinos"
        className="rounded bg-primary px-8 py-4 font-display text-lg uppercase tracking-widest text-white transition-colors hover:bg-orange-700"
      >
        Ver Treinos
      </a>
      <a
        href="#perguntas-frequentes"
        className="rounded border border-white px-8 py-4 font-display text-lg uppercase tracking-widest text-white transition-colors hover:bg-white/10"
      >
        Guia do Iniciante
      </a>
    </div>
  </div>
);
