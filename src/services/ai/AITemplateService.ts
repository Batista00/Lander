import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface TemplateAnalysis {
  industry: {
    match: number;
    reasons: string[];
    suggestions: string[];
  };
  conversion: {
    potential: number;
    strengths: string[];
    improvements: string[];
  };
  design: {
    score: number;
    highlights: string[];
    customization: string[];
  };
  audience: {
    match: number;
    insights: string[];
    recommendations: string[];
  };
}

export interface AITemplateEnhancement {
  layout: {
    suggestions: string[];
    priority: 'high' | 'medium' | 'low';
  };
  content: {
    headlines: string[];
    descriptions: string[];
    ctaVariants: string[];
  };
  style: {
    colorPalette: string[];
    typography: {
      headings: string[];
      body: string[];
    };
    spacing: string[];
  };
}

class AITemplateService {
  private async generateStructuredResponse(prompt: string) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  }

  async analyzeTemplate(template: any, userContext: {
    industry: string;
    targetAudience: string;
    goals: string[];
    brand?: {
      tone: string;
      values: string[];
    };
  }): Promise<TemplateAnalysis> {
    const prompt = `Analyze this landing page template for a ${userContext.industry} business.
    Target Audience: ${userContext.targetAudience}
    Business Goals: ${userContext.goals.join(', ')}
    ${userContext.brand ? `Brand Tone: ${userContext.brand.tone}
    Brand Values: ${userContext.brand.values.join(', ')}` : ''}

    Provide a detailed analysis in JSON format with the following structure:
    {
      "industry": {
        "match": number (0-100),
        "reasons": string[],
        "suggestions": string[]
      },
      "conversion": {
        "potential": number (0-100),
        "strengths": string[],
        "improvements": string[]
      },
      "design": {
        "score": number (0-100),
        "highlights": string[],
        "customization": string[]
      },
      "audience": {
        "match": number (0-100),
        "insights": string[],
        "recommendations": string[]
      }
    }`;

    return this.generateStructuredResponse(prompt);
  }

  async generateEnhancements(template: any, analysis: TemplateAnalysis): Promise<AITemplateEnhancement> {
    const prompt = `Based on the template analysis, generate specific enhancements in JSON format:
    {
      "layout": {
        "suggestions": string[],
        "priority": "high" | "medium" | "low"
      },
      "content": {
        "headlines": string[],
        "descriptions": string[],
        "ctaVariants": string[]
      },
      "style": {
        "colorPalette": string[],
        "typography": {
          "headings": string[],
          "body": string[]
        },
        "spacing": string[]
      }
    }

    Consider:
    - Industry match: ${analysis.industry.match}%
    - Conversion potential: ${analysis.conversion.potential}%
    - Design score: ${analysis.design.score}%
    - Audience match: ${analysis.audience.match}%`;

    return this.generateStructuredResponse(prompt);
  }

  async suggestTemplateVariations(baseTemplate: any, userPreferences: any): Promise<any[]> {
    const prompt = `Generate 3 variations of this template optimized for ${userPreferences.industry} and ${userPreferences.goals.join(', ')}.
    Consider:
    - Different layouts
    - Color schemes
    - Content organization
    - Call-to-action placements`;

    return this.generateStructuredResponse(prompt);
  }
}

export const aiTemplateService = new AITemplateService();
