import React from 'react';
import { Component } from '@/types/components';
import { getComponentByType } from './core/ComponentRegistry';
import { ThemeProvider } from '@/themes/ThemeContext';
import { modernTheme } from '@/themes/modern';

// Importaciones de componentes premium
import { Team } from './components/premium/Team';
import { Blog } from './components/premium/Blog';
import { FAQ } from './components/premium/FAQ';
import { Newsletter } from './components/premium/Newsletter';
import { AdvancedBooking } from './components/premium/AdvancedBooking';

// Importaciones de componentes básicos
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Text } from './components/Text';
import { Image } from './components/Image';
import { Video } from './components/Video';
import { Button } from './components/Button';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';
import { Pricing } from './components/Pricing';
import { Gallery } from './components/Gallery';
import { FAQSimple } from './components/FAQSimple';
import { Comparison } from './components/Comparison';
import { Timeline } from './components/Timeline';
import { Stats } from './components/Stats';

// Importaciones de componentes multimedia
import { VideoPlayer } from './components/VideoPlayer';
import { AudioPlayer } from './components/AudioPlayer';
import { ThreeDViewer } from './components/ThreeDViewer';
import { Maps } from './components/Maps';
import { SocialFeed } from './components/SocialFeed';
import { Chat } from './components/Chat';
import { Testimonios } from './components/Testimonios';

interface RenderLandingPageProps {
  components: Component[];
  mode?: 'edit' | 'preview' | 'live';
  className?: string;
  templateTheme?: string;
  onSave?: () => void;
  onPublish?: () => void;
}

export const RenderLandingPage: React.FC<RenderLandingPageProps> = ({
  components,
  mode = 'live',
  className,
  templateTheme = 'modern',
  onSave,
  onPublish
}) => {
  const theme = modernTheme;

  const renderComponent = (component: Component) => {
    // Obtener el componente registrado
    const registeredComponent = getComponentByType(component.type);
    
    if (!registeredComponent?.component) {
      if (mode === 'edit') {
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Componente no disponible: {component.type}</p>
          </div>
        );
      }
      return null;
    }

    // Crear el componente con sus props
    const ComponentToRender = registeredComponent.component;
    return (
      <div 
        key={component.id}
        className={mode === 'edit' ? 'relative group hover:outline hover:outline-blue-500/50' : ''}
      >
        <ComponentToRender 
          {...component.content}
          isEditing={mode === 'edit'}
        />
      </div>
    );
  };

  return (
    <ThemeProvider initialTheme={theme}>
      <div className={className}>
        {components.map(component => renderComponent(component))}
      </div>
      
      {mode === 'edit' && (
        <div className="fixed bottom-4 right-4 flex gap-2">
          {onSave && (
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Guardar
            </button>
          )}
          {onPublish && (
            <button
              onClick={onPublish}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Publicar
            </button>
          )}
        </div>
      )}
    </ThemeProvider>
  );
};
