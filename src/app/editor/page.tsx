'use client';

import { useState } from 'react';
import { ComponentRenderer } from '@/components/page-builder/components/ComponentRenderer';
import { ActionButtons } from '@/components/page-builder/components/ActionButtons';
import { Component } from '@/types/landing';
import { useToast } from '@/components/ui/use-toast';

export default function EditorPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const { toast } = useToast();
  const isPremiumUser = false; // Esto debería venir de tu sistema de autenticación

  const handleSave = async () => {
    try {
      // Aquí implementarías la lógica para guardar los cambios
      toast({
        title: 'Cambios guardados',
        description: 'Los cambios se han guardado correctamente.',
      });
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: 'No se pudieron guardar los cambios. Por favor, intenta nuevamente.',
        variant: 'destructive',
      });
    }
  };

  const handlePreview = () => {
    // Aquí implementarías la lógica para mostrar la vista previa
    window.open('/preview', '_blank');
  };

  const handlePublish = async () => {
    try {
      // Aquí implementarías la lógica para publicar los cambios
      toast({
        title: 'Sitio publicado',
        description: 'Tu sitio web ha sido publicado correctamente.',
      });
    } catch (error) {
      toast({
        title: 'Error al publicar',
        description: 'No se pudo publicar el sitio. Por favor, intenta nuevamente.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (componentId: string, field: string, value: any) => {
    setComponents(prevComponents => 
      prevComponents.map(comp => 
        comp.id === componentId 
          ? { ...comp, [field]: value }
          : comp
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        {components.map(component => (
          <ComponentRenderer
            key={component.id}
            component={component}
            isPremiumUser={isPremiumUser}
            onEdit={(field, value) => handleEdit(component.id, field, value)}
          />
        ))}
      </main>

      <ActionButtons
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
        isPremiumUser={isPremiumUser}
      />
    </div>
  );
}
