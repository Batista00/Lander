import React from 'react';
import { Component, ComponentType } from '@/types/landing';
import { cn } from '@/lib/utils';

interface ButtonProps {
  component: Component & { type: ComponentType.Button };
  mode?: 'preview' | 'published' | 'edit';
}

export const Button: React.FC<ButtonProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    text = '',
    url = '',
    variant = 'primary',
    size = 'medium'
  } = component.content;

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        sizeClasses[size as keyof typeof sizeClasses],
        variantClasses[variant as keyof typeof variantClasses],
        component.styles?.spacing,
        component.styles?.colors?.background && `bg-${component.styles.colors.background}`,
        component.styles?.colors?.text && `text-${component.styles.colors.text}`,
        component.styles?.typography?.textAlign && `text-${component.styles.typography.textAlign}`,
      )}
      onClick={() => url && window.open(url, '_blank')}
    >
      <span>{text}</span>
      {mode === 'edit' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute hidden group-hover:flex items-center justify-center top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}
    </button>
  );
};
