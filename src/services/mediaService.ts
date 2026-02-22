import { BaseMediaService } from './baseMediaService';
import { eventAdapter, productAdapter, memberAdapter, trainingAdapter } from '../adapters';
import { Event, Product, Member, TrainingSchedule } from '../types/media';

export type EventInfo = Event;
export type ProductInfo = Product;
export type MemberInfo = Member;
export type EventFolder = { id: string; date: string; year: string };
export type ProductCategories = Record<string, string>;

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface StrapiSingleResponse<T> {
  data: T;
}

export const mediaService = {
  getHeroImages: async (): Promise<string[]> => {
    try {
      const response = await BaseMediaService.get<StrapiSingleResponse<{ images: { url: string }[] }>>(
        '/api/hero-carousel',
        { 'populate': 'images' },
      );
      const images = response.data?.images || [];
      return images.map((img) => BaseMediaService.resolveMediaUrl(img.url));
    } catch (error) {
      console.error('Erro ao buscar imagens do hero:', error);
      return [];
    }
  },

  getAllMembers: async (): Promise<MemberInfo[]> => {
    const response = await BaseMediaService.get<StrapiListResponse<any>>(
      '/api/membros',
      { 'pagination[limit]': '250' },
    );
    return response.data.map((raw) => memberAdapter(raw));
  },

  getAllTrainings: async (): Promise<TrainingSchedule[]> => {
    const response = await BaseMediaService.get<StrapiListResponse<any>>(
      '/api/treinos',
      { 'sort[0]': 'weekday', 'sort[1]': 'startTime', 'pagination[limit]': '250' },
    );
    return response.data.map((raw) => trainingAdapter(raw));
  },

  getEventIndex: async (): Promise<EventFolder[]> => {
    const response = await BaseMediaService.get<StrapiListResponse<any>>(
      '/api/eventos',
      {
        'fields[0]': 'slug',
        'fields[1]': 'date',
        'sort[0]': 'date:desc',
        'pagination[limit]': '250',
      },
    );
    return response.data.map((raw) => {
      const date = raw.date || '2000-01-01';
      const year = date.split('-')[0] || 'Antigo';
      return { id: raw.slug, date, year };
    });
  },

  getEventInfo: async (slug: string): Promise<EventInfo> => {
    const response = await BaseMediaService.get<StrapiListResponse<any>>(
      '/api/eventos',
      { 'filters[slug][$eq]': slug },
    );
    const item = response.data[0];
    if (!item) throw new Error(`Evento não encontrado: ${slug}`);
    return eventAdapter(item);
  },

  getEventDetails: async (slug: string): Promise<EventInfo> => {
    return mediaService.getEventInfo(slug);
  },

  getAllProducts: async (): Promise<ProductInfo[]> => {
    const response = await BaseMediaService.get<StrapiListResponse<any>>(
      '/api/produtos',
      { 'pagination[limit]': '250' },
    );
    return response.data.map((raw) => productAdapter(raw));
  },

  getProductCategories: async (): Promise<ProductCategories> => {
    const response = await BaseMediaService.get<StrapiListResponse<any>>(
      '/api/categoria-produtos',
      { 'pagination[limit]': '250' },
    );
    return Object.fromEntries(
      response.data.map((raw) => [raw.slug, raw.name]),
    );
  },

  getMediaUrl: (relativeUrl: string): string => {
    return BaseMediaService.resolveMediaUrl(relativeUrl);
  },
};
