import { FEEDBACK_FORM_URL } from "@/constants";
import { OutboundLink } from "@/components/OutboundLink.component";
import { Button } from "@/components/ui/button";
import { Image } from "@/types";

interface HeroContentProps {
  logo: Image | null;
}

export const HeroContent = ({ logo }: HeroContentProps) => (
  <div className="relative z-4 mx-auto max-w-4xl px-4 text-center">
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
    <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300 md:text-2xl">
      Defesa pessoal, competição e comunidade. Junte-se à equipe oficial da
      universidade.
    </p>
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Button
        size="lg"
        className="h-auto px-8 py-4 text-lg tracking-widest"
        nativeButton={false}
        render={<a href="#treinos" />}
      >
        Ver Treinos
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-auto border-white bg-transparent px-8 py-4 text-lg tracking-widest text-white hover:bg-white/10 dark:border-white dark:bg-transparent dark:hover:bg-white/10"
        nativeButton={false}
        render={<a href="#perguntas-frequentes" />}
      >
        Guia do Iniciante
      </Button>
    </div>
    <OutboundLink
      href={FEEDBACK_FORM_URL}
      trackLabel="feedback_hero"
      className="mt-6 inline-block text-sm text-gray-300 underline-offset-4 transition-colors hover:text-primary hover:underline"
    >
      Já treina com a gente? Deixe seu feedback anônimo →
    </OutboundLink>
  </div>
);
