import React from 'react';
import { TEAM } from '../constants';

const Team: React.FC = () => {
  return (
    <section id="time" className="py-24 bg-surface-dark">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <h2 className="text-4xl font-black mb-16 text-center">Nosso Time</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {TEAM.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="relative mb-3 overflow-hidden rounded-lg aspect-square bg-zinc-900 border border-white/10 group-hover:border-primary transition-all shadow-lg">
                <img 
                  src={member.image} 
                  alt={`Portrait of ${member.role} ${member.name}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" 
                />
                {/* Hover Overlay with extra info */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-white duration-300">
                    <p className="text-xs font-bold uppercase mb-1">{member.belt}</p>
                    <p className="text-[10px] leading-tight">{member.course}</p>
                </div>
              </div>
              <h4 className="font-bold text-base leading-tight">{member.name}</h4>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;