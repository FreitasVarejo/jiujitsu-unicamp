import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { InfoCard } from "./InfoCard.component";
import { FAQ } from "./FAQ.component";
import { FAQ_ITEMS } from "@/constants/home";

const infoCards = [
  {
    icon: Info,
    title: "Primeiros Passos",
    description:
      "Não precisa ter experiência ou condicionamento físico de atleta. O Jiu-Jitsu é para todos.",
    borderColor: "border-blue-500",
    iconColor: "text-blue-500",
  },
  {
    icon: AlertTriangle,
    title: "Higiene",
    description:
      "Kimonos/Roupas limpas, unhas cortadas e pés limpos são obrigatórios para a segurança de todos.",
    borderColor: "border-yellow-500",
    iconColor: "text-yellow-500",
  },
  {
    icon: CheckCircle,
    title: "Respeito",
    description:
      "Respeite os graduados, o mestre e seus parceiros e parceiras de treino. O ego fica fora do tatame.",
    borderColor: "border-green-500",
    iconColor: "text-green-500",
  },
];

export const Guia = () => {
  return (
    <section id="guia" className="container py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-display text-5xl text-white">
          Guia do Iniciante
        </h1>
        <p className="text-xl text-gray-400">
          Tudo o que você precisa saber antes de pisar no tatame pela primeira
          vez.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          {infoCards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>

        <div className="lg:col-span-8">
          <h2
            id="perguntas-frequentes"
            className="mb-8 scroll-mt-24 border-b border-zinc-800 pb-2 font-display text-3xl text-primary"
          >
            Perguntas Frequentes
          </h2>

          <FAQ items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
};
