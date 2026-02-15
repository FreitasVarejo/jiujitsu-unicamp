import { Member } from '@/types/media';

export const beltConfig: Record<string, { weight: number, color: string }> = {
  'Preta': { weight: 5, color: 'border-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]' },
  'Marrom': { weight: 4, color: 'border-amber-900' },
  'Roxa': { weight: 3, color: 'border-purple-700' },
  'Azul': { weight: 2, color: 'border-blue-600' },
  'Branca': { weight: 1, color: 'border-white' }
};

interface MemberCardProps {
  member: Member;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div
      className={`bg-zinc-900 rounded-lg p-6 border-l-4 ${beltConfig[member.belt]?.color || 'border-gray-500'} hover:translate-y-[-4px] transition-all duration-300 shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-display text-white">{member.title}</h2>
          <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mt-1 bg-zinc-800 text-gray-300`}>
            Faixa {member.belt}
          </span>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 bg-zinc-800">
          {member.coverImage && (
            <img
              src={member.coverImage}
              alt={member.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <p>Curso: <span className="text-white">{member.course}</span></p>
        <p>Início: <span className="text-white">{member.year}</span></p>
      </div>
    </div>
  );
};
