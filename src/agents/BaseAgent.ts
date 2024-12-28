import { AIAgent, AgentType, AgentStatus, AgentConfig, AgentResponse } from './types';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseAgent implements AIAgent {
  id: string;
  name: string;
  type: AgentType;
  config: AgentConfig;
  status: AgentStatus;

  constructor(name: string, type: AgentType, config: AgentConfig) {
    this.id = uuidv4();
    this.name = name;
    this.type = type;
    this.config = config;
    this.status = AgentStatus.IDLE;
  }

  abstract process(input: any): Promise<AgentResponse>;

  protected async callAI(prompt: string): Promise<any> {
    // Implementar llamada a API de Abacus.ai
    throw new Error('Method not implemented');
  }

  protected setStatus(status: AgentStatus) {
    this.status = status;
  }

  protected createResponse(success: boolean, data?: any, error?: string): AgentResponse {
    return {
      success,
      data,
      error,
      metadata: {
        processingTime: 0,
        modelUsed: this.config.model,
        tokensUsed: 0
      }
    };
  }
}
