import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, ArrowLeft, Clock } from 'lucide-react';
import { useVersionStore } from '@/store/version-store';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Version {
  id: string;
  timestamp: number;
  components: any[];
  description: string;
}

interface VersionHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  pageId: string;
  onRestore: (components: any[]) => void;
}

export function VersionHistoryDialog({
  open,
  onClose,
  pageId,
  onRestore,
}: VersionHistoryDialogProps) {
  const { getVersions, getCurrentVersion, setCurrentVersion } = useVersionStore();
  const versions = getVersions(pageId);
  const currentVersion = getCurrentVersion(pageId);

  const handleRestore = (version: Version) => {
    setCurrentVersion(pageId, version.id);
    onRestore(version.components);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historial de Versiones
          </DialogTitle>
          <DialogDescription>
            Restaura una versión anterior de tu landing page
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className={cn(
                  "p-4 rounded-lg border",
                  version.id === currentVersion?.id
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:border-violet-500"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {format(version.timestamp, "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                    </span>
                  </div>
                  {version.id !== currentVersion?.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRestore(version)}
                      className="gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Restaurar
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-700">{version.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
