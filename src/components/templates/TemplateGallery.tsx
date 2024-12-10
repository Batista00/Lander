import { useState } from 'react';
import { useTemplates, Template } from '../../modules/templates/TemplateManager';
import { usePremiumStore } from '../../modules/premium/PremiumManager';
import { PremiumStatus } from '../premium/PremiumStatus';
import { Button } from '../ui/Button';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const { templates, savedTemplates } = useTemplates();
  const { isFeatureEnabled } = usePremiumStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'startup', name: 'Startups' },
    { id: 'restaurant', name: 'Restaurantes' },
    { id: 'professional', name: 'Servicios Profesionales' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'personal', name: 'Personal' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="p-6">
      {/* Categorías */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

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
            {template.premium && !isFeatureEnabled('premiumTemplates') ? (
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
          {template.premium && (
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
