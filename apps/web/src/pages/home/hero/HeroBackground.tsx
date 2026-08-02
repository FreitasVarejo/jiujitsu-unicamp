import { CSSProperties } from "react";
import { Image } from "@/types";

interface HeroBackgroundProps {
  images: Image[];
  currentIndex: number;
  nextIndex: number | null;
  nextVisible: boolean;
  fadeDuration: number;
}

export const HeroBackground = ({
  images,
  currentIndex,
  nextIndex,
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
        src={images[currentIndex].url}
        alt={images[currentIndex].alternativeText}
        className="absolute inset-0 z-[1] h-full w-full"
        style={getImgStyle(images[currentIndex].focalPoint)}
      />

      {/* Próxima Imagem (Fade In) */}
      {nextIndex !== null && images[nextIndex] && (
        <img
          src={images[nextIndex].url}
          alt={images[nextIndex].alternativeText}
          className="absolute inset-0 z-[2] h-full w-full"
          style={{
            ...getImgStyle(images[nextIndex].focalPoint),
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
