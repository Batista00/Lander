import React from 'react';
import { Component } from '@/types/landing';

// Tipos de modales disponibles
export const modalTemplates: Record<string, Component> = {
  // Modal de Contacto
  contactModal: {
    id: 'contact-modal-template',
    type: 'modal',
    name: 'Modal de Contacto',
    properties: {
      title: 'Contáctanos',
      showCloseButton: true,
      width: '500px',
      content: {
        type: 'form',
        fields: [
          {
            type: 'text',
            label: 'Nombre',
            placeholder: 'Tu nombre',
            required: true
          },
          {
            type: 'email',
            label: 'Email',
            placeholder: 'tu@email.com',
            required: true
          },
          {
            type: 'textarea',
            label: 'Mensaje',
            placeholder: 'Tu mensaje aquí...',
            required: true
          }
        ],
        submitButton: {
          text: 'Enviar Mensaje',
          style: 'primary'
        }
      }
    }
  },

  // Modal de Suscripción
  subscriptionModal: {
    id: 'subscription-modal-template',
    type: 'modal',
    name: 'Modal de Suscripción',
    properties: {
      title: '¡Únete a nuestra newsletter!',
      showCloseButton: true,
      width: '400px',
      content: {
        type: 'form',
        fields: [
          {
            type: 'email',
            label: 'Email',
            placeholder: 'tu@email.com',
            required: true
          }
        ],
        submitButton: {
          text: 'Suscribirse',
          style: 'primary'
        }
      }
    }
  },

  // Modal de Promoción
  promoModal: {
    id: 'promo-modal-template',
    type: 'modal',
    name: 'Modal de Promoción',
    properties: {
      title: '¡Oferta Especial!',
      showCloseButton: true,
      width: '450px',
      content: {
        type: 'promo',
        image: '/assets/promo-default.jpg',
        heading: '¡20% de descuento!',
        description: 'En tu primera compra',
        couponCode: 'WELCOME20',
        button: {
          text: 'Aprovechar Oferta',
          style: 'primary'
        }
      }
    }
  },

  // Modal de Cookies
  cookiesModal: {
    id: 'cookies-modal-template',
    type: 'modal',
    name: 'Modal de Cookies',
    properties: {
      title: 'Política de Cookies',
      showCloseButton: true,
      width: '400px',
      content: {
        type: 'consent',
        message: 'Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de cookies.',
        buttons: [
          {
            text: 'Aceptar todo',
            style: 'primary'
          },
          {
            text: 'Configurar',
            style: 'secondary'
          }
        ]
      }
    }
  }
};

// Componente para previsualizar modales
export const ModalPreview: React.FC<{ template: Component }> = ({ template }) => {
  return (
    <div className="modal-preview">
      <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
      <div className="border rounded-lg p-4">
        <h4 className="font-medium">{template.properties.title}</h4>
        {/* Aquí iría la previsualización del contenido según el tipo */}
      </div>
    </div>
  );
};

export default modalTemplates;
