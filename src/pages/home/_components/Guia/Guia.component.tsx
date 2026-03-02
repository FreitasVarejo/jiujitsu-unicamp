import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { InfoCard } from "./InfoCard.component";
import { FAQ } from "./FAQ.component";

const infoCards = [
  {
    icon: Info,
    title: "Primeiros Passos",
    description: "Não precisa ter experiência ou condicionamento físico de atleta. O Jiu-Jitsu é para todos.",
    borderColor: "border-blue-500",
    iconColor: "text-blue-500",
  },
  {
    icon: AlertTriangle,
    title: "Higiene",
    description: "Kimonos/Roupas limpas, unhas cortadas e pés limpos são obrigatórios para a segurança de todos.",
    borderColor: "border-yellow-500",
    iconColor: "text-yellow-500",
  },
  {
    icon: CheckCircle,
    title: "Respeito",
    description: "Respeite os graduados, o mestre e seus parceiros e parceiras de treino. O ego fica fora do tatame.",
    borderColor: "border-green-500",
    iconColor: "text-green-500",
  },
];

const faqItems = [
  {
    question: "Como faço para treinar com vocês? Preciso me inscrever?",
    answer: "Nossa equipe é aberta para todos! Não precisa se inscrever ou ter experiência, para treinar com a gente basta ter interesse na modalidade e vir em um dos nossos treinos, onde estaremos sempre de braços abertos para recebê-los!",
  },
  {
    question: "Preciso ter um Kimono?",
    answer: "Se você não tiver um kimono não tem problema. Pode ir com uma roupa confortável de fazer exercício físico, de preferência sem bolsos ou zíperes.",
  },
  {
    question: "É cobrado mensalidade?",
    answer: "Sim, a mensalidade tem o valor de R$ 70,00. O valor é utilizado para a remuneração dos professores, DM's da modalidade, aquisição de equipamentos, manutenção do espaço, promoção de eventos, seminários e outros.",
  },
  {
    question: "O que eu preciso levar para a primeira aula?",
    answer: "Para sua aula experimental, venha com uma roupa confortável e resistente (camiseta e bermuda/calça de ginástica de preferência sem zíperes ou botões). Traga também uma garrafa de água.",
  },
  {
    question: "Como funcionam as graduações?",
    answer: "A graduação no Jiu-Jitsu é baseada no tempo de prática, evolução técnica e comportamento. As faixas seguem a ordem: Branca, Azul, Roxa, Marrom e Preta. Não tenha pressa, aproveite a jornada. Temos graduações semestrais, que são alinhadas com os professores. Os graus podem ser dados em qualquer momento ao longo do ano.",
  },
  {
    question: "Mulheres podem treinar?",
    answer: "Com certeza! Temos treinos específicos femininos (veja a grade de horários) e treinos mistos onde o respeito é absoluto. O Jiu-Jitsu é uma excelente ferramenta de defesa pessoal e empoderamento.",
  },
  {
    question: "Sou aluno de outro curso/instituto, posso participar?",
    answer: "O projeto é focado na comunidade da Unicamp (alunos, funcionários e docentes). Todos são bem-vindos a participar!",
  },
];

export const Guia = () => {
  return (
    <section id="guia" className="container py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display text-white mb-6">
          Guia do Iniciante
        </h1>
        <p className="text-xl text-gray-400">
          Tudo o que você precisa saber antes de pisar no tatame pela primeira vez.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          {infoCards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>

        <div className="lg:col-span-8">
          <h2
            id="perguntas-frequentes"
            className="scroll-mt-24 text-3xl font-display text-primary mb-8 border-b border-zinc-800 pb-2"
          >
            Perguntas Frequentes
          </h2>

          <FAQ items={faqItems} />
        </div>
      </div>
    </section>
  );
};
