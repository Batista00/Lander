import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_CONFIG = {
    API_KEY: process.env.GOOGLE_AI_API_KEY,
    MODEL: 'gemini-pro'
};

class ChatbotService {
    constructor() {
        if (!GOOGLE_CONFIG.API_KEY) {
            throw new Error('Google API Key is not configured');
        }

        this.genAI = new GoogleGenerativeAI(GOOGLE_CONFIG.API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: GOOGLE_CONFIG.MODEL });
        
        this.systemPrompt = `Eres un asistente virtual profesional y amigable diseñado para ayudar a los visitantes de nuestra landing page.
Tu objetivo es:
1. Responder preguntas sobre nuestros productos y servicios
2. Ayudar con el proceso de programación de citas
3. Proporcionar información relevante sobre la empresa
4. Mantener un tono profesional pero cercano
5. Ser conciso pero informativo en tus respuestas`;
    }

    async processMessage(messages) {
        try {
            const chat = this.model.startChat({
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                }
            });

            // Primero enviamos el prompt del sistema
            await chat.sendMessage(this.systemPrompt);

            // Luego enviamos el mensaje del usuario
            const result = await chat.sendMessage(messages[messages.length - 1].content);
            const response = await result.response;

            return {
                role: 'assistant',
                content: response.text()
            };
        } catch (error) {
            console.error('Error in processMessage:', error);
            throw error;
        }
    }

    async detectIntent(message) {
        try {
            const prompt = `Analiza el siguiente mensaje y determina la intención del usuario.
Responde SOLO con un objeto JSON que contenga los campos: intent, confidence (número entre 0 y 1), y entities (opcional).
Las intenciones posibles son: schedule_appointment, reschedule_appointment, cancel_appointment, product_info, pricing_info, general_info, greeting, farewell, other.

Por ejemplo:
{
    "intent": "schedule_appointment",
    "confidence": 0.9,
    "entities": {
        "date": "próxima semana",
        "service": "consulta"
    }
}

Mensaje del usuario: "${message}"`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();
            return JSON.parse(text);
        } catch (error) {
            console.error('Error in detectIntent:', error);
            return {
                intent: 'other',
                confidence: 0,
            };
        }
    }

    async generateTrainingData(pageContent) {
        try {
            const prompt = `Basado en el siguiente contenido de la página, genera 5 preguntas frecuentes que los usuarios podrían hacer:
${pageContent}

Responde solo con las preguntas, una por línea.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text().split('\n').filter(q => q.trim());
        } catch (error) {
            console.error('Error in generateTrainingData:', error);
            return [];
        }
    }
}

// Crear instancia del servicio
const chatbotService = new ChatbotService();

async function testChatbot() {
    try {
        // Test 1: Procesamiento de mensajes
        console.log('🔄 Test 1: Procesando mensaje de chat...');
        const response = await chatbotService.processMessage([
            {
                role: 'user',
                content: 'Hola, me gustaría programar una cita para la próxima semana.'
            }
        ]);
        console.log('✅ Respuesta del chat:', response);

        // Test 2: Detección de intención
        console.log('\n🔄 Test 2: Detectando intención...');
        const intent = await chatbotService.detectIntent(
            'Necesito cambiar mi cita del martes para el jueves'
        );
        console.log('✅ Intención detectada:', intent);

        // Test 3: Generación de datos de entrenamiento
        console.log('\n🔄 Test 3: Generando datos de entrenamiento...');
        const pageContent = `
            Somos una empresa líder en desarrollo de software personalizado.
            Ofrecemos servicios de desarrollo web, móvil y de escritorio.
            Nuestro equipo tiene más de 10 años de experiencia.
            Trabajamos con las últimas tecnologías.
            Ofrecemos consultas gratuitas para evaluar tu proyecto.
        `;
        const trainingData = await chatbotService.generateTrainingData(pageContent);
        console.log('✅ Preguntas generadas:', trainingData);

    } catch (error) {
        console.error('❌ Error en las pruebas:', error);
        if (error instanceof Error) {
            console.error('Mensaje de error:', error.message);
        }
    }
}

// Ejecutar las pruebas
console.log('🚀 Iniciando pruebas del ChatbotService...');
testChatbot();
