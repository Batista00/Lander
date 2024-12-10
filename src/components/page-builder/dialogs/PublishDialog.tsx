import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Globe, Star, X, Loader2, Check, Copy } from 'lucide-react';
import { landingPageService } from '@/services/landingPageService';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  landingPageId: string;
  isPremium?: boolean;
}

export function PublishDialog({
  open,
  onClose,
  landingPageId,
  isPremium = false
}: PublishDialogProps) {
  const { t } = useTranslation();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [domainType, setDomainType] = React.useState<'default' | 'custom'>('default');
  const [customDomain, setCustomDomain] = React.useState('');
  const [domainError, setDomainError] = React.useState('');
  const [isValidating, setIsValidating] = React.useState(false);
  const [publishedUrl, setPublishedUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handlePublish = async () => {
    try {
      if (!landingPageId) {
        toast.error('ID de landing page no válido');
        return;
      }

      setIsPublishing(true);
      setDomainError('');

      if (domainType === 'custom' && !isPremium) {
        setDomainError('Necesita una cuenta premium para usar dominios personalizados');
        return;
      }

      // Validar dominio personalizado si está seleccionado
      if (domainType === 'custom') {
        if (!customDomain) {
          setDomainError('El dominio personalizado es requerido');
          return;
        }
        setIsValidating(true);
        const validation = await landingPageService.validateDomain(customDomain);
        setIsValidating(false);
        
        if (!validation.isValid) {
          setDomainError(validation.error || 'Dominio no válido');
          return;
        }
      }

      const domain = domainType === 'custom' ? customDomain : undefined;
      const result = await landingPageService.publishLandingPage(
        landingPageId.toString(),
        domainType, 
        domain
      );

      if (result) {
        const url = result.publishedUrl || `${window.location.origin}/p/${landingPageId}`;
        setPublishedUrl(url);
        toast.success('Landing page publicada correctamente');
        onClose();
      }
    } catch (error: any) {
      console.error('Error publishing:', error);
      toast.error(error.message || 'Error al publicar la landing page');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyUrl = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('URL copiada al portapapeles');
    }
  };

  const handleUpgradePremium = () => {
    window.location.href = '/planes-premium';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publicar Landing Page</DialogTitle>
          <DialogDescription>
            Configure las opciones de publicación de su landing page
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Estado de publicación */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Estado actual</h4>
              <p className="text-sm text-gray-500">
                {publishedUrl ? 'Publicado' : 'No publicado'}
              </p>
            </div>
            <Badge variant={publishedUrl ? "success" : "secondary"}>
              {publishedUrl ? 'En línea' : 'Borrador'}
            </Badge>
          </div>

          {/* Opciones de dominio */}
          <div className="space-y-4">
            <Label>Seleccione el tipo de dominio</Label>
            <RadioGroup
              value={domainType}
              onValueChange={(value) => setDomainType(value as 'default' | 'custom')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="default"
                  id="default"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="default"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary"
                >
                  <Globe className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <h4 className="font-medium">Dominio por defecto</h4>
                    <p className="text-sm text-gray-500">
                      Gratis y listo para usar
                    </p>
                  </div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="custom"
                  id="custom"
                  className="peer sr-only"
                  disabled={!isPremium}
                />
                <Label
                  htmlFor="custom"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-gray-50 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Star className="mb-3 h-6 w-6 text-yellow-400" />
                  <div className="space-y-1 text-center">
                    <h4 className="font-medium">Dominio personalizado</h4>
                    <p className="text-sm text-gray-500">
                      {isPremium ? 'Disponible con Premium' : 'Requiere Premium'}
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {/* Input de dominio personalizado */}
            {domainType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="domain">Dominio personalizado</Label>
                <div className="relative">
                  <Input
                    id="domain"
                    placeholder="ejemplo.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className={domainError ? "border-red-500" : ""}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {isValidating ? (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    ) : domainError ? (
                      <X className="h-4 w-4 text-red-500" />
                    ) : customDomain ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : null}
                  </div>
                </div>
                {domainError && (
                  <p className="text-sm text-red-500">{domainError}</p>
                )}
                <p className="text-sm text-gray-500">
                  Ingrese su dominio personalizado sin http:// o https://
                </p>
              </div>
            )}

            {/* URL pública */}
            {publishedUrl && (
              <div className="space-y-2">
                <Label>URL pública</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    readOnly
                    value={typeof publishedUrl === 'string' ? publishedUrl : ''}
                    className="bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyUrl}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Mensaje promocional para usuarios no premium */}
            {!isPremium && (
              <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      ¡Actualice a Premium!
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Obtenga acceso a dominios personalizados y más características premium.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleUpgradePremium}
                          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                        >
                          Actualizar ahora
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPublishing || (domainType === 'custom' && !!domainError)}
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publicar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
