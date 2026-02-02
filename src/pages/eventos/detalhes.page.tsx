import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin, AlertCircle } from 'lucide-react';

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

  const images = Array.from({ length: details.imagensCount }).map((_, i) => ({
    id: i,
    src: `${mediaBase}/eventos/${id}/${String(i).padStart(4, '0')}.jpg`,
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

      <header className="mb-12">
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
        <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
          {details.descricao}
        </p>
      </header>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 group cursor-pointer"
          >
            <img 
              src={img.src} 
              alt={`${details.nome} - Foto ${img.id + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventoDetalhes;
