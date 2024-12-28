import { useState } from 'react';
import { Component, ComponentType, ComponentContentTypes } from '@/types/landing';
import { EditComponentDialog } from '../dialogs/EditComponentDialog';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { defaultComponents } from './ComponentMap';
import { Form } from './Form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ComponentRendererProps {
  component: Component;
  isEditing?: boolean;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEdit?: () => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isEditing = false,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setShowDeleteDialog(false);
  };

  const renderComponent = (component: Component) => {
    const { type, content, styles = {} } = component;
    const colors = {
      text: styles.colors?.text || '#000000',
      background: styles.colors?.background || '#ffffff',
      accent: styles.colors?.accent || '#3b82f6'
    };

    const componentStyle = {
      backgroundColor: colors.background,
      color: colors.text,
      ...styles.spacing
    };

    const renderControls = () => {
      if (!isEditing) return null;
      
      return (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
          <div className="flex gap-2 bg-white/80 p-2 rounded shadow-lg">
            {onMoveUp && (
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            {onMoveDown && (
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button size="sm" variant="outline" onClick={handleEdit}>
                Editar
              </Button>
            )}
            {onDelete && (
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      );
    };

    switch (type) {
      case ComponentType.Hero: {
        const heroContent = content as ComponentContentTypes[ComponentType.Hero];
        return (
          <div style={componentStyle} className="relative group min-h-[400px] flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-bold mb-4">
                {heroContent.title || 'Título Principal'}
              </h1>
              <p className="text-xl mb-6">
                {heroContent.subtitle || 'Subtítulo Atractivo'}
              </p>
              <p className="text-lg mb-8">
                {heroContent.description || 'Descripción detallada de tu producto o servicio'}
              </p>
              {heroContent.buttonText && (
                <Button
                  style={{ backgroundColor: colors.accent }}
                  variant={heroContent.buttonStyle || 'default'}
                  onClick={() => window.open(heroContent.buttonLink || '#', '_blank')}
                >
                  {heroContent.buttonText}
                </Button>
              )}
            </div>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Features: {
        const featuresContent = content as ComponentContentTypes[ComponentType.Features];
        return (
          <div style={componentStyle} className="relative group py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {featuresContent.title || 'Nuestras Características'}
              </h2>
              <p className="text-xl mb-12 text-center">
                {featuresContent.description || 'Descubre lo que nos hace únicos'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(featuresContent.features || []).map((feature, index) => (
                  <div key={index} className="text-center p-6">
                    <div className="mb-4">
                      {feature.icon && <span className="text-4xl">{feature.icon}</span>}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title || `Característica ${index + 1}`}
                    </h3>
                    <p>{feature.description || 'Descripción de la característica'}</p>
                  </div>
                ))}
              </div>
            </div>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Pricing: {
        const pricingContent = content as ComponentContentTypes[ComponentType.Pricing];
        return (
          <div style={componentStyle} className="relative group py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {pricingContent.title || 'Planes y Precios'}
              </h2>
              <p className="text-lg mb-12 text-center">
                {pricingContent.description || 'Elige el plan que mejor se adapte a tus necesidades'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(pricingContent.plans || []).map((plan, index) => (
                  <div 
                    key={index} 
                    className={`p-8 rounded-lg shadow-lg ${plan.highlighted ? 'ring-2 ring-primary' : ''}`}
                    style={{ backgroundColor: plan.highlighted ? colors.accent : colors.background }}
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      {plan.name || `Plan ${index + 1}`}
                    </h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${plan.price || '0'}
                      </span>
                      <span className="text-sm ml-2">/{plan.period || 'mes'}</span>
                    </div>
                    <ul className="mb-8 space-y-2">
                      {(plan.features || []).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.highlighted ? 'default' : 'outline'}
                      className="w-full"
                    >
                      {plan.buttonText || 'Comenzar'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Testimonios: {
        const testimoniosContent = content as ComponentContentTypes[ComponentType.Testimonios];
        return (
          <div style={componentStyle} className="relative group py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {testimoniosContent.title || 'Testimonios'}
              </h2>
              <p className="text-xl mb-12 text-center">
                {testimoniosContent.description || 'Lo que dicen nuestros clientes'}
              </p>
              <div className={`grid ${testimoniosContent.layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
                {(testimoniosContent.testimonios || []).slice(0, testimoniosContent.itemsPerPage || 6).map((testimonio, index) => (
                  <div key={index} className="p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      {testimonio.author?.avatar && (
                        <img 
                          src={testimonio.author.avatar} 
                          alt={testimonio.author.name || `Testimonio ${index + 1}`}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold">
                          {testimonio.author?.name || `Cliente ${index + 1}`}
                        </h4>
                        {testimonio.author?.title && (
                          <p className="text-sm">
                            {testimonio.author.title}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="mb-4">
                      {testimonio.content || 'Testimonio no disponible'}
                    </p>
                    {testimoniosContent.showRating && testimonio.rating && (
                      <div className="flex text-yellow-400 mb-2">
                        {Array.from({ length: Math.min(5, testimonio.rating || 0) }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    )}
                    {testimoniosContent.showDate && testimonio.date && (
                      <p className="text-sm">
                        {new Date(testimonio.date).toLocaleDateString()}
                      </p>
                    )}
                    {testimoniosContent.showVerified && testimonio.verified && (
                      <p className="text-sm text-green-500">✓ Verificado</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Form: {
        const formContent = content as ComponentContentTypes[ComponentType.Form];
        return (
          <div style={componentStyle} className="relative group py-8">
            <div className="container mx-auto px-4 max-w-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {formContent.title}
              </h2>
              <p className="text-xl mb-8 text-center">
                {formContent.description}
              </p>
              <form className="space-y-6">
                {formContent.fields?.map((field, index) => (
                  <div key={index}>
                    <label 
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-2"
                    >
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        className="w-full p-3 border rounded-lg"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        className="w-full p-3 border rounded-lg"
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="submit"
                  variant={formContent.submitButton?.style || 'default'}
                  className="w-full"
                >
                  {formContent.submitButton?.text || 'Enviar'}
                </Button>
              </form>
            </div>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Text: {
        const textContent = content as ComponentContentTypes[ComponentType.Text];
        return (
          <div style={componentStyle} className="relative group py-4">
            <div className="container mx-auto px-4">
              <p style={{ 
                textAlign: styles.alignment || 'left'
              }}>
                {textContent.text}
              </p>
            </div>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Button: {
        const buttonContent = content as ComponentContentTypes[ComponentType.Button];
        return (
          <div style={componentStyle} className="relative group py-4 text-center">
            <Button
              variant={buttonContent.variant || 'default'}
              size={buttonContent.size || 'default'}
              onClick={() => buttonContent.link && window.open(buttonContent.link, '_blank')}
              style={{ backgroundColor: colors.accent }}
            >
              {buttonContent.text}
            </Button>
            {renderControls()}
          </div>
        );
      }

      case ComponentType.Image: {
        const imageContent = content as ComponentContentTypes[ComponentType.Image];
        return (
          <div style={componentStyle} className="relative group py-4">
            <div className="container mx-auto px-4 text-center">
              {imageContent.src ? (
                <img 
                  src={imageContent.src} 
                  alt={imageContent.alt || ''} 
                  className="max-w-full h-auto mx-auto"
                  style={{ maxHeight: '500px' }}
                />
              ) : (
                <div className="bg-gray-200 p-8 text-center rounded">
                  <p className="text-gray-500">Selecciona una imagen</p>
                </div>
              )}
              {imageContent.caption && (
                <p className="mt-2 text-sm text-gray-600">{imageContent.caption}</p>
              )}
            </div>
            {renderControls()}
          </div>
        );
      }

      default:
        return (
          <div style={componentStyle} className="relative group py-4">
            <div className="container mx-auto px-4 text-center">
              <p className="text-red-500">Componente en desarrollo: {type}</p>
            </div>
            {renderControls()}
          </div>
        );
    }
  };

  return (
    <>
      {renderComponent(component)}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El componente será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
