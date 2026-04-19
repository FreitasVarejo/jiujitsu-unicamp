export interface LocationData {
  id: string;
  title: string;
  address: string;
  reference: string;
  mapsEmbedUrl: string;
}

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
