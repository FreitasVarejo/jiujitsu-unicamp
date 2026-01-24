import { TeamMember, Product, Event, ScheduleItem } from './types';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Nosso Time', href: '#time' },
  { label: 'Contato', href: '#contato' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rashguard Oficial V1',
    category: 'Equipamento',
    price: 'R$ 159,90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn-beodRMPoMgedtOtDWAwX68aOH1DzSukhYMvBfEjYaOjIxxEAjGBaCa_jGHlBo5tbDqT0X4Zkx6WQywYxwtV2uNIvJFl7_2v94Hoc_RnzUESD16cXsiX3qrGNaEJILh6IAWYoiPSRhjVSOrauemae0ghbfy_t8zIGDsAhTsD8z7vG4t8XJnzAL5hAl6K4-OMuMhaTYen58zQt_bfUmEYj6ZQaf1lWh1h2LSe8QMpdhn6z9M2TeLJ0ehuPoHC-QLMJ2Ue6YfYvAEc'
  },
  {
    id: '2',
    name: 'Camiseta Algodão Premium',
    category: 'Casual',
    price: 'R$ 59,90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAewVwXbNZEkC4NcPq5OslhIJGKD_W9EFB5ovRVGFdGOuhsnUXaU_0adC77zmyMdzjvReVn-6ho7vtrf7O1PnNhdszKyLKON9K-eQFcyuzg6Hbr_8GdperrUz6TpuPfI3val7U3_3hZbwKZ5eVcNVAuea_vcliRzLmJ6dxi85G6I5OSj7tF4QrVjIgX8n-tP0oS1wNqQuvOsOpi8apRG602EZh3STX4uajRkjLP13b5QFtGkuh7d-O3onCJvW6eyBShx4gvIkm-odTq'
  },
  {
    id: '3',
    name: 'Kimono Bordado Heavyweight',
    category: 'Treino',
    price: 'R$ 380,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7jn4SA18r0CnsNH9ucdfEEvJwpVZXLzkiCHwxDgoh3tcER3UcfdViM-Yxl7mVSFlRkoGvlX0D1vk3W9GItuaul5g-PPMgfJjV5elpCQviOOuW2HXbF8N9gVzXtyMdPpEJFD5nU4DFW7-Qwutwwjher72LZIKCCsgZPb3wyUzMtW4L_xuSLnOI0V35-fQSiP7Cd5HB6uuBUErYw2quXE_kIcI6tLbMZoHslMGOExGUKFYusRy8McdGhQVzS53QSHwphsic9NocJaZS'
  },
  {
    id: '4',
    name: 'Moletom Equipe Unicamp',
    category: 'Inverno',
    price: 'R$ 189,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKajY2xjuDx9F8I1Pih7djc8SCGzDEPA5vAz1uYZhrOjxlVPiBLeryIYeHY6BZJJ3mMGjl9cwktrJTcug_mbRH1Ab3vm938YfSwbJS5Dnaxtypdnz0GGmqx37x-DBfoxPjVpNk_VgS33Nh7wLuLmYVZ4Xry7wLHmDvTFe4jlOBjJ6C9gAseSeDsAjYzCSoB_sztBhxI6hGpEv3RnwL6xiCJI_yJ8H2l6AjE9jFjjH8XZp09l6fWy8qqNjrCYbNacSjd4b3TZNcQEbf'
  },
  {
    id: '5',
    name: 'Rashguard Oficial V2',
    category: 'Equipamento',
    price: 'R$ 159,90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhKJVpXdrV0VDiACVeInxYpbI3SKkxaf_90r3kSKnUuxy5qE4jZQdaoUpC52vA4koIXe8qZAJLuP7O1BhpDcHRuvLOYeNkiAOAVj8gUUwWzztkkrhOL8JNe57GHm2Sa7bZRyKhKeLZKuIDkHlynBPkO-j9eYPuxWI95ysl7_KgYsS9mXWDfWYy8j9TQMnvM8UWZRdPs3jXZVcOER8NItjPjl8muqy1oxzQk_o3FK02La1CPmjinkQzb093MMGP_IWZz1qquKgdRF8'
  },
  {
    id: '6',
    name: 'Camiseta Branca Training',
    category: 'Casual',
    price: 'R$ 59,90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTkMEZkHkVk249LFGVKhPP8vGw5gcMITzuGwbEyd4DfjopSI_WP3FxqtZxq_0du1AuhCNf-fccH93XORNdUSYct-Uw1q1fLqVsGQoPEMovTkA2C51vnrnzkM267YO099JPZddQcBWWy-D-GIeFX0AVrb3KH9K4L0N-GWPnw024Z3t_FMUdxvGpJQMJql0AK6OXJeJ6myC82TywE5sOWsoGBqDSWqyy-lJMhzWXDGg0VW6mhZiCoQE30B7LTDrhDYwcwrV_Nn5ESBQ'
  }
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Inter-Unicamp 2023',
    subtitle: 'Ouro por Equipes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZFTzXGUeW-J4LRJg3O2l66axB1RT9GcnhsprJrP69-sksHZzN6jUcgk1A0yGZQnSHuhLTGIxah_f8X1wNKLR9IgQ4YeJqdF9sZvFB2YUpcFeRR3y9oIL_PbnMuwZEzoBVD76qt7Wle5UTo-DgvF0Yg5LOuseg9CLp65Qy9thF7u56SkYcKnL5meBX0J8ZK2PXQtAMTcXbOgLDJLrf5qeX3VZPocNHICB2o58AtI0ljbvb3lneIotzF9yppUC9Faa96pckCkM6L_fL'
  },
  {
    id: '2',
    title: 'Seminário Graduação',
    subtitle: 'Dezembro 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAw98TsWGuGTg0iM_35LIzJ7Iwqs6L8qtTSDO1VjTaYHcf4Cel7xpAosXFIGY_b1CzXpe-Dy0dgAyQDapY4JO4D2VtmGNG-s2xnsNb43bjZ0Jh8Jk5Q1ZT0sgiwM8fAqaZbSHk83it3rXo1M55A0ZqrZ3dzAlCtLholtfVWbKUCR_k9zA1KAj2DCETwKD4EVI63yotSW46tSYhKQI3WGAZM-AY9mb6Zp0si_0cfdQqssRCrjz032EF4UtDxl-jgnJR0bDfMuyfDOPc'
  },
  {
    id: '3',
    title: 'Treino de Carnaval',
    subtitle: 'Integração',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA21HExHhcXRfwLwC3dDXFYp0THe5NoZpNlmmbF6BzGJJ0-LhLrNy2cccNBnbaLFBUn01AoyNHLsyChJRL6nD-pm96FdI3ReZ3mmuM8SwsxcjFo41kcozTAvPWdFuu33zLlbzbGylOkGqnhIv1FX8D4HxBeABOfo8cUcfs4rgNot-Zto5UQvtmLdiiQQOZLZgqxZvSD9MflqeETXTHuGAFdqd3WSzxTOgpsC6OOyKmIKwLT2E3fag7KnH3MbVflfor9BBNCMhQEQLF4'
  }
];

export const SCHEDULE: ScheduleItem[] = [
  { time: '12:15 - 13:45', mwf: 'Treino Aberto (Kimono)', tt: 'No-Gi (Submission)' },
  { time: '17:30 - 19:00', mwf: 'Turma Iniciante', tt: 'Treino Competitivo' },
  { time: '19:00 - 20:30', mwf: 'Intermediário / Avançado', tt: 'Iniciantes + Drill' },
];

export const TEAM: TeamMember[] = [
  {
    id: 'pablo',
    name: 'Pablo Viana',
    role: 'Professor',
    belt: 'Faixa Preta',
    course: 'Educação Física 2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA99xCxz8wfF7TMBO5v5krE1K0eh_ZHIYwut-hXdY7OHNO73JByBHO6CbWIuPML7L-Wqtz4vgnVZpmZTwUX5KcwFa1O-7WxEaA0YPMJKNM9_dCOzPq1DMdbfUku3g3z_37jtdYV8ZEMGAPv7WAXpBhOK6wCbg6oEEuy2FTQJGSsUwbSdAUYD96WIl7FsI6ad6u2ygvIc8YZrxOW0-JtyN6MkeJp9X4kzH9w5rx4dawRS9L8pppthqHUR8nemKat0XnDGLJpI6-H7a1L'
  },
  {
    id: 'senno',
    name: 'Lucas Senno',
    role: 'Instrutor',
    belt: 'Faixa Marrom',
    course: 'Ciência da Computação 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHepGZ7UQf_fyE9vVxe0oQpwpP4UUL1NXBHErQQA-exrlgvMdhBiC31HJXkmYovhBLT3XDrPiE3T1BBKwCRAjj6xMIFzrA2lKA2KW2KZC1X1tCRMNWVR8JLzS7nzYm9SMtu1FADPYHiGd-Gyl-myxXV4tjOl0reOvcXTzlHz0irhJGI_3MjW1NRQT8tmWv8fr_bUJ8TDvJykZL7RqSSaFUskntvJEPRYxfA9RE9kYBeaum4XNtCnuk8ZTj6LVBp_4-A7gy8YpZNodK'
  },
  {
    id: 'vitor',
    name: 'Vitor Takahashi',
    role: 'Instrutor',
    belt: 'Faixa Roxa',
    course: 'Ciência da Computação 2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm4OYAIBMiDmqV9GgNgJxyyx1S3DC2HRVrHtXx-hoA9OGGIcGWsEX3ukxG27mABUrUdlfiEzxfFcMAlhj_8_IRTHkl_ZI9P6byhdBNN52ln6oc3sr0MvgqOvw2x6Mi09cBFFrk8n3aur6o9nBb9z-gm60UqfEhpukqaRY1RSNAjVDSwQu6Caf0-oTz9GLmbCpJr8pC5ojMFvztHBJC3-6-P-7I9L0d7-O7WxoPdZJNvu3MxqH1FFrGAljvQP3LSgXFq67UecsLtKLZ'
  },
  {
    id: 'kaua',
    name: 'Kauã Nunes',
    role: 'Instrutor',
    belt: 'Faixa Roxa',
    course: 'Economia 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnTVxWiAT9EWKfgI33eeJnqgeaN-FTRyQmP_qTlzg1mrWrnP9S_0y2m25KkuxuU9-oDLtEwVqJK-EwHuVvB8-BwO2owE8GxTudE1Z6vszJ2n7nBfpBLcu4lUt8QteGcTBDl54iVL5nx_csCnDmLh7duKrClETxDqACWkqR5zsdnfpzt2cIbTPCFfyGhsfo_8f1rOwA6HSD67R11niIbdVG8EaacSoe5Dso3RLOo4zwTaTamG8VPu1vWIT_Ovg3ZY-BFQm9yOAgmyN8'
  },
  {
    id: 'rayla',
    name: 'Rayla',
    role: 'Instrutora',
    belt: 'Faixa Azul',
    course: 'Educação Física 2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn_aj1p4RkJ3Qnwt_uM3B3HCb3XnYBNj5RHO1YyKb9aYRasnwE3Gw-SqmkjXKM15uyQKJRbPEgjIrUDOlHfLZS076SVzCO7wr8a5aygJsDxo6uL4MrSaovmNaXhDjgOz8FCu1BgvNQbaHklBufXcGbKQsFJwM58vRC2plq-xGDmNLBQjDdVkgJ2jFlZebLnMOLfgzE1WXKGotR6Ukm5EImFZDgusyz3-_b_fNY8FAXXaaYJbsbUss08x8OSNSLV1teFw6CtZENIZHN'
  }
];