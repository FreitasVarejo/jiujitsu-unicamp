import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface LightboxProps {
  selectedImage: string | null;
  onClose: () => void;
}

export const Lightbox = ({ selectedImage, onClose }: LightboxProps) => {
  return (
    <Dialog
      open={Boolean(selectedImage)}
      onOpenChange={(open) => !open && onClose()}
    >
      {selectedImage && (
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center gap-0 rounded-none bg-transparent p-4 shadow-none ring-0 sm:max-w-none"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <DialogTitle className="sr-only">Visualização ampliada</DialogTitle>
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="fixed top-6 right-6 text-white/70 hover:bg-transparent hover:text-white"
              />
            }
          >
            <X className="size-8" />
            <span className="sr-only">Fechar</span>
          </DialogClose>

          <div className="flex w-full max-w-5xl items-center justify-center p-4">
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
        </DialogContent>
      )}
    </Dialog>
  );
};
