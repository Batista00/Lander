import React from 'react';
import { Component } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ContactProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

export const Contact: React.FC<ContactProps> = ({
  component,
  mode = 'preview',
  onChange,
}) => {
  const {
    title = 'Contáctanos',
    subtitle = 'Estamos aquí para ayudarte',
    description = 'Envíanos un mensaje y te responderemos lo antes posible',
    email = 'contacto@empresa.com',
    phone = '+1 234 567 890',
    address = 'Calle Principal 123',
    socialLinks = [],
    formFields = [
      { type: 'text', name: 'name', label: 'Nombre', required: true },
      { type: 'email', name: 'email', label: 'Email', required: true },
      { type: 'text', name: 'subject', label: 'Asunto', required: true },
      { type: 'textarea', name: 'message', label: 'Mensaje', required: true }
    ],
    layout = 'split',
    mapUrl = ''
  } = component.content;

  const isEditing = mode === 'edit';

  const handleChange = (field: string, value: string) => {
    if (!onChange) return;
    
    onChange({
      ...component,
      content: {
        ...component.content,
        [field]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
  };

  return (
    <div className="relative group py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {isEditing ? (
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-lg font-semibold text-primary mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h3 className="text-lg font-semibold text-primary mb-2">
              {subtitle}
            </h3>
          )}

          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-3xl font-bold mb-4 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h2 className="text-3xl font-bold mb-4">
              {title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="text-lg mb-8 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
              rows={2}
            />
          ) : (
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className={cn(
          'grid gap-12',
          layout === 'split' && 'md:grid-cols-2'
        )}>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Información de Contacto</h4>
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email de contacto"
                  />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Teléfono"
                  />
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Dirección"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">✉</span>
                    {email}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📞</span>
                    {phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📍</span>
                    {address}
                  </p>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold mb-4">Redes Sociales</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-primary hover:text-primary/80 transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {mapUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-6">Envíanos un mensaje</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium mb-2"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      rows={4}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
