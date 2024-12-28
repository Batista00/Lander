export const ABACUS_CONFIG = {
    API_TOKEN: 'your_api_token_here',
    API_VERSION: 'v1',
    BASE_URL: 'https://api.abacus.ai',
    ENDPOINTS: {
        CHAT: '/chat/completions',
        TRAIN: '/fine-tune',
        MODELS: '/models'
    },
    DEFAULT_MODEL: 'chat-large',
    TEMPERATURE: {
        CREATIVE: 0.7,
        BALANCED: 0.5,
        PRECISE: 0.3
    },
    MAX_TOKENS: {
        SHORT: 150,
        MEDIUM: 250,
        LONG: 400
    }
};
