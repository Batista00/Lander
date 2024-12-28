import { TemplateSection } from '@/types/templates';

export const contact: TemplateSection = {
  name: 'Contact',
  description: 'Formulario de contacto y reservas',
  thumbnail: '/sections/contact-local.jpg',
  content: {
    heading: 'Reserva tu cita',
    subheading: 'Contáctanos o reserva tu cita online',
    form: {
      fields: [
        {
          type: 'text',
          name: 'name',
          label: 'Nombre completo',
          required: true,
          placeholder: 'Tu nombre'
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email',
          required: true,
          placeholder: 'tu@email.com'
        },
        {
          type: 'tel',
          name: 'phone',
          label: 'Teléfono',
          required: true,
          placeholder: '+1 234 567 890'
        },
        {
          type: 'select',
          name: 'service',
          label: 'Servicio',
          required: true,
          options: [
            { value: 'service1', label: 'Servicio Principal' },
            { value: 'service2', label: 'Servicio Premium' },
            { value: 'service3', label: 'Servicio Básico' }
          ]
        },
        {
          type: 'datetime-local',
          name: 'date',
          label: 'Fecha y hora preferida',
          required: true
        },
        {
          type: 'textarea',
          name: 'message',
          label: 'Mensaje adicional',
          required: false,
          placeholder: 'Escribe cualquier detalle adicional aquí'
        }
      ],
      submitButton: {
        text: 'Reservar ahora',
        style: 'primary'
      }
    },
    quickContact: {
      heading: 'Contacto rápido',
      methods: [
        {
          type: 'phone',
          value: '+1 234 567 890',
          icon: 'phone',
          label: 'Llámanos'
        },
        {
          type: 'whatsapp',
          value: '+1 234 567 890',
          icon: 'whatsapp',
          label: 'WhatsApp'
        },
        {
          type: 'email',
          value: 'contacto@negociolocal.com',
          icon: 'email',
          label: 'Envíanos un email'
        }
      ]
    },
    policies: {
      cancellation: 'Política de cancelación con 24 horas de anticipación',
      privacy: 'Tu información está segura y nunca será compartida',
      terms: 'Al reservar aceptas nuestros términos y condiciones'
    }
  }
};
