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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // Close modal on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <button
        className="z-60 absolute right-6 top-6 p-2 text-white/70 transition-colors hover:text-white"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      <div
        className="relative flex w-full max-w-5xl items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <picture>
          <source srcSet={selectedImage} type="image/webp" />
          <img
            src={selectedImage.replace(".webp", ".jpg")}
            alt="Visualização ampliada"
            className="max-h-[90vh] max-w-full scale-100 rounded-lg object-contain shadow-2xl transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const fallback = selectedImage.replace(".webp", ".jpg");
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
