interface CacheEntry {
  url: string;
  expiresAt: number;
}

interface CacheOptions {
  expirationTime?: number; // en milisegundos
}

const defaultOptions: CacheOptions = {
  expirationTime: 24 * 60 * 60 * 1000 // 24 horas
};

class UrlCache {
  private cache: Map<string, CacheEntry>;
  private options: CacheOptions;

  constructor(options: CacheOptions = defaultOptions) {
    this.cache = new Map();
    this.options = { ...defaultOptions, ...options };
    this.startCleanupInterval();
  }

  set(key: string, url: string): void {
    const expiresAt = Date.now() + this.options.expirationTime!;
    this.cache.set(key, { url, expiresAt });
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.url;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  private startCleanupInterval(): void {
    // Limpiar el caché cada hora
    setInterval(() => this.cleanup(), 60 * 60 * 1000);
  }
}

// Exportar una única instancia para toda la aplicación
export const urlCache = new UrlCache();
