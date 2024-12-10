import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface PricingEditorProps {
  data: {
    title?: string;
    description?: string;
    plans?: Array<{
      name: string;
      price: string;
      interval?: string;
      description?: string;
      features: string[];
      highlighted?: boolean;
      buttonText?: string;
      buttonLink?: string;
    }>;
    style?: {
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
  onChange: (newData: any) => void;
}

export function PricingEditor({ data, onChange }: PricingEditorProps) {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handlePlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...(data.plans || [])];
    newPlans[index] = {
      ...newPlans[index],
      [field]: value,
    };
    onChange({
      ...data,
      plans: newPlans,
    });
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const newPlans = [...(data.plans || [])];
    const newFeatures = [...newPlans[planIndex].features];
    newFeatures[featureIndex] = value;
    newPlans[planIndex] = {
      ...newPlans[planIndex],
      features: newFeatures,
    };
    onChange({
      ...data,
      plans: newPlans,
    });
  };

  const addPlan = () => {
    onChange({
      ...data,
      plans: [
        ...(data.plans || []),
        {
          name: 'Nuevo Plan',
          price: '0',
          interval: 'mes',
          description: 'Descripción del plan',
          features: ['Característica 1'],
          buttonText: 'Comenzar',
          buttonLink: '#',
        },
      ],
    });
  };

  const removePlan = (index: number) => {
    const newPlans = [...(data.plans || [])];
    newPlans.splice(index, 1);
    onChange({
      ...data,
      plans: newPlans,
    });
  };

  const addFeature = (planIndex: number) => {
    const newPlans = [...(data.plans || [])];
    newPlans[planIndex].features.push('Nueva característica');
    onChange({
      ...data,
      plans: newPlans,
    });
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const newPlans = [...(data.plans || [])];
    newPlans[planIndex].features.splice(featureIndex, 1);
    onChange({
      ...data,
      plans: newPlans,
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Información General</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Sección</Label>
            <Input
              id="title"
              value={data.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Nuestros Planes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descripción de los planes..."
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Planes</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addPlan}
          >
            Agregar Plan
          </Button>
        </div>

        <div className="space-y-8">
          {data.plans?.map((plan, planIndex) => (
            <div key={planIndex} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Plan {planIndex + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePlan(planIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre del Plan</Label>
                  <Input
                    value={plan.name}
                    onChange={(e) => handlePlanChange(planIndex, 'name', e.target.value)}
                    placeholder="Básico"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Precio</Label>
                    <Input
                      value={plan.price}
                      onChange={(e) => handlePlanChange(planIndex, 'price', e.target.value)}
                      placeholder="9.99"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Intervalo</Label>
                    <Input
                      value={plan.interval}
                      onChange={(e) => handlePlanChange(planIndex, 'interval', e.target.value)}
                      placeholder="mes"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descripción del Plan</Label>
                  <Textarea
                    value={plan.description}
                    onChange={(e) => handlePlanChange(planIndex, 'description', e.target.value)}
                    placeholder="Perfecto para comenzar..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Plan Destacado</Label>
                  <Switch
                    checked={plan.highlighted}
                    onCheckedChange={(checked) => handlePlanChange(planIndex, 'highlighted', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Texto del Botón</Label>
                  <Input
                    value={plan.buttonText}
                    onChange={(e) => handlePlanChange(planIndex, 'buttonText', e.target.value)}
                    placeholder="Comenzar"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Enlace del Botón</Label>
                  <Input
                    value={plan.buttonLink}
                    onChange={(e) => handlePlanChange(planIndex, 'buttonLink', e.target.value)}
                    placeholder="#"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Características</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addFeature(planIndex)}
                    >
                      Agregar Característica
                    </Button>
                  </div>

                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(planIndex, featureIndex, e.target.value)}
                        placeholder="Característica del plan"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeature(planIndex, featureIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Estilos</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Color de Fondo</Label>
            <Input
              id="backgroundColor"
              value={data.style?.backgroundColor || 'bg-gray-50'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              placeholder="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="textColor">Color de Texto</Label>
            <Input
              id="textColor"
              value={data.style?.textColor || 'text-gray-900'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              placeholder="text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accentColor">Color de Acento</Label>
            <Input
              id="accentColor"
              value={data.style?.accentColor || 'blue'}
              onChange={(e) => handleStyleChange('accentColor', e.target.value)}
              placeholder="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
