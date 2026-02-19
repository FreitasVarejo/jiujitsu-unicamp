import { MapPin, Clock, ArrowRight } from "lucide-react";
import { data } from "@/data";
import { SectionHeader } from "../SectionHeader";
import { Link } from "react-router-dom";
import { Weekday, WEEKDAY_INFO, WEEKDAYS, TRAINING_TYPE_INFO } from "@/constants";

const Treinos = () => {

  const getHorarioInicioEmMinutos = (horario: string) => {
    const match = horario.match(/(\d{1,2}):(\d{2})/);
    if (!match) return Number.MAX_SAFE_INTEGER;

    const horas = Number(match[1]);
    const minutos = Number(match[2]);
    return horas * 60 + minutos;
  };

  const getTreinosPorDia = (dia: Weekday) => {
    return data.horarios
      .filter((h) => h.weekday === dia)
      .map((h) => ({
        tipo: TRAINING_TYPE_INFO[h.category].label,
        cor: TRAINING_TYPE_INFO[h.category].color,
        horario: h.startTime,
        professor: h.member,
      }))
      .sort(
        (a, b) =>
          getHorarioInicioEmMinutos(a.horario) -
          getHorarioInicioEmMinutos(b.horario),
      );
  };


  return (
    <div className="flex flex-col gap-16 py-12">
      {/* 1. Horários de Treinos */}
      <section className="container mx-auto px-4">
        <SectionHeader title="Horários de Treino" icon={Clock} />

        <div className="md:hidden space-y-4">
          {WEEKDAYS.map((dia) => {
            const treinosDia = getTreinosPorDia(dia);

            return (
              <div
                key={dia}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
              >
                <h3 className="font-display text-lg text-white mb-3">{WEEKDAY_INFO[dia].label}</h3>


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
                  <p className="text-sm text-gray-500">Sem treino neste dia.</p>
                )}
              </div>
            );
          })}
        </div>

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
              {(() => {
                const horariosSet = new Set<string>();
                data.horarios.forEach((item) => {
                  horariosSet.add(item.startTime);
                });
                const horarios = Array.from(horariosSet).sort(
                  (a, b) =>
                    getHorarioInicioEmMinutos(a) -
                    getHorarioInicioEmMinutos(b),
                );

                return horarios.map((horario: string) => (
                  <tr key={horario}>
                    <td className="border border-zinc-800 p-3 bg-zinc-900/50 text-white font-bold text-center">
                      {horario}
                    </td>
                    {WEEKDAYS.map((dia) => {
                      const treino = data.horarios.find(
                        (h) => h.weekday === dia && h.startTime === horario,
                      );

                      if (!treino) return (
                        <td
                          key={`${dia}-${horario}`}
                          className="border border-zinc-800 p-3 text-center bg-zinc-900/30"
                        />
                      );

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
                ));
              })()}

            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Localização */}
      <section className="container mx-auto px-4">
        <SectionHeader title="Localização" icon={MapPin} />

        <div className="grid md:grid-cols-3 gap-8 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
          <div className="p-8 col-span-1 flex flex-col justify-center">
            <h3 className="text-2xl font-display text-white mb-2">
              Ginásio da FEF
            </h3>
            <p className="text-gray-400 mb-6">
              Av. Érico Veríssimo, 701
              <br />
              Cidade Universitária
              <br />
              Campinas - SP
            </p>
            <p className="text-sm text-gray-500 italic">
              Dentro da Faculdade de Educação Física, próximo ao bandejão.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 h-64 md:h-auto min-h-[300px]">
            <iframe
              src="https://maps.google.com/maps?q=Av.+Érico+Veríssimo,+701+-+Geraldo,+Campinas+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden={false}
              tabIndex={0}
              className="filter grayscale invert contrast-125 brightness-75 hover:filter-none transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 3. Aviso Novo no Tatame */}
      <section className="container mx-auto px-4">
        <div className="bg-zinc-900 border-l-4 border-primary p-8 rounded-r-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-display text-white mb-2">
                Novo no Tatame?
              </h2>
              <p className="text-gray-400">
                Preparamos um guia completo para iniciantes. O que levar, como
                se comportar e o que esperar do primeiro treino.
              </p>
            </div>
            <Link
              to="/guia"
              className="flex items-center gap-2 text-primary hover:text-white transition-colors font-bold uppercase whitespace-nowrap"
            >
              Ler o Guia Completo <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treinos;
