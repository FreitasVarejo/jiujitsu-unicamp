import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductInfo } from '@/services/mediaService';

interface ProductModalProps {
  product: ProductInfo | null;
  onClose: () => void;
  categoryLabel?: string;
}

export const ProductModal = ({ product, onClose, categoryLabel }: ProductModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!product) return null;

  const images = product.gallery;
  const imagensCount = images.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-3/5 bg-zinc-800 relative">
          <div className="h-[40vh] md:h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((img, idx) => (
                <div key={idx} className="flex-[0_0_100%] h-full flex items-center justify-center">
                  <img 
                    src={img.url} 
                    alt={img.alternativeText || `${product.title} - ${idx + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/800x800/18181b/d26030?text=${product.title.replace(/ /g, '+')}`;
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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-2/5 p-8 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              {categoryLabel || 'Coleção Oficial'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-white mt-1 mb-2">
              {product.title}
            </h2>
            <div className="inline-block bg-black text-white px-4 py-1.5 rounded-full text-xl font-bold mb-6 shadow-lg border-2 border-primary">
              {product.price}
            </div>
          </div>

          <div className="flex-grow">
            <h4 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-3">
              Informações
            </h4>
            {product.description ? (
              <p className="text-gray-300 leading-relaxed mb-6">
                {product.description}
              </p>
            ) : (
              <p className="text-gray-500 italic mb-6">Nenhuma observação adicional.</p>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h4 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-3">
                  Tamanhos Disponíveis
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((tamanho) => (
                    <span 
                      key={tamanho}
                      className="px-3 py-1 bg-zinc-800 border border-zinc-700 text-white text-sm font-bold rounded-md"
                    >
                      {tamanho}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Disponibilidade sob consulta
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Produto exclusivo Unicamp Jiu-Jitsu
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a 
              href={`https://wa.me/?text=Olá, gostaria de encomendar o produto: ${product.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl transition-all font-display uppercase tracking-wider transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={24} />
              Encomendar pelo WhatsApp
            </a>
            <p className="text-center text-xs text-gray-500 mt-4 px-4">
              O pagamento e a entrega são combinados diretamente com o responsável pela loja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
