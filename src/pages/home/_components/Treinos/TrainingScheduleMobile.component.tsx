import { TrainingSchedule } from "@/types/media";
import { Weekday, WEEKDAY_INFO, WEEKDAYS } from "@/constants";
import { getTreinosPorDia } from "./trainings.utils";

interface TrainingScheduleMobileProps {
  trainings: TrainingSchedule[];
}

export const TrainingScheduleMobile = ({ trainings }: TrainingScheduleMobileProps) => {
  return (
    <div className="md:hidden space-y-4">
      {WEEKDAYS.map((dia: Weekday) => {
        const treinosDia = getTreinosPorDia(trainings, dia);

        return (
          <div
            key={dia}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
          >
            <h3 className="font-display text-lg text-white mb-3">
              {WEEKDAY_INFO[dia].label}
            </h3>

            {treinosDia.length > 0 ? (
              <div className="space-y-2">
                {treinosDia.map((treino) => (
                  <div
                    key={`${dia}-${treino.tipo}-${treino.horario}`}
                    className="flex items-start justify-between gap-3 rounded-md bg-zinc-800/40 p-3"
                  >
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-semibold ${treino.cor}`}
                      >
                        {treino.tipo === "Geral" ? "GERAL" : treino.tipo}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({treino.professor})
                      </span>
                    </div>
                    <span className="text-sm text-white font-medium">
                      {treino.horario}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Sem treino neste dia.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
