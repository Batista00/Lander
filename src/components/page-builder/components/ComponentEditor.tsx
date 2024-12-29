import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Component, ComponentType } from '@/types/landing';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploader } from '@/components/ui/image-uploader';
import { useState } from 'react';

interface Link {
  text: string;
  url: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface FooterLinks {
  company?: Link[];
  services?: Link[];
  legal?: Link[];
  social?: Link[];
}

interface ComponentContent {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  email?: string;
  phone?: string;
  address?: string;
  companyName?: string;
  links?: Link[] | FooterLinks;
  services?: Service[];
}

interface ComponentEditorProps {
  component: Component;
  isPremiumUser: boolean;
  open: boolean;
  onClose: () => void;
  onChange: (field: string, value: any) => void;
}

export function ComponentEditor({ 
  component, 
  isPremiumUser,
  open,
  onClose,
  onChange 
}: ComponentEditorProps) {
  const [activeTab, setActiveTab] = useState('content');

  const canEdit = (field: string): boolean => {
    if (isPremiumUser) return true;
    return component.editableFields?.includes(field) || false;
  };

  const handleContentChange = (field: string, value: any) => {
    if (!canEdit(field)) return;
    onChange('content', {
      ...component.content,
      [field]: value
    });
  };

  const renderTopBarFields = () => {
    const links = (component.content?.links || []) as Link[];
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={component.content?.title || ''}
            onChange={(e) => handleContentChange('title', e.target.value)}
          />
        </div>
        <div>
          <Label>Enlaces</Label>
          {links.map((link: Link, index: number) => (
            <div key={index} className="mt-4 p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Enlace {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newLinks = links.filter((_, i) => i !== index);
                    handleContentChange('links', newLinks);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={link.text}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index] = { ...link, text: e.target.value };
                  handleContentChange('links', newLinks);
                }}
                placeholder="Texto del enlace"
                className="mt-2"
              />
              <Input
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index] = { ...link, url: e.target.value };
                  handleContentChange('links', newLinks);
                }}
                placeholder="URL del enlace"
                className="mt-2"
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="mt-4 w-full bg-gradient-to-r from-[#00E5B0] to-[#00A699] text-white hover:from-[#00A699] hover:to-[#00E5B0]"
            onClick={() => {
              const newLinks = [...links, { text: '', url: '' }];
              handleContentChange('links', newLinks);
            }}
          >
            Agregar Enlace
          </Button>
        </div>
      </div>
    );
  };

  const renderHeroFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Título</Label>
        <Input
          value={component.content?.title || ''}
          onChange={(e) => handleContentChange('title', e.target.value)}
        />
      </div>
      <div>
        <Label>Subtítulo</Label>
        <Input
          value={component.content?.subtitle || ''}
          onChange={(e) => handleContentChange('subtitle', e.target.value)}
        />
      </div>
      <div>
        <Label>Descripción</Label>
        <Textarea
          value={component.content?.description || ''}
          onChange={(e) => handleContentChange('description', e.target.value)}
        />
      </div>
      <div>
        <Label>Texto del Botón Principal</Label>
        <Input
          value={component.content?.primaryButtonText || ''}
          onChange={(e) => handleContentChange('primaryButtonText', e.target.value)}
        />
      </div>
      <div>
        <Label>Texto del Botón Secundario</Label>
        <Input
          value={component.content?.secondaryButtonText || ''}
          onChange={(e) => handleContentChange('secondaryButtonText', e.target.value)}
        />
      </div>
    </div>
  );

  const renderServicesFields = () => {
    const services = (component.content?.services || []) as Service[];
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={component.content?.title || ''}
            onChange={(e) => handleContentChange('title', e.target.value)}
          />
        </div>
        <div>
          <Label>Descripción</Label>
          <Textarea
            value={component.content?.description || ''}
            onChange={(e) => handleContentChange('description', e.target.value)}
          />
        </div>
        <div>
          <Label>Servicios</Label>
          {services.map((service: Service, index: number) => (
            <div key={index} className="mt-4 p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Servicio {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newServices = services.filter((_, i) => i !== index);
                    handleContentChange('services', newServices);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={service.title}
                onChange={(e) => {
                  const newServices = [...services];
                  newServices[index] = { ...service, title: e.target.value };
                  handleContentChange('services', newServices);
                }}
                placeholder="Título del servicio"
                className="mt-2"
              />
              <Textarea
                value={service.description}
                onChange={(e) => {
                  const newServices = [...services];
                  newServices[index] = { ...service, description: e.target.value };
                  handleContentChange('services', newServices);
                }}
                placeholder="Descripción del servicio"
                className="mt-2"
              />
              <Input
                value={service.icon}
                onChange={(e) => {
                  const newServices = [...services];
                  newServices[index] = { ...service, icon: e.target.value };
                  handleContentChange('services', newServices);
                }}
                placeholder="Ícono del servicio"
                className="mt-2"
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="mt-4 w-full bg-gradient-to-r from-[#00E5B0] to-[#00A699] text-white hover:from-[#00A699] hover:to-[#00E5B0]"
            onClick={() => {
              const newServices = [...services, { title: '', description: '', icon: '' }];
              handleContentChange('services', newServices);
            }}
          >
            Agregar Servicio
          </Button>
        </div>
      </div>
    );
  };

  const renderContactFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Título</Label>
        <Input
          value={component.content?.title || ''}
          onChange={(e) => handleContentChange('title', e.target.value)}
        />
      </div>
      <div>
        <Label>Descripción</Label>
        <Textarea
          value={component.content?.description || ''}
          onChange={(e) => handleContentChange('description', e.target.value)}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          value={component.content?.email || ''}
          onChange={(e) => handleContentChange('email', e.target.value)}
          type="email"
        />
      </div>
      <div>
        <Label>Teléfono</Label>
        <Input
          value={component.content?.phone || ''}
          onChange={(e) => handleContentChange('phone', e.target.value)}
          type="tel"
        />
      </div>
      <div>
        <Label>Dirección</Label>
        <Textarea
          value={component.content?.address || ''}
          onChange={(e) => handleContentChange('address', e.target.value)}
        />
      </div>
    </div>
  );

  const renderFooterFields = () => {
    const footerLinks = (component.content?.links || {}) as FooterLinks;
    const sections: (keyof FooterLinks)[] = ['company', 'services', 'legal', 'social'];
    
    return (
      <div className="space-y-4">
        <div>
          <Label>Nombre de la Empresa</Label>
          <Input
            value={component.content?.companyName || ''}
            onChange={(e) => handleContentChange('companyName', e.target.value)}
          />
        </div>
        <div>
          <Label>Descripción</Label>
          <Textarea
            value={component.content?.description || ''}
            onChange={(e) => handleContentChange('description', e.target.value)}
          />
        </div>
        {sections.map((section) => (
          <div key={section}>
            <Label className="capitalize">{section}</Label>
            {(footerLinks[section] || []).map((link: Link, index: number) => (
              <div key={index} className="mt-4 p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Enlace {index + 1}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newLinks = { ...footerLinks };
                      newLinks[section] = (newLinks[section] || []).filter((_, i) => i !== index);
                      handleContentChange('links', newLinks);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={link.text}
                  onChange={(e) => {
                    const newLinks = { ...footerLinks };
                    const sectionLinks = [...(newLinks[section] || [])];
                    sectionLinks[index] = { ...link, text: e.target.value };
                    newLinks[section] = sectionLinks;
                    handleContentChange('links', newLinks);
                  }}
                  placeholder="Texto del enlace"
                  className="mt-2"
                />
                <Input
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = { ...footerLinks };
                    const sectionLinks = [...(newLinks[section] || [])];
                    sectionLinks[index] = { ...link, url: e.target.value };
                    newLinks[section] = sectionLinks;
                    handleContentChange('links', newLinks);
                  }}
                  placeholder="URL del enlace"
                  className="mt-2"
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="mt-4 w-full bg-gradient-to-r from-[#00E5B0] to-[#00A699] text-white hover:from-[#00A699] hover:to-[#00E5B0]"
              onClick={() => {
                const newLinks = { ...footerLinks };
                newLinks[section] = [...(newLinks[section] || []), { text: '', url: '' }];
                handleContentChange('links', newLinks);
              }}
            >
              Agregar Enlace a {section}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderFields = () => {
    switch (component.type) {
      case ComponentType.TOPBAR:
        return renderTopBarFields();
      case ComponentType.HERO:
        return renderHeroFields();
      case ComponentType.SERVICES:
        return renderServicesFields();
      case ComponentType.CONTACT:
        return renderContactFields();
      case ComponentType.FOOTER:
        return renderFooterFields();
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Editor no disponible para el tipo: {component.type}
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Componente</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gradient-to-r from-[#00E5B0] to-[#00A699]">
            <TabsTrigger value="content" className="data-[state=active]:bg-white">Contenido</TabsTrigger>
            {isPremiumUser && (
              <>
                <TabsTrigger value="style" className="data-[state=active]:bg-white">Estilo</TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-white">Configuración</TabsTrigger>
              </>
            )}
          </TabsList>
          <TabsContent value="content" className="space-y-4">
            {renderFields()}
          </TabsContent>
          {isPremiumUser && (
            <>
              <TabsContent value="style" className="space-y-4">
                {/* Aquí irán los controles de estilo */}
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                {/* Aquí irán los controles de configuración */}
              </TabsContent>
            </>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
