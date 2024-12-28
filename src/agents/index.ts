export * from './types';
export * from './BaseAgent';
export * from './ChatAgent';
export * from './BuilderAgent';
export * from './ContentAgent';

import { ChatAgent } from './ChatAgent';
import { BuilderAgent } from './BuilderAgent';
import { ContentAgent } from './ContentAgent';
import { AgentType, ChatAgentConfig, BuilderAgentConfig, ContentAgentConfig } from './types';

export class AgentFactory {
  static createAgent(type: AgentType, name: string, config: any) {
    switch (type) {
      case AgentType.CHAT:
        return new ChatAgent(name, config as ChatAgentConfig);
      case AgentType.BUILDER:
        return new BuilderAgent(name, config as BuilderAgentConfig);
      case AgentType.CONTENT:
        return new ContentAgent(name, config as ContentAgentConfig);
      default:
        throw new Error(`Agent type ${type} not supported`);
    }
  }
}
