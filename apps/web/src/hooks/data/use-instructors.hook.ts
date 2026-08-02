/**
 * Hook para gerenciar instrutores.
 */

import { useMemo } from "react";
import { useFetch } from "@/hooks/core";
import { instructorsService } from "@/services/strapi/instructors.service";
import { instructorAdapter } from "@/adapters/strapi/instructor.adapter";
import { Instructor } from "@/types/home";
import { BELT_INFO } from "@/constants/home";

interface UseInstructorsReturn {
  instructors: Instructor[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para buscar instrutores ordenados por peso de faixa.
 */
export const useInstructors = (): UseInstructorsReturn => {
  const {
    data: rawInstructors,
    loading,
    error,
  } = useFetch(() => instructorsService.getAll(), [], {
    cache: true,
    cacheKey: "instructors-list",
  });

  const instructors = useMemo(() => {
    const mapped = (rawInstructors || []).map(instructorAdapter);

    // Ordenar por peso de faixa (decrescente)
    return mapped.sort((a, b) => {
      const weightA = BELT_INFO[a.belt]?.weight ?? 0;
      const weightB = BELT_INFO[b.belt]?.weight ?? 0;
      return weightB - weightA;
    });
  }, [rawInstructors]);

  return {
    instructors,
    loading,
    error,
  };
};
