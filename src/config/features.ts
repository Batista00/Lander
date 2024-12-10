export const PLAN_LIMITS = {
  free: {
    landingPages: 1,
    components: ['hero', 'features', 'contact'],
    storage: 50, // MB
    monthlyVisits: 1000,
    leads: 50,
  },
  premium: {
    landingPages: 10,
    components: ['hero', 'features', 'contact', 'products', 'booking', 'gallery', 'pricing', 'team', 'testimonials', 'faq', 'blog', 'newsletter', 'social', 'map', 'video'],
    storage: 500, // MB
    monthlyVisits: 50000,
    leads: 'unlimited',
  }
};

export const FEATURES = {
  free: {
    // Características Gratuitas
    basicComponents: true,
    dragAndDrop: true,
    basicTemplates: true,
    basicAnalytics: true,
    basicSEO: true,
    responsiveDesign: true,
    basicFormBuilder: true,
    socialMediaSharing: true,
    basicCustomization: true,
    preview: true,
    publish: true,
    basicLeadCapture: true,
    basicIntegrations: true,
    basicSupport: true,
    basicExport: true,
  },
  premium: {
    // Características Premium
    // 1. Personalización Avanzada
    customCSS: true,
    customFonts: true,
    customColors: true,
    customAnimations: true,
    customLayouts: true,

    // 2. Componentes Premium
    advancedComponents: true,
    customComponents: true,
    premiumTemplates: true,
    componentLibrary: true,
    
    // 3. Funcionalidades Avanzadas
    versionHistory: true,
    autoSave: true,
    collaboration: true,
    exportCode: true,
    backups: true,
    
    // 4. Marketing y Analytics
    advancedAnalytics: true,
    heatmaps: true,
    abTesting: true,
    conversionTracking: true,
    customDomains: true,
    
    // 5. Integraciones
    zapierIntegration: true,
    crmIntegration: true,
    emailMarketing: true,
    paymentGateways: true,
    chatbotIntegration: true,
    
    // 6. SEO y Optimización
    advancedSEO: true,
    sitemapGeneration: true,
    metaTagsEditor: true,
    schemaMarkup: true,
    speedOptimization: true,
    
    // 7. Herramientas de Productividad
    templateSaving: true,
    globalStyles: true,
    componentPresets: true,
    bulkEditing: true,
    searchAndReplace: true,
    
    // 8. Seguridad y Rendimiento
    sslCertificate: true,
    ddosProtection: true,
    cdnDelivery: true,
    backupRestoration: true,
    performanceMonitoring: true,
    
    // 9. Soporte Premium
    prioritySupport: true,
    dedicatedManager: true,
    training: true,
    customization: true,
    monthlyConsultation: true,
  }
};
