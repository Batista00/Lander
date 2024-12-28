import { Template, TemplateRegistry } from './types';
import { modernBusinessTemplate } from './modern-business';

// Registro de templates disponibles
export const TEMPLATES: TemplateRegistry = {
  'modern-business': modernBusinessTemplate
};

// Función para obtener una template por ID
export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES[id];
}

// Función para obtener todas las templates
export function getAllTemplates(): Template[] {
  return Object.values(TEMPLATES);
}

// Función para obtener templates por categoría
export function getTemplatesByCategory(category: string): Template[] {
  return Object.values(TEMPLATES).filter(template => template.category === category);
}

// Función para obtener templates por tag
export function getTemplatesByTag(tag: string): Template[] {
  return Object.values(TEMPLATES).filter(template => template.tags.includes(tag));
}

// Función para crear una nueva landing page a partir de una template
export function createFromTemplate(templateId: string): Template | undefined {
  const template = getTemplateById(templateId);
  if (!template) return undefined;

  // Crear una copia profunda de la template
  return {
    ...template,
    id: crypto.randomUUID(), // Nuevo ID para la nueva landing page
    components: template.components.map(component => ({
      ...component,
      id: crypto.randomUUID() // Nuevos IDs para cada componente
    }))
  };
}
