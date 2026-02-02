export interface Membro {
  nome: string;
  faixa: 'Preta' | 'Marrom' | 'Roxa' | 'Azul' | 'Branca';
  foto: string;
  ano: string;
  curso: string;
  medalhas: {
    ouro: number;
    prata: number;
    bronze: number;
  };
}

export interface Produto {
  nome: string;
  preco: string;
  categoria?: string;
  obs?: string;
}

export interface HorarioDiurno {
  dia: string;
  comp: string;
  geral: string;
  feminino: string;
}

export interface HorarioNoturno {
  dia: string;
  hora: string;
  tipo: string;
}

export interface Evento {
  id: string;
  nome: string;
  data: string;
  local: string;
  descricao: string;
  thumbnail: string;
}

export interface SiteData {
  equipe: Membro[];
  produtos: Produto[];
  horarios: {
    diurnos: HorarioDiurno[];
    noturnos: HorarioNoturno[];
  };
}

export const data: SiteData = {
  "equipe": [
    { "nome": "Pablo Viana", "faixa": "Preta", "foto": "professores-profile-pic/pablo-lr.png", "ano": "2022", "curso": "Educação Física", "medalhas": { "ouro": 3, "prata": 1, "bronze": 0 } },
    { "nome": "Lucas Senno", "faixa": "Marrom", "foto": "professores-profile-pic/senno-lr.png", "ano": "2024", "curso": "Ciência da Computação", "medalhas": { "ouro": 1, "prata": 2, "bronze": 1 } },
    { "nome": "Vitor Takahashi", "faixa": "Roxa", "foto": "professores-profile-pic/vitor-lr.png", "ano": "2022", "curso": "Ciência da Computação", "medalhas": { "ouro": 0, "prata": 1, "bronze": 1 } },
    { "nome": "Kauã Nunes", "faixa": "Roxa", "foto": "professores-profile-pic/kaua-lr.png", "ano": "2025", "curso": "Economia", "medalhas": { "ouro": 2, "prata": 0, "bronze": 0 } },
    { "nome": "Rayla", "faixa": "Azul", "foto": "professores-profile-pic/rayla-lr.png", "ano": "2022", "curso": "Educação Física", "medalhas": { "ouro": 0, "prata": 0, "bronze": 1 } }
  ],
  "produtos": [
    { "nome": "Rashguard BJJ Unicamp", "preco": "R$ 150,00", "categoria": "Equipamento" },
    { "nome": "Camiseta BJJ Unicamp", "preco": "R$ 80,00", "categoria": "Vestuário" },
    { "nome": "Rashguard Instinto", "preco": "R$ 160,00", "obs": "Design por João Gondim" }
  ],
  "horarios": {
    "diurnos": [
      { "dia": "Segunda", "comp": "10:30-11:30", "geral": "12:00-13:30", "feminino": "-" },
      { "dia": "Terça", "comp": "-", "geral": "12:00-13:30", "feminino": "10:30-11:30" },
      { "dia": "Quarta", "comp": "10:30-11:30", "geral": "12:00-13:30", "feminino": "-" },
      { "dia": "Quinta", "comp": "-", "geral": "12:00-13:30", "feminino": "-" },
      { "dia": "Sexta", "comp": "12:00-13:30", "geral": "-", "feminino": "14:30-15:30" }
    ],
    "noturnos": [
      { "dia": "Quarta-feira", "hora": "21:00 às 22:30", "tipo": "Geral" },
      { "dia": "Quinta-feira", "hora": "20:00 às 21:30", "tipo": "Geral" }
    ]
  }
};
