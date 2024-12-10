import React from 'react';
import { Dialog } from '@headlessui/react';
import { Component, useLandingStore } from '../../store/landingStore';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { EditorSection } from './editor/EditorSection';
import { FormField, Input, Select, TextArea } from './editor/FormField';
import { AnimationSection } from './editor/AnimationSection';
import { StyleSection } from './editor/StyleSection';
import { ResponsiveSection } from './editor/ResponsiveSection';
import { MediaSection } from './editor/MediaSection';

const defaultContent = {
  title: '',
  subtitle: '',
  description: '',
  backgroundColor: 'bg-white',
  textColor: 'text-gray-900',
  alignment: 'left',
  padding: 'p-4',
};

export function ComponentEditor() {
  const { selectedComponent, setSelectedComponent, updateComponent } = useLandingStore();
  const [editedContent, setEditedContent] = React.useState(defaultContent);
  const [activeTab, setActiveTab] = React.useState('content');
  const dialogId = React.useId();
  const dialogTitleId = `${dialogId}-title`;
  const dialogDescriptionId = `${dialogId}-description`;

  React.useEffect(() => {
    if (selectedComponent && selectedComponent.content) {
      setEditedContent({
        ...defaultContent,
        ...selectedComponent.content
      });
    } else {
      setEditedContent(defaultContent);
    }
  }, [selectedComponent]);

  const handleClose = () => {
    setSelectedComponent(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!selectedComponent) return;
    
    try {
      // Asegurarnos de que tenemos todos los campos necesarios
      const updatedContent = {
        ...editedContent,
        lastEdited: new Date().toISOString(),
      };

      updateComponent(selectedComponent.id, updatedContent);
      toast.success('Componente actualizado correctamente');
    } catch (error: any) {
      console.error('Error al actualizar componente:', error);
      toast.error(error.message || 'Error al actualizar el componente');
    }
  };

  const tabs = [
    { id: 'content', label: 'Contenido' },
    { id: 'style', label: 'Estilo' },
    { id: 'animation', label: 'Animación' },
    { id: 'responsive', label: 'Responsive' },
    { id: 'media', label: 'Multimedia' },
  ];

  return (
    <Dialog 
      open={Boolean(selectedComponent)} 
      onClose={handleClose} 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={dialogTitleId}
      aria-describedby={dialogDescriptionId}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

        {selectedComponent && (
          <div 
            className="relative mx-auto w-full max-w-2xl rounded-lg bg-white shadow-xl"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <Dialog.Title id={dialogTitleId} className="text-lg font-medium text-gray-900">
                Editar {selectedComponent.type}
              </Dialog.Title>
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                aria-label="Cerrar editor"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Dialog.Description id={dialogDescriptionId} className="sr-only">
              Editor de componente que permite modificar el contenido, estilo, animaciones y configuración responsive del componente seleccionado
            </Dialog.Description>

            <div className="flex h-[600px] overflow-hidden">
              {/* Tabs */}
              <div className="w-48 space-y-1 border-r border-gray-200 bg-gray-50 p-4" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors
                      ${
                        activeTab === tab.id
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div
                  role="tabpanel"
                  id="content-panel"
                  aria-labelledby="content-tab"
                  className={activeTab !== 'content' ? 'hidden' : ''}
                >
                  <div className="space-y-6">
                    {selectedComponent.type === 'heading' && (
                      <>
                        <FormField label="Título" htmlFor="title">
                          <Input
                            id="title"
                            value={editedContent.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Ingresa el título"
                          />
                        </FormField>

                        <FormField label="Subtítulo" htmlFor="subtitle">
                          <Input
                            id="subtitle"
                            value={editedContent.subtitle || ''}
                            onChange={(e) => handleInputChange('subtitle', e.target.value)}
                            placeholder="Ingresa el subtítulo"
                          />
                        </FormField>
                      </>
                    )}

                    {selectedComponent.type === 'text' && (
                      <FormField label="Contenido" htmlFor="description">
                        <TextArea
                          id="description"
                          value={editedContent.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={5}
                          placeholder="Ingresa el contenido"
                        />
                      </FormField>
                    )}

                    <EditorSection title="Apariencia" defaultOpen>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField label="Color de fondo" htmlFor="backgroundColor">
                          <Select
                            id="backgroundColor"
                            value={editedContent.backgroundColor}
                            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                            options={[
                              { value: 'bg-white', label: 'Blanco' },
                              { value: 'bg-gray-50', label: 'Gris claro' },
                              { value: 'bg-gray-100', label: 'Gris' },
                              { value: 'bg-primary', label: 'Principal' },
                              { value: 'bg-primary-light', label: 'Principal claro' },
                            ]}
                          />
                        </FormField>

                        <FormField label="Color de texto" htmlFor="textColor">
                          <Select
                            id="textColor"
                            value={editedContent.textColor}
                            onChange={(e) => handleInputChange('textColor', e.target.value)}
                            options={[
                              { value: 'text-gray-900', label: 'Negro' },
                              { value: 'text-gray-600', label: 'Gris oscuro' },
                              { value: 'text-gray-400', label: 'Gris claro' },
                              { value: 'text-white', label: 'Blanco' },
                            ]}
                          />
                        </FormField>

                        <FormField label="Alineación" htmlFor="alignment">
                          <Select
                            id="alignment"
                            value={editedContent.alignment}
                            onChange={(e) => handleInputChange('alignment', e.target.value)}
                            options={[
                              { value: 'left', label: 'Izquierda' },
                              { value: 'center', label: 'Centro' },
                              { value: 'right', label: 'Derecha' },
                            ]}
                          />
                        </FormField>

                        <FormField label="Espaciado" htmlFor="padding">
                          <Select
                            id="padding"
                            value={editedContent.padding}
                            onChange={(e) => handleInputChange('padding', e.target.value)}
                            options={[
                              { value: 'p-2', label: 'Pequeño' },
                              { value: 'p-4', label: 'Medio' },
                              { value: 'p-6', label: 'Grande' },
                              { value: 'p-8', label: 'Muy grande' },
                            ]}
                          />
                        </FormField>
                      </div>
                    </EditorSection>
                  </div>
                </div>

                <div
                  role="tabpanel"
                  id="style-panel"
                  aria-labelledby="style-tab"
                  className={activeTab !== 'style' ? 'hidden' : ''}
                >
                  <StyleSection content={editedContent} onChange={handleInputChange} />
                </div>

                <div
                  role="tabpanel"
                  id="animation-panel"
                  aria-labelledby="animation-tab"
                  className={activeTab !== 'animation' ? 'hidden' : ''}
                >
                  <AnimationSection content={editedContent} onChange={handleInputChange} />
                </div>

                <div
                  role="tabpanel"
                  id="responsive-panel"
                  aria-labelledby="responsive-tab"
                  className={activeTab !== 'responsive' ? 'hidden' : ''}
                >
                  <ResponsiveSection content={editedContent} onChange={handleInputChange} />
                </div>

                <div
                  role="tabpanel"
                  id="media-panel"
                  aria-labelledby="media-tab"
                  className={activeTab !== 'media' ? 'hidden' : ''}
                >
                  <MediaSection content={editedContent} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={handleClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
