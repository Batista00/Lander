import { BaseAgent } from './BaseAgent';
import { AgentType, BuilderAgentConfig, AgentResponse } from './types';
import { Component, ComponentType } from '@/types/landing';

export class BuilderAgent extends BaseAgent {
  config: BuilderAgentConfig;

  constructor(name: string, config: BuilderAgentConfig) {
    super(name, AgentType.BUILDER, config);
    this.config = config;
  }

  async process(input: { 
    type: 'suggestion' | 'optimization' | 'creation';
    context: {
      industry?: string;
      purpose?: string;
      currentComponents?: Component[];
    }
  }): Promise<AgentResponse> {
    try {
      const prompt = this.buildPrompt(input);
      const response = await this.callAI(prompt);
      
      return this.createResponse(true, {
        suggestions: response.suggestions,
        components: response.components,
        layout: response.layout
      });
    } catch (error) {
      return this.createResponse(false, null, error.message);
    }
  }

  private buildPrompt(input: any): string {
    const { type, context } = input;
    const { templates, stylePreferences, industryContext } = this.config;

    let prompt = `Task: ${type}\\n`;
    prompt += `Industry: ${context.industry || industryContext}\\n`;
    prompt += `Purpose: ${context.purpose}\\n`;
    
    if (templates?.length) {
      prompt += `Templates: ${templates.join(', ')}\\n`;
    }

    if (stylePreferences?.length) {
      prompt += `Style Preferences: ${stylePreferences.join(', ')}\\n`;
    }

    return prompt;
  }
}
