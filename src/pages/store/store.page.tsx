import { ShoppingBag } from 'lucide-react';
import { data } from '@/data';
import { ProductCard } from './_components/ProductCard';

const Loja = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display text-white mb-4">Loja Oficial</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Equipamentos e vestuário com a identidade da nossa equipe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.produtos.map((produto, index) => (
          <ProductCard key={index} product={produto} />
        ))}
      </div>

      <div className="mt-16 p-8 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
        <ShoppingBag className="mx-auto text-primary mb-4" size={48} />
        <h2 className="text-2xl font-display text-white mb-2">Como comprar?</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Nossa loja funciona sob demanda. Clique no botão de encomendar para falar diretamente com o responsável pelos pedidos via WhatsApp e verificar a disponibilidade de tamanhos.
        </p>
      </div>
    </div>
  );
};

export default Loja;
