import { SectionHeader } from "@/components/SectionHeader.component.tsx";
import { useInstructors } from "@/hooks/data/use-instructors.hook";
import { useIsDesktop } from "@/hooks/ui";
import { Users } from "lucide-react";
import { InstructorCard } from "./InstructorCard.tsx";
import { TeamError } from "./TeamError.tsx";
import { TeamSkeleton } from "./TeamSkeleton.tsx";

export const Team = () => {
  const { instructors, loading, error } = useInstructors();
  const isDesktop = useIsDesktop();

  if (loading) {
    return <TeamSkeleton />;
  }

  if (error) {
    return <TeamError error={error} />;
  }

  return (
    <section className="container">
      <SectionHeader title="Nossa Equipe" icon={Users} />

      <div
        className={`grid gap-8 ${
          isDesktop ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </section>
  );
};
