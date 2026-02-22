import { Instructor } from '@/types/media';
import { BELT_INFO } from '@/constants';

interface InstructorCardProps {
  instructor: Instructor;
}

export const InstructorCard = ({ instructor }: InstructorCardProps) => {
  return (
    <div
      className={`bg-zinc-900 rounded-lg p-6 border-l-4 ${BELT_INFO[instructor.belt].color || 'border-gray-500'} hover:translate-y-[-4px] transition-all duration-300 shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-display text-white">{instructor.title}</h2>
          <span
            className="inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mt-1 bg-zinc-800 text-gray-300"
          >
            Faixa {instructor.belt}
          </span>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 bg-zinc-800">
          {instructor.photo.url && (
            <img
              src={instructor.photo.url}
              alt={instructor.photo.alternativeText || instructor.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <p>
          Curso: <span className="text-white">{instructor.course}</span>
        </p>
        <p>
          Início: <span className="text-white">{instructor.year}</span>
        </p>
      </div>
    </div>
  );
};
