import { Clock, Loader2, AlertCircle } from "lucide-react";
import { SectionHeader } from "../shared";
import { useTrainings } from "./useTrainings.hook";
import { TrainingScheduleMobile } from "./TrainingScheduleMobile.component";
import { TrainingScheduleDesktop } from "./TrainingScheduleDesktop.component";

export const Treinos = () => {
  const { trainings, loading, error } = useTrainings();

  return (
    <div className="flex flex-col gap-16 py-12">
      <section className="container mx-auto px-4">
        <SectionHeader title="Horários de Treino" icon={Clock} />

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
          <>
            <TrainingScheduleMobile trainings={trainings} />
            <TrainingScheduleDesktop trainings={trainings} />
          </>
        )}
      </section>
    </div>
  );
};
