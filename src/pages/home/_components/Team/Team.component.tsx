import { Users, Loader2, AlertCircle } from "lucide-react";
import { SectionHeader, MemberCard } from "../shared";
import { useTeam } from "./useTeam.hook";

export const Team = () => {
  const { members, loading, error } = useTeam();

  return (
    <section className="container mx-auto px-4">
      <SectionHeader title="Nossa Equipe" icon={Users} />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-display text-white mb-1">Ops! Algo deu errado</h3>
          <p className="text-gray-400 text-sm">{error.message}</p>
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
