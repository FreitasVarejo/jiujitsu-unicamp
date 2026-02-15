import { MediaType, MEDIA_PATHS } from '../constants/media';

const VITE_MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || '/media';

export class BaseMediaService {
  static getUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${VITE_MEDIA_BASE_URL}${cleanPath}`;
  }

  static async fetchIndex(type: MediaType): Promise<any> {
    const path = MEDIA_PATHS[type].index;
    const response = await fetch(this.getUrl(path));
    if (!response.ok) {
      throw new Error(`Falha ao carregar o índice de ${type}`);
    }
    return response.json();
  }

  static async fetchItemInfo<T>(type: MediaType, id: string): Promise<T> {
    const rootPath = MEDIA_PATHS[type].root;
    const response = await fetch(this.getUrl(`${rootPath}/${id}/info.json`));
    if (!response.ok) {
      throw new Error(`Falha ao carregar info de ${type}: ${id}`);
    }
    return response.json();
  }

  static processGallery(rootPath: string, id: string, files: string[]): string[] {
    return (files || []).map(file => this.getUrl(`${rootPath}/${id}/${file}`));
  }
}
