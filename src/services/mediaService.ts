export interface RawEventInfo {
  NOME: string;
  LOCAL: string;
  DATA: string;
  DESCRIÇÃO: string;
  IMAGENS_COUNT?: number;
}

export interface EventFolder {
  id: string;
  date: string;
  year: string;
}

export interface EventInfo extends EventFolder {
  nome: string;
  local: string;
  descricao: string;
  imagensCount: number;
}

export interface ProductInfo {
  id: string;
  nome: string;
  preco: string;
  categoria: string;
  obs?: string;
  descricao?: string;
  tamanhos?: string[];
  imagensCount?: number;
}

export type ProductCategories = Record<string, string>;

const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE_URL || "/media";

export const mediaService = {
  getMediaUrl: (path: string) =>
    `${MEDIA_BASE}${path.startsWith("/") ? "" : "/"}${path}`,

  getEventIndex: async (): Promise<EventFolder[]> => {
    const response = await fetch(`${MEDIA_BASE}/eventos/index.json`);
    if (!response.ok) throw new Error("Falha ao carregar o índice de eventos");

    const folders: string[] = await response.json();
    if (!Array.isArray(folders))
      throw new Error("Formato inválido do índice de eventos");

    return folders
      .map((folder) => {
        const match = folder.match(/^(\d{4})-(\d{2})-(\d{2})/);
        const date = match
          ? `${match[1]}-${match[2]}-${match[3]}`
          : "2000-01-01";
        const year = match ? match[1] : "Antigo";
        return { id: folder, date, year };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getEventInfo: async (id: string): Promise<EventInfo> => {
    const response = await fetch(`${MEDIA_BASE}/eventos/${id}/info.json`);
    if (!response.ok) throw new Error(`Falha ao carregar info do evento ${id}`);

    const raw: RawEventInfo = await response.json();

    // Extract date from ID if DATA is missing or to maintain consistency
    const match = id.match(/^(\d{4})-(\d{2})-(\d{2})/);
    const date =
      raw.DATA ||
      (match ? `${match[1]}-${match[2]}-${match[3]}` : "2000-01-01");
    const year = match ? match[1] : "Antigo";

    return {
      id,
      date,
      year,
      nome: raw.NOME,
      local: raw.LOCAL,
      descricao: raw.DESCRIÇÃO,
      imagensCount: raw.IMAGENS_COUNT || 0,
    };
  },

  getProductIndex: async (): Promise<string[]> => {
    const response = await fetch(`${MEDIA_BASE}/produtos/index.json`);
    if (!response.ok) throw new Error("Falha ao carregar o índice de produtos");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },

  getProductCategories: async (): Promise<ProductCategories> => {
    const response = await fetch(`${MEDIA_BASE}/produtos/categorias.json`);
    if (!response.ok)
      throw new Error("Falha ao carregar categorias de produtos");
    return await response.json();
  },

  getProductInfo: async (id: string): Promise<ProductInfo> => {
    const response = await fetch(`${MEDIA_BASE}/produtos/${id}/info.json`);
    if (!response.ok)
      throw new Error(`Falha ao carregar info do produto ${id}`);
    const data = await response.json();
    return {
      ...data,
      id,
      imagensCount: Number(data["image-count"] || data.IMAGENS_COUNT || data.imagensCount || 1),
    };
  },
};
