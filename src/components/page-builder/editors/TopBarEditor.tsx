import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from '@/components/ui/color-picker';
import { bgColors, textColors } from '@/lib/colors';
import { Separator } from '@/components/ui/separator';

interface TopBarEditorProps {
  data?: {
    email?: string;
    phone?: string;
    showEmail?: boolean;
    showPhone?: boolean;
    showSocial?: boolean;
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
    style?: {
      backgroundColor?: string;
      textColor?: string;
      fullWidth?: boolean;
    };
  };
  onChange?: (newData: any) => void;
  onDataChange?: (key: string, value: any) => void;
  onStyleChange?: (key: string, value: any) => void;
}

const defaultData = {
  email: '',
  phone: '',
  showEmail: false,
  showPhone: false,
  showSocial: false,
  social: {
    facebook: '',
    twitter: '',
    instagram: ''
  },
  style: {
    backgroundColor: 'bg-gray-900',
    textColor: 'text-white',
    fullWidth: true
  }
};

export function TopBarEditor({ 
  data,
  onChange,
  onDataChange,
  onStyleChange
}: TopBarEditorProps) {
  const mergedData = {
    ...defaultData,
    ...data,
    social: { ...defaultData.social, ...data?.social },
    style: { ...defaultData.style, ...data?.style }
  };

  const handleChange = (field: string, value: any) => {
    if (onChange) {
      onChange({
        ...mergedData,
        [field]: value
      });
    } else if (onDataChange) {
      onDataChange(field, value);
    }
  };

  const handleSocialChange = (platform: string, value: string) => {
    handleChange('social', {
      ...mergedData.social,
      [platform]: value
    });
  };

  const handleStyleChange = (field: string, value: any) => {
    if (onChange) {
      onChange({
        ...mergedData,
        style: {
          ...mergedData.style,
          [field]: value
        }
      });
    } else if (onStyleChange) {
      onStyleChange(field, value);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {/* Contacto */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Información de Contacto</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showEmail">Mostrar Email</Label>
              <Switch
                id="showEmail"
                checked={mergedData.showEmail}
                onCheckedChange={(checked) => handleChange('showEmail', checked)}
              />
            </div>

            {mergedData.showEmail && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={mergedData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="ejemplo@email.com"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showPhone">Mostrar Teléfono</Label>
              <Switch
                id="showPhone"
                checked={mergedData.showPhone}
                onCheckedChange={(checked) => handleChange('showPhone', checked)}
              />
            </div>

            {mergedData.showPhone && (
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={mergedData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 234 567 890"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Redes Sociales */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Redes Sociales</h3>
            <Switch
              id="showSocial"
              checked={mergedData.showSocial}
              onCheckedChange={(checked) => handleChange('showSocial', checked)}
            />
          </div>

          {mergedData.showSocial && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={mergedData.social?.facebook}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/tu-pagina"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={mergedData.social?.twitter}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/tu-usuario"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={mergedData.social?.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/tu-usuario"
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Estilos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Estilos</h3>

          <ColorPicker
            label="Color de Fondo"
            colors={bgColors}
            value={mergedData.style?.backgroundColor || 'bg-gray-900'}
            onChange={(value) => handleStyleChange('backgroundColor', value)}
          />

          <ColorPicker
            label="Color de Texto"
            colors={textColors}
            value={mergedData.style?.textColor || 'text-white'}
            onChange={(value) => handleStyleChange('textColor', value)}
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="fullWidth"
              checked={mergedData.style?.fullWidth}
              onCheckedChange={(checked) => handleStyleChange('fullWidth', checked)}
            />
            <Label htmlFor="fullWidth">Ancho Completo</Label>
          </div>
        </div>
      </div>
    </Card>
  );
}
