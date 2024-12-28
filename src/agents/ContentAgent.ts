import { BaseAgent } from './BaseAgent';
import { AgentType, ContentAgentConfig, AgentResponse } from './types';

export class ContentAgent extends BaseAgent {
  config: ContentAgentConfig;

  constructor(name: string, config: ContentAgentConfig) {
    super(name, AgentType.CONTENT, config);
    this.config = config;
  }

  async process(input: {
    type: 'generate' | 'optimize' | 'translate';
    content?: string;
    context: {
      componentType: string;
      purpose?: string;
      targetAudience?: string;
    }
  }): Promise<AgentResponse> {
    try {
      const prompt = this.buildPrompt(input);
      const response = await this.callAI(prompt);
      
      return this.createResponse(true, {
        content: response.content,
        suggestions: response.suggestions
      });
    } catch (error) {
      return this.createResponse(false, null, error.message);
    }
  }

  private buildPrompt(input: any): string {
    const { type, content, context } = input;
    const { tone, industry, targetAudience } = this.config;

    let prompt = `Task: ${type}\\n`;
    prompt += `Component: ${context.componentType}\\n`;
    prompt += `Tone: ${tone}\\n`;
    prompt += `Industry: ${industry}\\n`;
    prompt += `Target Audience: ${context.targetAudience || targetAudience}\\n`;

    if (content) {
      prompt += `Current Content: ${content}\\n`;
    }

    return prompt;
  }
}
