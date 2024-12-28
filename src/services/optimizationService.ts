import { Component } from '@/types/landing';

interface ImageOptimizationOptions {
  maxWidth: number;
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
}

interface OptimizationResult {
  optimizedUrl: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
}

export class OptimizationService {
  private worker: Worker | null = null;
  private readonly defaultImageOptions: ImageOptimizationOptions = {
    maxWidth: 1920,
    quality: 80,
    format: 'webp'
  };

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.initializeWorker();
    }
  }

  private initializeWorker() {
    try {
      this.worker = new Worker('/workers/optimization.worker.js');
    } catch (error) {
      console.error('Error initializing optimization worker:', error);
    }
  }

  public async optimizeComponent(component: Component): Promise<Component> {
    const optimizedComponent = { ...component };

    // Optimizar imágenes en el componente
    if (component.type === 'image' && component.props?.src) {
      try {
        const optimizedImage = await this.optimizeImage(
          component.props.src,
          this.defaultImageOptions
        );
        optimizedComponent.props = {
          ...optimizedComponent.props,
          src: optimizedImage.optimizedUrl
        };
      } catch (error) {
        console.error('Error optimizing image:', error);
      }
    }

    // Optimizar estilos
    if (component.style) {
      optimizedComponent.style = this.optimizeStyles(component.style);
    }

    return optimizedComponent;
  }

  public async optimizeImage(
    url: string,
    options: Partial<ImageOptimizationOptions> = {}
  ): Promise<OptimizationResult> {
    const finalOptions = { ...this.defaultImageOptions, ...options };
    
    // Si tenemos un worker, usar procesamiento en segundo plano
    if (this.worker) {
      return new Promise((resolve, reject) => {
        this.worker!.postMessage({ type: 'OPTIMIZE_IMAGE', url, options: finalOptions });
        this.worker!.onmessage = (e) => resolve(e.data);
        this.worker!.onerror = (e) => reject(e);
      });
    }

    // Fallback: optimización básica en el hilo principal
    return this.optimizeImageInMainThread(url, finalOptions);
  }

  private async optimizeImageInMainThread(
    url: string,
    options: ImageOptimizationOptions
  ): Promise<OptimizationResult> {
    const response = await fetch(url);
    const originalSize = Number(response.headers.get('content-length')) || 0;
    const blob = await response.blob();

    // Crear un elemento imagen para procesar
    const img = new Image();
    const imgLoaded = new Promise((resolve) => {
      img.onload = () => resolve(img);
    });
    img.src = URL.createObjectURL(blob);
    await imgLoaded;

    // Crear canvas para redimensionar y optimizar
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Calcular nuevas dimensiones manteniendo aspecto
    const scale = options.maxWidth / img.width;
    canvas.width = options.maxWidth;
    canvas.height = img.height * scale;

    // Dibujar imagen redimensionada
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convertir a formato optimizado
    const optimizedBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        `image/${options.format}`,
        options.quality / 100
      );
    });

    const optimizedUrl = URL.createObjectURL(optimizedBlob);
    const optimizedSize = optimizedBlob.size;

    return {
      optimizedUrl,
      originalSize,
      optimizedSize,
      savings: ((originalSize - optimizedSize) / originalSize) * 100
    };
  }

  private optimizeStyles(styles: Record<string, any>): Record<string, any> {
    const optimizedStyles = { ...styles };

    // Optimizar valores numéricos
    for (const [key, value] of Object.entries(optimizedStyles)) {
      if (typeof value === 'number') {
        optimizedStyles[key] = Math.round(value * 100) / 100;
      }
    }

    // Eliminar propiedades redundantes
    const redundantProps = ['initial', 'normal', 'none'];
    for (const [key, value] of Object.entries(optimizedStyles)) {
      if (redundantProps.includes(String(value))) {
        delete optimizedStyles[key];
      }
    }

    return optimizedStyles;
  }

  public destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const optimizationService = new OptimizationService();
