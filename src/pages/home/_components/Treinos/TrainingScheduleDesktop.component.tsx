import { TrainingSchedule } from "@/types/media";
import { Weekday, WEEKDAY_INFO, WEEKDAYS, TRAINING_TYPE_INFO } from "@/constants";
import { getHorariosUnicos } from "./trainings.utils";

interface TrainingScheduleDesktopProps {
  trainings: TrainingSchedule[];
}

export const TrainingScheduleDesktop = ({ trainings }: TrainingScheduleDesktopProps) => {
  const horarios = getHorariosUnicos(trainings);

  return (
    <div className="hidden md:block w-full overflow-x-auto">
      <table className="w-full border-collapse border border-zinc-800 table-fixed">
        <thead>
          <tr>
            <th
              className="border border-zinc-800 p-3 bg-zinc-900 text-white font-display text-lg"
              style={{ width: "150px" }}
            >
              Horários / Dias
            </th>
            {WEEKDAYS.map((dia) => (
              <th
                key={dia}
                className="border border-zinc-800 p-3 bg-zinc-900 text-white font-display text-lg"
              >
                {WEEKDAY_INFO[dia].short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario: string) => (
            <tr key={horario}>
              <td className="border border-zinc-800 p-3 bg-zinc-900/50 text-white font-bold text-center">
                {horario}
              </td>
              {WEEKDAYS.map((dia: Weekday) => {
                const treino = trainings.find(
                  (h) => h.weekday === dia && h.startTime === horario,
                );

                if (!treino) {
                  return (
                    <td
                      key={`${dia}-${horario}`}
                      className="border border-zinc-800 p-3 text-center bg-zinc-900/30"
                    />
                  );
                }

                const info = TRAINING_TYPE_INFO[treino.category];
                const professor = treino.member;

                return (
                  <td
                    key={`${dia}-${horario}`}
                    className="border border-zinc-800 p-3 text-center bg-zinc-900/30"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span
                        className={`text-base font-semibold ${info.color}`}
                      >
                        {info.label === "Geral" ? "GERAL" : info.label}
                      </span>
                      <span className="text-xs text-gray-400 leading-none">
                        ({professor})
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
