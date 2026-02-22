import { useEffect, useRef, useState } from "react";
import { mediaService } from "@/services/mediaService";

const INTERVAL_MS = 5000;
const FADE_MS = 1500;

export const Hero = () => {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [nextVisible, setNextVisible] = useState(false);
  const lockRef = useRef(false);

  useEffect(() => {
    mediaService.getHeroImages().then((urls) => {
      if (urls.length > 0) setImages(urls);
    });
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      if (lockRef.current) return;
      lockRef.current = true;

      const nextIndex = (current + 1) % images.length;

      // Monta a próxima imagem invisível (opacity 0)
      setNext(nextIndex);
      setNextVisible(false);

      // Aguarda um frame para garantir que o DOM montou, então faz fade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNextVisible(true);

          // Após o fade completar, promove next → current e limpa
          setTimeout(() => {
            setCurrent(nextIndex);
            setNext(null);
            setNextVisible(false);
            lockRef.current = false;
          }, FADE_MS);
        });
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [images, current]);

  const bgStyle = (url: string) => ({
    backgroundImage: `url('${url}')`,
    filter: "grayscale(100%)",
  });

  return (
    <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Imagem atual — sempre opaca, fica embaixo */}
      {images.length > 0 && (
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={bgStyle(images[current])}
        />
      )}

      {/* Próxima imagem — faz fade in por cima */}
      {next !== null && images[next] && (
        <div
          className="absolute inset-0 bg-cover bg-center z-[2]"
          style={{
            ...bgStyle(images[next]),
            opacity: nextVisible ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      )}

      {/* Fallback enquanto carrega */}
      {images.length === 0 && (
        <div className="absolute inset-0 bg-zinc-900 z-[1]" />
      )}

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70 z-[3]" />

      {/* Conteúdo */}
      <div className="relative z-[4] text-center px-4 max-w-4xl mx-auto">
        <img
          src={mediaService.getMediaUrl("/uploads/logo-sem-titulo.webp")}
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
