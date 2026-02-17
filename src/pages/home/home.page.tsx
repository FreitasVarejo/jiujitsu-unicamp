import {
  Users,
  Loader2,
  Info,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  AccordionItem,
  SectionHeader,
  MemberCard,
  beltConfig,
} from "./_components";
import { mediaService, MemberInfo } from "@/services/mediaService";
import { data } from "@/data";

export const Home = () => {
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const diasAbreviados = ["SEG", "TER", "QUA", "QUI", "SEX"];

  const getCorTipo = (tipo: string) => {
    if (tipo === "Competição") return "text-yellow-300";
    if (tipo === "Geral") return "text-orange-300";
    if (tipo === "Feminino") return "text-red-400";
    if (tipo === "Noturno") return "text-blue-400";
    return "text-white";
  };

  const getHorarioInicioEmMinutos = (horario: string) => {
    const match = horario.match(/(\d{1,2}):(\d{2})/);
    if (!match) return Number.MAX_SAFE_INTEGER;

    const horas = Number(match[1]);
    const minutos = Number(match[2]);
    return horas * 60 + minutos;
  };

  const getTreinosPorDia = (dia: (typeof diasSemana)[number]) => {
    const diaTreino = data.horarios.find(
      (horarioDia) => horarioDia.dia === dia,
    );
    if (!diaTreino) return [];

    const treinosDia = [] as {
      tipo: string;
      horario: string;
      professor: string;
    }[];

    if (diaTreino.comp !== "-") {
      treinosDia.push({
        tipo: "Competição",
        horario: diaTreino.comp,
        professor: diaTreino.professorComp,
      });
    }

    if (diaTreino.geral !== "-") {
      treinosDia.push({
        tipo: "Geral",
        horario: diaTreino.geral,
        professor: diaTreino.professorGeral,
      });
    }

    if (diaTreino.feminino !== "-") {
      treinosDia.push({
        tipo: "Feminino",
        horario: diaTreino.feminino,
        professor: diaTreino.professorFeminino,
      });
    }

    if (diaTreino.noturno !== "-") {
      treinosDia.push({
        tipo: "Noturno",
        horario: diaTreino.noturno,
        professor: diaTreino.professorNoturno,
      });
    }

    return treinosDia.sort(
      (a, b) =>
        getHorarioInicioEmMinutos(a.horario) -
        getHorarioInicioEmMinutos(b.horario),
    );
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await mediaService.getAllMembers();
        const sorted = [...membersData].sort((a, b) => {
          const weightA = beltConfig[a.belt]?.weight || 0;
          const weightB = beltConfig[b.belt]?.weight || 0;
          return weightB - weightA;
        });
        setMembers(sorted);
      } catch (error) {
        console.error("Erro ao carregar membros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x1080/1a1a1a/d26030?text=Jiu-Jitsu+Unicamp')",
          }}
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <img
            src={mediaService.getMediaUrl("/drive/logo.webp")}
            alt="Logo Jiu-Jitsu Unicamp"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
            Jiu-Jitsu <span className="text-primary">Unicamp</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Defesa pessoal, competição e comunidade. Junte-se à equipe oficial
            da universidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#treinos"
              className="px-8 py-4 bg-primary text-white font-display uppercase tracking-widest text-lg hover:bg-orange-700 transition-colors rounded"
            >
              Ver Treinos
            </a>
            <a
              href="#perguntas-frequentes"
              className="px-8 py-4 border border-white text-white font-display uppercase tracking-widest text-lg hover:bg-white/10 transition-colors rounded"
            >
              Guia do Iniciante
            </a>
          </div>
        </div>
      </section>

      <section id="guia" className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display text-white mb-6">
            Guia do Iniciante
          </h1>
          <p className="text-xl text-gray-400">
            Tudo o que você precisa saber antes de pisar no tatame pela primeira
            vez.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 p-6 rounded-lg border-t-4 border-blue-500">
              <Info className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-display text-white mb-2">
                Primeiros Passos
              </h3>
              <p className="text-sm text-gray-400">
                Não precisa ter experiência ou condicionamento físico de atleta.
                O Jiu-Jitsu é para todos.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border-t-4 border-yellow-500">
              <AlertTriangle className="text-yellow-500 mb-4" size={32} />
              <h3 className="text-xl font-display text-white mb-2">Higiene</h3>
              <p className="text-sm text-gray-400">
                Kimonos/Roupas limpas, unhas cortadas e pés limpos são
                obrigatórios para a segurança de todos.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border-t-4 border-green-500">
              <CheckCircle className="text-green-500 mb-4" size={32} />
              <h3 className="text-xl font-display text-white mb-2">Respeito</h3>
              <p className="text-sm text-gray-400">
                Respeite os graduados, o mestre e seus parceiros e parceiras de
                treino. O ego fica fora do tatame.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="perguntas-frequentes"
              className="scroll-mt-24 text-3xl font-display text-primary mb-8 border-b border-zinc-800 pb-2"
            >
              Perguntas Frequentes
            </h2>

            <div className="space-y-2">
              <AccordionItem title="Como faço para treinar com vocês? Preciso me inscrever?">
                <p>
                  Nossa equipe é aberta para todos! Não precisa se inscrever ou
                  ter experiência, para treinar com a gente basta ter interesse
                  na modalidade e vir em um dos nossos treinos, onde estaremos
                  sempre de braços abertos para recebê-los!
                </p>
              </AccordionItem>

              <AccordionItem title="Preciso ter um Kimono?">
                <p>
                  Se você não tiver um kimono não tem problema. Pode ir com uma
                  roupa confortável de fazer exercício físico, de preferência
                  sem bolsos ou zíperes.
                </p>
              </AccordionItem>

              <AccordionItem title="É cobrado mensalidade?">
                <p>
                  Sim, a mensalidade tem o valor de R$ 70,00. O valor é
                  utilizado para a remuneração dos professores, DM's da
                  modalidade, aquisição de equipamentos, manutenção do espaço,
                  promoção de eventos, seminários e outros.
                </p>
              </AccordionItem>

              <AccordionItem title="O que eu preciso levar para a primeira aula?">
                <p>
                  Para sua aula experimental, venha com uma roupa confortável e
                  resistente (camiseta e bermuda/calça de ginástica de
                  preferência sem zíperes ou botões). Traga também uma garrafa
                  de água.
                </p>
              </AccordionItem>

              <AccordionItem title="Como funcionam as graduações?">
                <p>
                  A graduação no Jiu-Jitsu é baseada no tempo de prática,
                  evolução técnica e comportamento. As faixas seguem a ordem:
                  Branca, Azul, Roxa, Marrom e Preta. Não tenha pressa,
                  aproveite a jornada. Temos graduações semestrais, que são
                  alinhadas com os professores. Os graus podem ser dados em
                  qualquer momento ao longo do ano.
                </p>
              </AccordionItem>

              <AccordionItem title="Mulheres podem treinar?">
                <p>
                  Com certeza! Temos treinos específicos femininos (veja a grade
                  de horários) e treinos mistos onde o respeito é absoluto. O
                  Jiu-Jitsu é uma excelente ferramenta de defesa pessoal e
                  empoderamento.
                </p>
              </AccordionItem>

              <AccordionItem title="Sou aluno de outro curso/instituto, posso participar?">
                <p>
                  O projeto é focado na comunidade da Unicamp (alunos,
                  funcionários e docentes). Todos são bem-vindos a participar!
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      <section id="treinos" className="container mx-auto px-4">
        <SectionHeader title="Horários de Treino" icon={Clock} />

        <div className="md:hidden space-y-4">
          {diasSemana.map((dia) => {
            const treinosDia = getTreinosPorDia(dia);

            return (
              <div
                key={dia}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
              >
                <h3 className="font-display text-lg text-white mb-3">{dia}</h3>

                {treinosDia.length > 0 ? (
                  <div className="space-y-2">
                    {treinosDia.map((treino) => (
                      <div
                        key={`${dia}-${treino.tipo}-${treino.horario}`}
                        className="flex items-start justify-between gap-3 rounded-md bg-zinc-800/40 p-3"
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-sm font-semibold ${getCorTipo(treino.tipo)}`}
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
                {diasAbreviados.map((dia) => (
                  <th
                    key={dia}
                    className="border border-zinc-800 p-3 bg-zinc-900 text-white font-display text-lg"
                  >
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const horariosSet = new Set();
                data.horarios.forEach((item) => {
                  if (item.comp !== "-") horariosSet.add(item.comp);
                  if (item.geral !== "-") horariosSet.add(item.geral);
                  if (item.feminino !== "-") horariosSet.add(item.feminino);
                  if (item.noturno !== "-") horariosSet.add(item.noturno);
                });
                const horarios = Array.from(horariosSet).sort(
                  (a, b) =>
                    getHorarioInicioEmMinutos(a as string) -
                    getHorarioInicioEmMinutos(b as string),
                ) as string[];

                return horarios.map((horario: string) => (
                  <tr key={horario}>
                    <td className="border border-zinc-800 p-3 bg-zinc-900/50 text-white font-bold text-center">
                      {horario}
                    </td>
                    {diasSemana.map((dia) => {
                      const diaTreino = data.horarios.find(
                        (d) => d.dia === dia,
                      );
                      if (!diaTreino) return null;

                      let tipo = null;
                      let professor = "";
                      if (diaTreino.comp === horario) tipo = "Competição";
                      else if (diaTreino.geral === horario) tipo = "Geral";
                      else if (diaTreino.feminino === horario)
                        tipo = "Feminino";
                      else if (diaTreino.noturno === horario) tipo = "Noturno";

                      if (diaTreino.comp === horario)
                        professor = diaTreino.professorComp;
                      else if (diaTreino.geral === horario)
                        professor = diaTreino.professorGeral;
                      else if (diaTreino.feminino === horario)
                        professor = diaTreino.professorFeminino;
                      else if (diaTreino.noturno === horario)
                        professor = diaTreino.professorNoturno;

                      return (
                        <td
                          key={`${dia}-${horario}`}
                          className="border border-zinc-800 p-3 text-center bg-zinc-900/30"
                        >
                          {tipo && (
                            <div className="flex flex-col items-center justify-center gap-1">
                              <span
                                className={`text-base font-semibold ${getCorTipo(tipo)}`}
                              >
                                {tipo === "Geral" ? "GERAL" : tipo}
                              </span>
                              <span className="text-xs text-gray-400 leading-none">
                                ({professor})
                              </span>
                            </div>
                          )}
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

      <section className="container mx-auto px-4">
        <SectionHeader title="Nossa Equipe" icon={Users} />

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
