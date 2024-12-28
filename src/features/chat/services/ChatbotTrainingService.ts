import { LandingPageData } from '@/types/landing';
import { ChatbotConfig, Message } from '../types';
import { firestore } from '@/lib/firebase';

interface ProductInfo {
  name: string;
  description: string;
  features: string[];
  pricing: {
    amount: number;
    currency: string;
    period?: string;
  }[];
  benefits: string[];
}

interface SchedulingInfo {
  availableSlots: {
    date: string;
    times: string[];
  }[];
  duration: number;
  timezone: string;
}

interface TrainingData {
  productInfo: ProductInfo;
  scheduling?: SchedulingInfo;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  customPrompts: {
    greeting?: string;
    sales?: string[];
    scheduling?: string[];
  };
}

export class ChatbotTrainingService {
  private landingId: string;
  private config: ChatbotConfig;
  private trainingData: TrainingData;

  constructor(landingId: string, config: ChatbotConfig) {
    this.landingId = landingId;
    this.config = config;
  }

  async initialize() {
    // Obtener datos de la landing page
    const landingData = await this.fetchLandingData();
    // Preparar datos de entrenamiento
    this.trainingData = await this.prepareTrainingData(landingData);
    // Guardar en Firestore para uso futuro
    await this.saveTrainingData();
  }

  private async fetchLandingData(): Promise<LandingPageData> {
    const doc = await firestore
      .collection('landings')
      .doc(this.landingId)
      .get();
    return doc.data() as LandingPageData;
  }

  private async prepareTrainingData(landingData: LandingPageData): Promise<TrainingData> {
    return {
      productInfo: this.extractProductInfo(landingData),
      scheduling: await this.getSchedulingInfo(),
      faq: this.extractFAQ(landingData),
      customPrompts: this.generateCustomPrompts(landingData)
    };
  }

  private extractProductInfo(landingData: LandingPageData): ProductInfo {
    // Extraer información del producto de los componentes de la landing
    const productInfo: ProductInfo = {
      name: landingData.title || '',
      description: landingData.description || '',
      features: [],
      pricing: [],
      benefits: []
    };

    // Recorrer componentes para extraer información
    landingData.components.forEach(component => {
      switch (component.type) {
        case 'features':
          productInfo.features = component.data.items;
          break;
        case 'pricing':
          productInfo.pricing = component.data.plans;
          break;
        case 'benefits':
          productInfo.benefits = component.data.items;
          break;
      }
    });

    return productInfo;
  }

  private async getSchedulingInfo(): Promise<SchedulingInfo> {
    // Obtener slots disponibles del sistema de calendario
    const slots = await firestore
      .collection('availability')
      .doc(this.landingId)
      .get();

    return slots.data() as SchedulingInfo;
  }

  private extractFAQ(landingData: LandingPageData) {
    const faq = landingData.components
      .find(c => c.type === 'faq')
      ?.data?.items || [];
    
    return faq;
  }

  private generateCustomPrompts(landingData: LandingPageData) {
    const { productInfo } = this.trainingData;
    
    return {
      greeting: `¡Hola! Soy el asistente virtual de ${productInfo.name}. ¿Cómo puedo ayudarte hoy?`,
      sales: [
        `¿Te gustaría conocer más sobre ${productInfo.name}?`,
        `Tenemos una oferta especial en este momento para ${productInfo.name}`,
        `¿Te interesaría ver una demostración de ${productInfo.name}?`
      ],
      scheduling: [
        'Puedo ayudarte a agendar una cita ahora mismo',
        '¿Te gustaría ver los horarios disponibles?',
        'Podemos encontrar el mejor momento para ti'
      ]
    };
  }

  async generateContextPrompt(): string {
    const { productInfo, faq } = this.trainingData;

    return `
    CONTEXTO ESPECÍFICO DE LA LANDING PAGE:
    
    PRODUCTO/SERVICIO:
    Nombre: ${productInfo.name}
    Descripción: ${productInfo.description}
    
    CARACTERÍSTICAS PRINCIPALES:
    ${productInfo.features.map(f => `- ${f}`).join('\n')}
    
    BENEFICIOS CLAVE:
    ${productInfo.benefits.map(b => `- ${b}`).join('\n')}
    
    PRECIOS:
    ${productInfo.pricing.map(p => 
      `- ${p.amount} ${p.currency}${p.period ? ` por ${p.period}` : ''}`
    ).join('\n')}
    
    PREGUNTAS FRECUENTES:
    ${faq.map(f => `P: ${f.question}\nR: ${f.answer}`).join('\n\n')}
    
    ACCIONES DISPONIBLES:
    1. Agendar una demostración
    2. Solicitar más información
    3. Ver precios detallados
    4. Hablar con un representante
    
    OBJETIVOS DE CONVERSIÓN:
    1. Programar demostraciones
    2. Capturar leads calificados
    3. Resolver dudas sobre el producto/servicio
    4. Facilitar la decisión de compra
    
    INSTRUCCIONES ESPECÍFICAS:
    1. Usa los beneficios y características mencionados arriba
    2. Responde preguntas basándote en el FAQ proporcionado
    3. Ofrece agendar una demo cuando detectes interés
    4. Menciona precios solo si te preguntan específicamente
    `;
  }

  async handleScheduling(message: Message): Promise<string> {
    const { scheduling } = this.trainingData;
    
    // Verificar disponibilidad
    const availableSlots = scheduling?.availableSlots || [];
    const nextAvailable = availableSlots[0];

    if (!nextAvailable) {
      return 'Lo siento, no hay horarios disponibles en este momento. ¿Te gustaría que te contactemos cuando haya disponibilidad?';
    }

    // Formatear respuesta con slots disponibles
    return `
    Tengo estos horarios disponibles:
    Fecha: ${nextAvailable.date}
    Horarios: ${nextAvailable.times.join(', ')}
    Duración: ${scheduling?.duration} minutos
    
    ¿Te gustaría agendar alguno de estos horarios?
    `;
  }

  async handleRescheduling(appointmentId: string): Promise<string> {
    // Obtener la cita actual
    const appointment = await firestore
      .collection('appointments')
      .doc(appointmentId)
      .get();

    if (!appointment.exists) {
      return 'Lo siento, no encontré esa cita. ¿Podrías verificar el identificador?';
    }

    // Obtener nuevos slots disponibles
    const response = await this.handleScheduling({
      id: 'system',
      role: 'system',
      content: 'show_available_slots',
      timestamp: new Date()
    });

    return `
    Tu cita actual es para ${appointment.data()?.date} a las ${appointment.data()?.time}.
    
    Estos son los nuevos horarios disponibles:
    ${response}
    
    ¿Cuál te gustaría elegir?
    `;
  }

  async saveTrainingData() {
    await firestore
      .collection('chatbots')
      .doc(this.config.id)
      .collection('training')
      .doc('current')
      .set(this.trainingData);
  }

  async getTrainingData(): Promise<TrainingData> {
    return this.trainingData;
  }
}
