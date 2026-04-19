import { Users, Loader2, AlertCircle } from "lucide-react";
import { SectionHeader, InstructorCard } from "../shared";
import { useTeam } from "./useTeam.hook";

export const Team = () => {
  const { instructors, loading, error } = useTeam();

  return (
    <section className="container">
      <SectionHeader title="Nossa Equipe" icon={Users} />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
          <h3 className="mb-1 font-display text-lg text-white">
            Ops! Algo deu errado
          </h3>
          <p className="text-sm text-gray-400">{error.message}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      )}
    </section>
  );
};
