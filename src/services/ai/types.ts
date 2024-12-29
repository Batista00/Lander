export interface BusinessContext {
  industry: string;
  goals: string[];
  audience: string;
  brand: {
    tone: string;
    values: string[];
  };
}

export interface AIRecommendation {
  templateId: string;
  name: string;
  description: string;
  score: number;
  reasons: string[];
  preview?: string;
}
