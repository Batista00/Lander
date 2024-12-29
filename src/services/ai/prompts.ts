import { BusinessContext } from '@/types/landing';

export const COMPONENT_PROMPTS = {
  hero: (context: BusinessContext) => `
    Actúa como un experto en marketing digital y copywriting.
    Genera una sección hero para una landing page basada en el siguiente contexto de negocio:
    
    Negocio: ${context.businessName}
    Industria: ${context.industry}
    Audiencia: ${context.audience}
    Objetivos: ${context.goals?.join(', ')}
    Tono de marca: ${context.brand?.tone}
    Valores de marca: ${context.brand?.values?.join(', ')}
    
    IMPORTANTE: Responde SOLO con un objeto JSON válido que tenga esta estructura exacta:
    {
      "title": "Título principal impactante",
      "subtitle": "Subtítulo que refuerza el mensaje",
      "description": "Descripción clara del valor principal",
      "image": {
        "url": "URL de una imagen sugerida",
        "alt": "Texto alternativo descriptivo"
      },
      "cta": {
        "text": "Texto del botón de acción",
        "link": "#contact"
      }
    }
    
    NO incluyas \`\`\`json ni otros formatos markdown. SOLO el objeto JSON.
    
    El contenido debe:
    1. Tener un título conciso y memorable
    2. Una descripción que comunique el valor único
    3. Un CTA claro y motivador
    4. Mantener el tono de marca
  `,

  features: (context: BusinessContext) => `
    Actúa como un experto en marketing digital y UX.
    Genera una sección de características para una landing page basada en el siguiente contexto:
    
    Negocio: ${context.businessName}
    Industria: ${context.industry}
    Audiencia: ${context.audience}
    Objetivos: ${context.goals?.join(', ')}
    Tono de marca: ${context.brand?.tone}
    
    IMPORTANTE: Responde SOLO con un objeto JSON válido que tenga esta estructura exacta:
    {
      "title": "Título de la sección",
      "description": "Descripción general de las características",
      "features": [
        {
          "title": "Título de la característica",
          "description": "Descripción del beneficio",
          "icon": "Nombre del icono sugerido (material-icons)"
        }
      ]
    }
    
    NO incluyas \`\`\`json ni otros formatos markdown. SOLO el objeto JSON.
    
    Las características deben:
    1. Resolver problemas específicos de la audiencia
    2. Destacar beneficios únicos
    3. Ser fáciles de entender
    4. Mantener consistencia con el tono de marca
  `,

  benefits: (context: BusinessContext) => `
    Actúa como un experto en marketing digital y psicología del consumidor.
    Genera una sección de beneficios para una landing page basada en el siguiente contexto:
    
    Negocio: ${context.businessName}
    Industria: ${context.industry}
    Audiencia: ${context.audience}
    Objetivos: ${context.goals?.join(', ')}
    Tono de marca: ${context.brand?.tone}
    
    IMPORTANTE: Responde SOLO con un objeto JSON válido que tenga esta estructura exacta:
    {
      "title": "Título de la sección",
      "description": "Descripción general de los beneficios",
      "benefits": [
        {
          "title": "Título del beneficio",
          "description": "Descripción detallada",
          "image": {
            "url": "URL de imagen sugerida",
            "alt": "Texto alternativo descriptivo"
          }
        }
      ]
    }
    
    NO incluyas \`\`\`json ni otros formatos markdown. SOLO el objeto JSON.
    
    Los beneficios deben:
    1. Enfocarse en resultados tangibles
    2. Conectar emocionalmente con la audiencia
    3. Diferenciar el producto/servicio
    4. Mantener el tono de marca
  `,

  cta: (context: BusinessContext) => `
    Actúa como un experto en conversión y copywriting.
    Genera una sección CTA para una landing page basada en el siguiente contexto:
    
    Negocio: ${context.businessName}
    Industria: ${context.industry}
    Audiencia: ${context.audience}
    Objetivos: ${context.goals?.join(', ')}
    Tono de marca: ${context.brand?.tone}
    
    IMPORTANTE: Responde SOLO con un objeto JSON válido que tenga esta estructura exacta:
    {
      "title": "Título persuasivo",
      "description": "Descripción que motiva a la acción",
      "button": {
        "text": "Texto del botón",
        "link": "#action"
      },
      "features": [
        {
          "text": "Punto clave que refuerza la decisión",
          "icon": "Nombre del icono sugerido (material-icons)"
        }
      ]
    }
    
    NO incluyas \`\`\`json ni otros formatos markdown. SOLO el objeto JSON.
    
    El CTA debe:
    1. Ser persuasivo y urgente
    2. Alinear con los objetivos
    3. Reducir la fricción
    4. Mantener el tono de marca
  `
};
