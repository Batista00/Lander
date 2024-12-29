import { Button } from '@/components/ui/button';
import { Save, Eye, Globe } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onPreview: () => void;
  onPublish: () => void;
  isPremiumUser: boolean;
}

export function ActionButtons({
  onSave,
  onPreview,
  onPublish,
  isPremiumUser
}: ActionButtonsProps) {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onPreview}
      >
        <Eye className="w-4 h-4 mr-2" />
        Vista Previa
      </Button>

      <Button
        size="sm"
        variant="default"
        onClick={onSave}
        className="bg-gradient-to-r from-[#00E5B0] to-[#00A699] text-white hover:from-[#00A699] hover:to-[#00E5B0]"
      >
        <Save className="w-4 h-4 mr-2" />
        Guardar
      </Button>

      {isPremiumUser && (
        <Button
          size="sm"
          variant="default"
          onClick={onPublish}
          className="bg-gradient-to-r from-[#00E5B0] to-[#00A699] text-white hover:from-[#00A699] hover:to-[#00E5B0]"
        >
          <Globe className="w-4 h-4 mr-2" />
          Publicar
        </Button>
      )}
    </div>
  );
}
