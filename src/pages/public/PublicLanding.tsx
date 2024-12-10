import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Component } from '../../store/landingStore';

interface PublishedLanding {
  id: string;
  title: string;
  components: Component[];
  publishedAt: string;
}

export function PublicLanding() {
  const { id } = useParams<{ id: string }>();
  const [landing, setLanding] = useState<PublishedLanding | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublishedLanding = () => {
      try {
        setLoading(true);
        const publishedLandings = JSON.parse(localStorage.getItem('publishedLandings') || '[]');
        const found = publishedLandings.find((l: PublishedLanding) => l.id === id);
        
        if (!found) {
          setError('Landing page no encontrada');
          return;
        }
        
        setLanding(found);
      } catch (error) {
        console.error('Error loading published landing:', error);
        setError('Error al cargar la landing page');
      } finally {
        setLoading(false);
      }
    };

    loadPublishedLanding();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !landing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">{error || 'Landing page no encontrada'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {landing.components.map((component, index) => (
        <div key={component.id || index} className="component-wrapper">
          {/* Renderizar cada componente según su tipo */}
          {component.type === 'heading' && (
            <div className={`${component.content?.padding || 'p-4'} ${component.content?.backgroundColor || 'bg-white'}`}>
              <h1 className={`text-4xl font-bold ${component.content?.textColor || 'text-gray-900'} text-${component.content?.alignment || 'left'}`}>
                {component.content?.title}
              </h1>
              {component.content?.subtitle && (
                <h2 className={`text-xl mt-2 ${component.content?.textColor || 'text-gray-600'}`}>
                  {component.content.subtitle}
                </h2>
              )}
            </div>
          )}
          
          {component.type === 'text' && (
            <div className={`${component.content?.padding || 'p-4'} ${component.content?.backgroundColor || 'bg-white'}`}>
              <p className={`${component.content?.textColor || 'text-gray-600'} text-${component.content?.alignment || 'left'}`}>
                {component.content?.text}
              </p>
            </div>
          )}
          
          {component.type === 'image' && (
            <div className={`${component.content?.padding || 'p-4'} ${component.content?.backgroundColor || 'bg-white'}`}>
              <img 
                src={component.content?.url} 
                alt={component.content?.alt || ''} 
                className={`mx-auto ${component.content?.alignment === 'center' ? 'mx-auto' : ''}`}
              />
            </div>
          )}
          
          {component.type === 'button' && (
            <div className={`${component.content?.padding || 'p-4'} ${component.content?.backgroundColor || 'bg-white'} text-${component.content?.alignment || 'left'}`}>
              <button
                className={`px-6 py-2 rounded-md ${component.content?.buttonStyle || 'bg-blue-600 text-white'} hover:opacity-90`}
                onClick={() => component.content?.url && window.open(component.content.url, '_blank')}
              >
                {component.content?.text || 'Click me'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
