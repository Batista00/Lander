import 'dotenv/config';
import { geminiService } from './GeminiService';

async function testGemini() {
    try {
        console.log('🔄 Probando chat con Gemini...');
        
        const response = await geminiService.chat([
            {
                role: 'user',
                content: 'Hola, esta es una prueba de conexión. Por favor responde con un simple "Conexión exitosa".'
            }
        ]);

        console.log('✅ Respuesta del chat:', response);

        console.log('\n🔄 Probando generación de contenido...');
        const textResponse = await geminiService.generateResponse(
            'Genera una breve descripción de 20 palabras sobre inteligencia artificial.'
        );

        console.log('✅ Contenido generado:', textResponse);

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
