import { ShoppingCart } from 'lucide-react';
import { ProductInfo } from '@/services/mediaService';

interface ProductCardProps {
  product: ProductInfo;
  categoryLabel?: string;
  onClick: (product: ProductInfo) => void;
}

export const ProductCard = ({ product, categoryLabel, onClick }: ProductCardProps) => {
  const coverImage = product.coverImage || `https://placehold.co/500x500/18181b/d26030?text=${product.title.replace(/ /g, '+')}`;

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-primary/50 transition-all cursor-pointer flex flex-col h-full hover:transform hover:translate-y-[-4px]"
    >
      <div className="aspect-square bg-zinc-800 relative overflow-hidden shrink-0">
        <img 
          src={coverImage} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/500x500/18181b/d26030?text=${product.title.replace(/ /g, '+')}`;
          }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10 border-2 border-primary">
          {product.price}
        </div>

        {/* Badge for multiple photos */}
        {product.gallery.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur text-white/70 text-[10px] px-2 py-0.5 rounded uppercase tracking-widest font-bold border border-white/5">
            +{product.gallery.length - 1} fotos
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-black mb-1">
            {categoryLabel || 'Coleção Oficial'}
          </p>
          <h3 className="text-lg font-display text-white group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-zinc-500 text-sm font-medium">Ver detalhes</span>
          <div className="text-primary group-hover:translate-x-1 transition-transform">
             <ShoppingCart size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
