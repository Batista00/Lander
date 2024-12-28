import { TemplateSection } from '@/types/templates';

export const location: TemplateSection = {
  name: 'Location',
  description: 'Ubicación y horarios',
  thumbnail: '/sections/location-local.jpg',
  content: {
    heading: 'Encuéntranos',
    subheading: 'Visítanos en nuestra ubicación',
    map: {
      latitude: -34.6037,
      longitude: -58.3816,
      zoom: 15,
      marker: {
        title: 'Nuestro Local',
        description: 'Visítanos de Lunes a Sábado'
      }
    },
    address: {
      street: 'Calle Principal 123',
      city: 'Ciudad',
      state: 'Estado',
      zip: '12345',
      country: 'País'
    },
    hours: {
      heading: 'Horario de Atención',
      schedule: [
        {
          days: 'Lunes - Viernes',
          hours: '9:00 - 18:00'
        },
        {
          days: 'Sábado',
          hours: '10:00 - 14:00'
        },
        {
          days: 'Domingo',
          hours: 'Cerrado'
        }
      ]
    },
    contact: {
      phone: '+1 234 567 890',
      email: 'contacto@negociolocal.com',
      whatsapp: '+1 234 567 890'
    },
    transportation: {
      parking: {
        available: true,
        description: 'Estacionamiento gratuito disponible'
      },
      publicTransport: [
        {
          type: 'Bus',
          lines: ['101', '102', '103'],
          stop: 'Parada Principal'
        },
        {
          type: 'Metro',
          lines: ['Línea A'],
          station: 'Estación Central'
        }
      ]
    }
  }
};
