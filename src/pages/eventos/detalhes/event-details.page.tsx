import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, MapPin, AlertCircle } from "lucide-react";
import { useEventDetails } from "./event-details.hook";
import { Lightbox } from "../components/Lightbox";

export const EventoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { details, loading, error, images } = useEventDetails(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="container py-24 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-gray-400">Carregando galeria...</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="container py-24 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <p className="text-xl text-white">
          {error || "Evento não encontrado."}
        </p>
        <Link
          to="/eventos"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Voltar para Eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Link
        to="/eventos"
        className="group mb-8 inline-flex items-center gap-2 text-zinc-500 transition-colors hover:text-primary"
      >
        <ChevronLeft
          size={20}
          className="transition-transform group-hover:-translate-x-1"
        />
        <span className="font-display text-sm uppercase tracking-widest">
          Voltar para Eventos
        </span>
      </Link>

      <div className="mb-16 flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <header>
            <div className="mb-4 flex items-center gap-4 text-sm font-medium text-primary">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(details.date).toLocaleDateString("pt-BR")}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {details.location}
              </span>
            </div>
            <h1 className="mb-6 font-display text-4xl uppercase tracking-tight text-white md:text-5xl">
              {details.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
              {details.description}
            </p>
          </header>
        </div>

        {/* Capa do Evento */}
        <div
          className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:w-2/5"
          onClick={() => setSelectedImage(details.coverImage?.url || null)}
        >
          {details.coverImage ? (
            <img
              src={details.coverImage.url}
              alt={details.coverImage.alternativeText || details.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={
                details.coverImage.focalPoint
                  ? {
                      objectPosition: `${details.coverImage.focalPoint.x}% ${details.coverImage.focalPoint.y}%`,
                    }
                  : undefined
              }
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-700">
              Sem Imagem
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent"></div>
          <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            Ver em destaque
          </div>
        </div>
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img.url)}
            className="group aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
          >
            <img
              src={img.url}
              alt={
                img.alternativeText || `${details.title} - Foto ${index + 1}`
              }
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              style={
                img.focalPoint
                  ? {
                      objectPosition: `${img.focalPoint.x}% ${img.focalPoint.y}%`,
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      <Lightbox
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};
