import { ABACUS_CONFIG } from '@/config/abacus.config';

async function testAbacusConnection() {
    try {
        const response = await fetch(`${ABACUS_CONFIG.BASE_URL}/v0/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ABACUS_CONFIG.API_TOKEN}`
            },
            body: JSON.stringify({
                model: ABACUS_CONFIG.DEFAULT_MODEL,
                messages: [
                    {
                        role: "user",
                        content: "Hola, esta es una prueba de conexión. Por favor responde con un simple 'Conexión exitosa'."
                    }
                ],
                temperature: ABACUS_CONFIG.TEMPERATURE.PRECISE,
                max_tokens: ABACUS_CONFIG.MAX_TOKENS.SHORT
            })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Respuesta de Abacus:', data);
        return data;

    } catch (error) {
        console.error('Error al conectar con Abacus:', error);
        throw error;
    }
}

// Ejecutar la prueba
testAbacusConnection()
    .then(result => {
        console.log('✅ Conexión exitosa con Abacus.ai');
        console.log('Resultado:', result);
    })
    .catch(error => {
        console.error('❌ Error en la conexión:', error);
    });
