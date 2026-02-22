import { BaseMediaService } from './baseMediaService';
import {
  eventAdapter,
  eventSummaryAdapter,
  productAdapter,
  instructorAdapter,
  trainingAdapter,
} from '../adapters';
import { Image, Event, EventSummary, Product, Instructor, TrainingSchedule } from '../types/media';

export type EventInfo = Event;
export type EventSummaryInfo = EventSummary;
export type ProductInfo = Product;
export type InstructorInfo = Instructor;
export type ProductCategories = Record<string, string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StrapiListResponse<T = any> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StrapiSingleResponse<T = any> {
  data: T;
}

export const mediaService = {
  /**
   * Busca a configuração global do site (logo, etc.)
   * Endpoint: GET /api/site-config?populate=logo
   */
  getLogo: async (): Promise<Image | null> => {
    try {
      const response = await BaseMediaService.get<StrapiSingleResponse<{ logo: { url: string; alternativeText?: string } }>>(
        '/api/site-config',
        { 'populate': 'logo' },
      );
      const logo = response.data?.logo;
      if (!logo?.url) return null;
      return {
        url: BaseMediaService.resolveMediaUrl(logo.url),
        alternativeText: logo.alternativeText || 'Logo Jiu-Jitsu Unicamp',
      };
    } catch (error) {
      console.error('Erro ao buscar logo:', error);
      return null;
    }
  },

  /**
   * Busca as imagens do carrossel hero.
   * Endpoint: GET /api/hero-carousel?populate=images
   */
  getHeroImages: async (): Promise<Image[]> => {
    try {
      const response = await BaseMediaService.get<StrapiSingleResponse<{ images: { url: string; alternativeText?: string }[] }>>(
        '/api/hero-carousel',
        { 'populate': 'images' },
      );
      const images = response.data?.images || [];
      return images.map((img) => ({
        url: BaseMediaService.resolveMediaUrl(img.url),
        alternativeText: img.alternativeText || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar imagens do hero:', error);
      return [];
    }
  },

  /**
   * Busca todos os instrutores com foto.
   * Endpoint: GET /api/instrutores?populate=photo&pagination[limit]=250
   */
  getAllInstructors: async (): Promise<InstructorInfo[]> => {
    const response = await BaseMediaService.get<StrapiListResponse>(
      '/api/instrutores',
      {
        'populate': 'photo',
        'pagination[limit]': '250',
      },
    );
    return response.data.map((raw) => instructorAdapter(raw));
  },

  /**
   * Busca todos os horários de treino.
   * Endpoint: GET /api/treinos?sort=weekday,startTime&pagination[limit]=250
   */
  getAllTrainings: async (): Promise<TrainingSchedule[]> => {
    const response = await BaseMediaService.get<StrapiListResponse>(
      '/api/treinos',
      {
        'sort[0]': 'weekday',
        'sort[1]': 'startTime',
        'pagination[limit]': '250',
      },
    );
    return response.data.map((raw) => trainingAdapter(raw));
  },

  /**
   * Busca todos os eventos com apenas a capa (para listagem).
   * Endpoint: GET /api/eventos?populate[cover]=true&fields[0]=slug&fields[1]=title&fields[2]=date&fields[3]=location&sort=date:desc&pagination[limit]=250
   */
  getEventSummaries: async (): Promise<EventSummaryInfo[]> => {
    const response = await BaseMediaService.get<StrapiListResponse>(
      '/api/eventos',
      {
        'populate[cover]': 'true',
        'fields[0]': 'slug',
        'fields[1]': 'title',
        'fields[2]': 'date',
        'fields[3]': 'location',
        'sort[0]': 'date:desc',
        'pagination[limit]': '250',
      },
    );
    return response.data.map((raw) => eventSummaryAdapter(raw));
  },

  /**
   * Busca os detalhes completos de um evento (com galeria).
   * Endpoint: GET /api/eventos?filters[slug][$eq]={slug}&populate[cover]=true&populate[gallery]=true
   */
  getEventDetails: async (slug: string): Promise<EventInfo> => {
    const response = await BaseMediaService.get<StrapiListResponse>(
      '/api/eventos',
      {
        'filters[slug][$eq]': slug,
        'populate[cover]': 'true',
        'populate[gallery]': 'true',
      },
    );
    const item = response.data[0];
    if (!item) throw new Error(`Evento não encontrado: ${slug}`);
    return eventAdapter(item);
  },

  /**
   * Busca todos os produtos com capa, galeria e categoria.
   * Endpoint: GET /api/produtos?populate[cover]=true&populate[gallery]=true&populate[categoria]=true&pagination[limit]=250
   */
  getAllProducts: async (): Promise<ProductInfo[]> => {
    const response = await BaseMediaService.get<StrapiListResponse>(
      '/api/produtos',
      {
        'populate[cover]': 'true',
        'populate[gallery]': 'true',
        'populate[categoria]': 'true',
        'pagination[limit]': '250',
      },
    );
    return response.data.map((raw) => productAdapter(raw));
  },

  /**
   * Busca as categorias de produto.
   * Endpoint: GET /api/categoria-produtos?pagination[limit]=250
   */
  getProductCategories: async (): Promise<ProductCategories> => {
    const response = await BaseMediaService.get<StrapiListResponse>(
      '/api/categoria-produtos',
      { 'pagination[limit]': '250' },
    );
    return Object.fromEntries(
      response.data.map((raw) => [raw.slug, raw.name]),
    );
  },

  /**
   * Resolve uma URL relativa de mídia para URL absoluta.
   */
  getMediaUrl: (relativeUrl: string): string => {
    return BaseMediaService.resolveMediaUrl(relativeUrl);
  },
};
