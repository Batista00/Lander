import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'sonner';
import { ChatMessage } from '../types';

class ChatbotService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private chat: any = null;
  private pageContext: string = '';
  private conversationHistory: { role: string; parts: { text: string }[] }[] = [];

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
      
      if (!apiKey) {
        console.warn('VITE_GOOGLE_AI_API_KEY no está configurada en el archivo .env');
        toast.error('El chatbot no está disponible en este momento. Por favor, configura la API key.');
        return;
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      // Configuración inicial del chat
      this.conversationHistory = [
        {
          role: "user",
          parts: [{text: "Eres Lander, asistente de una plataforma de landing pages. Servicios: 1) Creación desde $29/mes, 2) Plantillas profesionales, 3) Hosting incluido, 4) Dominio gratis 1er año, 5) Análisis de conversión. Da respuestas breves (2-3 líneas). Solo habla de estos servicios."}]
        },
        {
          role: "model",
          parts: [{text: "¡Hola! Soy Lander, asistente para crear landing pages. Ofrecemos planes desde $29/mes con plantillas profesionales, hosting y dominio gratis el primer año. ¿Cómo puedo ayudarte?"}]
        }
      ];

      this.restartChat();
    } catch (error) {
      console.error('Error al inicializar ChatbotService:', error);
      toast.error('Error al inicializar el chatbot. Por favor, intenta más tarde.');
    }
  }

  private restartChat() {
    this.chat = this.model.startChat({
      history: this.conversationHistory,
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.7
      }
    });
  }

  setPageContext(context: string) {
    this.pageContext = context;
    // Agregar contexto a la conversación
    if (context) {
      this.conversationHistory.push({
        role: "user",
        parts: [{text: `Contexto de la página actual: ${context}`}]
      });
      this.restartChat();
    }
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      await this.initialize();
      if (!this.chat) {
        throw new Error('El chatbot no está inicializado correctamente. Verifica la configuración de la API key.');
      }
    }

    try {
      // Agregar mensaje del usuario al historial
      this.conversationHistory.push({
        role: "user",
        parts: [{text: message}]
      });

      const result = await this.chat.sendMessage([{text: message}]);
      const response = await result.response;
      const responseText = response.text();

      // Agregar respuesta del modelo al historial
      this.conversationHistory.push({
        role: "model",
        parts: [{text: responseText}]
      });

      // Si el historial es muy largo, reiniciar el chat con los últimos mensajes
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = [
          ...this.conversationHistory.slice(0, 2), // Mantener las instrucciones iniciales
          ...this.conversationHistory.slice(-6) // Mantener los últimos 6 mensajes
        ];
        this.restartChat();
      }

      return responseText;
    } catch (error: any) {
      console.error('Error al procesar el mensaje:', error);
      throw new Error('Error al procesar el mensaje. Por favor, intenta más tarde.');
    }
  }

  // Método para analizar el sentimiento del mensaje
  async analyzeSentiment(message: string): Promise<'positive' | 'negative' | 'neutral'> {
    if (!this.model) return 'neutral';
    
    try {
      const result = await this.model.generateContent([{
        text: `Analiza el sentimiento del siguiente mensaje y responde solo con una palabra: 'positive', 'negative' o 'neutral'. Mensaje: "${message}"`
      }]);
      const response = await result.response;
      const sentiment = response.text().toLowerCase().trim();
      return sentiment as 'positive' | 'negative' | 'neutral';
    } catch (error) {
      console.error('Error al analizar sentimiento:', error);
      return 'neutral';
    }
  }
}

export const chatbotService = new ChatbotService();
