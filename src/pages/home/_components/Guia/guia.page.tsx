import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { AccordionItem } from "./";

const Guia = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display text-white mb-6">
          Guia do Iniciante
        </h1>
        <p className="text-xl text-gray-400">
          Tudo o que você precisa saber antes de pisar no tatame pela primeira
          vez.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-zinc-900 p-6 rounded-lg border-t-4 border-blue-500">
          <Info className="text-blue-500 mb-4" size={32} />
          <h3 className="text-xl font-display text-white mb-2">
            Primeiros Passos
          </h3>
          <p className="text-sm text-gray-400">
            Não precisa ter experiência ou condicionamento físico de atleta. O
            Jiu-Jitsu é para todos.
          </p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg border-t-4 border-yellow-500">
          <AlertTriangle className="text-yellow-500 mb-4" size={32} />
          <h3 className="text-xl font-display text-white mb-2">Higiene</h3>
          <p className="text-sm text-gray-400">
            Kimonos/Roupas limpas, unhas cortadas e pés limpos são obrigatórios
            para a segurança de todos.
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

      <h2 className="text-3xl font-display text-primary mb-8 border-b border-zinc-800 pb-2">
        Perguntas Frequentes
      </h2>

      <div className="space-y-2">
        <AccordionItem title="Como faço para treinar com vocês? Preciso me inscrever?">
          <p>
            Nossa equipe é aberta para todos! Não precisa se inscrever ou ter
            experiência, para treinar com a gente basta ter interesse na
            modalidade e vir em um dos nossos treinos, onde estaremos sempre de
            braços abertos para recebê-los!
          </p>
        </AccordionItem>

        <AccordionItem title="Preciso ter um Kimono?">
          <p>
            Se você não tiver um kimono não tem problema. Pode ir com uma roupa
            confortável de fazer exercício físico, de preferência sem bolsos ou
            zíperes.
          </p>
        </AccordionItem>

        <AccordionItem title="É cobrado mensalidade?">
          <p>
            Sim, a mensalidade tem o valor de R$ 70,00. O valor é utilizado para
            a remuneração dos professores, DM's da modalidade, aquisição de
            equipamentos, manutenção do espaço, promoção de eventos, seminários
            e outros.
          </p>
        </AccordionItem>

        <AccordionItem title="O que eu preciso levar para a primeira aula?">
          <p>
            Para sua aula experimental, venha com uma roupa confortável e
            resistente (camiseta e bermuda/calça de ginástica de preferência sem
            zíperes ou botões). Traga também uma garrafa de água.
          </p>
        </AccordionItem>

        <AccordionItem title="Como funcionam as graduações?">
          <p>
            A graduação no Jiu-Jitsu é baseada no tempo de prática, evolução
            técnica e comportamento. As faixas seguem a ordem: Branca, Azul,
            Roxa, Marrom e Preta. Não tenha pressa, aproveite a jornada. Temos
            graduações semestrais, que são alinhadas com os professores. Os
            graus podem ser dados em qualquer momento ao longo do ano.
          </p>
        </AccordionItem>

        <AccordionItem title="Mulheres podem treinar?">
          <p>
            Com certeza! Temos treinos específicos femininos (veja a grade de
            horários) e treinos mistos onde o respeito é absoluto. O Jiu-Jitsu é
            uma excelente ferramenta de defesa pessoal e empoderamento.
          </p>
        </AccordionItem>

        <AccordionItem title="Sou aluno de outro curso/instituto, posso participar?">
          <p>
            O projeto é focado na comunidade da Unicamp (alunos, funcionários e
            docentes). Todos são bem-vindos a participar!
          </p>
        </AccordionItem>
      </div>
    </div>
  );
};

export default Guia;
