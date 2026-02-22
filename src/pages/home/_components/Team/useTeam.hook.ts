import { useEffect, useState } from 'react';
import { mediaService } from '@/services/mediaService';
import { Instructor } from '@/types/media';
import { BELT_INFO } from '@/constants';

/**
 * Hook customizado para gerenciar o estado e fetching dos instrutores
 * @returns Objeto contendo os instrutores ordenados por faixa e estado de loading
 */
export const useTeam = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const data = await mediaService.getAllInstructors();

        // Ordenar instrutores por peso da faixa (maior para menor)
        const sorted = [...data].sort((a, b) => {
          const weightA = BELT_INFO[a.belt]?.weight || 0;
          const weightB = BELT_INFO[b.belt]?.weight || 0;
          return weightB - weightA;
        });

        setInstructors(sorted);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar instrutores:', err);
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return { instructors, loading, error };
};
