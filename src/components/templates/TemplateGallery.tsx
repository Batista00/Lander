import { useState } from 'react';
import { useTemplates, Template } from '../../modules/templates/TemplateManager';
import { usePremiumStore } from '../../modules/premium/PremiumManager';
import { PremiumStatus } from '../premium/PremiumStatus';
import { Button } from '../ui/Button';
import { AIConfigDialog } from './AIConfigDialog';
import { landingAIWorkflow } from '../../features/ai/services/LandingAIWorkflow';
import { toast } from 'sonner';
import { AIWorkflowContext } from '@/types/landing';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const { templates, savedTemplates } = useTemplates();
  const { isFeatureEnabled } = usePremiumStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [suggestedTemplates, setSuggestedTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'suggested', name: '🌟 Sugeridas por IA', hidden: suggestedTemplates.length === 0 },
    { id: 'startup', name: 'Startups' },
    { id: 'restaurant', name: 'Restaurantes' },
    { id: 'professional', name: 'Servicios Profesionales' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'personal', name: 'Personal' },
  ];

  const handleAIConfig = async (config: AIWorkflowContext) => {
    try {
      setIsLoading(true);
      landingAIWorkflow.setContext(config);
      const suggestions = await landingAIWorkflow.suggestTemplates();
      setSuggestedTemplates(suggestions);
      setSelectedCategory('suggested');
      toast.success('¡Sugerencias generadas con éxito!');
    } catch (error) {
      console.error('Error al generar sugerencias:', error);
      toast.error('Error al generar sugerencias. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : selectedCategory === 'suggested'
    ? suggestedTemplates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="p-6">
      {/* Botón de IA y Categorías */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <Button
            variant="default"
            onClick={() => setIsAIDialogOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          >
            🤖 Obtener Sugerencias de IA
          </Button>
          {categories
            .filter(cat => !cat.hidden)
            .map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Indicador de carga */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Plantillas Guardadas */}
      {savedTemplates.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tus Plantillas Guardadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Plantillas por Categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id}>
            {template.isPremium && !isFeatureEnabled('premiumTemplates') ? (
              <PremiumStatus featureId="premiumTemplates">
                <TemplateCard
                  template={template}
                  onSelect={onSelectTemplate}
                />
              </PremiumStatus>
            ) : (
              <TemplateCard
                template={template}
                onSelect={onSelectTemplate}
              />
            )}
          </div>
        ))}
      </div>

      {/* Diálogo de Configuración de IA */}
      <AIConfigDialog
        open={isAIDialogOpen}
        onClose={() => setIsAIDialogOpen(false)}
        onSubmit={handleAIConfig}
      />
    </div>
  );
}

function TemplateCard({ template, onSelect }: { template: Template; onSelect: (t: Template) => void }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Thumbnail */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {template.name}
          </h3>
          {template.isPremium && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Premium
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {template.description}
        </p>
        <div className="flex justify-between items-center">
          <Button
            variant="default"
            onClick={() => onSelect(template)}
          >
            Usar Plantilla
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Implementar vista previa
            }}
          >
            Vista Previa
          </Button>
        </div>
      </div>
    </div>
  );
}
