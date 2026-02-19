import { useEffect, useState } from "react";
import { TrainingSchedule } from "@/types/media";
import { mediaService } from "@/services/mediaService";

/**
 * Hook customizado para gerenciar o estado e fetching de horários de treinos
 * @returns Objeto contendo os treinos e estado de loading
 */
export const useTrainings = () => {
  const [trainings, setTrainings] = useState<TrainingSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const trainingsData = await mediaService.getAllTrainings();
        setTrainings(trainingsData);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar horários de treinos:", err);
        setError(err instanceof Error ? err : new Error("Erro desconhecido"));
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  return { trainings, loading, error };
};
