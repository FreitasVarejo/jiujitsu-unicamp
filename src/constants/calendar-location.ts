export enum CalendarLocation {
  LABFEF = 'labfef',
  GMU = 'gmu',
}

export const CALENDAR_LOCATION_INFO: Record<
  CalendarLocation,
  { id: string; label: string; fullAddress: string }
> = {
  [CalendarLocation.LABFEF]: {
    id: 'LABFEF',
    label: 'LABFEF',
    fullAddress: 'Faculdade de Educação Física da Unicamp, Av. Érico Veríssimo, 701 - Geraldo, Campinas - SP, 13083-851, Brasil',
  },
  [CalendarLocation.GMU]: {
    id: 'GMU',
    label: 'GMU',
    fullAddress: 'GMU - Ginásio Multidisciplinar da Unicamp - Cidade Universitária, Campinas - SP, 13083-854, Brasil',
  },
};

/**
 * Mapeamento inverso: full address → CalendarLocation enum
 * Utilizado para lookup rápido durante o processamento de eventos.
 */
export const ADDRESS_TO_LOCATION: Record<string, CalendarLocation> = {
  [CALENDAR_LOCATION_INFO[CalendarLocation.LABFEF].fullAddress]: CalendarLocation.LABFEF,
  [CALENDAR_LOCATION_INFO[CalendarLocation.GMU].fullAddress]: CalendarLocation.GMU,
};
