import { data } from '@/data';
import { MemberCard, beltConfig } from './_components/MemberCard';

const Membros = () => {
  const sortedMembers = [...data.equipe].sort((a, b) => {
    const weightA = beltConfig[a.faixa]?.weight || 0;
    const weightB = beltConfig[b.faixa]?.weight || 0;
    return weightB - weightA;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display text-white mb-4">Nossa Equipe</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Conheça a nossa equipe de professores e instrutores que represemtam a Unicamp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedMembers.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Membros;
