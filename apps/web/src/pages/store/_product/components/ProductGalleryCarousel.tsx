import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/types/base";
import { useProductGalleryCarousel } from "../hooks/use-product-gallery-carousel.hook";
import { getImageStyle, getPlaceholderUrl } from "../helpers/image-helpers";

interface ProductGalleryCarouselProps {
  images: Image[];
  title: string;
  isDesktop: boolean;
}

export const ProductGalleryCarousel = ({
  images,
  title,
  isDesktop,
}: ProductGalleryCarouselProps) => {
  const { emblaRef, emblaApi, currentSlide, scrollPrev, scrollNext } =
    useProductGalleryCarousel();

  const imagensCount = images.length;

  return (
    <div
      className={`relative shrink-0 bg-zinc-800 ${isDesktop ? "w-3/5" : "w-full"}`}
    >
      <div
        className={`overflow-hidden ${
          isDesktop ? "h-full" : "h-[30vh] sm:h-[35vh]"
        }`}
        ref={emblaRef}
      >
        <div className="flex h-full">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex h-full flex-[0_0_100%] items-center justify-center"
            >
              <img
                src={img.url}
                alt={img.alternativeText || `${title} - ${idx + 1}`}
                className="h-full w-full object-contain"
                style={getImageStyle(img.focalPoint, "contain")}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getPlaceholderUrl(title);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nav Buttons */}
      {imagensCount > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:p-3"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:p-3"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slide indicator dots */}
      {imagensCount > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`rounded-full transition-all ${
                idx === currentSlide
                  ? "h-2.5 w-2.5 bg-primary"
                  : "h-2 w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir para foto ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
