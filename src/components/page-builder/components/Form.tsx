import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Component } from '@/types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LeadFormConfig, LeadStatus, Lead } from '@/types';
import { useToast } from '@/hooks/useToast';
import { Pencil } from 'lucide-react';
import { FormEditorModal } from './form-editor/FormEditorModal';

interface FormProps {
  component: Component & {
    content: {
      config: LeadFormConfig;
    };
  };
  mode?: 'preview' | 'published' | 'edit';
  onUpdate?: (component: Component) => void;
}

export const Form: React.FC<FormProps> = ({
  component,
  mode = 'preview',
  onUpdate
}) => {
  if (!component?.content?.config) {
    console.error('Form component is missing required config:', component);
    return null;
  }

  const {
    title = 'Contáctanos',
    description = 'Completa el formulario y nos pondremos en contacto contigo.',
    fields = [
      { id: 'name', label: 'Nombre', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'Teléfono', type: 'tel', required: false },
      { id: 'message', label: 'Mensaje', type: 'textarea', required: true }
    ],
    submitText = 'Enviar',
    successMessage = '¡Gracias por contactarnos! Te responderemos pronto.',
    layout = 'vertical',
    redirectUrl,
    notifications,
    tracking,
    workflow,
    tags = []
  } = component.content.config;

  const { toast } = useToast();
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [showEditor, setShowEditor] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'preview') {
      toast({
        title: "Modo vista previa",
        description: "El formulario está en modo vista previa. No se enviarán datos."
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Crear el lead en Firestore
      const lead: Omit<Lead, 'id'> = {
        data: formData,
        status: LeadStatus.New,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        landingPageId: component.landingPageId || '',
        tags: tags || [],
      };

      const docRef = await addDoc(collection(db, 'leads'), lead);
      
      setSubmitted(true);
      toast({
        title: "¡Enviado!",
        description: successMessage
      });

      // Limpiar el formulario
      setFormData({});

      // Redireccionar si hay URL configurada
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast({
        title: "Error",
        description: "Hubo un error al enviar el formulario. Por favor, intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditorSave = (updatedConfig: LeadFormConfig) => {
    if (onUpdate) {
      onUpdate({
        ...component,
        content: {
          config: updatedConfig
        }
      });
    }
    setShowEditor(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {mode === 'edit' && (
        <Button
          variant="outline"
          size="sm"
          className="mb-4"
          onClick={() => setShowEditor(true)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar formulario
        </Button>
      )}

      <form onSubmit={handleSubmit} className={cn(
        'space-y-4',
        layout === 'horizontal' && 'grid grid-cols-2 gap-4'
      )}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        {fields.map((field) => {
          const commonProps = {
            key: field.id,
            id: field.id,
            name: field.id,
            placeholder: field.placeholder,
            required: field.required,
            value: formData[field.id] || '',
            onChange: handleInputChange,
            className: 'w-full'
          };

          return field.type === 'textarea' ? (
            <Textarea {...commonProps} rows={4} />
          ) : (
            <Input {...commonProps} type={field.type} />
          );
        })}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Enviando...' : submitText}
        </Button>
      </form>

      {showEditor && (
        <FormEditorModal
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          onSave={handleEditorSave}
          initialConfig={component.content.config}
        />
      )}
    </div>
  );
};
