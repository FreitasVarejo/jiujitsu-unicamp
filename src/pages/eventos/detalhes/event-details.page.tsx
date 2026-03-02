import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { useEventDetails } from './event-details.hook';
import { Lightbox } from '../components/Lightbox';

export const EventoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { details, loading, error, images } = useEventDetails(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="container py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando galeria...</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="container py-24 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-white text-xl">{error || "Evento não encontrado."}</p>
        <Link to="/eventos" className="text-primary hover:underline mt-4 inline-block">Voltar para Eventos</Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Link 
        to="/eventos" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
        <span className="font-display uppercase tracking-widest text-sm">Voltar para Eventos</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        <div className="flex-1">
          <header>
            <div className="flex items-center gap-4 text-primary mb-4 text-sm font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(details.date).toLocaleDateString('pt-BR')}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {details.location}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-white mb-6 uppercase tracking-tight">
              {details.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              {details.description}
            </p>
          </header>
        </div>

        {/* Capa do Evento */}
        <div 
          className="lg:w-2/5 aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group cursor-pointer relative"
          onClick={() => setSelectedImage(details.coverImage?.url || null)}
        >
          {details.coverImage ? (
            <img 
              src={details.coverImage.url} 
              alt={details.coverImage.alternativeText || details.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={details.coverImage.focalPoint
                ? { objectPosition: `${details.coverImage.focalPoint.x}% ${details.coverImage.focalPoint.y}%` }
                : undefined}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700">
              Sem Imagem
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Ver em destaque
          </div>
        </div>
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedImage(img.url)}
            className="aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 group cursor-pointer"
          >
            <img 
              src={img.url} 
              alt={img.alternativeText || `${details.title} - Foto ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              style={img.focalPoint
                ? { objectPosition: `${img.focalPoint.x}% ${img.focalPoint.y}%` }
                : undefined}
            />
          </div>
        ))}
      </div>

      <Lightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

