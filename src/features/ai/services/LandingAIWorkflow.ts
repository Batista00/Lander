import { GoogleGenerativeAI } from '@google/generative-ai';
import { Template, Component, ComponentType, LandingPage as Landing, Analytics, AIWorkflowContext } from '@/types/landing';
import { toast } from 'sonner';

export class LandingAIWorkflow {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private context: AIWorkflowContext | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  setContext(context: AIWorkflowContext) {
    this.context = context;
  }

  // 1. Flujo de Template
  async suggestTemplates(): Promise<Template[]> {
    if (!this.context) throw new Error('Context not set');
    
    const prompt = `Como experto en landing pages, sugiere 3 templates para:
    Industria: ${this.context.industry}
    Objetivos: ${this.context.goals.join(', ')}
    Audiencia: ${this.context.targetAudience}
    Estilo: ${JSON.stringify(this.context.style)}
    
    Proporciona sugerencias en formato JSON con este formato exacto:
    {
      "templates": [
        {
          "id": "string (único, usar uuid v4)",
          "name": "string (nombre descriptivo)",
          "description": "string (descripción detallada)",
          "category": "string (una de: startup, restaurant, professional, ecommerce, personal)",
          "thumbnail": "string (URL de imagen, usar placeholder)",
          "isPremium": boolean,
          "components": ["string (tipos de componentes)"]
        }
      ]
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = JSON.parse(result.response.text());
      
      // Asegurarse de que los templates tengan todos los campos necesarios
      return response.templates.map((t: any) => ({
        ...t,
        thumbnail: t.thumbnail || 'https://via.placeholder.com/300x200',
        isPremium: t.isPremium || false,
        components: t.components || []
      }));
    } catch (error) {
      console.error('Error al generar templates:', error);
      throw new Error('No se pudieron generar sugerencias de templates');
    }
  }

  // 2. Flujo de Componentes
  async suggestComponents(template: Template): Promise<Component[]> {
    const prompt = `Analiza este template y sugiere componentes adicionales:
    Template: ${JSON.stringify(template)}
    Industria: ${this.context?.industry}
    
    Proporciona sugerencias en formato JSON con:
    - components: array de componentes recomendados`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text()).components;
  }

  async generateComponentContent(component: Component): Promise<any> {
    const prompt = `Genera contenido optimizado para este componente:
    Tipo: ${component.type}
    Contexto: ${JSON.stringify(this.context)}
    
    Proporciona contenido en formato JSON según el tipo de componente`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // 3. Flujo de Edición
  async optimizeLayout(components: Component[]): Promise<{
    suggestions: string[];
    improvements: any[];
  }> {
    const prompt = `Analiza este layout y sugiere mejoras:
    Componentes: ${JSON.stringify(components)}
    Objetivos: ${this.context?.goals.join(', ')}
    
    Proporciona en formato JSON:
    - suggestions: array de sugerencias
    - improvements: array de mejoras específicas`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // 4. Flujo de Publicación
  async preLaunchCheck(landing: Landing): Promise<{
    seo: any;
    performance: any;
    accessibility: any;
    conversion: any;
  }> {
    const prompt = `Realiza un análisis completo pre-lanzamiento:
    Landing: ${JSON.stringify(landing)}
    
    Proporciona en formato JSON:
    - seo: optimizaciones SEO
    - performance: mejoras de rendimiento
    - accessibility: problemas de accesibilidad
    - conversion: optimizaciones de conversión`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // 5. Flujo de Análisis
  async analyzePerformance(analytics: Analytics): Promise<{
    insights: string[];
    recommendations: any[];
    abTests: any[];
  }> {
    const prompt = `Analiza el rendimiento de la landing page:
    Analytics: ${JSON.stringify(analytics)}
    
    Proporciona en formato JSON:
    - insights: hallazgos principales
    - recommendations: recomendaciones de mejora
    - abTests: sugerencias de tests A/B`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  // Utilidades
  async generateSEOTags(content: any): Promise<{
    title: string;
    description: string;
    keywords: string[];
  }> {
    const prompt = `Genera meta tags SEO optimizados para:
    Contenido: ${JSON.stringify(content)}
    Industria: ${this.context?.industry}
    
    Proporciona en formato JSON:
    - title: título SEO
    - description: meta descripción
    - keywords: palabras clave`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  async suggestABTest(component: Component, analytics: Analytics): Promise<{
    variants: any[];
    hypothesis: string;
    metrics: string[];
  }> {
    const prompt = `Sugiere un test A/B para este componente:
    Componente: ${JSON.stringify(component)}
    Analytics: ${JSON.stringify(analytics)}
    
    Proporciona en formato JSON:
    - variants: variantes a probar
    - hypothesis: hipótesis del test
    - metrics: métricas a medir`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }
}

export const landingAIWorkflow = new LandingAIWorkflow();
