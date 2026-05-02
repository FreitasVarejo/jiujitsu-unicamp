import { Users } from "lucide-react";
import { SectionHeader, InstructorCard } from "../shared";
import { TeamSkeleton } from "./team-skeleton.tsx";
import { TeamError } from "./team-error";
import { useInstructors } from "@/hooks/data/use-instructors.hook";

export const Team = () => {
  const { instructors, loading, error } = useInstructors();

  return (
    <section className="container">
      <SectionHeader title="Nossa Equipe" icon={Users} />

      {loading ? (
        <TeamSkeleton />
      ) : error ? (
        <TeamError error={error} />
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
