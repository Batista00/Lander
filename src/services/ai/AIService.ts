import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface AITemplateRecommendation {
  templateId: string;
  confidence: number;
  reasons: string[];
  industryFit: string;
  conversionPotential: number;
}

export interface AIContentSuggestion {
  type: 'headline' | 'description' | 'cta' | 'seo';
  content: string;
  confidence: number;
  context?: string;
}

export interface AIDesignSuggestion {
  type: 'layout' | 'color' | 'typography' | 'spacing';
  suggestion: string;
  importance: 'high' | 'medium' | 'low';
  currentIssue?: string;
}

class AIService {
  async getTemplateRecommendations(userInput: {
    industry: string;
    goals: string[];
    targetAudience: string;
  }): Promise<AITemplateRecommendation[]> {
    const prompt = `As an AI landing page expert, recommend templates for a business in the ${userInput.industry} industry.
    Goals: ${userInput.goals.join(', ')}
    Target Audience: ${userInput.targetAudience}
    Provide recommendations in a structured format with templateId, confidence score, and reasons.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Procesar y estructurar la respuesta
    // Este es un ejemplo simplificado, deberías implementar el parsing adecuado
    return [
      {
        templateId: 'template1',
        confidence: 0.9,
        reasons: ['Matches industry', 'Proven conversion rate'],
        industryFit: 'Excellent',
        conversionPotential: 0.85
      }
    ];
  }

  async generateContent(context: {
    type: string;
    industry: string;
    tone: string;
    targetAudience: string;
  }): Promise<AIContentSuggestion[]> {
    const prompt = `Generate ${context.type} content for a landing page in the ${context.industry} industry.
    Tone: ${context.tone}
    Target Audience: ${context.targetAudience}
    Provide multiple variations with different approaches.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Implementar el parsing de la respuesta
    return [
      {
        type: 'headline',
        content: 'Transform Your Business with AI-Powered Solutions',
        confidence: 0.88,
        context: 'Main hero section'
      }
    ];
  }

  async analyzeDesign(design: any): Promise<AIDesignSuggestion[]> {
    const prompt = `Analyze this landing page design and provide suggestions for improvement.
    Current Layout: ${JSON.stringify(design)}
    Focus on layout, typography, color scheme, and spacing.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return [
      {
        type: 'layout',
        suggestion: 'Consider moving the CTA above the fold',
        importance: 'high'
      }
    ];
  }
}

export const aiService = new AIService();
