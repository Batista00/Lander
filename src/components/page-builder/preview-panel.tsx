import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2, Monitor, Smartphone, Tablet } from 'lucide-react';

interface PreviewPanelProps {
  children: React.ReactNode;
  loading?: boolean;
}

type DeviceSize = 'desktop' | 'tablet' | 'mobile';

export function PreviewPanel({ children, loading = false }: PreviewPanelProps) {
  const [deviceSize, setDeviceSize] = React.useState<DeviceSize>('desktop');

  const previewSizes = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-gray-100">
      <div className="sticky top-0 z-10 flex items-center justify-center gap-2 p-4 bg-white border-b">
        <Button
          variant={deviceSize === 'desktop' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setDeviceSize('desktop')}
        >
          <Monitor className="w-4 h-4" />
        </Button>
        <Button
          variant={deviceSize === 'tablet' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setDeviceSize('tablet')}
        >
          <Tablet className="w-4 h-4" />
        </Button>
        <Button
          variant={deviceSize === 'mobile' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setDeviceSize('mobile')}
        >
          <Smartphone className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-h-full flex items-start justify-center p-8">
          <div
            className={cn(
              "relative bg-white shadow-2xl rounded-lg transition-all duration-300",
              previewSizes[deviceSize]
            )}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
