import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface FeaturesEditorProps {
  data: {
    title?: string;
    description?: string;
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  onChange: (newData: any) => void;
}

const defaultData = {
  title: 'Nuestras Características',
  description: 'Descubre lo que nos hace únicos',
  features: [],
  style: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900'
  }
};

export function FeaturesEditor({ data = defaultData, onChange }: FeaturesEditorProps) {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleStyleChange = (field: string, value: string) => {
    onChange({
      ...data,
      style: {
        ...data.style,
        [field]: value,
      },
    });
  };

  const handleAddFeature = () => {
    const features = Array.isArray(data.features) ? data.features : [];
    onChange({
      ...data,
      features: [
        ...features,
        {
          title: 'Nueva Característica',
          description: 'Descripción de la característica',
          icon: '✨'
        }
      ],
    });
  };

  const handleUpdateFeature = (index: number, field: string, value: string) => {
    const features = Array.isArray(data.features) ? [...data.features] : [];
    features[index] = {
      ...features[index],
      [field]: value,
    };
    onChange({
      ...data,
      features,
    });
  };

  const handleRemoveFeature = (index: number) => {
    const features = Array.isArray(data.features) ? [...data.features] : [];
    features.splice(index, 1);
    onChange({
      ...data,
      features,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título Principal</Label>
              <Input
                id="title"
                value={data.title || defaultData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Título de la sección"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción Principal</Label>
              <Textarea
                id="description"
                value={data.description || defaultData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Descripción de la sección"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Características</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddFeature}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Característica
              </Button>
            </div>
            <div className="space-y-4">
              {Array.isArray(data.features) && data.features.map((feature, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Característica {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Título</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => handleUpdateFeature(index, 'title', e.target.value)}
                        placeholder="Título de la característica"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => handleUpdateFeature(index, 'description', e.target.value)}
                        placeholder="Descripción de la característica"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icono</Label>
                      <Input
                        value={feature.icon || ''}
                        onChange={(e) => handleUpdateFeature(index, 'icon', e.target.value)}
                        placeholder="✨"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Estilos</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Color de Fondo</Label>
                <Input
                  id="backgroundColor"
                  value={data.style?.backgroundColor || defaultData.style.backgroundColor}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  placeholder="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">Color de Texto</Label>
                <Input
                  id="textColor"
                  value={data.style?.textColor || defaultData.style.textColor}
                  onChange={(e) => handleStyleChange('textColor', e.target.value)}
                  placeholder="text-gray-900"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
