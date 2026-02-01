import React from 'react';
import { Medal } from 'lucide-react';
import { data } from '@/data';

const Galeria = () => {
  // Calculate total medals
  const totalMedals = data.equipe.reduce((acc, member) => {
    acc.ouro += member.medalhas.ouro;
    acc.prata += member.medalhas.prata;
    acc.bronze += member.medalhas.bronze;
    return acc;
  }, { ouro: 0, prata: 0, bronze: 0 });

  const mediaBase = import.meta.env.VITE_MEDIA_BASE_URL;

  // Generate images from media folder
  const images = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    // Expects images named galeria-1.jpg, galeria-2.jpg, etc. uploaded via FileBrowser
    src: `${mediaBase}/galeria-${i + 1}.jpg`,
    caption: `Campeonato Regional ${2023 + (i % 3)}`
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Stats Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-4xl font-display text-white mb-2">Hall de Conquistas</h1>
            <p className="text-gray-400">Momentos de glória e superação da nossa equipe.</p>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <Medal className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-display font-bold text-white">{totalMedals.ouro}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Ouro</div>
            </div>
            <div className="text-center">
              <Medal className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <div className="text-3xl font-display font-bold text-white">{totalMedals.prata}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Prata</div>
            </div>
            <div className="text-center">
              <Medal className="w-12 h-12 text-amber-700 mx-auto mb-2" />
              <div className="text-3xl font-display font-bold text-white">{totalMedals.bronze}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Bronze</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer">
            <img 
              src={img.src} 
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="font-display text-white text-lg tracking-wide">{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
