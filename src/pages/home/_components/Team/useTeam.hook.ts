import { useEffect, useState } from "react";
import { mediaService } from "@/services/mediaService";
import { Member } from "@/types/media";
import { BELT_INFO } from "@/constants";

/**
 * Hook customizado para gerenciar o estado e fetching da equipe
 * @returns Objeto contendo os membros ordenados por faixa e estado de loading
 */
export const useTeam = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const membersData = await mediaService.getAllMembers();
        
        // Ordenar membros por peso da faixa (maior para menor)
        const sorted = [...membersData].sort((a, b) => {
          const weightA = BELT_INFO[a.belt]?.weight || 0;
          const weightB = BELT_INFO[b.belt]?.weight || 0;
          return weightB - weightA;
        });
        
        setMembers(sorted);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar membros:", err);
        setError(err instanceof Error ? err : new Error("Erro desconhecido"));
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { members, loading, error };
};
