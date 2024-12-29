import { useState } from 'react';
import { Component } from '@/types/landing';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { toast } from '@/components/ui/toast';

export interface EditComponentDialogProps {
  component: Component | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (component: Component) => void;
}

const defaultComponents = {
  hero: {
    content: {
      title: '',
      subtitle: '',
      buttonText: '',
      buttonLink: '',
    },
    styles: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1ce480',
      },
      spacing: {
        padding: '2rem',
        margin: '0',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
    },
  },
  features: {
    content: {
      title: '',
      features: [],
    },
    styles: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1ce480',
      },
      spacing: {
        padding: '2rem',
        margin: '0',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
    },
  },
  content: {
    content: {
      title: '',
      description: '',
    },
    styles: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1ce480',
      },
      spacing: {
        padding: '2rem',
        margin: '0',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
    },
  },
  texto: {
    content: {
      text: '',
    },
    styles: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1ce480',
      },
      spacing: {
        padding: '2rem',
        margin: '0',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
      alignment: 'left',
    },
  },
  boton: {
    content: {
      text: '',
      link: '',
      variant: 'primary',
      size: 'default',
    },
    styles: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1ce480',
      },
      spacing: {
        padding: '2rem',
        margin: '0',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
    },
  },
  imagen: {
    content: {
      src: '',
      alt: '',
      caption: '',
    },
    styles: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#1ce480',
      },
      spacing: {
        padding: '2rem',
        margin: '0',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
    },
  },
};

export const EditComponentDialog: React.FC<EditComponentDialogProps> = ({
  component,
  open,
  onOpenChange,
  onSave,
}) => {
  const [editedComponent, setEditedComponent] = useState<Component | null>(component);
  const [activeTab, setActiveTab] = useState('content');

  if (!component || !editedComponent) return null;

  useEffect(() => {
    setEditedComponent(component);
  }, [component]);

  const handleSave = () => {
    try {
      // Validar campos requeridos según el tipo de componente
      if (editedComponent.type === 'hero') {
        if (!editedComponent.content.title) {
          throw new Error('El título es requerido');
        }
      } else if (editedComponent.type === 'features') {
        if (!editedComponent.content.title || !editedComponent.content.features?.length) {
          throw new Error('El título y al menos una característica son requeridos');
        }
      }

      onSave(editedComponent);
      onOpenChange(false);
      toast.success('Componente actualizado correctamente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al guardar el componente');
    }
  };

  const handleContentChange = (field: string, value: any) => {
    setEditedComponent(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleStyleChange = (category: string, field: string, value: any) => {
    setEditedComponent(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [category]: {
          ...prev.styles[category],
          [field]: value
        }
      }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Editar Componente {editedComponent.type}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Personaliza el contenido y estilo de tu componente
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100">
            <TabsTrigger value="content" className="data-[state=active]:bg-white data-[state=active]:text-black">Contenido</TabsTrigger>
            <TabsTrigger value="styles" className="data-[state=active]:bg-white data-[state=active]:text-black">Estilos</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="text-black">
            {editedComponent.type === 'hero' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-black">Título</Label>
                  <Input
                    value={editedComponent.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="Título principal"
                    required
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Subtítulo</Label>
                  <Textarea
                    value={editedComponent.content.subtitle || ''}
                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                    placeholder="Texto descriptivo"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Texto del botón</Label>
                  <Input
                    value={editedComponent.content.buttonText || ''}
                    onChange={(e) => handleContentChange('buttonText', e.target.value)}
                    placeholder="Texto del botón"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Enlace del botón</Label>
                  <Input
                    value={editedComponent.content.buttonLink || ''}
                    onChange={(e) => handleContentChange('buttonLink', e.target.value)}
                    placeholder="https://..."
                    type="url"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {editedComponent.type === 'features' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-black">Título de la sección</Label>
                  <Input
                    value={editedComponent.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="Título de características"
                    required
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Características</Label>
                  {editedComponent.content.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={feature.title || ''}
                        onChange={(e) => {
                          const newFeatures = [...(editedComponent.content.features || [])];
                          newFeatures[index] = { ...feature, title: e.target.value };
                          handleContentChange('features', newFeatures);
                        }}
                        placeholder="Título de la característica"
                        className="text-black placeholder:text-gray-400"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newFeatures = editedComponent.content.features?.filter((_, i) => i !== index);
                          handleContentChange('features', newFeatures);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      const newFeatures = [...(editedComponent.content.features || []), { title: '', description: '' }];
                      handleContentChange('features', newFeatures);
                    }}
                  >
                    Agregar característica
                  </Button>
                </div>
              </div>
            )}

            {editedComponent.type === 'content' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-black">Título</Label>
                  <Input
                    value={editedComponent.content.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="Título principal"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Contenido</Label>
                  <Textarea
                    value={editedComponent.content.description || ''}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    placeholder="Texto descriptivo"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {editedComponent.type === 'texto' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-black">Texto</Label>
                  <Textarea
                    value={editedComponent.content.text || ""}
                    onChange={(e) => handleContentChange("text", e.target.value)}
                    placeholder="Texto"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {editedComponent.type === 'boton' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-black">Texto del Botón</Label>
                  <Input
                    value={editedComponent.content.text || ''}
                    onChange={(e) => handleContentChange('text', e.target.value)}
                    placeholder="Texto del botón"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Enlace</Label>
                  <Input
                    value={editedComponent.content.link || ''}
                    onChange={(e) => handleContentChange('link', e.target.value)}
                    placeholder="https://..."
                    type="url"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Estilo</Label>
                  <select
                    value={editedComponent.content.variant || 'primary'}
                    onChange={(e) => handleContentChange('variant', e.target.value)}
                  >
                    <option value="primary">Primario</option>
                    <option value="secondary">Secundario</option>
                    <option value="outline">Contorno</option>
                    <option value="ghost">Fantasma</option>
                  </select>
                </div>
                <div>
                  <Label className="text-black">Tamaño</Label>
                  <select
                    value={editedComponent.content.size || 'default'}
                    onChange={(e) => handleContentChange('size', e.target.value)}
                  >
                    <option value="sm">Pequeño</option>
                    <option value="default">Normal</option>
                    <option value="lg">Grande</option>
                  </select>
                </div>
              </div>
            )}

            {editedComponent.type === 'imagen' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-black">URL de la Imagen</Label>
                  <Input
                    value={editedComponent.content.src || ''}
                    onChange={(e) => handleContentChange('src', e.target.value)}
                    placeholder="https://..."
                    type="url"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Texto Alternativo</Label>
                  <Input
                    value={editedComponent.content.alt || ''}
                    onChange={(e) => handleContentChange('alt', e.target.value)}
                    placeholder="Descripción de la imagen"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-black">Pie de Foto</Label>
                  <Input
                    value={editedComponent.content.caption || ''}
                    onChange={(e) => handleContentChange('caption', e.target.value)}
                    placeholder="Pie de foto (opcional)"
                    className="text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="styles" className="text-black">
            <div className="space-y-4">
              <div>
                <Label className="text-black">Colores</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-black">Fondo</Label>
                    <Input
                      type="color"
                      value={editedComponent.styles.colors.background}
                      onChange={(e) => handleStyleChange('colors', 'background', e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black">Texto</Label>
                    <Input
                      type="color"
                      value={editedComponent.styles.colors.text}
                      onChange={(e) => handleStyleChange('colors', 'text', e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black">Acento</Label>
                    <Input
                      type="color"
                      value={editedComponent.styles.colors.accent}
                      onChange={(e) => handleStyleChange('colors', 'accent', e.target.value)}
                      className="text-black"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-black">Espaciado</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-black">Padding</Label>
                    <Input
                      value={editedComponent.styles.spacing.padding}
                      onChange={(e) => handleStyleChange('spacing', 'padding', e.target.value)}
                      placeholder="2rem"
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black">Margin</Label>
                    <Input
                      value={editedComponent.styles.spacing.margin}
                      onChange={(e) => handleStyleChange('spacing', 'margin', e.target.value)}
                      placeholder="0"
                      className="text-black"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-black">Tipografía</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-black">Fuente</Label>
                    <Input
                      value={editedComponent.styles.typography.fontFamily}
                      onChange={(e) => handleStyleChange('typography', 'fontFamily', e.target.value)}
                      placeholder="Inter"
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black">Tamaño</Label>
                    <Input
                      value={editedComponent.styles.typography.fontSize}
                      onChange={(e) => handleStyleChange('typography', 'fontSize', e.target.value)}
                      placeholder="16px"
                      className="text-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
