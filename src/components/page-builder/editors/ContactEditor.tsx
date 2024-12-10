import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface ContactEditorProps {
  data: {
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    showMap?: boolean;
    mapUrl?: string;
    formFields?: {
      name?: boolean;
      email?: boolean;
      phone?: boolean;
      subject?: boolean;
      message?: boolean;
    };
    style?: {
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
  };
  onChange: (newData: any) => void;
}

export function ContactEditor({ data, onChange }: ContactEditorProps) {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleFormFieldChange = (field: string, value: boolean) => {
    onChange({
      ...data,
      formFields: {
        ...data.formFields,
        [field]: value,
      },
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
              placeholder="Contáctanos"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descripción de la sección de contacto..."
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Información de Contacto</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="contacto@empresa.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Textarea
              id="address"
              value={data.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Dirección completa..."
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mapa</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showMap">Mostrar Mapa</Label>
            <Switch
              id="showMap"
              checked={data.showMap}
              onCheckedChange={(checked) => handleChange('showMap', checked)}
            />
          </div>

          {data.showMap && (
            <div className="space-y-2">
              <Label htmlFor="mapUrl">URL del Mapa</Label>
              <Input
                id="mapUrl"
                value={data.mapUrl || ''}
                onChange={(e) => handleChange('mapUrl', e.target.value)}
                placeholder="URL de Google Maps Embed"
              />
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Campos del Formulario</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="nameField">Campo Nombre</Label>
            <Switch
              id="nameField"
              checked={data.formFields?.name}
              onCheckedChange={(checked) => handleFormFieldChange('name', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="emailField">Campo Email</Label>
            <Switch
              id="emailField"
              checked={data.formFields?.email}
              onCheckedChange={(checked) => handleFormFieldChange('email', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="phoneField">Campo Teléfono</Label>
            <Switch
              id="phoneField"
              checked={data.formFields?.phone}
              onCheckedChange={(checked) => handleFormFieldChange('phone', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="subjectField">Campo Asunto</Label>
            <Switch
              id="subjectField"
              checked={data.formFields?.subject}
              onCheckedChange={(checked) => handleFormFieldChange('subject', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="messageField">Campo Mensaje</Label>
            <Switch
              id="messageField"
              checked={data.formFields?.message}
              onCheckedChange={(checked) => handleFormFieldChange('message', checked)}
            />
          </div>
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
              value={data.style?.backgroundColor || 'bg-white'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              placeholder="bg-white"
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
