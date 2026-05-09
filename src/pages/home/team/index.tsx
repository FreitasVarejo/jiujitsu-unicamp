import { Users } from "lucide-react";
import { TeamSkeleton } from "./team-skeleton.tsx";
import { TeamError } from "./team-error";
import { useInstructors } from "@/hooks/data/use-instructors.hook";
import { useIsDesktop } from "@/hooks/ui";
import { SectionHeader } from "@/components/SectionHeader.component.tsx";
import { InstructorCard } from "./InstructorCard.tsx";

export const Team = () => {
  const { instructors, loading, error } = useInstructors();
  const isDesktop = useIsDesktop();

  return (
    <section className="container">
      <SectionHeader title="Nossa Equipe" icon={Users} />

      {loading ? (
        <TeamSkeleton />
      ) : error ? (
        <TeamError error={error} />
      ) : (
        <div
          className={`grid gap-8 ${
            isDesktop ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      )}
    </section>
  );
};
