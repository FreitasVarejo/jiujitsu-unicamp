import { X } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  selectedImage: string | null;
  onClose: () => void;
}

export const Lightbox = ({ selectedImage, onClose }: LightboxProps) => {
  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Close modal on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!selectedImage) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-60"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      
      <div 
        className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <picture>
          <source srcSet={selectedImage} type="image/webp" />
          <img 
            src={selectedImage.replace('.webp', '.jpg')} 
            alt="Visualização ampliada"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 scale-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const fallback = selectedImage.replace('.webp', '.jpg');
              if (target.src !== fallback) {
                target.src = fallback;
              }
            }}
          />
        </picture>
      </div>
    </div>
  );
};
