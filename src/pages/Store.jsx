import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { data } from '../data';

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
          <div key={index} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group hover:border-primary/50 transition-colors">
            {/* Image Placeholder */}
            <div className="aspect-square bg-zinc-800 relative overflow-hidden">
              <img 
                src={`https://placehold.co/500x500/18181b/d26030?text=${produto.nome.replace(/ /g, '+')}`} 
                alt={produto.nome}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-bold border border-white/10">
                {produto.preco}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-display text-white">{produto.nome}</h3>
                  <p className="text-sm text-primary uppercase tracking-wider font-bold mt-1">
                    {produto.categoria || 'Coleção Oficial'}
                  </p>
                </div>
              </div>
              
              {produto.obs && (
                <p className="text-gray-500 text-sm mb-6 border-l-2 border-zinc-700 pl-3 italic">
                  {produto.obs}
                </p>
              )}

              <a 
                href={`https://wa.me/?text=Olá, gostaria de encomendar o produto: ${produto.nome}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-green-600 text-white py-3 rounded transition-colors font-display uppercase tracking-wide"
              >
                <MessageCircle size={20} />
                Encomendar
              </a>
            </div>
          </div>
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
