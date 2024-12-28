import { BaseAgent } from './BaseAgent';
import { AgentType, ChatAgentConfig, AgentResponse } from './types';

export class ChatAgent extends BaseAgent {
  config: ChatAgentConfig;

  constructor(name: string, config: ChatAgentConfig) {
    super(name, AgentType.CHAT, config);
    this.config = config;
  }

  async process(input: { message: string; context?: any }): Promise<AgentResponse> {
    try {
      const prompt = this.buildPrompt(input);
      const response = await this.callAI(prompt);
      
      return this.createResponse(true, {
        message: response,
        type: 'agent'
      });
    } catch (error) {
      return this.createResponse(false, null, error.message);
    }
  }

  private buildPrompt(input: { message: string; context?: any }): string {
    const { message, context } = input;
    const { personality, knowledgeBase } = this.config;

    // Construir el prompt basado en la personalidad y base de conocimiento
    let prompt = `${personality || 'Assistant'}: `;
    
    if (knowledgeBase?.length) {
      prompt += `Context: ${knowledgeBase.join(' ')}\\n`;
    }

    prompt += `User: ${message}\\n`;
    return prompt;
  }
}
