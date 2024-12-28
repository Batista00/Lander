import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LeadFormConfig, LeadFormField } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface FormEditorProps {
  config: LeadFormConfig;
  onChange: (config: LeadFormConfig) => void;
}

export function FormEditor({ config, onChange }: FormEditorProps) {
  const handleFieldChange = (index: number, field: LeadFormField) => {
    const newFields = [...config.fields];
    newFields[index] = field;
    onChange({ ...config, fields: newFields });
  };

  const addField = () => {
    const newField: LeadFormField = {
      id: `field_${config.fields.length + 1}`,
      label: 'Nuevo Campo',
      type: 'text',
      required: false,
    };
    onChange({ ...config, fields: [...config.fields, newField] });
  };

  const removeField = (index: number) => {
    const newFields = config.fields.filter((_, i) => i !== index);
    onChange({ ...config, fields: newFields });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(config.fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange({ ...config, fields: items });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Título del Formulario</Label>
          <Input
            value={config.title}
            onChange={(e) => onChange({ ...config, title: e.target.value })}
            placeholder="Título del formulario"
          />
        </div>
        <div>
          <Label>Texto del Botón</Label>
          <Input
            value={config.submitText}
            onChange={(e) => onChange({ ...config, submitText: e.target.value })}
            placeholder="Texto del botón de envío"
          />
        </div>
      </div>

      <div>
        <Label>Descripción</Label>
        <Textarea
          value={config.description}
          onChange={(e) => onChange({ ...config, description: e.target.value })}
          placeholder="Descripción del formulario"
        />
      </div>

      <div>
        <Label>Mensaje de Éxito</Label>
        <Textarea
          value={config.successMessage}
          onChange={(e) => onChange({ ...config, successMessage: e.target.value })}
          placeholder="Mensaje mostrado después del envío exitoso"
        />
      </div>

      <div>
        <Label>Mensaje de Error</Label>
        <Textarea
          value={config.errorMessage}
          onChange={(e) => onChange({ ...config, errorMessage: e.target.value })}
          placeholder="Mensaje mostrado cuando ocurre un error"
        />
      </div>

      <div>
        <Label>URL de Redirección</Label>
        <Input
          value={config.redirectUrl}
          onChange={(e) => onChange({ ...config, redirectUrl: e.target.value })}
          placeholder="URL para redireccionar después del envío"
        />
      </div>

      <div>
        <Label>Layout</Label>
        <Select
          value={config.layout}
          onValueChange={(value) => onChange({ ...config, layout: value as 'vertical' | 'horizontal' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vertical">Vertical</SelectItem>
            <SelectItem value="horizontal">Horizontal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>Campos del Formulario</Label>
          <Button onClick={addField} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Campo
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {config.fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mb-4"
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-4">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div>
                                <Label>Etiqueta</Label>
                                <Input
                                  value={field.label}
                                  onChange={(e) =>
                                    handleFieldChange(index, { ...field, label: e.target.value })
                                  }
                                  placeholder="Etiqueta del campo"
                                />
                              </div>
                              <div>
                                <Label>Tipo</Label>
                                <Select
                                  value={field.type}
                                  onValueChange={(value) =>
                                    handleFieldChange(index, {
                                      ...field,
                                      type: value as LeadFormField['type'],
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el tipo" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Texto</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="tel">Teléfono</SelectItem>
                                    <SelectItem value="textarea">Área de texto</SelectItem>
                                    <SelectItem value="select">Selección</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                    <SelectItem value="radio">Radio</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Placeholder</Label>
                                <Input
                                  value={field.placeholder || ''}
                                  onChange={(e) =>
                                    handleFieldChange(index, { ...field, placeholder: e.target.value })
                                  }
                                  placeholder="Texto de ayuda"
                                />
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={(checked) =>
                                      handleFieldChange(index, { ...field, required: checked })
                                    }
                                  />
                                  <Label>Requerido</Label>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeField(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
