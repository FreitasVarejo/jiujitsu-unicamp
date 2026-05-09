import { CSSProperties } from "react";
import { Image } from "@types";

interface HeroBackgroundProps {
  images: Image[];
  current: number;
  next: number | null;
  nextVisible: boolean;
  fadeDuration: number;
}

export const HeroBackground = ({
  images,
  current,
  next,
  nextVisible,
  fadeDuration,
}: HeroBackgroundProps) => {
  const getImgStyle = (focalPoint: Image["focalPoint"]): CSSProperties => ({
    objectFit: "cover",
    objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : "center",
    filter: "grayscale(100%)",
  });

  if (images.length === 0) {
    return <div className="absolute inset-0 z-[1] bg-zinc-900" />;
  }

  return (
    <>
      {/* Imagem Atual */}
      <img
        src={images[current].url}
        alt={images[current].alternativeText}
        className="absolute inset-0 z-[1] h-full w-full"
        style={getImgStyle(images[current].focalPoint)}
      />

      {/* Próxima Imagem (Fade In) */}
      {next !== null && images[next] && (
        <img
          src={images[next].url}
          alt={images[next].alternativeText}
          className="absolute inset-0 z-[2] h-full w-full"
          style={{
            ...getImgStyle(images[next].focalPoint),
            opacity: nextVisible ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
          }}
        />
      )}

      {/* Overlay de contraste */}
      <div className="absolute inset-0 z-[3] bg-black/70" />
    </>
  );
};
