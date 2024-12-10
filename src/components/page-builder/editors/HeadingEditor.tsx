import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeadingEditorProps {
  data: {
    text?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    alignment?: 'left' | 'center' | 'right';
    style?: {
      textColor?: string;
      fontSize?: string;
    };
  };
  onChange: (newData: any) => void;
}

const defaultData = {
  text: 'Título',
  level: 2,
  alignment: 'left',
  style: {
    textColor: 'text-gray-900',
    fontSize: 'text-3xl'
  }
};

export function HeadingEditor({ data = defaultData, onChange }: HeadingEditorProps) {
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
              <Label htmlFor="text">Texto del Título</Label>
              <Input
                id="text"
                value={data.text || defaultData.text}
                onChange={(e) => handleChange('text', e.target.value)}
                placeholder="Ingresa el texto del título"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Nivel del Título</Label>
              <Select
                value={String(data.level || defaultData.level)}
                onValueChange={(value) => handleChange('level', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1 - Título Principal</SelectItem>
                  <SelectItem value="2">H2 - Subtítulo</SelectItem>
                  <SelectItem value="3">H3 - Título de Sección</SelectItem>
                  <SelectItem value="4">H4 - Subtítulo de Sección</SelectItem>
                  <SelectItem value="5">H5 - Título Pequeño</SelectItem>
                  <SelectItem value="6">H6 - Título Muy Pequeño</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alignment">Alineación</Label>
              <Select
                value={data.alignment || defaultData.alignment}
                onValueChange={(value) => handleChange('alignment', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la alineación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Izquierda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Derecha</SelectItem>
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
                <Label htmlFor="textColor">Color de Texto</Label>
                <Input
                  id="textColor"
                  value={data.style?.textColor || defaultData.style.textColor}
                  onChange={(e) => handleStyleChange('textColor', e.target.value)}
                  placeholder="text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Tamaño de Texto</Label>
                <Select
                  value={data.style?.fontSize || defaultData.style.fontSize}
                  onValueChange={(value) => handleStyleChange('fontSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-xl">Pequeño</SelectItem>
                    <SelectItem value="text-2xl">Mediano</SelectItem>
                    <SelectItem value="text-3xl">Grande</SelectItem>
                    <SelectItem value="text-4xl">Muy Grande</SelectItem>
                    <SelectItem value="text-5xl">Extra Grande</SelectItem>
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
