import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Globe, Smartphone, Tablet, Monitor, Eye } from 'lucide-react';
import { Loader2, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface EditorToolbarProps {
  onPublish?: () => void;
  onSave: () => void;
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  device: 'desktop' | 'tablet' | 'mobile';
  isSaving?: boolean;
  lastSaved?: number;
  isPreview: boolean;
  onTogglePreview: () => void;
}

export function EditorToolbar({
  onPublish,
  onSave,
  onDeviceChange,
  device,
  isSaving,
  lastSaved,
  isPreview,
  onTogglePreview
}: EditorToolbarProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button
            variant={isPreview ? "default" : "ghost"}
            size="sm"
            onClick={onTogglePreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Editar' : 'Vista Previa'}
          </Button>
          {onPublish && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onPublish}
            >
              <Globe className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          )}
        </div>

        <Tabs
          value={device}
          onValueChange={(value) => onDeviceChange(value as 'desktop' | 'tablet' | 'mobile')}
        >
          <TabsList>
            <TabsTrigger value="desktop">
              <Monitor className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="tablet">
              <Tablet className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Estado de guardado */}
        <div className="flex items-center gap-2">
          {isSaving ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md shadow-sm border border-gray-100">
              <Loader2 className="h-3.5 w-3.5 text-gray-500 animate-spin" />
              <span className="text-sm text-gray-600">Guardando...</span>
            </div>
          ) : lastSaved ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md shadow-sm border border-gray-100">
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              <span className="text-sm text-gray-600">
                Guardado {formatDistanceToNow(new Date(lastSaved), { locale: es, addSuffix: true })}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
