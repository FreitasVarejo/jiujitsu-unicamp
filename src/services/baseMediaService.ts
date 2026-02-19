import { MediaType, MEDIA_INFO } from '../constants';

const VITE_MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || '/media';

export class BaseMediaService {
  static getUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${VITE_MEDIA_BASE_URL}${cleanPath}`;
    console.log(`[BaseMediaService] Generated URL: ${url}`);
    return url;
  }

  static async fetchIndex(type: MediaType): Promise<any> {
    const path = MEDIA_INFO[type].index;
    const url = this.getUrl(path);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Falha ao carregar o índice de ${type} em ${url}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      console.error(`[BaseMediaService] Expected JSON but got ${contentType} for ${url}`);
    }
    return response.json();
  }

  static async fetchItemInfo<T>(type: MediaType, id: string): Promise<T> {
    const rootPath = MEDIA_INFO[type].root;
    const url = this.getUrl(`${rootPath}/${id}/info.json`);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Falha ao carregar info de ${type}: ${id} em ${url}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      console.error(`[BaseMediaService] Expected JSON but got ${contentType} for ${url}`);
    }
    return response.json();
  }

  static processGallery(rootPath: string, id: string, files: string[]): string[] {
    return (files || []).map(file => this.getUrl(`${rootPath}/${id}/${file}`));
  }
}
