import { BusinessContext, AIRecommendation, AIComponent } from '@/types/landing';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { pexelsService } from './pexels-service';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

class AILandingService {
  private model: any;
  private currentContext: BusinessContext | null = null;

  async getRecommendations(context: BusinessContext): Promise<AIRecommendation[]> {
    try {
      this.currentContext = context;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Analiza el siguiente contexto de negocio y recomienda 3 plantillas de landing page:
        
        Negocio: ${context.businessName}
        Industria: ${context.industry}
        Descripción: ${context.description}
        Objetivos: ${context.goals.join(', ')}
        Audiencia: ${context.audience}
        Tono de marca: ${context.brand.tone}
        Valores de marca: ${context.brand.values.join(', ')}

        Responde en formato JSON con este esquema:
        {
          "recommendations": [
            {
              "templateId": string (id único),
              "name": string (nombre descriptivo),
              "description": string (descripción detallada),
              "confidence": number (0-1),
              "reasoning": string (explicación)
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON de la respuesta');
      }

      const data = JSON.parse(jsonMatch[0]);
      return data.recommendations;
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      throw new Error('Error al obtener recomendaciones de IA');
    }
  }

  private async generateImagePrompt(section: string, context: BusinessContext): Promise<string> {
    const prompt = `Generate a search query for Pexels API to find an image that would be perfect for the ${section} section of a landing page.
    Business Context:
    - Name: ${context.businessName}
    - Industry: ${context.industry}
    - Description: ${context.description}
    - Target Audience: ${context.audience}
    - Brand Tone: ${context.brand.tone}

    The query should be specific but not too long. Focus on the mood, style, and subject that would best represent this section.
    Return ONLY the search query, nothing else.`;

    const response = await this.model.generateContent(prompt);
    const query = response.response.text().trim();
    return query;
  }

  private async findRelevantImage(section: string, context: BusinessContext): Promise<string | null> {
    try {
      const searchQuery = await this.generateImagePrompt(section, context);
      const images = await pexelsService.searchImages(searchQuery, {
        orientation: 'landscape',
        size: 'large',
        perPage: 5
      });

      if (images.length > 0) {
        // Usar la primera imagen encontrada
        return pexelsService.getPhotoUrl(images[0], 'large');
      }

      return null;
    } catch (error) {
      console.error('Error finding relevant image:', error);
      return null;
    }
  }

  private async enhanceComponentWithImage(component: AIComponent, context: BusinessContext): Promise<AIComponent> {
    const content = component.content as any;
    
    // Solo agregar imágenes a secciones específicas
    if (['hero', 'features', 'about'].includes(component.type)) {
      const imageUrl = await this.findRelevantImage(component.type, context);
      if (imageUrl) {
        content.imageUrl = imageUrl;
        
        // Ajustar el estilo según la sección
        if (!content.style) content.style = {};
        
        switch (component.type) {
          case 'hero':
            content.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`;
            content.style.backgroundSize = 'cover';
            content.style.backgroundPosition = 'center';
            content.style.color = '#ffffff';
            break;
            
          case 'features':
          case 'about':
            content.style.image = {
              url: imageUrl,
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            };
            break;
        }
      }
    }
    
    return {
      ...component,
      content
    };
  }

  async generateInitialComponents(templateId: string, context: BusinessContext): Promise<AIComponent[]> {
    try {
      this.currentContext = context;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Genera una landing page moderna y atractiva basada en:
        
        Template ID: ${templateId}
        Negocio: ${context.businessName}
        Industria: ${context.industry}
        Descripción: ${context.description}
        Objetivos: ${context.goals.join(', ')}
        Audiencia: ${context.audience}
        Tono de marca: ${context.brand.tone}
        Valores de marca: ${context.brand.values.join(', ')}

        INSTRUCCIONES DE ESTILO:
        - Usa un diseño moderno y minimalista
        - Incluye gradientes sutiles para fondos
        - Usa una paleta de colores moderna y profesional
        - Agrega espaciado generoso entre secciones
        - Incluye efectos hover en botones
        - Usa tipografía clara y legible
        - Agrega sombras sutiles para profundidad
        - Mantén un alto contraste para legibilidad
        - Incluye animaciones suaves donde sea apropiado

        Responde en formato JSON con este esquema exacto:
        {
          "components": [
            {
              "id": string (UUID v4),
              "type": "hero",
              "content": {
                "title": string (título principal),
                "description": string (descripción corta y persuasiva),
                "cta": string (texto del botón),
                "style": {
                  "background": string (CSS gradient o color),
                  "textColor": string (color del texto),
                  "ctaStyle": {
                    "background": string (color del botón),
                    "color": string (color del texto del botón),
                    "hoverEffect": string (efecto al hover)
                  },
                  "animation": string (clase de animación)
                }
              }
            },
            {
              "id": string (UUID v4),
              "type": "features",
              "content": {
                "title": string (título de la sección),
                "features": [
                  {
                    "title": string (título de la característica),
                    "description": string (descripción de la característica),
                    "icon": string (nombre del icono de Lucide)
                  }
                ],
                "style": {
                  "background": string (CSS color),
                  "cardBackground": string (color de fondo de las tarjetas),
                  "iconColor": string (color de los iconos),
                  "spacing": string (espaciado entre elementos)
                }
              }
            },
            {
              "id": string (UUID v4),
              "type": "benefits",
              "content": {
                "title": string (título de la sección),
                "benefits": [
                  {
                    "title": string (título del beneficio),
                    "description": string (descripción del beneficio),
                    "icon": string (nombre del icono de Lucide)
                  }
                ],
                "style": {
                  "background": string (CSS gradient o color),
                  "textColor": string (color del texto),
                  "iconBackground": string (color de fondo de los iconos),
                  "iconColor": string (color de los iconos)
                }
              }
            },
            {
              "id": string (UUID v4),
              "type": "cta",
              "content": {
                "title": string (título persuasivo),
                "description": string (descripción opcional),
                "cta": string (texto del botón),
                "style": {
                  "background": string (CSS gradient o color),
                  "textColor": string (color del texto),
                  "ctaStyle": {
                    "background": string (color del botón),
                    "color": string (color del texto),
                    "hoverEffect": string (efecto al hover)
                  }
                }
              }
            }
          ],
          "globalStyles": {
            "fontFamily": string (fuente principal),
            "accentColor": string (color de acento),
            "backgroundColor": string (color de fondo),
            "textColor": string (color de texto principal),
            "spacing": {
              "section": string (espaciado entre secciones),
              "element": string (espaciado entre elementos)
            }
          }
        }

        Asegúrate de:
        1. Generar UUIDs v4 únicos para cada componente
        2. Usar el tono de marca especificado
        3. Alinear el contenido con los objetivos y valores
        4. Mantener la estructura JSON exacta
        5. Escribir contenido persuasivo y orientado a la audiencia
        6. Usar colores que combinen bien y sean accesibles
        7. Incluir estilos modernos y profesionales
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON de la respuesta');
      }

      const data = JSON.parse(jsonMatch[0]);
      const components = data.components;

      // Mejorar cada componente con imágenes relevantes
      const enhancedComponents = await Promise.all(
        components.map(component => this.enhanceComponentWithImage(component, context))
      );
      
      return enhancedComponents;
    } catch (error) {
      console.error('Error generating initial components:', error);
      throw new Error('Error al generar componentes iniciales');
    }
  }

  async improveComponent(component: AIComponent, instruction: string): Promise<AIComponent> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Mejora este componente según la instrucción: "${instruction}"

        Componente actual:
        ${JSON.stringify(component, null, 2)}

        Genera una versión mejorada manteniendo la misma estructura pero con mejores:
        - Contenido
        - Estilos
        - Efectos visuales
        - Llamadas a la acción
        - Copys persuasivos

        Responde solo con el JSON del componente mejorado.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON de la respuesta');
      }

      const improvedComponent = JSON.parse(jsonMatch[0]);

      // Si el componente fue mejorado, intentar agregar o actualizar la imagen
      if (improvedComponent.type === component.type) {
        return this.enhanceComponentWithImage(improvedComponent, this.currentContext!);
      }
      
      return improvedComponent;
    } catch (error) {
      console.error('Error improving component:', error);
      throw new Error('Error al mejorar el componente');
    }
  }

  async generateVariations(component: AIComponent, count: number = 3): Promise<AIComponent[]> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Genera ${count} variaciones de este componente:
        ${JSON.stringify(component, null, 2)}

        Cada variación debe:
        - Mantener el mismo propósito
        - Tener un estilo único
        - Usar diferentes colores y efectos
        - Variar el contenido manteniendo el mensaje
        - Experimentar con diferentes layouts

        Responde con un JSON array de ${count} componentes.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON de la respuesta');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating variations:', error);
      throw new Error('Error al generar variaciones');
    }
  }
}

export const aiLandingService = new AILandingService();
