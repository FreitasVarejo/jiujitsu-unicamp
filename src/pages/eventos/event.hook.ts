import { useState, useEffect, useCallback } from "react";
import { mediaService, EventFolder, EventInfo } from "@/services/mediaService";

export const useEvents = () => {
  const [eventFolders, setEventFolders] = useState<EventFolder[]>([]);
  const [eventInfo, setEventInfo] = useState<Record<string, EventInfo>>({});
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const folders = await mediaService.getEventIndex();
      setEventFolders(folders);

      const years = Array.from(new Set(folders.map((f) => f.year)));
      const initialCounts: Record<string, number> = {};
      years.forEach((year) => (initialCounts[year] = 4));
      setVisibleCounts(initialCounts);
    } catch (err) {
      console.error("Erro ao carregar índice:", err);
      setError("Não foi possível carregar os registros de eventos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Fetch info.json for visible events
  useEffect(() => {
    if (eventFolders.length === 0) return;

    const fetchVisibleInfo = async () => {
      const foldersToFetch: string[] = [];

      const grouped = eventFolders.reduce((acc: Record<string, EventFolder[]>, f) => {
        if (!acc[f.year]) acc[f.year] = [];
        acc[f.year].push(f);
        return acc;
      }, {});

      Object.entries(grouped).forEach(([year, folders]) => {
        const count = visibleCounts[year] || 4;
        folders.slice(0, count).forEach((f) => {
          if (!eventInfo[f.id]) {
            foldersToFetch.push(f.id);
          }
        });
      });

      if (foldersToFetch.length === 0) return;

      const results = await Promise.all(
        foldersToFetch.map(async (id) => {
          try {
            return await mediaService.getEventInfo(id);
          } catch (e) {
            return null;
          }
        })
      );

      setEventInfo((prev) => {
        const next = { ...prev };
        results.forEach((res) => {
          if (res) next[res.id] = res;
        });
        return next;
      });
    };

    fetchVisibleInfo();
  }, [eventFolders, visibleCounts]);

  // Prefetching logic
  useEffect(() => {
    if (loading || eventFolders.length === 0) return;

    let isMounted = true;
    let nextPhaseTimeout: NodeJS.Timeout;
    const intervals: NodeJS.Timeout[] = [];

    const prefetch = async () => {
      const remainingFolders = eventFolders.filter((f) => !eventInfo[f.id]);

      const schedule = (fn: () => void) => {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(fn);
        } else {
          setTimeout(fn, 1000);
        }
      };

      schedule(async () => {
        if (!isMounted) return;

        // Phase 1: Metadata
        if (remainingFolders.length > 0) {
          const batchSize = 8;
          for (let i = 0; i < remainingFolders.length; i += batchSize) {
            if (!isMounted) break;
            const batch = remainingFolders.slice(i, i + batchSize);
            const results = await Promise.all(
              batch.map(async (f) => {
                try { return await mediaService.getEventInfo(f.id); } 
                catch (e) { return null; }
              })
            );
            
            if (isMounted) {
              setEventInfo((prev) => {
                const next = { ...prev };
                results.forEach(res => { if (res) next[res.id] = res; });
                return next;
              });
            }
            await new Promise(r => setTimeout(r, 600));
          }
        }

        // Phase 2: Hidden Thumbnails
        nextPhaseTimeout = setTimeout(async () => {
          if (!isMounted) return;
          const hiddenFolders: EventFolder[] = [];
          const years = Array.from(new Set(eventFolders.map(f => f.year)));
          years.forEach(year => {
            const folders = eventFolders.filter(f => f.year === year);
            const count = visibleCounts[year] || 4;
            if (folders.length > count) hiddenFolders.push(...folders.slice(count));
          });

          for (let i = 0; i < hiddenFolders.length; i += 4) {
            if (!isMounted) break;
            hiddenFolders.slice(i, i + 4).forEach(f => {
              const img = new Image();
              img.src = mediaService.getMediaUrl(`/eventos/${f.id}/0000.webp`);
            });
            await new Promise(r => setTimeout(r, 1000));
          }

          // Phase 3: Top Event Internal Images
          nextPhaseTimeout = setTimeout(() => {
            if (!isMounted) return;
            const topEvents = eventFolders.slice(0, 2);
            topEvents.forEach((event) => {
              const checkAndWarm = setInterval(() => {
                const info = eventInfo[event.id];
                if (info && info.imagensCount) {
                  clearInterval(checkAndWarm);
                  const count = Math.min(info.imagensCount, 4);
                  for (let i = 1; i <= count; i++) {
                    const webp = new Image();
                    webp.src = mediaService.getMediaUrl(`/eventos/${event.id}/${String(i).padStart(4, "0")}.webp`);
                    const jpg = new Image();
                    jpg.src = mediaService.getMediaUrl(`/eventos/${event.id}/${String(i).padStart(4, "0")}.jpg`);
                  }
                }
              }, 3000);
              intervals.push(checkAndWarm);
              setTimeout(() => clearInterval(checkAndWarm), 20000);
            });
          }, 4000);
        }, 2000);
      });
    };

    const mainTimeout = setTimeout(() => { if (isMounted) prefetch(); }, 4000);

    return () => {
      isMounted = false;
      clearTimeout(mainTimeout);
      clearTimeout(nextPhaseTimeout);
      intervals.forEach(clearInterval);
    };
  }, [loading, eventFolders]);

  const handleSeeMore = (year: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [year]: (prev[year] || 4) + 6,
    }));
  };

  const years = Array.from(new Set(eventFolders.map((f) => f.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const groupedEvents = eventFolders.reduce((acc: Record<string, EventFolder[]>, f) => {
    if (!acc[f.year]) acc[f.year] = [];
    acc[f.year].push(f);
    return acc;
  }, {});

  return {
    years,
    groupedEvents,
    eventInfo,
    visibleCounts,
    loading,
    error,
    handleSeeMore,
  };
};
