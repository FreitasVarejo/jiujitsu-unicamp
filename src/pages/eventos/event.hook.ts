import { useState, useEffect, useCallback } from 'react';
import { mediaService, EventSummaryInfo } from '@/services/mediaService';

export const useEvents = () => {
  const [events, setEvents] = useState<EventSummaryInfo[]>([]);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const summaries = await mediaService.getEventSummaries();
      setEvents(summaries);

      // Inicializar contagem visível por ano
      const years = Array.from(new Set(summaries.map((e) => e.date.split('-')[0] || 'Antigo')));
      const initialCounts: Record<string, number> = {};
      years.forEach((year) => (initialCounts[year] = 4));
      setVisibleCounts(initialCounts);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
      setError('Não foi possível carregar os registros de eventos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSeeMore = (year: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [year]: (prev[year] || 4) + 6,
    }));
  };

  // Agrupar eventos por ano
  const groupedEvents = events.reduce((acc: Record<string, EventSummaryInfo[]>, event) => {
    const year = event.date.split('-')[0] || 'Antigo';
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  const years = Object.keys(groupedEvents).sort((a, b) => Number(b) - Number(a));

  return {
    years,
    groupedEvents,
    visibleCounts,
    loading,
    error,
    handleSeeMore,
  };
};
