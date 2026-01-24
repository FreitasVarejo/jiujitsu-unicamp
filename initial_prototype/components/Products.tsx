import React, { useRef } from 'react';
import { PRODUCTS } from '../constants';

const Products: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 350; // Width of a card + margin
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-background-dark py-20 overflow-hidden relative group">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="text-center text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-12">
          Nossos Produtos
        </h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 bg-background-dark/80 hover:bg-primary text-white p-3 rounded-full border border-white/10 hover:border-primary transition-all shadow-lg backdrop-blur-sm hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 bg-background-dark/80 hover:bg-primary text-white p-3 rounded-full border border-white/10 hover:border-primary transition-all shadow-lg backdrop-blur-sm hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-4"
          >
              {PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  className="snap-center shrink-0 w-80 h-96 rounded-xl border-2 border-white/10 bg-surface-dark flex flex-col overflow-hidden group/card hover:border-primary transition-colors"
                >
                   <div 
                    className="h-56 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image}')` }}
                   />
                   <div className="p-5 flex-1 flex flex-col justify-between">
                     <div>
                       <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                         {product.category}
                       </span>
                       <h3 className="font-bold text-lg leading-tight mb-2 text-white">
                         {product.name}
                       </h3>
                     </div>
                     <div className="flex items-center justify-between mt-4">
                       <span className="text-xl font-bold">{product.price}</span>
                       <button className="text-xs font-bold uppercase bg-white/10 hover:bg-white/20 px-3 py-2 rounded transition-colors">
                         Ver detalhes
                       </button>
                     </div>
                   </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;