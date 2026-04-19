import { CSSProperties, useEffect, useRef, useState, useMemo } from "react";
import { mediaService } from "@/services/mediaService";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Image } from "@/types/media";
import { SkeletonHero } from "./SkeletonHero.component";

const INTERVAL_MS = 5000;
const FADE_MS = 1500;

export const Hero = () => {
  const [images, setImages] = useState<{ desktop: Image[]; mobile: Image[] }>({
    desktop: [],
    mobile: [],
  });
  const [logo, setLogo] = useState<Image | null>(null);
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [nextVisible, setNextVisible] = useState(false);
  const lockRef = useRef(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const isMediumOrLarger = useMediaQuery("(min-width: 768px)");

  const isLoaded = imagesLoaded && logoLoaded;

  // Memoizar a seleção de imagens e a chave de carrossel
  const carouselKey = useMemo(
    () => (isMediumOrLarger ? "desktop" : "mobile"),
    [isMediumOrLarger]
  );
  const imagesToShow = useMemo(
    () => (isMediumOrLarger ? images.desktop : images.mobile),
    [isMediumOrLarger, images]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [imgs, logo] = await Promise.all([
          mediaService.getHeroImages(),
          mediaService.getLogo(),
        ]);

        if (imgs.desktop.length > 0 || imgs.mobile.length > 0) {
          setImages(imgs);
        }
        setImagesLoaded(true);

        if (logo) {
          setLogo(logo);
        }
        setLogoLoaded(true);
      } catch (err) {
        console.error("Erro ao carregar dados do Hero:", err);
        setImagesLoaded(true);
        setLogoLoaded(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (imagesToShow.length <= 1) return;

    const interval = setInterval(() => {
      if (lockRef.current) return;
      lockRef.current = true;

      const nextIndex = (current + 1) % imagesToShow.length;

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
  }, [imagesToShow, current]);

  // Efeito separado: quando a chave do carrossel muda (desktop/mobile),
  // reseta o índice. Necessário para sincronizar o carousel ao trocar de breakpoint.
  useEffect(() => {
    // Reset do carrossel quando muda entre desktop/mobile
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(0);
    setNext(null);
    setNextVisible(false);
    lockRef.current = false;
  }, [carouselKey]);

  const imgStyle = (focalPoint: Image["focalPoint"]): CSSProperties => ({
    objectFit: "cover",
    objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : "center",
    filter: "grayscale(100%)",
  });

  if (!isLoaded) {
    return <SkeletonHero />;
  }

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Imagem atual — sempre opaca, fica embaixo */}
      {imagesToShow.length > 0 && (
        <img
          src={imagesToShow[current].url}
          alt={imagesToShow[current].alternativeText}
          className="absolute inset-0 z-[1] h-full w-full"
          style={imgStyle(imagesToShow[current].focalPoint)}
        />
      )}

      {/* Próxima imagem — faz fade in por cima */}
      {next !== null && imagesToShow[next] && (
        <img
          src={imagesToShow[next].url}
          alt={imagesToShow[next].alternativeText}
          className="absolute inset-0 z-[2] h-full w-full"
          style={{
            ...imgStyle(imagesToShow[next].focalPoint),
            opacity: nextVisible ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      )}

      {/* Fallback enquanto carrega */}
      {imagesToShow.length === 0 && (
        <div className="absolute inset-0 z-[1] bg-zinc-900" />
      )}

      {/* Overlay escuro */}
      <div className="absolute inset-0 z-[3] bg-black/70" />

      {/* Conteúdo */}
      <div className="relative z-[4] mx-auto max-w-4xl px-4 text-center">
        {logo && (
          <img
            src={logo.url}
            alt={logo.alternativeText || "Logo Jiu-Jitsu Unicamp"}
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
    </section>
  );
};
