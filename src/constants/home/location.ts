import { LocationData } from "@/types/home";

export const LOCATIONS: Record<string, LocationData> = {
  labfef: {
    id: "labfef",
    title: "LABFEF - Sala Multiuso",
    address: "Av. Érico Veríssimo, 701\nCidade Universitária\nCampinas - SP",
    reference:
      "Dentro da Faculdade de Educação Física, próximo da academia de musculação.",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Av.+Érico+Veríssimo,+701+-+Geraldo,+Campinas+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  gmu: {
    id: "gmu",
    title: "GMU - Mesasino 2",
    address: "Cidade Universitária\nCampinas - SP",
    reference: "Vizinho ao estacionamento do RU",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.9937896485843!2d-47.217717!3d-22.819938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c14cf62a63fd%3A0x3948728883735b93!2sGMU%20Unicamp!5e0!3m2!1spt-BR!2sbr",
  },
};

// Guia section - FAQ Items
export const FAQ_ITEMS = [
  {
    question: "Como faço para treinar com vocês? Preciso me inscrever?",
    answer:
      "Nossa equipe é aberta para todos! Não precisa se inscrever ou ter experiência, para treinar com a gente basta ter interesse na modalidade e vir em um dos nossos treinos, onde estaremos sempre de braços abertos para recebê-los!",
  },
  {
    question: "Preciso ter um Kimono?",
    answer:
      "Se você não tiver um kimono não tem problema. Pode ir com uma roupa confortável de fazer exercício físico, de preferência sem bolsos ou zíperes.",
  },
  {
    question: "É cobrado mensalidade?",
    answer:
      "Sim, a mensalidade tem o valor de R$ 70,00. O valor é utilizado para a remuneração dos professores, DM's da modalidade, aquisição de equipamentos, manutenção do espaço, promoção de eventos, seminários e outros.",
  },
  {
    question: "O que eu preciso levar para a primeira aula?",
    answer:
      "Para sua aula experimental, venha com uma roupa confortável e resistente (camiseta e bermuda/calça de ginástica de preferência sem zíperes ou botões). Traga também uma garrafa de água.",
  },
  {
    question: "Como funcionam as graduações?",
    answer:
      "A graduação no Jiu-Jitsu é baseada no tempo de prática, evolução técnica e comportamento. As faixas seguem a ordem: Branca, Azul, Roxa, Marrom e Preta. Não tenha pressa, aproveite a jornada. Temos graduações semestrais, que são alinhadas com os professores. Os graus podem ser dados em qualquer momento ao longo do ano.",
  },
  {
    question: "Mulheres podem treinar?",
    answer:
      "Com certeza! Temos treinos específicos femininos (veja a grade de horários) e treinos mistos onde o respeito é absoluto. O Jiu-Jitsu é uma excelente ferramenta de defesa pessoal e empoderamento.",
  },
  {
    question: "Sou aluno de outro curso/instituto, posso participar?",
    answer:
      "O projeto é focado na comunidade da Unicamp (alunos, funcionários e docentes). Todos são bem-vindos a participar!",
  },
];
