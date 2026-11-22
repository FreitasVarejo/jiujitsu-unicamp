import { CSSProperties } from "react";
import { BELT_INFO } from "@/constants/home";
import { Instructor } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <Card
      className={cn(
        "gap-4 rounded-lg border-l-4 shadow-lg ring-0 transition-all duration-300 [--card-spacing:--spacing(6)] hover:-translate-y-1",
        BELT_INFO[instructor.belt].color || "border-gray-500"
      )}
    >
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle
            role="heading"
            aria-level={2}
            className="text-2xl leading-8 text-white"
          >
            {instructor.title}
          </CardTitle>
          <Badge
            variant="secondary"
            className="mt-1 h-auto rounded-sm bg-zinc-800 px-2 py-1 font-bold tracking-wider text-gray-300 uppercase"
          >
            Faixa {BELT_INFO[instructor.belt].label}
          </Badge>
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
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-gray-400">
        <p>
          Curso: <span className="text-white">{instructor.course}</span>
        </p>
        <p>
          Início: <span className="text-white">{instructor.year}</span>
        </p>
      </CardContent>
    </Card>
  );
};
