import React from 'react';
import { Component } from '@/types/landing';

interface MapProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

const Map: React.FC<MapProps> = ({ component, onEdit }) => {
  const content = component.content as {
    latitude: number;
    longitude: number;
    zoom: number;
    title?: string;
    description?: string;
  };

  // Aquí podrías integrar un mapa real usando Google Maps, Mapbox, etc.
  return (
    <div 
      className="map-container w-full h-[400px] bg-gray-100 rounded-lg"
      onClick={() => onEdit?.(component.id, content)}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          {content.title && (
            <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
          )}
          {content.description && (
            <p className="text-gray-600">{content.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Latitud: {content.latitude}, Longitud: {content.longitude}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Map };

export const defaultMapContent = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 13,
  title: 'Nuestra Ubicación',
  description: 'Encuéntranos en el corazón de la ciudad'
};
