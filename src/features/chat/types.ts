export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface ChatResponse {
    role: 'assistant';
    content: string;
}

export interface ChatIntent {
    intent: string;
    confidence: number;
    entities?: Record<string, any>;
}
