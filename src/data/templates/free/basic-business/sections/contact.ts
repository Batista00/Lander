import { TemplateSection } from '@/types/templates';

export const contact: TemplateSection = {
  name: 'Contact',
  description: 'Formulario de contacto',
  thumbnail: '/sections/contact-basic.jpg',
  content: {
    heading: 'Contáctanos',
    subheading: 'Estamos aquí para ayudarte',
    formFields: [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
        required: true
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true
      },
      {
        type: 'textarea',
        name: 'message',
        label: 'Mensaje',
        required: true
      }
    ],
    submitButton: {
      text: 'Enviar mensaje',
      style: 'primary'
    },
    contactInfo: {
      email: 'contacto@empresa.com',
      phone: '+1 234 567 890',
      address: 'Calle Principal 123'
    }
  }
};
