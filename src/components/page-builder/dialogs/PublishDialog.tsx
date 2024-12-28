import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Globe, Lock, Share2, Copy, ExternalLink } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { landingPageService } from '@/services/landingPageService';
import { useLandingStore } from '@/store/landingStore';

interface PublishDialogProps {
  landingPageId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (url: string) => void;
}

interface PublishSettings {
  isPrivate: boolean;
  password: string;
  useCustomDomain: boolean;
  customDomain: string;
  expirationDate: string;
  seoTitle: string;
  seoDescription: string;
}

export function PublishDialog({
  landingPageId,
  open,
  onOpenChange,
  onSuccess,
}: PublishDialogProps) {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [currentTab, setCurrentTab] = useState<"share" | "settings">("share");
  const [settings, setSettings] = useState<PublishSettings>({
    isPrivate: false,
    password: "",
    useCustomDomain: false,
    customDomain: "",
    expirationDate: "",
    seoTitle: "",
    seoDescription: "",
  });

  const { currentLandingPage, saveLandingPage } = useLandingStore();

  // Obtener la URL base según el entorno
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173'
    : 'https://lander.lat';

  // URL de vista previa (siempre accesible mientras editas)
  const previewUrl = `${baseUrl}/landing/preview/${landingPageId}`;
  
  // URL pública (solo disponible después de publicar)
  const publicUrl = settings.useCustomDomain && settings.customDomain
    ? `https://${settings.customDomain}`
    : `${baseUrl}/landing/${landingPageId}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      toast({
        title: "URL copiada",
        description: "La URL ha sido copiada al portapapeles",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar la URL",
        variant: "destructive",
      });
    }
  };

  const handleOpenPreview = () => {
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPublic = () => {
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  };

  const validateSettings = () => {
    if (settings.isPrivate && !settings.password) {
      toast({
        title: "Error de validación",
        description: "Debes establecer una contraseña si la landing page es privada",
        variant: "destructive",
      });
      return false;
    }

    if (settings.useCustomDomain && !settings.customDomain) {
      toast({
        title: "Error de validación",
        description: "Debes ingresar un dominio personalizado",
        variant: "destructive",
      });
      return false;
    }

    if (settings.expirationDate) {
      const expirationDate = new Date(settings.expirationDate);
      if (expirationDate <= new Date()) {
        toast({
          title: "Error de validación",
          description: "La fecha de expiración debe ser futura",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handlePublish = async () => {
    try {
      if (!validateSettings()) {
        return;
      }

      setIsPublishing(true);

      // Primero guardamos los cambios pendientes
      if (currentLandingPage) {
        await saveLandingPage(currentLandingPage);
      }

      // Preparar las opciones de publicación
      const publishOptions: any = {
        isPrivate: settings.isPrivate
      };

      // Solo agregar campos si tienen valor
      if (settings.isPrivate && settings.password) {
        publishOptions.password = settings.password;
      }

      if (settings.useCustomDomain && settings.customDomain) {
        publishOptions.customDomain = settings.customDomain;
      }

      if (settings.expirationDate) {
        publishOptions.expirationDate = settings.expirationDate;
      }

      if (settings.seoTitle || settings.seoDescription) {
        publishOptions.seo = {
          title: settings.seoTitle || '',
          description: settings.seoDescription || ''
        };
      }

      // Publicar la landing page
      await landingPageService.publishLandingPage(landingPageId, publishOptions);

      toast({
        title: "Landing page publicada",
        description: "Tu landing page ha sido publicada exitosamente",
      });

      if (onSuccess) {
        onSuccess(publicUrl);
      }

      setCurrentTab("share");
    } catch (error) {
      console.error('Error publishing landing page:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo publicar la landing page",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Publicar Landing Page</DialogTitle>
          <DialogDescription className="text-gray-600">
            Comparte tu landing page o configura opciones avanzadas
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as "share" | "settings")}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="share" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Compartir
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Configuración Avanzada
            </TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="text-black">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <Label className="text-black">Vista Previa</Label>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenPreview}
                  >
                    Ver vista previa
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Puedes ver cómo se verá tu landing page antes de publicarla
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <Label className="text-black">URL Pública</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={publicUrl}
                    readOnly
                    className="text-black bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyUrl}
                    title="Copiar URL"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleOpenPublic}
                    title="Abrir en nueva pestaña"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  {settings.useCustomDomain 
                    ? "Tu landing page estará disponible en tu dominio personalizado una vez configures los DNS"
                    : "Tu landing page estará disponible en esta URL una vez publicada"}
                </p>
              </div>

              {settings.isPrivate && (
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <div className="flex-1">
                    <Label className="text-black">Acceso Privado</Label>
                    <div className="text-sm text-gray-600">
                      Protegido con contraseña
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <Label className="text-black">Compartir en redes sociales</Label>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(publicUrl)}&text=${encodeURIComponent('¡Mira mi landing page creada con Lander!')}`, '_blank')}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`, '_blank')}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}`, '_blank')}
                  >
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="text-black">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-black">Acceso Privado</Label>
                  <div className="text-sm text-gray-600">
                    Restringe el acceso a tu landing page
                  </div>
                </div>
                <Switch
                  checked={settings.isPrivate}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, isPrivate: checked }))}
                />
              </div>

              {settings.isPrivate && (
                <div className="space-y-2">
                  <Label className="text-black">Contraseña</Label>
                  <Input
                    type="password"
                    value={settings.password}
                    onChange={(e) => setSettings(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Ingresa una contraseña"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-black">Dominio Personalizado</Label>
                  <div className="text-sm text-gray-600">
                    Usa tu propio dominio en lugar de una URL de Lander
                  </div>
                </div>
                <Switch
                  checked={settings.useCustomDomain}
                  onCheckedChange={(checked) => setSettings(prev => ({ 
                    ...prev, 
                    useCustomDomain: checked,
                    customDomain: checked ? prev.customDomain : "" 
                  }))}
                />
              </div>

              {settings.useCustomDomain && (
                <div className="space-y-2">
                  <Label className="text-black">Tu Dominio</Label>
                  <Input
                    value={settings.customDomain}
                    onChange={(e) => setSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                    placeholder="ejemplo.com"
                    className="text-black placeholder:text-gray-400"
                  />
                  <p className="text-sm text-gray-600">
                    Asegúrate de configurar los registros DNS de tu dominio para apuntar a nuestros servidores
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-black">Fecha de Expiración</Label>
                <Input
                  type="datetime-local"
                  value={settings.expirationDate}
                  onChange={(e) => setSettings(prev => ({ ...prev, expirationDate: e.target.value }))}
                  min={new Date().toISOString().slice(0, 16)}
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black">Título SEO</Label>
                <Input
                  value={settings.seoTitle}
                  onChange={(e) => setSettings(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="Título para motores de búsqueda"
                  className="text-black placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black">Descripción SEO</Label>
                <Input
                  value={settings.seoDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Descripción para motores de búsqueda"
                  className="text-black placeholder:text-gray-400"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? (
              <>
                <Spinner className="mr-2" />
                Publicando...
              </>
            ) : (
              'Publicar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
