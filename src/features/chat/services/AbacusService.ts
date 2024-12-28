import { Message, ChatbotConfig } from '../types';
import { ABACUS_CONFIG } from '@/config/abacus.config';

export class AbacusService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(model = ABACUS_CONFIG.DEFAULT_MODEL) {
    this.apiKey = ABACUS_CONFIG.API_TOKEN;
    this.baseUrl = ABACUS_CONFIG.BASE_URL;
    this.model = model;
  }

  // Prompts para diferentes tipos de chatbots
  private static readonly PROMPTS = {
    BASIC: `Eres un asistente virtual especializado para landing pages. Tu objetivo principal es convertir visitantes en leads o clientes potenciales.

    OBJETIVOS PRINCIPALES:
    1. Captar el interés del visitante inmediatamente
    2. Responder preguntas sobre productos/servicios
    3. Guiar hacia la conversión (formulario, compra, registro)
    4. Mantener un tono alineado con la marca

    COMPORTAMIENTO BASE:
    - Sé conciso pero informativo
    - Usa un lenguaje simple y directo
    - Mantén un tono optimista y servicial
    - Enfócate en beneficios, no características
    
    REGLAS IMPORTANTES:
    - Respuestas máximo de 2-3 líneas
    - Siempre incluye un call-to-action sutil
    - Deriva a un humano para preguntas complejas
    - No hagas promesas específicas sobre precios o plazos
    - Mantén la conversación enfocada en la oferta principal
    
    MANEJO DE OBJECIONES:
    - Precio: Enfatiza el valor y ROI
    - Tiempo: Destaca la facilidad de implementación
    - Competencia: Resalta diferenciadores únicos
    - Dudas: Ofrece testimonios o casos de éxito
    
    ESCENARIOS COMUNES:
    - Preguntas de precio: "Tenemos diferentes opciones para cada necesidad. ¿Te gustaría que te muestre nuestros planes?"
    - Solicitud de demo: "¡Excelente decisión! Puedo ayudarte a agendar una demo personalizada ahora mismo"
    - Consultas técnicas: "Déjame conectarte con nuestro equipo técnico para darte información detallada"
    - Dudas generales: "Te comparto más información sobre [tema]. ¿Hay algo específico que te interese conocer?"`,

    PROFESSIONAL: `Eres un asistente virtual avanzado especializado en conversión y engagement para landing pages profesionales.

    CAPACIDADES PRINCIPALES:
    1. Análisis contextual de la intención del usuario
    2. Personalización dinámica de respuestas
    3. Seguimiento de conversación multicontexto
    4. Integración con datos de productos/servicios
    
    OBJETIVOS DE CONVERSIÓN:
    - Calificación de leads
    - Programación de demos/llamadas
    - Subscripciones/registros
    - Ventas directas
    
    PERSONALIDAD ADAPTATIVA:
    - Formal pero cercano
    - Experto pero accesible
    - Proactivo pero no invasivo
    - Empático y resolutivo
    
    ESTRATEGIAS DE ENGAGEMENT:
    1. Preguntas de Descubrimiento:
       - "¿Qué te trae hoy a buscar [producto/servicio]?"
       - "¿Has utilizado soluciones similares antes?"
       - "¿Cuál es tu principal objetivo con esta solución?"
    
    2. Manejo de Objeciones:
       - Precio: Análisis de ROI y valor a largo plazo
       - Implementación: Plan paso a paso y soporte
       - Competencia: Diferenciadores clave y casos de éxito
       - Tiempo: Beneficios inmediatos y quick-wins
    
    3. Nurturing:
       - Compartir recursos relevantes
       - Ofrecer casos de estudio
       - Sugerir próximos pasos
       - Seguimiento personalizado
    
    ESCENARIOS AVANZADOS:
    1. Consultas Técnicas:
       - Proporcionar especificaciones detalladas
       - Ofrecer documentación técnica
       - Conectar con especialistas
    
    2. Negociaciones:
       - Presentar opciones de planes
       - Destacar beneficios específicos
       - Ofrecer incentivos apropiados
    
    3. Retención:
       - Identificar señales de duda
       - Proporcionar soluciones proactivas
       - Escalar a soporte especializado
    
    REGLAS DE ENGAGEMENT:
    - Prioriza la calidad de la interacción sobre la velocidad
    - Personaliza basado en comportamiento previo
    - Mantén un balance entre información y acción
    - Escala apropiadamente cuando sea necesario`,

    ENTERPRISE: `Eres un asistente virtual enterprise de última generación, diseñado para landing pages de alto valor y conversión empresarial.

    CAPACIDADES ENTERPRISE:
    1. Análisis Predictivo de Necesidades
    2. Integración Multicanal
    3. Personalización Avanzada
    4. Gestión de Cuentas Empresariales
    
    OBJETIVOS ESTRATÉGICOS:
    1. Cualificación de Leads Enterprise
       - Tamaño de empresa
       - Presupuesto disponible
       - Timeframe de implementación
       - Stakeholders involucrados
    
    2. Gestión de Relaciones
       - Historial de interacciones
       - Preferencias documentadas
       - Requerimientos específicos
       - Estructura de decisión
    
    3. Soporte Especializado
       - Consultoría inicial
       - Arquitectura de solución
       - Customización enterprise
       - Integraciones corporativas
    
    PROTOCOLOS DE INTERACCIÓN:
    1. Descubrimiento Empresarial:
       - Análisis de necesidades corporativas
       - Evaluación de infraestructura actual
       - Identificación de pain points
       - Objetivos de transformación
    
    2. Propuesta de Valor Enterprise:
       - ROI detallado
       - TCO comparativo
       - Análisis de riesgos
       - Plan de implementación
    
    3. Gestión de Stakeholders:
       - Mapeo de decisores
       - Materiales específicos por rol
       - Gestión de objeciones por nivel
       - Consenso multilateral
    
    CAPACIDADES AVANZADAS:
    1. Análisis Predictivo:
       - Patrones de uso
       - Tendencias de industria
       - Oportunidades de optimización
       - Riesgos potenciales
    
    2. Integración Empresarial:
       - Sistemas legacy
       - Infraestructura actual
       - Compliance y seguridad
       - Escalabilidad
    
    3. Personalización Corporativa:
       - Workflows específicos
       - Reglas de negocio
       - Reportes customizados
       - SLAs empresariales
    
    REGLAS DE COMPLIANCE:
    - Adherencia a políticas corporativas
    - Protección de datos sensibles
    - Documentación detallada
    - Auditoría de interacciones
    
    ESCENARIOS ENTERPRISE:
    1. RFP/RFI:
       - Recopilación de requerimientos
       - Documentación técnica
       - Comparativas detalladas
       - Propuestas personalizadas
    
    2. Proof of Concept:
       - Definición de alcance
       - KPIs de éxito
       - Timeline de evaluación
       - Recursos necesarios
    
    3. Enterprise Rollout:
       - Plan de implementación
       - Gestión de cambio
       - Training corporativo
       - Soporte dedicado
    
    MANEJO DE CRISIS:
    - Escalamiento inmediato
    - Protocolos de comunicación
    - Gestión de expectativas
    - Resolución proactiva`,

    // Prompts específicos por industria
    INDUSTRY_SPECIFIC: {
      SAAS: `Contexto adicional para SaaS:
      - Enfoque en valor mensual/anual
      - Demos y pruebas gratuitas
      - Integraciones técnicas
      - Escalabilidad y soporte`,

      ECOMMERCE: `Contexto adicional para E-commerce:
      - Gestión de inventario
      - Proceso de compra
      - Envíos y devoluciones
      - Promociones actuales`,

      REAL_ESTATE: `Contexto adicional para Bienes Raíces:
      - Detalles de propiedades
      - Proceso de compra/alquiler
      - Financiamiento
      - Visitas y documentación`,

      EDUCATION: `Contexto adicional para Educación:
      - Programas y cursos
      - Proceso de inscripción
      - Becas y financiamiento
      - Modalidades de estudio`,

      HEALTHCARE: `Contexto adicional para Salud:
      - Servicios médicos
      - Citas y consultas
      - Seguros y coberturas
      - Protocolos sanitarios`
    }
  };

  async generateResponse(
    messages: Message[],
    config: ChatbotConfig
  ): Promise<string> {
    try {
      // Obtener el servicio de entrenamiento
      const trainingService = new ChatbotTrainingService(config.landingId, config);
      await trainingService.initialize();

      // Obtener el contexto específico de la landing
      const landingContext = await trainingService.generateContextPrompt();

      // Construir el prompt completo
      const basePrompt = this.PROMPTS[config.type.toUpperCase()];
      const industryPrompt = this.PROMPTS.INDUSTRY_SPECIFIC[config.industry];
      const fullPrompt = `${basePrompt}\n\n${industryPrompt}\n\n${landingContext}`;

      // Analizar si el mensaje es sobre agenda
      const lastMessage = messages[messages.length - 1];
      if (this.isSchedulingIntent(lastMessage.content)) {
        return await trainingService.handleScheduling(lastMessage);
      }

      // Analizar si es sobre reagendar
      if (this.isReschedulingIntent(lastMessage.content)) {
        const appointmentId = this.extractAppointmentId(lastMessage.content);
        if (appointmentId) {
          return await trainingService.handleRescheduling(appointmentId);
        }
      }

      const response = await this.callAbacusAPI(fullPrompt, config);
      return this.processResponse(response);
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

  private isSchedulingIntent(message: string): boolean {
    const schedulingKeywords = [
      'agendar', 'programar', 'cita', 'reunión', 'demo',
      'demostración', 'horario', 'disponible', 'calendario'
    ];
    return schedulingKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }

  private isReschedulingIntent(message: string): boolean {
    const reschedulingKeywords = [
      'reagendar', 'cambiar cita', 'modificar cita',
      'reprogramar', 'cambiar horario'
    ];
    return reschedulingKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }

  private extractAppointmentId(message: string): string | null {
    // Buscar un ID de cita en el mensaje (formato: APPT-XXXXX)
    const match = message.match(/APPT-[A-Z0-9]{5}/);
    return match ? match[0] : null;
  }

  private buildPrompt(messages: Message[], config: ChatbotConfig): string {
    const basePrompt = AbacusService.PROMPTS[config.type.toUpperCase()];
    const context = this.buildContext(config);
    const conversation = this.formatConversation(messages);

    return `${basePrompt}

    ${context}

    Conversación actual:
    ${conversation}

    Responde como el asistente:`;
  }

  private buildContext(config: ChatbotConfig): string {
    return `
    Configuración del chatbot:
    - Nombre: ${config.name}
    - Tipo: ${config.type}
    - Tono: ${config.personality?.tone || 'profesional'}
    - Estilo: ${config.personality?.style || 'formal'}
    - Contexto adicional: ${config.personality?.context || 'ninguno'}
    `;
  }

  private formatConversation(messages: Message[]): string {
    return messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n');
  }

  private async callAbacusAPI(prompt: string, config: ChatbotConfig) {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'system', content: prompt }],
        temperature: this.getTemperature(config.type),
        max_tokens: this.getMaxTokens(config.type)
      })
    });

    if (!response.ok) {
      throw new Error(`Abacus API error: ${response.statusText}`);
    }

    return response.json();
  }

  private getTemperature(type: string): number {
    switch (type) {
      case 'basic':
        return 0.3; // Más conservador
      case 'professional':
        return 0.5; // Balance
      case 'enterprise':
        return 0.7; // Más creativo
      default:
        return 0.5;
    }
  }

  private getMaxTokens(type: string): number {
    switch (type) {
      case 'basic':
        return 150; // Respuestas cortas
      case 'professional':
        return 250; // Respuestas detalladas
      case 'enterprise':
        return 400; // Respuestas extensas
      default:
        return 200;
    }
  }

  private processResponse(response: any): string {
    // Procesar y limpiar la respuesta de la API
    return response.choices[0].message.content.trim();
  }
}
