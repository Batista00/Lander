import { useState, memo, useCallback, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Component, ComponentType } from '@/types/components';
import { EditorToolbar } from './EditorToolbar';
import { SortableComponent } from './components/SortableComponent';
import { ComponentRenderer } from './components/ComponentRenderer';
import { AddComponentDialog } from './dialogs/AddComponentDialog';
import { EditComponentDialog } from './dialogs/EditComponentDialog';
import { PublishDialog } from './dialogs/PublishDialog';
import { cn } from '@/lib/utils';

interface EditorProps {
  components: Component[];
  onSave: (components: Component[]) => void;
  onAddComponent: (type: ComponentType) => void;
  onDeleteComponent: (id: string) => void;
  onEditComponent: (component: Component) => void;
  onUpdateComponent: (component: Component) => void;
  onPublish?: () => void;
  isPremiumUser?: boolean;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
}

const MemoizedSortableComponent = memo(({ 
  component, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onEdit, 
  isFirst, 
  isLast, 
  deviceType 
}: {
  component: Component;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  isFirst: boolean;
  isLast: boolean;
  deviceType: 'desktop' | 'tablet' | 'mobile';
}) => {
  const handleDelete = useCallback(() => {
    onDelete(component.id);
  }, [component.id, onDelete]);

  return (
    <SortableComponent
      component={component}
      onDelete={handleDelete}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onEdit={onEdit}
      isFirst={isFirst}
      isLast={isLast}
      deviceType={deviceType}
    />
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.component) === JSON.stringify(nextProps.component);
});

export const Editor = memo(({ 
  components,
  onSave,
  onAddComponent,
  onDeleteComponent,
  onEditComponent,
  onUpdateComponent,
  onPublish,
  isPremiumUser = false,
  isSaving = false,
  hasUnsavedChanges = false
}: EditorProps) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDragging, setIsDragging] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleMoveComponent = useCallback((id: string, direction: 'up' | 'down') => {
    const currentIndex = components.findIndex(comp => comp.id === id);
    if (currentIndex === -1) return;

    const newComponents = [...components];
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < newComponents.length) {
      [newComponents[currentIndex], newComponents[newIndex]] = [newComponents[newIndex], newComponents[currentIndex]];
      onSave(newComponents);
    }
  }, [components, onSave]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex(c => c.id === active.id);
      const newIndex = components.findIndex(c => c.id === over.id);
      const newComponents = arrayMove(components, oldIndex, newIndex);
      onSave(newComponents);
    }
  }, [components, onSave]);

  const getDeviceWidth = useCallback(() => {
    switch (device) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  }, [device]);

  const handleComponentEdit = useCallback((component: Component) => {
    setSelectedComponent(component);
    setShowEditDialog(true);
  }, []);

  const handleComponentUpdate = useCallback((updatedComponent: Component) => {
    onUpdateComponent(updatedComponent);
    setShowEditDialog(false);
  }, [onUpdateComponent]);

  const handleAddComponentClick = useCallback((type: ComponentType) => {
    onAddComponent(type);
    setShowAddDialog(false);
  }, [onAddComponent]);

  const togglePreview = useCallback(() => {
    setIsPreview(!isPreview);
  }, [isPreview]);

  const handleSave = useCallback(() => {
    onSave(components);
  }, [components, onSave]);

  const memoizedComponents = useMemo(() => 
    components.map((component, index) => (
      <MemoizedSortableComponent
        key={component.id}
        component={component}
        onDelete={onDeleteComponent}
        onMoveUp={() => handleMoveComponent(component.id, 'up')}
        onMoveDown={() => handleMoveComponent(component.id, 'down')}
        onEdit={() => handleComponentEdit(component)}
        isFirst={index === 0}
        isLast={index === components.length - 1}
        deviceType={device}
      />
    )),
    [components, onDeleteComponent, handleMoveComponent, handleComponentEdit, device]
  );

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar
        onSave={handleSave}
        onPublish={() => setShowPublishDialog(true)}
        device={device}
        onDeviceChange={setDevice}
        isSaving={isSaving}
        lastSaved={undefined}
        isPreview={isPreview}
        onTogglePreview={togglePreview}
      />

      <div className={cn(
        'flex-1 overflow-y-auto transition-all duration-300 mx-auto w-full',
        getDeviceWidth(),
        isDragging && 'opacity-50'
      )}>
        {isPreview ? (
          <div className="space-y-4 p-4">
            {components.map((component) => (
              <ComponentRenderer
                key={component.id}
                component={component}
                mode="preview"
              />
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4 p-4">
                {memoizedComponents}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <AddComponentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSelect={onAddComponent}
        isPremiumUser={isPremiumUser}
      />

      {selectedComponent && (
        <EditComponentDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          component={selectedComponent}
          onUpdate={handleComponentUpdate}
        />
      )}

      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        onPublish={onPublish}
      />
    </div>
  );
});