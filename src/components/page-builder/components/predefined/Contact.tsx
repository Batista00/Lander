import { Component } from '@/types/landing';
import { componentStyles } from '@/services/componentStyles';
import { cn } from '@/lib/utils';

interface ContactProps {
  component: Component;
  className?: string;
}

export function Contact({ component, className }: ContactProps) {
  const style = componentStyles.CONTACT[component.style || 'free'];
  const content = component.content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div className={cn(style.container, className)}>
      <div className={style.content}>
        <h2 className={style.title}>
          {content.title || 'Contáctanos'}
        </h2>
        {content.subtitle && (
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
            {content.subtitle}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className={style.form}>
          <div>
            <input
              type="text"
              placeholder="Nombre"
              className={style.input}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className={style.input}
              required
            />
          </div>
          {component.style === 'premium' && (
            <div>
              <input
                type="tel"
                placeholder="Teléfono"
                className={style.input}
              />
            </div>
          )}
          <div>
            <textarea
              placeholder="Mensaje"
              className={cn(style.input, 'min-h-[120px]')}
              required
            />
          </div>
          <button type="submit" className={style.button}>
            {content.buttonText || 'Enviar Mensaje'}
          </button>
        </form>

        {component.style === 'premium' && content.contactInfo && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{content.contactInfo.email}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-gray-600">{content.contactInfo.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dirección</h3>
              <p className="text-gray-600">{content.contactInfo.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
