import { basic } from './free/basic-business';
import { startup } from './free/startup-modern';
import { local } from './free/local-business';
import { enterprise } from './premium/enterprise-pro';
import { saas } from './premium/saas-master';

// Categorías de templates
export const TEMPLATE_CATEGORIES = {
  BUSINESS: 'Negocios',
  ECOMMERCE: 'E-commerce',
  LOCAL_SERVICES: 'Servicios Locales',
  TECH_STARTUPS: 'Tecnología y Startups',
  EDUCATION: 'Educación',
  EVENTS: 'Eventos y Promociones',
  LEAD_CAPTURE: 'Captura de Leads',
  CREATIVE: 'Creativos y Marca'
} as const;

// Templates gratuitos
export const FREE_TEMPLATES = [basic, startup, local];

// Templates premium
export const PREMIUM_TEMPLATES = [enterprise, saas];

// Exportar todas las templates
export const ALL_TEMPLATES = [...FREE_TEMPLATES, ...PREMIUM_TEMPLATES];
