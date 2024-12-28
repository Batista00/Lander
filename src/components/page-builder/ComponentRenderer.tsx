import React from 'react';
import { Component } from '@/types/landing';
import { ComponentMap } from './components/ComponentMap';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'lucide-react';

interface ComponentRendererProps {
  component: Component;
  isSelected?: boolean;
  isEditing?: boolean;
  editMode?: 'content' | 'style' | 'layout';
  isDragging?: boolean;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEdit?: () => void;
}

export function ComponentRenderer({
  component,
  isSelected = false,
  isEditing = false,
  editMode = 'content',
  isDragging = false,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit
}: ComponentRendererProps) {
  const Component = ComponentMap[component.type];

  if (!Component) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <p className="text-red-500">
          Componente no soportado: {component.type}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative group transition-all duration-200',
        isSelected && 'ring-2 ring-primary',
        isDragging && 'opacity-50',
        editMode === 'layout' && 'cursor-move'
      )}
      style={{
        ...component.styles?.spacing,
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text,
        fontFamily: component.styles?.typography?.fontFamily
      }}
    >
      {/* Overlay para modo de edición */}
      {isEditing && (
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onMoveUp && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      <Component {...component.content} />
    </div>
  );
}
