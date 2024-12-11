import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layout, Grid, Sparkles, Crown, Lock, Globe, Save, Image, Type, Phone } from 'lucide-react';

// Interfaces base para todos los componentes
export interface BaseComponentProps {
  id: string;
  type: string;
  isEditable?: boolean;
  isPremium?: boolean;
  style?: React.CSSProperties;
}

export interface BaseContentProps {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  maxWidth?: string;
  alignment?: 'left' | 'center' | 'right';
}

// Interfaces para cada tipo de componente
export interface HeroProps extends BaseComponentProps {
  content: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    buttonText?: string;
    buttonLink?: string;
    buttonStyle?: 'primary' | 'secondary' | 'outline';
    overlayColor?: string;
    overlayOpacity?: number;
    height?: string;
    layout?: 'center' | 'left' | 'right';
  } & BaseContentProps;
}

export interface ServicesProps extends BaseComponentProps {
  content: {
    title: string;
    subtitle?: string;
    services: Array<{
      id: string;
      icon?: string;
      title: string;
      description: string;
      link?: string;
    }>;
    columns?: 2 | 3 | 4;
    style?: 'cards' | 'minimal' | 'bordered';
  } & BaseContentProps;
}

export interface AboutProps extends BaseComponentProps {
  content: {
    title: string;
    description: string;
    image?: string;
    imagePosition?: 'left' | 'right';
    statistics?: Array<{
      value: string;
      label: string;
    }>;
    features?: Array<{
      icon?: string;
      text: string;
    }>;
  } & BaseContentProps;
}

export interface ContactProps extends BaseComponentProps {
  content: {
    title: string;
    subtitle?: string;
    email?: string;
    phone?: string;
    address?: string;
    formFields: Array<{
      type: 'text' | 'email' | 'phone' | 'textarea';
      label: string;
      required?: boolean;
    }>;
    submitButtonText?: string;
    showMap?: boolean;
    mapLocation?: {
      lat: number;
      lng: number;
    };
  } & BaseContentProps;
}

export interface TestimonialsProps extends BaseComponentProps {
  content: {
    title: string;
    subtitle?: string;
    testimonials: Array<{
      id: string;
      text: string;
      author: string;
      role?: string;
      image?: string;
      rating?: number;
    }>;
    style?: 'cards' | 'carousel' | 'grid';
    autoplay?: boolean;
  } & BaseContentProps;
}

export interface GalleryProps extends BaseComponentProps {
  content: {
    title?: string;
    subtitle?: string;
    images: Array<{
      id: string;
      url: string;
      alt?: string;
      caption?: string;
    }>;
    layout?: 'grid' | 'masonry' | 'carousel';
    columns?: 2 | 3 | 4;
    gap?: string;
    aspectRatio?: string;
  } & BaseContentProps;
}

export interface CTAProps extends BaseComponentProps {
  content: {
    title: string;
    description?: string;
    buttonText: string;
    buttonLink?: string;
    buttonStyle?: 'primary' | 'secondary' | 'outline';
    backgroundImage?: string;
    style?: 'simple' | 'split' | 'full-width';
  } & BaseContentProps;
}

export interface FooterProps extends BaseComponentProps {
  content: {
    logo?: string;
    description?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon?: string;
    }>;
    columns: Array<{
      title: string;
      links: Array<{
        text: string;
        url: string;
      }>;
    }>;
    bottomText?: string;
    style?: 'simple' | 'complex' | 'minimal';
  } & BaseContentProps;
}

// Interfaces para los diálogos
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium?: boolean;
  description?: string;
}

interface AddComponentDialogProps extends DialogProps {
  onAdd: (componentType: string) => void;
}

interface EditComponentDialogProps extends DialogProps {
  component: {
    id: string;
    type: string;
    content: {
      title?: string;
      subtitle?: string;
      description?: string;
      [key: string]: any;
    };
    isEditable?: boolean;
    isPremium?: boolean;
  };
  onSave: (updatedComponent: any) => void;
}

interface PublishDialogProps extends DialogProps {
  onPublish: () => void;
}

// Componente AddComponentDialog
export const AddComponentDialog: React.FC<AddComponentDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  isPremium = false,
  description = "Selecciona un componente para añadir a tu landing page."
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<'basic' | 'premium'>('basic');
  
  const componentCategories = {
    basic: [
      { id: 'hero', name: 'Hero Section', icon: Layout },
      { id: 'services', name: 'Servicios', icon: Grid },
      { id: 'about', name: 'Sobre Nosotros', icon: Type },
      { id: 'gallery', name: 'Galería', icon: Image },
      { id: 'contact', name: 'Contacto', icon: Phone },
      { id: 'cta', name: 'Call to Action', icon: Sparkles },
    ],
    premium: [
      { id: 'testimonials', name: 'Testimonios', icon: Crown, premium: true },
      { id: 'statistics', name: 'Estadísticas', icon: Crown, premium: true },
      { id: 'team', name: 'Equipo', icon: Crown, premium: true },
      { id: 'pricing', name: 'Precios', icon: Crown, premium: true },
      { id: 'blog', name: 'Blog', icon: Crown, premium: true },
      { id: 'faq', name: 'FAQ', icon: Crown, premium: true },
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Componente</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Básicos</TabsTrigger>
            <TabsTrigger value="premium" className="relative">
              Premium
              <Crown className="ml-2 h-4 w-4 text-yellow-500" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="grid grid-cols-2 gap-4">
                {componentCategories.basic.map((component) => (
                  <Button
                    key={component.id}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50"
                    onClick={() => onAdd(component.id)}
                  >
                    <component.icon className="h-8 w-8 text-blue-500" />
                    <span>{component.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="premium">
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="grid grid-cols-2 gap-4">
                {componentCategories.premium.map((component) => (
                  <Button
                    key={component.id}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-purple-50"
                    onClick={() => isPremium ? onAdd(component.id) : null}
                    disabled={!isPremium}
                  >
                    <component.icon className="h-8 w-8 text-purple-500" />
                    <span>{component.name}</span>
                    {!isPremium && (
                      <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export const EditComponentDialog: React.FC<EditComponentDialogProps> = ({
  isOpen,
  onClose,
  component,
  onSave,
  isPremium = false,
  description = "Personaliza las propiedades y el contenido de tu componente."
}) => {
  // Asegurarse de que component no sea null antes de acceder a sus propiedades
  if (!component) {
    return null;
  }

  const { id, type, content } = component;

  const handleImageDelete = (image: string, index: number) => {
    // Implementación de la función
  };

  const handleTestimonialDelete = (testimonial: { id: string; text: string; author: string; role?: string; image?: string; rating?: number }, index: number) => {
    // Implementación de la función
  };

  const handleServiceDelete = (service: { id: string; icon?: string; title: string; description: string; link?: string }, index: number) => {
    // Implementación de la función
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Editar Componente</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="style">Estilo</TabsTrigger>
            <TabsTrigger value="advanced" disabled={!isPremium}>
              Avanzado <Crown className="ml-1 h-3 w-3 text-yellow-500" />
            </TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(80vh-200px)] mt-4">
            <TabsContent value="content" className="space-y-4">
              {component && (
                <div className="space-y-4">
                  {component.type === 'hero' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Subtítulo</Label>
                      <Input defaultValue={component.content.subtitle} />
                      <Label>Descripción</Label>
                      <Input defaultValue={component.content.description} />
                    </>
                  )}
                  {component.type === 'services' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Subtítulo</Label>
                      <Input defaultValue={component.content.subtitle} />
                      <Label>Servicios</Label>
                      {component.content.services.map((service, index) => (
                        <div key={index} className="space-y-2">
                          <Label>Ícono</Label>
                          <Input defaultValue={service.icon} />
                          <Label>Título</Label>
                          <Input defaultValue={service.title} />
                          <Label>Descripción</Label>
                          <Input defaultValue={service.description} />
                          <Button onClick={() => handleServiceDelete(service, index)}>Eliminar</Button>
                        </div>
                      ))}
                    </>
                  )}
                  {component.type === 'about' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Descripción</Label>
                      <Input defaultValue={component.content.description} />
                      <Label>Imagen</Label>
                      <Input defaultValue={component.content.image} />
                      <Button onClick={() => handleImageDelete(component.content.image, 0)}>Eliminar</Button>
                    </>
                  )}
                  {component.type === 'contact' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Subtítulo</Label>
                      <Input defaultValue={component.content.subtitle} />
                      <Label>Email</Label>
                      <Input defaultValue={component.content.email} />
                      <Label>Teléfono</Label>
                      <Input defaultValue={component.content.phone} />
                      <Label>Dirección</Label>
                      <Input defaultValue={component.content.address} />
                    </>
                  )}
                  {component.type === 'testimonials' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Subtítulo</Label>
                      <Input defaultValue={component.content.subtitle} />
                      <Label>Testimonios</Label>
                      {component.content.testimonials.map((testimonial, index) => (
                        <div key={index} className="space-y-2">
                          <Label>Texto</Label>
                          <Input defaultValue={testimonial.text} />
                          <Label>Autor</Label>
                          <Input defaultValue={testimonial.author} />
                          <Button onClick={() => handleTestimonialDelete(testimonial, index)}>Eliminar</Button>
                        </div>
                      ))}
                    </>
                  )}
                  {component.type === 'gallery' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Subtítulo</Label>
                      <Input defaultValue={component.content.subtitle} />
                      <Label>Imágenes</Label>
                      {component.content.images.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <Label>URL</Label>
                          <Input defaultValue={image.url} />
                          <Label>Alt</Label>
                          <Input defaultValue={image.alt} />
                          <Button onClick={() => handleImageDelete(image.url, index)}>Eliminar</Button>
                        </div>
                      ))}
                    </>
                  )}
                  {component.type === 'cta' && (
                    <>
                      <Label>Título</Label>
                      <Input defaultValue={component.content.title} />
                      <Label>Descripción</Label>
                      <Input defaultValue={component.content.description} />
                      <Label>Texto del botón</Label>
                      <Input defaultValue={component.content.buttonText} />
                    </>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div className="space-y-4">
                <Label>Color de fondo</Label>
                <Input type="color" />
                <Label>Espaciado</Label>
                <Input type="range" min="0" max="100" />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              {isPremium ? (
                <div className="space-y-4">
                  <Label>Animaciones</Label>
                  <Input type="select" />
                  <Label>Efectos</Label>
                  <Input type="select" />
                </div>
              ) : (
                <div className="text-center py-8">
                  <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-600">Actualiza a premium para acceder a características avanzadas</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <Label>ID del componente</Label>
                <Input defaultValue={component.id} disabled />
                <Label>Tipo de componente</Label>
                <Input defaultValue={component.type} disabled />
              </div>
            </TabsContent>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={() => onSave(component)}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export const PublishDialog: React.FC<PublishDialogProps> = ({
  isOpen,
  onClose,
  onPublish,
  isPremium = false,
  description = "Configura las opciones de publicación de tu landing page."
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Publicar Landing Page</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>URL de la Landing</Label>
            <Input 
              placeholder="mi-landing-page" 
              disabled={!isPremium}
              className="font-mono"
            />
            {!isPremium && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Personalización de URL disponible en Premium
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Configuración SEO</Label>
            <div className="space-y-2">
              <Input 
                placeholder="Título SEO" 
                disabled={!isPremium}
              />
              <Input 
                placeholder="Descripción SEO" 
                disabled={!isPremium}
              />
            </div>
            {!isPremium && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Configuración SEO disponible en Premium
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onPublish}>
            <Globe className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
