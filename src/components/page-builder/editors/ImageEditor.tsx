import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImageEditorProps {
  data: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    fit?: 'contain' | 'cover' | 'fill' | 'none';
    style?: {
      rounded?: string;
      shadow?: string;
    };
  };
  onChange: (newData: any) => void;
}

const defaultData = {
  src: '',
  alt: '',
  width: 400,
  height: 300,
  fit: 'cover',
  style: {
    rounded: 'rounded-lg',
    shadow: 'shadow-md'
  }
};

export function ImageEditor({ data = defaultData, onChange }: ImageEditorProps) {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="src">URL de la Imagen</Label>
              <Input
                id="src"
                value={data.src || ''}
                onChange={(e) => handleChange('src', e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={data.alt || ''}
                onChange={(e) => handleChange('alt', e.target.value)}
                placeholder="Descripción de la imagen"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Ancho (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={data.width || defaultData.width}
                  onChange={(e) => handleChange('width', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Alto (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={data.height || defaultData.height}
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fit">Ajuste de Imagen</Label>
              <Select
                value={data.fit || defaultData.fit}
                onValueChange={(value) => handleChange('fit', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el ajuste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contain">Contener</SelectItem>
                  <SelectItem value="cover">Cubrir</SelectItem>
                  <SelectItem value="fill">Llenar</SelectItem>
                  <SelectItem value="none">Ninguno</SelectItem>
                </SelectContent>
              </Select>
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
                <Label htmlFor="rounded">Bordes Redondeados</Label>
                <Select
                  value={data.style?.rounded || defaultData.style.rounded}
                  onValueChange={(value) => handleStyleChange('rounded', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el redondeo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded-none">Sin redondeo</SelectItem>
                    <SelectItem value="rounded">Ligero</SelectItem>
                    <SelectItem value="rounded-md">Medio</SelectItem>
                    <SelectItem value="rounded-lg">Grande</SelectItem>
                    <SelectItem value="rounded-full">Completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadow">Sombra</Label>
                <Select
                  value={data.style?.shadow || defaultData.style.shadow}
                  onValueChange={(value) => handleStyleChange('shadow', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la sombra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shadow-none">Sin sombra</SelectItem>
                    <SelectItem value="shadow-sm">Pequeña</SelectItem>
                    <SelectItem value="shadow">Normal</SelectItem>
                    <SelectItem value="shadow-md">Media</SelectItem>
                    <SelectItem value="shadow-lg">Grande</SelectItem>
                    <SelectItem value="shadow-xl">Extra Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
