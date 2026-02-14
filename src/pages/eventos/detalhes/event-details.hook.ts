import { useState, useEffect } from 'react';
import { mediaService, EventInfo } from '@/services/mediaService';

export const useEventDetails = (id?: string) => {
  const [details, setDetails] = useState<EventInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const info = await mediaService.getEventInfo(id);
        setDetails(info);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        setError("Não foi possível carregar as informações deste evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const images = details ? Array.from({ length: Math.max(0, details.imagensCount - 1) }).map((_, i) => ({
    id: i + 1,
    webp: mediaService.getMediaUrl(`/eventos/${id}/${String(i + 1).padStart(4, '0')}.webp`),
    jpg: mediaService.getMediaUrl(`/eventos/${id}/${String(i + 1).padStart(4, '0')}.jpg`),
  })) : [];

  return { details, loading, error, images };
};
