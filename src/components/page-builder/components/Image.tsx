import React from 'react';
import { Component, ComponentType } from '@/types/landing';
import { cn } from '@/lib/utils';

interface ImageProps {
  component: Component & { type: ComponentType.Image };
  mode?: 'preview' | 'published' | 'edit';
}

export const Image: React.FC<ImageProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    src = '',
    alt = '',
    caption,
  } = component.content;

  return (
    <div
      className={cn(
        "relative group",
        component.styles?.spacing,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          component.styles?.typography?.textAlign && `text-${component.styles.typography.textAlign}`,
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full transition-transform duration-300",
            component.styles?.colors?.background && `bg-${component.styles.colors.background}`,
          )}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}
      {mode === 'edit' && (
        <button
          onClick={() => {}}
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
    </div>
  );
};
