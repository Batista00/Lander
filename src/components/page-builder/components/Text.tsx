import React from 'react';
import { Component } from '@/types/landing';

interface TextProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

const Text: React.FC<TextProps> = ({ component, onEdit }) => {
  const content = component.content as {
    text: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    className?: string;
  };

  const getTextComponent = () => {
    switch (content.variant) {
      case 'h1':
        return <h1 className={`text-4xl font-bold ${content.className || ''}`}>{content.text}</h1>;
      case 'h2':
        return <h2 className={`text-3xl font-bold ${content.className || ''}`}>{content.text}</h2>;
      case 'h3':
        return <h3 className={`text-2xl font-bold ${content.className || ''}`}>{content.text}</h3>;
      case 'h4':
        return <h4 className={`text-xl font-bold ${content.className || ''}`}>{content.text}</h4>;
      case 'h5':
        return <h5 className={`text-lg font-bold ${content.className || ''}`}>{content.text}</h5>;
      case 'h6':
        return <h6 className={`text-base font-bold ${content.className || ''}`}>{content.text}</h6>;
      default:
        return <p className={`text-base ${content.className || ''}`}>{content.text}</p>;
    }
  };

  return (
    <div 
      className="text-component"
      onClick={() => onEdit?.(component.id, content)}
    >
      {getTextComponent()}
    </div>
  );
};

export { Text };

export const defaultTextContent = {
  text: 'Texto de ejemplo',
  variant: 'p',
  className: ''
};
