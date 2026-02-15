import { Medal } from "lucide-react";
import { data } from "@/data";

export const EventStats = () => {
  const totalMedals = data.equipe.reduce(
    (acc, member) => {
      acc.ouro += member.medalhas.ouro;
      acc.prata += member.medalhas.prata;
      acc.bronze += member.medalhas.bronze;
      return acc;
    },
    { ouro: 0, prata: 0, bronze: 0 }
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-display text-white mb-1">
            Hall de Conquistas
          </h2>
          <p className="text-zinc-500 text-sm">
            Somatório de medalhas da nossa equipe em competições oficiais.
          </p>
        </div>

        <div className="flex gap-8">
          <StatItem icon={<Medal className="w-10 h-10 text-yellow-400" />} value={totalMedals.ouro} label="Ouro" />
          <StatItem icon={<Medal className="w-10 h-10 text-zinc-300" />} value={totalMedals.prata} label="Prata" />
          <StatItem icon={<Medal className="w-10 h-10 text-amber-700" />} value={totalMedals.bronze} label="Bronze" />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) => (
  <div className="text-center">
    <div className="mx-auto mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl font-display font-bold text-white">{value}</div>
    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</div>
  </div>
);
