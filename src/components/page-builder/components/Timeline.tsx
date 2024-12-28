import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';

interface TimelineProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const Timeline: React.FC<TimelineProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Nuestra Historia',
    description = 'Un vistazo a nuestro recorrido y logros',
    events = [
      {
        date: '2020',
        title: 'Los Inicios',
        description: 'Comenzamos nuestro viaje con una visión clara...',
        icon: '🚀',
        color: '#4F46E5'
      },
      {
        date: '2021',
        title: 'Primer Hito',
        description: 'Alcanzamos nuestro primer objetivo importante...',
        icon: '🎯',
        color: '#10B981'
      },
      {
        date: '2022',
        title: 'Expansión',
        description: 'Expandimos nuestras operaciones a nuevos mercados...',
        icon: '🌍',
        color: '#F59E0B'
      },
      {
        date: '2023',
        title: 'Innovación',
        description: 'Lanzamos nuevos productos revolucionarios...',
        icon: '💡',
        color: '#EC4899'
      },
      {
        date: '2024',
        title: 'El Futuro',
        description: 'Continuamos innovando y creciendo...',
        icon: '✨',
        color: '#8B5CF6'
      }
    ],
    layout = 'vertical' // 'vertical' | 'horizontal'
  } = component.content;

  return (
    <div
      className={cn(
        'w-full py-16',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        {layout === 'horizontal' ? (
          <div className="relative">
            {/* Línea de tiempo horizontal */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
            
            <div className="relative flex justify-between max-w-5xl mx-auto">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex flex-col items-center',
                    'relative w-48'
                  )}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 relative z-10"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1">{event.date}</div>
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative max-w-2xl mx-auto">
            {/* Línea de tiempo vertical */}
            <div className="absolute top-0 left-16 w-0.5 h-full bg-border" />

            {events.map((event, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex items-start mb-12 last:mb-0',
                  'group'
                )}
              >
                <div className="absolute left-16 w-12 h-0.5 bg-border top-6 -translate-x-full" />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl relative z-10 mr-8"
                  style={{ backgroundColor: event.color }}
                >
                  {event.icon}
                </div>
                <div className="flex-1 pt-1">
                  <div className="font-bold text-lg mb-1">{event.date}</div>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
