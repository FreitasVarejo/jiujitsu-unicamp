import { BaseMediaService } from "./baseMediaService";
import { eventAdapter, productAdapter, memberAdapter, trainingAdapter } from "../adapters";
import { MediaType } from "../constants";
import { Event, Product, Member, TrainingSchedule } from "../types/media";

// Maintain compatibility for names if needed, but using clean types
export type EventInfo = Event;
export type ProductInfo = Product;
export type MemberInfo = Member;
export type EventFolder = { id: string; date: string; year: string };
export type ProductCategories = Record<string, string>;

export const mediaService = {
  getMediaUrl: (path: string) => BaseMediaService.getUrl(path),

  getEventIndex: async (): Promise<EventFolder[]> => {
    const folders: string[] = await BaseMediaService.fetchIndex(
      MediaType.EVENTS,
    );

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
    const raw = await BaseMediaService.fetchItemInfo(MediaType.EVENTS, id);
    return eventAdapter(raw, id);
  },

  // Alias for backward compatibility
  getEventDetails: async (id: string): Promise<EventInfo> => {
    return mediaService.getEventInfo(id);
  },

  getProductIndex: async (): Promise<string[]> => {
    return BaseMediaService.fetchIndex(MediaType.PRODUCTS);
  },

  getProductCategories: async (): Promise<ProductCategories> => {
    const response = await fetch(
      BaseMediaService.getUrl("/produtos/categorias.json"),
    );
    if (!response.ok)
      throw new Error("Falha ao carregar categorias de produtos");
    return await response.json();
  },

  getProductInfo: async (id: string): Promise<ProductInfo> => {
    const raw = await BaseMediaService.fetchItemInfo(MediaType.PRODUCTS, id);
    return productAdapter(raw, id);
  },

  getAllProducts: async (): Promise<ProductInfo[]> => {
    const index = await mediaService.getProductIndex();
    const products = await Promise.all(
      index.map((id) => mediaService.getProductInfo(id)),
    );
    return products;
  },

  getMemberIndex: async (): Promise<string[]> => {
    return BaseMediaService.fetchIndex(MediaType.MEMBERS);
  },

  getMemberInfo: async (id: string): Promise<MemberInfo> => {
    const raw = await BaseMediaService.fetchItemInfo(MediaType.MEMBERS, id);
    return memberAdapter(raw, id);
  },

  getAllMembers: async (): Promise<MemberInfo[]> => {
    try {
      const response = await fetch(BaseMediaService.getUrl("/membros/info.json"));
      if (!response.ok) throw new Error("Falha ao carregar lista de membros");
      
      const rawMembers = await response.json();
      
      // Mapear usando o adaptador, mas precisamos ajustar como o adaptador lida com imagens
      return rawMembers.map((raw: any) => memberAdapter(raw, raw.id));
    } catch (error) {
      console.error("Erro ao buscar todos os membros:", error);
      return [];
    }
  },

  getAllTrainings: async (): Promise<TrainingSchedule[]> => {
    try {
      const response = await fetch(BaseMediaService.getUrl("/treinos/info.json"));
      if (!response.ok) throw new Error("Falha ao carregar horários de treinos");
      
      const rawTrainings = await response.json();
      
      return rawTrainings.map((raw: any) => trainingAdapter(raw));
    } catch (error) {
      console.error("Erro ao buscar horários de treinos:", error);
      return [];
    }
  },

  getHeroImages: async (): Promise<string[]> => {
    try {
      const response = await fetch(BaseMediaService.getUrl("/hero/index.json"));
      if (!response.ok) throw new Error("Falha ao carregar imagens do hero");
      const files: string[] = await response.json();
      return files.map((file) => BaseMediaService.getUrl(`/hero/${file}`));
    } catch (error) {
      console.error("Erro ao buscar imagens do hero:", error);
      return [];
    }
  },
};
