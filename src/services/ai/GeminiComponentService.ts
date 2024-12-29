import { Component, AIContext } from '@/types/landing';

export interface GeminiImprovement {
  title?: string;
  subtitle?: string;
  description?: string;
  buttons?: Array<{
    text: string;
    action?: string;
  }>;
  explanation: string;
}

export class GeminiComponentService {
  private async getGeminiResponse(prompt: string): Promise<any> {
    // Aquí implementaremos la llamada a Gemini
    // Por ahora retornamos un mock
    return {
      improvement: {
        title: "Título mejorado",
        subtitle: "Subtítulo optimizado",
        description: "Descripción más persuasiva",
        explanation: "Estas mejoras aumentarán la conversión..."
      }
    };
  }

  async improveComponent(
    component: Component,
    aiContext: AIContext
  ): Promise<GeminiImprovement> {
    const prompt = `
      Analiza y mejora este componente:
      Tipo: ${component.type}
      Título actual: ${component.content.title}
      Subtítulo actual: ${component.content.subtitle}
      Descripción actual: ${component.content.description}
      
      Contexto del negocio:
      Nombre: ${aiContext.businessName}
      Industria: ${aiContext.industry}
      Audiencia: ${aiContext.targetAudience}
      Propuesta de valor: ${aiContext.valueProposition}
      Tono deseado: ${aiContext.tone}
      
      Por favor, sugiere mejoras para:
      1. Título más impactante
      2. Subtítulo más persuasivo
      3. Descripción más efectiva
      4. Textos de botones más atractivos
    `;

    const response = await this.getGeminiResponse(prompt);
    return response.improvement;
  }

  async analyzeComponent(
    component: Component,
    aiContext: AIContext
  ): Promise<string[]> {
    const prompt = `
      Analiza este componente y proporciona sugerencias de mejora:
      Tipo: ${component.type}
      Contenido actual: ${JSON.stringify(component.content)}
      
      Contexto del negocio:
      ${JSON.stringify(aiContext)}
    `;

    const response = await this.getGeminiResponse(prompt);
    return response.suggestions || [];
  }
}

export const geminiComponentService = new GeminiComponentService();
