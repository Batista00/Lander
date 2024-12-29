import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/firebase/config';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { 
  BusinessContext, 
  AIRecommendation,
  LandingPage,
  AIComponent,
  AIComponentUnion,
  AIContext
} from '@/types/landing';
import { v4 as uuidv4 } from 'uuid';
import { COMPONENT_PROMPTS } from './prompts';

export class AILandingService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.cache = new Map();
  }

  private async generateWithGemini(prompt: string, cacheKey?: string): Promise<string> {
    try {
      // Verificar caché
      if (cacheKey) {
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hora
          return cached.data;
        }
      }

      // Generar respuesta
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Limpiar la respuesta de markdown
      const cleanResponse = text.replace(/```json\n|\n```/g, '').trim();

      // Validar que sea JSON válido
      try {
        JSON.parse(cleanResponse);
      } catch (e) {
        console.error('Invalid JSON response:', cleanResponse);
        throw new Error('La respuesta no es un JSON válido');
      }

      // Guardar en caché
      if (cacheKey) {
        this.cache.set(cacheKey, {
          data: cleanResponse,
          timestamp: Date.now()
        });
      }

      return cleanResponse;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

  private async updateUserTokens(userId: string, tokensUsed: number) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'tokens.remaining': increment(-tokensUsed),
      'tokens.used': increment(tokensUsed)
    });
  }

  async analyzeBusinessContext(context: BusinessContext): Promise<AIRecommendation[]> {
    try {
      const prompt = `
        Actúa como un experto en marketing digital.
        Basado en el siguiente contexto de negocio, recomienda una plantilla para landing page.
        
        Contexto del negocio:
        - Industria: ${context.industry}
        - Objetivos: ${context.goals?.join(', ')}
        - Audiencia: ${context.audience}
        - Tono de marca: ${context.brand?.tone}
        - Valores de marca: ${context.brand?.values?.join(', ')}
        
        IMPORTANTE: Responde SOLO con un objeto JSON válido que tenga esta estructura exacta. NO incluyas markdown ni otros formatos:

        {
          "recommendations": [
            {
              "templateId": "landing-1",
              "confidence": 85,
              "reasoning": "Esta plantilla es ideal porque...",
              "name": "Nombre de la plantilla",
              "description": "Descripción breve"
            }
          ]
        }

        NO incluyas \`\`\`json ni otros formatos markdown. SOLO el objeto JSON.
      `;

      const response = await this.generateWithGemini(prompt);
      const data = JSON.parse(response);

      if (!data.recommendations || !Array.isArray(data.recommendations)) {
        throw new Error('Formato de respuesta inválido');
      }

      return data.recommendations;

    } catch (error) {
      console.error('Error analyzing business context:', error);
      // Retornar una recomendación por defecto en caso de error
      return [{
        templateId: 'landing-1',
        confidence: 80,
        reasoning: 'Plantilla por defecto basada en el contexto del negocio',
        name: 'Plantilla Estándar',
        description: 'Una plantilla versátil que se adapta a múltiples industrias'
      }];
    }
  }

  async generateLandingPage(context: BusinessContext): Promise<LandingPage> {
    try {
      // 1. Generar cada componente individualmente para mejor control
      const components: AIComponentUnion[] = [];
      
      // Hero Section
      const heroComponent = await this.generateComponent('hero', context);
      components.push(heroComponent);
      
      // Features Section
      const featuresComponent = await this.generateComponent('features', context);
      components.push(featuresComponent);
      
      // Benefits Section
      const benefitsComponent = await this.generateComponent('benefits', context);
      components.push(benefitsComponent);
      
      // CTA Section
      const ctaComponent = await this.generateComponent('cta', context);
      components.push(ctaComponent);

      // 2. Crear la landing page
      const landingPage: LandingPage = {
        id: uuidv4(),
        name: `${context.businessName || 'Nueva'} Landing Page`,
        description: `Landing page para ${context.businessName || 'empresa'} en la industria ${context.industry}`,
        components: components,
        businessContext: context,
        status: 'draft',
        userId: context.userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return landingPage;
    } catch (error) {
      console.error('Error generating landing page:', error);
      throw new Error('No se pudo generar la landing page');
    }
  }

  async generateInitialComponents(templateId: string, context: BusinessContext): Promise<AIComponentUnion[]> {
    try {
      const components: AIComponentUnion[] = [];
      
      // Hero Section
      const heroComponent = await this.generateComponent('hero', context);
      components.push(heroComponent);
      
      // Features Section
      const featuresComponent = await this.generateComponent('features', context);
      components.push(featuresComponent);
      
      // Benefits Section
      const benefitsComponent = await this.generateComponent('benefits', context);
      components.push(benefitsComponent);
      
      // CTA Section
      const ctaComponent = await this.generateComponent('cta', context);
      components.push(ctaComponent);

      return components;
    } catch (error) {
      console.error('Error generating initial components:', error);
      throw new Error('No se pudieron generar los componentes iniciales');
    }
  }

  private async generateComponent(type: string, context: BusinessContext): Promise<AIComponentUnion> {
    const prompt = COMPONENT_PROMPTS[type](context);
    const response = await this.generateWithGemini(prompt);
    
    try {
      // Limpiar la respuesta de markdown
      const cleanResponse = response.replace(/```json\n|\n```/g, '').trim();
      const data = JSON.parse(cleanResponse);

      // Validar la estructura básica del componente
      if (!data || typeof data !== 'object') {
        throw new Error('Respuesta inválida del modelo AI');
      }

      return {
        id: uuidv4(),
        type,
        content: data,
        version: 1,
        status: 'generated'
      };
    } catch (error) {
      console.error(`Error parsing ${type} component response:`, error);
      console.log('Raw response:', response); // Para debugging
      throw new Error(`No se pudo generar el componente ${type}`);
    }
  }

  async improveComponent(component: AIComponentUnion, context: BusinessContext): Promise<AIComponentUnion> {
    const prompt = `
      Analiza y mejora este componente de landing page:
      ${JSON.stringify(component.content)}
      
      Contexto del negocio:
      ${JSON.stringify(context)}
      
      Sugiere mejoras manteniendo la misma estructura JSON.
    `;

    try {
      const response = await this.generateWithGemini(prompt);
      const improvedProps = JSON.parse(response);
      
      return {
        ...component,
        content: improvedProps,
        version: component.version + 1,
        status: 'improved'
      };
    } catch (error) {
      console.error('Error improving component:', error);
      throw error;
    }
  }
}

export const aiLandingService = new AILandingService();
