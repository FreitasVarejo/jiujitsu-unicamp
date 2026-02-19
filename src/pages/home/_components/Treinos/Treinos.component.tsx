import { Clock, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "../shared";
import { useTrainings } from "./useTrainings.hook";
import { TrainingScheduleMobile } from "./TrainingScheduleMobile.component";
import { TrainingScheduleDesktop } from "./TrainingScheduleDesktop.component";

export const Treinos = () => {
  const { trainings, loading } = useTrainings();

  return (
    <div className="flex flex-col gap-16 py-12">
      <section className="container mx-auto px-4">
        <SectionHeader title="Horários de Treino" icon={Clock} />

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <TrainingScheduleMobile trainings={trainings} />
            <TrainingScheduleDesktop trainings={trainings} />
          </>
        )}
      </section>
    </div>
  );
};
