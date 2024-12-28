import { GoogleGenerativeAI } from '@google/generative-ai';
import { GOOGLE_CONFIG } from '../../../config/google.config';

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        if (!GOOGLE_CONFIG.API_KEY) {
            throw new Error('Google API Key is not configured');
        }
        this.genAI = new GoogleGenerativeAI(GOOGLE_CONFIG.API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: GOOGLE_CONFIG.MODEL });
    }

    async chat(messages: { role: string; content: string }[]) {
        try {
            const chat = this.model.startChat({
                history: messages.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: msg.content,
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(messages[messages.length - 1].content);
            const response = await result.response;
            
            return {
                role: 'assistant',
                content: response.text(),
            };
        } catch (error) {
            console.error('Error in GeminiService.chat:', error);
            throw error;
        }
    }

    async generateResponse(prompt: string) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error in GeminiService.generateResponse:', error);
            throw error;
        }
    }
}

// Exportamos una instancia por defecto
export const geminiService = new GeminiService();
