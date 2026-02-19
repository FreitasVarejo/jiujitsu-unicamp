import { mediaService } from "@/services/mediaService";

export const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/1a1a1a/d26030?text=Jiu-Jitsu+Unicamp')",
        }}
      ></div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <img
          src={mediaService.getMediaUrl("/drive/logo.webp")}
          alt="Logo Jiu-Jitsu Unicamp"
          className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 drop-shadow-2xl"
        />
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
          Jiu-Jitsu <span className="text-primary">Unicamp</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Defesa pessoal, competição e comunidade. Junte-se à equipe oficial
          da universidade.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#treinos"
            className="px-8 py-4 bg-primary text-white font-display uppercase tracking-widest text-lg hover:bg-orange-700 transition-colors rounded"
          >
            Ver Treinos
          </a>
          <a
            href="#perguntas-frequentes"
            className="px-8 py-4 border border-white text-white font-display uppercase tracking-widest text-lg hover:bg-white/10 transition-colors rounded"
          >
            Guia do Iniciante
          </a>
        </div>
      </div>
    </section>
  );
};
