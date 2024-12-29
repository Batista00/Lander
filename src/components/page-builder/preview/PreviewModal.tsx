import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LandingPreview } from './LandingPreview';
import { LandingPage } from '@/types/landing';
import { Laptop, Tablet, Smartphone } from 'lucide-react';

interface PreviewModalProps {
  landingPage: LandingPage;
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ landingPage, isOpen, onClose }: PreviewModalProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceStyles = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-start justify-center">
        <div className="min-h-screen w-full bg-background p-4">
          {/* Toolbar */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={device === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevice('desktop')}
              >
                <Laptop className="h-4 w-4" />
              </Button>
              <Button
                variant={device === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevice('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={device === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDevice('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </div>

          {/* Preview Container */}
          <div className={`mx-auto overflow-auto ${deviceStyles[device]}`}>
            <div className="rounded-lg border bg-white shadow-sm">
              <LandingPreview landingPage={landingPage} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
