import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TextEditorProps {
  data: {
    content?: string;
    alignment?: 'left' | 'center' | 'right' | 'justify';
    style?: {
      textColor?: string;
      fontSize?: string;
      lineHeight?: string;
    };
  };
  onChange: (newData: any) => void;
}

const defaultData = {
  content: '',
  alignment: 'left',
  style: {
    textColor: 'text-gray-600',
    fontSize: 'text-base',
    lineHeight: 'leading-relaxed'
  }
};

export function TextEditor({ data = defaultData, onChange }: TextEditorProps) {
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
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                value={data.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Ingresa el contenido del texto"
                rows={6}
              />
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
                  <SelectItem value="justify">Justificado</SelectItem>
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
                  placeholder="text-gray-600"
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
                    <SelectItem value="text-sm">Pequeño</SelectItem>
                    <SelectItem value="text-base">Normal</SelectItem>
                    <SelectItem value="text-lg">Grande</SelectItem>
                    <SelectItem value="text-xl">Muy Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lineHeight">Altura de Línea</Label>
                <Select
                  value={data.style?.lineHeight || defaultData.style.lineHeight}
                  onValueChange={(value) => handleStyleChange('lineHeight', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la altura de línea" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leading-none">Ninguna</SelectItem>
                    <SelectItem value="leading-tight">Ajustada</SelectItem>
                    <SelectItem value="leading-normal">Normal</SelectItem>
                    <SelectItem value="leading-relaxed">Relajada</SelectItem>
                    <SelectItem value="leading-loose">Suelta</SelectItem>
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
