import React from 'react';
import { EVENTS } from '../constants';

const Events: React.FC = () => {
  return (
    <section id="eventos" className="py-24 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Nossa História & Eventos</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Mais que um treino, somos uma irmandade que representa a Unicamp em competições e seminários por todo o estado.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div 
              key={event.id} 
              className="group relative overflow-hidden rounded-xl h-64 border-2 border-transparent hover:border-primary transition-all cursor-pointer"
            >
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="font-bold text-xl drop-shadow-md">{event.title}</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-wider">{event.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;