import fetch from 'node-fetch';

const ABACUS_CONFIG = {
    API_TOKEN: 's2_99ec784eb7ec4877bc80eca385ecbdae',
    BASE_URL: 'https://apps.abacus.ai',
    APP_ID: 'dcb501b20'
};

async function testAbacusConnection() {
    try {
        console.log('🔄 Probando conexión con el agente ChatLLM...');
        
        const response = await fetch(`${ABACUS_CONFIG.BASE_URL}/chatllm/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ABACUS_CONFIG.API_TOKEN}`
            },
            body: JSON.stringify({
                appId: ABACUS_CONFIG.APP_ID,
                messages: [{
                    role: "user",
                    content: "Hola, esta es una prueba de conexión. Por favor responde con un simple 'Conexión exitosa'."
                }],
                temperature: 0.3,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}\n${errorText}`);
        }

        const data = await response.json();
        console.log('Respuesta del agente:', JSON.stringify(data, null, 2));
        return data;

    } catch (error) {
        console.error('❌ Error al conectar con el agente:', error);
        throw error;
    }
}

// Ejecutar la prueba
console.log('🔄 Iniciando prueba del agente ChatLLM...');
testAbacusConnection()
    .then(result => {
        console.log('✅ Conexión exitosa con el agente ChatLLM');
        console.log('Resultado:', JSON.stringify(result, null, 2));
    })
    .catch(error => {
        console.error('❌ Error en la conexión:', error.message);
    });
