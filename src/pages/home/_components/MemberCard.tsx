import { Medal } from 'lucide-react';
import { Membro } from '@/data';
import { mediaService } from '@/services/mediaService';

export const beltConfig: Record<Membro['faixa'], { weight: number, color: string }> = {
  'Preta': { weight: 5, color: 'border-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]' },
  'Marrom': { weight: 4, color: 'border-amber-900' },
  'Roxa': { weight: 3, color: 'border-purple-700' },
  'Azul': { weight: 2, color: 'border-blue-600' },
  'Branca': { weight: 1, color: 'border-white' }
};

interface MemberCardProps {
  member: Membro;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div
      className={`bg-zinc-900 rounded-lg p-6 border-l-4 ${beltConfig[member.faixa]?.color || 'border-gray-500'} hover:translate-y-[-4px] transition-all duration-300 shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-display text-white">{member.nome}</h2>
          <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mt-1 bg-zinc-800 text-gray-300`}>
            Faixa {member.faixa}
          </span>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 bg-zinc-800">
          <img
            src={mediaService.getMediaUrl(member.foto)}
            alt={member.nome}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-2 mb-6 text-sm text-gray-400">
        <p>Curso: <span className="text-white">{member.curso}</span></p>
        <p>Início: <span className="text-white">{member.ano}</span></p>
      </div>

      <div className="border-t border-zinc-800 pt-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-1" title="Ouro">
            <Medal className="text-yellow-400" size={18} />
            <span className="font-bold text-white">{member.medalhas.ouro}</span>
          </div>
          <div className="flex items-center gap-1" title="Prata">
            <Medal className="text-gray-300" size={18} />
            <span className="font-bold text-white">{member.medalhas.prata}</span>
          </div>
          <div className="flex items-center gap-1" title="Bronze">
            <Medal className="text-amber-700" size={18} />
            <span className="font-bold text-white">{member.medalhas.bronze}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
