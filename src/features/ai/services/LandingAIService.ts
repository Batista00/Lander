import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'sonner';

interface DesignSuggestion {
  layout: string;
  colorPalette: string[];
  typography: {
    headings: string;
    body: string;
  };
  components: string[];
}

interface ContentSuggestion {
  headline: string;
  subheadline: string;
  cta: string;
  benefits: string[];
  features: string[];
}

interface SeoSuggestion {
  title: string;
  description: string;
  keywords: string[];
  recommendations: string[];
}

export class LandingAIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
      if (!apiKey) {
        console.error('Google AI API key not found in environment variables');
        throw new Error('API key not configured');
      }
      
      console.log('Initializing Google AI with key:', apiKey.substring(0, 5) + '...');
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      console.log('Google AI initialized successfully');
    } catch (error) {
      console.error('Error initializing Google AI:', error);
      throw error;
    }
  }

  async generateDesignSuggestions(niche: string, purpose: string): Promise<DesignSuggestion> {
    const prompt = `Como experto en diseño de landing pages, genera sugerencias para una página en el nicho de "${niche}" con el propósito de "${purpose}".
    Responde en formato JSON con:
    - layout: descripción del layout recomendado
    - colorPalette: array de 4 colores en hex
    - typography: objeto con fuentes recomendadas para headings y body
    - components: array de componentes recomendados
    Sé específico y moderno en las sugerencias.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error generating design suggestions:', error);
      throw new Error('Error al generar sugerencias de diseño');
    }
  }

  async generateContent(niche: string, target: string, tone: string): Promise<ContentSuggestion> {
    const prompt = `Como copywriter experto en landing pages, genera contenido para una página en el nicho de "${niche}", 
    dirigida a "${target}" con un tono "${tone}".
    Responde en formato JSON con:
    - headline: título principal persuasivo
    - subheadline: subtítulo de soporte
    - cta: texto para botón de llamada a la acción
    - benefits: array de 3-4 beneficios principales
    - features: array de 3-4 características destacadas
    El contenido debe ser persuasivo y orientado a conversión.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Error al generar contenido');
    }
  }

  async analyzeSEO(content: string): Promise<SeoSuggestion> {
    const prompt = `Como experto en SEO, analiza el siguiente contenido para una landing page y proporciona recomendaciones:
    "${content}"
    Responde en formato JSON con:
    - title: título SEO recomendado
    - description: meta descripción optimizada
    - keywords: array de palabras clave relevantes
    - recommendations: array de sugerencias de mejora
    Enfócate en SEO y conversión.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      throw new Error('Error al analizar SEO');
    }
  }

  async optimizeForConversion(currentContent: string): Promise<string[]> {
    const prompt = `Como experto en CRO (Conversion Rate Optimization), analiza el siguiente contenido de landing page y sugiere mejoras específicas para aumentar la conversión:
    "${currentContent}"
    Proporciona un array de sugerencias específicas y accionables.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Error optimizing for conversion:', error);
      throw new Error('Error al optimizar para conversión');
    }
  }

  async generateCustomCSS(design: DesignSuggestion): Promise<string> {
    const prompt = `Como experto en CSS moderno, genera código CSS para una landing page basada en este diseño:
    ${JSON.stringify(design, null, 2)}
    Incluye:
    - Variables CSS para colores y tipografía
    - Estilos responsivos
    - Animaciones sutiles
    - Clases utilitarias principales
    El código debe ser moderno y optimizado.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating CSS:', error);
      throw new Error('Error al generar CSS');
    }
  }
}

export const landingAIService = new LandingAIService();
