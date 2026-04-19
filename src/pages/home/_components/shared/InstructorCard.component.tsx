import { CSSProperties } from "react";
import { Instructor } from "@/types/media";
import { BELT_INFO } from "@/constants";

interface InstructorCardProps {
  instructor: Instructor;
}

const imgStyle = (
  focalPoint: Instructor["photo"]["focalPoint"]
): CSSProperties => ({
  objectFit: "cover",
  objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : "center",
});

export const InstructorCard = ({ instructor }: InstructorCardProps) => {
  return (
    <div
      className={`rounded-lg border-l-4 bg-zinc-900 p-6 ${BELT_INFO[instructor.belt].color || "border-gray-500"} shadow-lg transition-all duration-300 hover:translate-y-[-4px]`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="font-display text-2xl text-white">
            {instructor.title}
          </h2>
          <span className="mt-1 inline-block rounded bg-zinc-800 px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-300">
            Faixa {BELT_INFO[instructor.belt].label}
          </span>
        </div>
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-800">
          {instructor.photo.url && (
            <img
              src={instructor.photo.url}
              alt={instructor.photo.alternativeText || instructor.title}
              className="h-full w-full"
              style={imgStyle(instructor.photo.focalPoint)}
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
