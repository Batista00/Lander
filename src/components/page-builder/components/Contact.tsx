import React from 'react';
import { cn } from '@/lib/utils';
import { ContactProps } from '../interfaces/ComponentInterfaces';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact: React.FC<ContactProps> = ({
  content,
  isEditable = false,
  onEdit
}) => {
  const {
    title = 'Contacto',
    subtitle,
    email,
    phone,
    address,
    formFields = [
      { type: 'text', label: 'Nombre', required: true },
      { type: 'email', label: 'Email', required: true },
      { type: 'phone', label: 'Teléfono', required: false },
      { type: 'textarea', label: 'Mensaje', required: true }
    ],
    submitButtonText = 'Enviar mensaje',
    showMap = false,
    mapLocation,
    backgroundColor = 'bg-white',
    textColor = 'text-gray-900'
  } = content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <section className={cn('py-24', backgroundColor)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isEditable ? (
            <input
              type="text"
              value={title}
              onChange={(e) => onEdit?.('title', e.target.value)}
              className={cn(
                'w-full text-center bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-4xl font-bold mb-4',
                textColor
              )}
            />
          ) : (
            <h2 className={cn('text-4xl font-bold mb-4', textColor)}>
              {title}
            </h2>
          )}

          {subtitle && (
            isEditable ? (
              <input
                type="text"
                value={subtitle}
                onChange={(e) => onEdit?.('subtitle', e.target.value)}
                className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-xl text-gray-600"
              />
            ) : (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <Card className="p-8">
              <h3 className={cn('text-2xl font-semibold mb-6', textColor)}>
                Información de contacto
              </h3>

              <div className="space-y-6">
                {email && (
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    {isEditable ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => onEdit?.('email', e.target.value)}
                        className="flex-1 bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a
                        href={`mailto:${email}`}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {email}
                      </a>
                    )}
                  </div>
                )}

                {phone && (
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                    {isEditable ? (
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => onEdit?.('phone', e.target.value)}
                        className="flex-1 bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a
                        href={`tel:${phone}`}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {phone}
                      </a>
                    )}
                  </div>
                )}

                {address && (
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    {isEditable ? (
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => onEdit?.('address', e.target.value)}
                        className="flex-1 bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-gray-600">{address}</span>
                    )}
                  </div>
                )}
              </div>

              {showMap && mapLocation && (
                <div className="mt-8 aspect-video rounded-lg overflow-hidden">
                  <iframe
                    title="location"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${mapLocation.lat},${mapLocation.lng}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}
            </Card>
          </div>

          {/* Formulario de contacto */}
          <div>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field, index) => (
                  <div key={index}>
                    {isEditable ? (
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => {
                          const updatedFields = [...formFields];
                          updatedFields[index] = {
                            ...field,
                            label: e.target.value
                          };
                          onEdit?.('formFields', updatedFields);
                        }}
                        className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                    ) : (
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                    )}

                    {field.type === 'textarea' ? (
                      <Textarea
                        required={field.required}
                        placeholder={`Ingrese su ${field.label.toLowerCase()}`}
                        className="w-full"
                        rows={4}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        required={field.required}
                        placeholder={`Ingrese su ${field.label.toLowerCase()}`}
                        className="w-full"
                      />
                    )}
                  </div>
                ))}

                {isEditable ? (
                  <input
                    type="text"
                    value={submitButtonText}
                    onChange={(e) => onEdit?.('submitButtonText', e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {submitButtonText}
                  </Button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
