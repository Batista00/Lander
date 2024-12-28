"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLANS = void 0;
exports.PLANS = {
    free: {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
            '1 Landing Page',
            'Templates Básicos',
            'Estadísticas Básicas',
            'Soporte por Email'
        ],
        maxLandingPages: 1,
        maxTemplates: 1,
        analytics: false,
        customDomain: false,
        support: 'basic',
        watermark: true
    },
    premium: {
        id: 'premium',
        name: 'Premium',
        price: 29.99,
        features: [
            '5 Landing Pages',
            'Todos los Templates',
            'Estadísticas Avanzadas',
            'Dominio Personalizado',
            'Sin Marca de Agua',
            'Soporte Prioritario'
        ],
        maxLandingPages: 5,
        maxTemplates: 999,
        analytics: true,
        customDomain: true,
        support: 'priority',
        watermark: false
    },
    enterprise: {
        id: 'enterprise',
        name: 'Enterprise',
        price: 99.99,
        features: [
            'Landing Pages Ilimitadas',
            'Templates Personalizados',
            'API Access',
            'Múltiples Usuarios',
            'Soporte 24/7',
            'Análisis Avanzado'
        ],
        maxLandingPages: Infinity,
        maxTemplates: Infinity,
        analytics: true,
        customDomain: true,
        support: '24/7',
        watermark: false
    }
};
