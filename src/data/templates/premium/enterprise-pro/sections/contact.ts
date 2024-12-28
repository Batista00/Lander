import { TemplateSection } from '@/types/templates';

export const contact: TemplateSection = {
  name: 'Contact',
  description: 'Formulario de contacto enterprise',
  thumbnail: '/sections/contact-enterprise.jpg',
  content: {
    heading: 'Contacte con Ventas Enterprise',
    subheading: 'Nuestro equipo enterprise está listo para ayudarle',
    form: {
      fields: [
        {
          type: 'text',
          name: 'name',
          label: 'Nombre completo',
          required: true,
          placeholder: 'John Smith'
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email corporativo',
          required: true,
          placeholder: 'john@company.com'
        },
        {
          type: 'tel',
          name: 'phone',
          label: 'Teléfono',
          required: true,
          placeholder: '+1 234 567 890'
        },
        {
          type: 'text',
          name: 'company',
          label: 'Empresa',
          required: true,
          placeholder: 'Enterprise Corp'
        },
        {
          type: 'select',
          name: 'employees',
          label: 'Número de empleados',
          required: true,
          options: [
            { value: '100-500', label: '100-500' },
            { value: '501-1000', label: '501-1000' },
            { value: '1001-5000', label: '1001-5000' },
            { value: '5000+', label: '5000+' }
          ]
        },
        {
          type: 'select',
          name: 'budget',
          label: 'Presupuesto anual',
          required: true,
          options: [
            { value: '50k-100k', label: '$50,000 - $100,000' },
            { value: '100k-500k', label: '$100,000 - $500,000' },
            { value: '500k+', label: '$500,000+' }
          ]
        },
        {
          type: 'textarea',
          name: 'requirements',
          label: 'Requerimientos específicos',
          required: false,
          placeholder: 'Describa sus necesidades empresariales'
        }
      ],
      submitButton: {
        text: 'Solicitar consulta',
        style: 'enterprise'
      }
    },
    alternativeContact: {
      heading: 'Otras formas de contacto',
      methods: [
        {
          type: 'phone',
          label: 'Ventas Enterprise',
          value: '+1 800 123 4567',
          availability: '24/7'
        },
        {
          type: 'email',
          label: 'Email Enterprise',
          value: 'enterprise@company.com',
          responseTime: '< 2 horas'
        }
      ]
    },
    locations: [
      {
        city: 'New York',
        address: '123 Enterprise St',
        phone: '+1 212 555 0123'
      },
      {
        city: 'London',
        address: '456 Business Ave',
        phone: '+44 20 7123 4567'
      },
      {
        city: 'Singapore',
        address: '789 Corporate Rd',
        phone: '+65 6789 0123'
      }
    ],
    support: {
      heading: 'Soporte Enterprise',
      description: 'Soporte dedicado 24/7 para clientes enterprise',
      features: [
        'Tiempo de respuesta < 15 minutos',
        'Account Manager dedicado',
        'Soporte en múltiples idiomas',
        'Soporte en sitio disponible'
      ]
    }
  }
};
