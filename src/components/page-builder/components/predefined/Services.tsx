import { Component } from '@/types/landing';
import { componentStyles } from '@/services/componentStyles';
import { cn } from '@/lib/utils';

interface ServicesProps {
  component: Component;
  className?: string;
}

export function Services({ component, className }: ServicesProps) {
  const style = componentStyles.SERVICES[component.style || 'free'];
  const content = component.content;

  const defaultServices = [
    {
      title: 'Servicio 1',
      description: 'Descripción del servicio 1. Explica los beneficios y características principales.',
      icon: '🚀'
    },
    {
      title: 'Servicio 2',
      description: 'Descripción del servicio 2. Explica los beneficios y características principales.',
      icon: '💡'
    },
    {
      title: 'Servicio 3',
      description: 'Descripción del servicio 3. Explica los beneficios y características principales.',
      icon: '⚡'
    }
  ];

  const services = content.services || defaultServices;

  return (
    <div className={cn(style.container, className)}>
      <div className={style.content}>
        <h2 className={style.title}>
          {content.title || 'Nuestros Servicios'}
        </h2>
        {content.subtitle && (
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        )}
        
        <div className={style.grid}>
          {services.map((service, index) => (
            <div key={index} className={style.card}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={style.cardTitle}>{service.title}</h3>
              <p className={style.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
