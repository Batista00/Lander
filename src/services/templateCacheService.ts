import { Template } from '@/types/template';

interface CacheConfig {
  maxAge: number;  // Tiempo máximo de caché en ms
  maxSize: number; // Número máximo de templates en caché
}

interface CacheEntry {
  data: Template;
  timestamp: number;
}

export class TemplateCacheService {
  private cache: Map<string, CacheEntry>;
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.cache = new Map();
    this.config = {
      maxAge: 1000 * 60 * 60, // 1 hora por defecto
      maxSize: 50,            // 50 templates por defecto
      ...config
    };
  }

  public set(key: string, template: Template): void {
    // Limpiar caché si excede el tamaño máximo
    if (this.cache.size >= this.config.maxSize) {
      const oldestKey = this.getOldestKey();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data: template,
      timestamp: Date.now()
    });
  }

  public get(key: string): Template | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Verificar si el cache ha expirado
    if (Date.now() - entry.timestamp > this.config.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public clear(): void {
    this.cache.clear();
  }

  public remove(key: string): void {
    this.cache.delete(key);
  }

  private getOldestKey(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public getCacheStats(): { size: number; oldestEntry: number; newestEntry: number } {
    let oldestTime = Infinity;
    let newestTime = 0;

    for (const entry of this.cache.values()) {
      oldestTime = Math.min(oldestTime, entry.timestamp);
      newestTime = Math.max(newestTime, entry.timestamp);
    }

    return {
      size: this.cache.size,
      oldestEntry: oldestTime === Infinity ? 0 : oldestTime,
      newestEntry: newestTime
    };
  }
}

// Instancia global del servicio de caché
export const templateCache = new TemplateCacheService();
