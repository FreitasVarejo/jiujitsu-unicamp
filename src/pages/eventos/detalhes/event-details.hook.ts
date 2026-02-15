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

  const images = details ? details.gallery.map((url, i) => ({
    id: i,
    url,
  })) : [];

  return { details, loading, error, images };
};
