import { useCallback, useEffect, useState, CSSProperties } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  X,
  Instagram,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProductInfo } from "@/services/mediaService";

const INSTAGRAM_URL = "https://www.instagram.com/jiujitsu.unicamp/";

const imgStyle = (
  focalPoint: ProductInfo["coverImage"]["focalPoint"]
): CSSProperties => ({
  objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : "center",
});

interface ProductModalProps {
  product: ProductInfo | null;
  onClose: () => void;
  categoryLabel?: string;
}

export const ProductModal = ({
  product,
  onClose,
  categoryLabel,
}: ProductModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Track current slide index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!product) return null;

  const images = product.gallery;
  const imagensCount = images.length;
  const formsOpen = Boolean(product.formsLink);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl md:max-h-[90vh] md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-[110] rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
        >
          <X size={20} />
        </button>

        {/* Left Side: Images */}
        <div className="relative w-full shrink-0 bg-zinc-800 md:w-3/5">
          <div
            className="h-[30vh] overflow-hidden sm:h-[35vh] md:h-full"
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
                    alt={img.alternativeText || `${product.title} - ${idx + 1}`}
                    className="h-full w-full object-contain"
                    style={imgStyle(img.focalPoint)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/800x800/18181b/d26030?text=${product.title.replace(/ /g, "+")}`;
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

        {/* Right Side: Details */}
        <div className="flex w-full flex-col overflow-y-auto p-5 md:w-2/5 md:p-8">
          <div className="mb-4 md:mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary md:text-sm">
              {categoryLabel || "Coleção Oficial"}
            </span>
            <h2 className="mb-2 mt-1 font-display text-2xl text-white md:text-4xl">
              {product.title}
            </h2>
            <div className="inline-block rounded-full border-2 border-primary bg-black px-4 py-1.5 text-lg font-bold text-white shadow-lg md:text-xl">
              {product.price}
            </div>
          </div>

          <div className="flex-grow">
            {product.description && (
              <div className="mb-4 md:mb-6">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Informações
                </h4>
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                  {product.description}
                </p>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4 md:mb-6">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Tamanhos Disponíveis
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((tamanho) => (
                    <span
                      key={tamanho}
                      className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm font-bold text-white"
                    >
                      {tamanho}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 space-y-3 md:mt-6">
              <div className="flex items-center gap-3 text-xs text-gray-400 md:text-sm">
                <div
                  className={`h-2 w-2 shrink-0 rounded-full ${formsOpen ? "bg-green-500" : "bg-zinc-500"}`}
                />
                {formsOpen
                  ? "Encomendas abertas"
                  : "Encomendas encerradas no momento"}
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            {formsOpen ? (
              <a
                href={product.formsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full transform items-center justify-center gap-3 rounded-xl bg-primary py-3 font-display text-sm uppercase tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] md:py-4 md:text-base"
              >
                <ClipboardList size={20} />
                Fazer encomenda
              </a>
            ) : (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full transform items-center justify-center gap-3 rounded-xl bg-zinc-700 py-3 font-display text-sm uppercase tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-zinc-600 active:scale-[0.98] md:py-4 md:text-base"
              >
                <Instagram size={20} />
                Entrar em contato
              </a>
            )}
            <p className="mt-3 px-4 text-center text-[10px] text-gray-500 md:text-xs">
              {formsOpen
                ? "Formulário com instruções de pagamento incluso."
                : "Solicite via Direct para participar do grupo de pedidos."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
