import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, AlertCircle, X } from 'lucide-react';

interface EventoDetails {
  nome: string;
  data: string;
  local: string;
  descricao: string;
  imagensCount: number;
}

const EventoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<EventoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const mediaBase = import.meta.env.VITE_MEDIA_BASE_URL || '/media';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${mediaBase}/eventos/${id}/info.json`);
        if (!response.ok) throw new Error('Failed to fetch event details');
        const info = await response.json();
        
        setDetails({
          nome: info.NOME,
          data: info.DATA,
          local: info.LOCAL,
          descricao: info.DESCRIÇÃO,
          imagensCount: info.IMAGENS_COUNT || 0
        });
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        setError("Não foi possível carregar as informações deste evento.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id, mediaBase]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Close modal on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando galeria...</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-white text-xl">{error || "Evento não encontrado."}</p>
        <Link to="/eventos" className="text-primary hover:underline mt-4 inline-block">Voltar para Eventos</Link>
      </div>
    );
  }

  const images = Array.from({ length: Math.max(0, details.imagensCount - 1) }).map((_, i) => ({
    id: i + 1,
    src: `${mediaBase}/eventos/${id}/${String(i + 1).padStart(4, '0')}.webp`,
    fallback: `${mediaBase}/eventos/${id}/${String(i + 1).padStart(4, '0')}.jpg`,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
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
                {new Date(details.data).toLocaleDateString('pt-BR')}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {details.local}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-white mb-6 uppercase tracking-tight">
              {details.nome}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              {details.descricao}
            </p>
          </header>
        </div>

        {/* Capa do Evento */}
        <div 
          className="lg:w-2/5 aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group cursor-pointer relative"
          onClick={() => setSelectedImage(`${mediaBase}/eventos/${id}/0000.webp`)}
        >
          <picture>
            <source srcSet={`${mediaBase}/eventos/${id}/0000.webp`} type="image/webp" />
            <img 
              src={`${mediaBase}/eventos/${id}/0000.jpg`} 
              alt={details.nome}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fallback = `${mediaBase}/eventos/${id}/0000.jpg`;
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Ver em destaque
          </div>
        </div>
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div 
            key={img.id} 
            onClick={() => setSelectedImage(img.src)}
            className="aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 group cursor-pointer"
          >
            <picture>
              <source srcSet={img.src} type="image/webp" />
              <img 
                src={img.fallback} 
                alt={`${details.nome} - Foto ${img.id + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== img.fallback) {
                    target.src = img.fallback;
                  }
                }}
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-60"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <source srcSet={selectedImage} type="image/webp" />
              <img 
                src={selectedImage.replace('.webp', '.jpg')} 
                alt="Visualização ampliada"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 scale-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallback = selectedImage.replace('.webp', '.jpg');
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
            </picture>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventoDetalhes;
