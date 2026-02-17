export interface Horario {
  dia: string;
  comp: string;
  geral: string;
  feminino: string;
  noturno: string;
  professorComp: string;
  professorGeral: string;
  professorFeminino: string;
  professorNoturno: string;
}

export interface SiteData {
  horarios: Horario[];
}

export const data: SiteData = {
  horarios: [
    {
      dia: "Segunda",
      comp: "10:30-11:30",
      geral: "12:00-13:30",
      feminino: "-",
      noturno: "-",
      professorComp: "Kauã Nunes",
      professorGeral: "Pablo Viana",
      professorFeminino: "-",
      professorNoturno: "-",
    },
    {
      dia: "Terça",
      comp: "-",
      geral: "12:00-13:30",
      feminino: "10:30-11:30",
      noturno: "-",
      professorComp: "-",
      professorGeral: "Lucas Senno",
      professorFeminino: "Rayla",
      professorNoturno: "-",
    },
    {
      dia: "Quarta",
      comp: "10:30-11:30",
      geral: "12:00-13:30",
      feminino: "-",
      noturno: "21:00-22:30",
      professorComp: "Kauã Nunes",
      professorGeral: "Pablo Viana",
      professorFeminino: "-",
      professorNoturno: "Vitor Takahashi",
    },
    {
      dia: "Quinta",
      comp: "-",
      geral: "12:00-13:30",
      feminino: "-",
      noturno: "20:00-21:30",
      professorComp: "-",
      professorGeral: "Lucas Senno",
      professorFeminino: "-",
      professorNoturno: "Vitor Takahashi",
    },
    {
      dia: "Sexta",
      comp: "-",
      geral: "13:00-13:30",
      feminino: "14:30-15:30",
      noturno: "-",
      professorComp: "-",
      professorGeral: "Pablo Viana",
      professorFeminino: "Rayla",
      professorNoturno: "-",
    },
  ],
};

