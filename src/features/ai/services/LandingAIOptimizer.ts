import { GoogleGenerativeAI } from '@google/generative-ai';
import { Template } from '@/types/landing';
import { LandingContent, OptimizationResult } from '@/types/landing';

export class LandingAIOptimizer {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
      if (!apiKey) {
        console.error('Google AI API key not found in environment variables');
        throw new Error('API key not configured');
      }
      
      console.log('Initializing Google AI Optimizer with key:', apiKey.substring(0, 5) + '...');
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      console.log('Google AI Optimizer initialized successfully');
    } catch (error) {
      console.error('Error initializing Google AI Optimizer:', error);
      throw error;
    }
  }

  async analyzeRequirements(niche: string, goals: string): Promise<{
    recommendedTemplates: string[];
    reasonings: string[];
  }> {
    const prompt = `Como experto en landing pages, analiza el siguiente negocio:
    Nicho: ${niche}
    Objetivos: ${goals}
    
    Proporciona recomendaciones en formato JSON con:
    - recommendedTemplates: array de tipos de templates recomendados
    - reasonings: array de razones para cada recomendación`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  async generateInitialContent(template: Template, userPreferences: {
    niche: string;
    target: string;
    tone: string;
    goals: string;
  }): Promise<LandingContent> {
    const prompt = `Como copywriter experto, genera contenido para una landing page:
    Template: ${template.name}
    Nicho: ${userPreferences.niche}
    Audiencia: ${userPreferences.target}
    Tono: ${userPreferences.tone}
    Objetivos: ${userPreferences.goals}
    
    Proporciona en formato JSON:
    - headline: título principal
    - subheadline: subtítulo
    - features: array de características
    - benefits: array de beneficios
    - cta: texto del botón
    - sections: array de secciones con título y contenido`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  async optimizePage(content: LandingContent): Promise<OptimizationResult> {
    const prompt = `Como experto en CRO y SEO, analiza esta landing page:
    ${JSON.stringify(content)}
    
    Proporciona en formato JSON:
    - seoScore: número del 1-100
    - conversionScore: número del 1-100
    - suggestions: array de sugerencias de mejora
    - seoImprovements: array de mejoras SEO
    - conversionImprovements: array de mejoras de conversión`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  async generateABTestVariations(content: LandingContent): Promise<{
    variations: LandingContent[];
    hypotheses: string[];
  }> {
    const prompt = `Como experto en A/B testing, genera variaciones para esta landing page:
    ${JSON.stringify(content)}
    
    Proporciona en formato JSON:
    - variations: array de 3 variaciones del contenido
    - hypotheses: array de hipótesis para cada variación`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  async analyzeCompetition(niche: string, url: string): Promise<{
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    recommendations: string[];
  }> {
    const prompt = `Como analista de mercado, analiza la competencia para:
    Nicho: ${niche}
    URL: ${url}
    
    Proporciona en formato JSON:
    - strengths: puntos fuertes de la competencia
    - weaknesses: puntos débiles
    - opportunities: oportunidades de diferenciación
    - recommendations: recomendaciones específicas`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
}

export const landingAIOptimizer = new LandingAIOptimizer();
