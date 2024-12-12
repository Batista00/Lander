import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface TestimonialsEditorProps {
  data: {
    title?: string;
    description?: string;
    testimonials?: Array<{
      name: string;
      role?: string;
      company?: string;
      content: string;
      avatar?: string;
    }>;
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  onChange: (newData: any) => void;
}

const defaultData = {
  title: 'Lo que dicen nuestros clientes',
  description: 'Testimonios de clientes satisfechos',
  testimonials: [],
  style: {
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-900'
  }
};

export function TestimonialsEditor({ data = defaultData, onChange }: TestimonialsEditorProps) {
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

  const handleAddTestimonial = () => {
    const testimonials = Array.isArray(data.testimonials) ? data.testimonials : [];
    onChange({
      ...data,
      testimonials: [
        ...testimonials,
        {
          name: 'Nombre del Cliente',
          role: 'Cargo',
          company: 'Empresa',
          content: 'Contenido del testimonio',
          avatar: ''
        }
      ],
    });
  };

  const handleUpdateTestimonial = (index: number, field: string, value: string) => {
    const testimonials = Array.isArray(data.testimonials) ? [...data.testimonials] : [];
    testimonials[index] = {
      ...testimonials[index],
      [field]: value,
    };
    onChange({
      ...data,
      testimonials,
    });
  };

  const handleRemoveTestimonial = (index: number) => {
    const testimonials = Array.isArray(data.testimonials) ? [...data.testimonials] : [];
    testimonials.splice(index, 1);
    onChange({
      ...data,
      testimonials,
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
              <h3 className="text-lg font-medium">Testimonios</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddTestimonial}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Testimonio
              </Button>
            </div>
            <div className="space-y-4">
              {Array.isArray(data.testimonials) && data.testimonials.map((testimonial, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Testimonio {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveTestimonial(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nombre</Label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => handleUpdateTestimonial(index, 'name', e.target.value)}
                        placeholder="Nombre del cliente"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Cargo</Label>
                      <Input
                        value={testimonial.role || ''}
                        onChange={(e) => handleUpdateTestimonial(index, 'role', e.target.value)}
                        placeholder="Cargo en la empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Empresa</Label>
                      <Input
                        value={testimonial.company || ''}
                        onChange={(e) => handleUpdateTestimonial(index, 'company', e.target.value)}
                        placeholder="Nombre de la empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Testimonio</Label>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) => handleUpdateTestimonial(index, 'content', e.target.value)}
                        placeholder="Contenido del testimonio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL del Avatar</Label>
                      <Input
                        value={testimonial.avatar || ''}
                        onChange={(e) => handleUpdateTestimonial(index, 'avatar', e.target.value)}
                        placeholder="https://ejemplo.com/avatar.jpg"
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
                  placeholder="bg-gray-50"
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
