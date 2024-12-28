import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_CONFIG = {
    API_KEY: process.env.GOOGLE_AI_API_KEY,
    MODEL: 'gemini-pro'
};

async function testGemini() {
    try {
        console.log('🔄 Configuración:', {
            apiKey: GOOGLE_CONFIG.API_KEY ? 'Configurada' : 'No configurada',
            model: GOOGLE_CONFIG.MODEL
        });

        const genAI = new GoogleGenerativeAI(GOOGLE_CONFIG.API_KEY);
        const model = genAI.getGenerativeModel({ model: GOOGLE_CONFIG.MODEL });

        console.log('🔄 Probando chat con Gemini...');
        
        const chat = model.startChat({
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        const msg = 'Hola, esta es una prueba de conexión. Por favor responde con un simple "Conexión exitosa".';
        console.log('📤 Enviando mensaje:', msg);
        
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        console.log('✅ Respuesta del chat:', response.text());

        console.log('\n🔄 Probando generación de contenido...');
        const prompt = 'Genera una breve descripción de 20 palabras sobre inteligencia artificial.';
        console.log('📤 Enviando prompt:', prompt);
        
        const contentResult = await model.generateContent(prompt);
        const contentResponse = await contentResult.response;
        console.log('✅ Contenido generado:', contentResponse.text());

    } catch (error) {
        console.error('❌ Error en la prueba:', error);
        if (error instanceof Error) {
            console.error('Mensaje de error:', error.message);
        }
    }
}

// Ejecutar el test
console.log('🚀 Iniciando pruebas de Gemini...');
testGemini();
