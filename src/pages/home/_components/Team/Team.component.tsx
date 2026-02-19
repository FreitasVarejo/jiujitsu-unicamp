import { Users, Loader2 } from "lucide-react";
import { SectionHeader, MemberCard } from "../shared";
import { useTeam } from "./useTeam.hook";

export const Team = () => {
  const { members, loading } = useTeam();

  return (
    <section className="container mx-auto px-4">
      <SectionHeader title="Nossa Equipe" icon={Users} />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </section>
  );
};
