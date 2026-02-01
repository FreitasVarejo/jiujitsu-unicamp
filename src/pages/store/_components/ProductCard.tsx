import { MessageCircle } from 'lucide-react';
import { Produto } from '@/data';

interface ProductCardProps {
  product: Produto;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-primary/50 transition-colors">
      {/* Image Placeholder */}
      <div className="aspect-square bg-zinc-800 relative overflow-hidden">
        <img 
          src={`https://placehold.co/500x500/18181b/d26030?text=${product.nome.replace(/ /g, '+')}`} 
          alt={product.nome}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-bold border border-white/10">
          {product.preco}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-display text-white">{product.nome}</h3>
            <p className="text-sm text-primary uppercase tracking-wider font-bold mt-1">
              {product.categoria || 'Coleção Oficial'}
            </p>
          </div>
        </div>
        
        {product.obs && (
          <p className="text-gray-500 text-sm mb-6 border-l-2 border-zinc-700 pl-3 italic">
            {product.obs}
          </p>
        )}

        <a 
          href={`https://wa.me/?text=Olá, gostaria de encomendar o produto: ${product.nome}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-4 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-green-600 text-white py-3 rounded transition-colors font-display uppercase tracking-wide"
        >
          <MessageCircle size={20} />
          Encomendar
        </a>
      </div>
    </div>
  );
};
