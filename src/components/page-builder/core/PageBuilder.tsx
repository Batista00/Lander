import React, { useReducer, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Plus, Eye, Save, History, Undo, Redo, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { Analytics } from '@/lib/analytics';
import { GridSystem } from '../editor/GridSystem';
import { ComponentList } from '../components/ComponentList';
import { EditorToolbar } from '../components/EditorToolbar';
import { ComponentEditor } from '../components/ComponentEditor';
import { DevicePreview } from '../components/DevicePreview';
import { editorReducer } from './reducer';
import { PageBuilderProps } from './types';
import { PREMIUM_COMPONENTS } from '@/components/premium/registry';

const initialState = {
  components: [],
  selectedComponent: null,
  history: {
    past: [],
    future: []
  },
  gridEnabled: true,
  showGuides: true,
  devicePreview: 'desktop' as const
};

export function PageBuilder({ 
  pageId, 
  initialComponents = [], 
  onSave,
  isPremiumUser = false 
}: PageBuilderProps) {
  const [state, dispatch] = useReducer(editorReducer, {
    ...initialState,
    components: initialComponents
  });

  useEffect(() => {
    Analytics.trackView(pageId);
  }, [pageId]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    dispatch({
      type: 'REORDER_COMPONENTS',
      payload: {
        source: result.source,
        destination: result.destination
      }
    });
  };

  const handleSave = async () => {
    try {
      await onSave?.(state.components);
      Analytics.trackEvent('save_page', { pageId });
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleAddComponent = (type: string) => {
    const component = {
      id: crypto.randomUUID(),
      type,
      content: type.startsWith('premium') 
        ? PREMIUM_COMPONENTS[type].defaultProps
        : {},
      order: state.components.length
    };

    dispatch({
      type: 'ADD_COMPONENT',
      payload: component
    });

    Analytics.trackEvent('add_component', { 
      pageId, 
      componentType: type 
    });
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <ComponentList
          onAdd={handleAddComponent}
          isPremiumUser={isPremiumUser}
        />
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <EditorToolbar
          onUndo={() => dispatch({ type: 'UNDO' })}
          onRedo={() => dispatch({ type: 'REDO' })}
          onToggleGrid={() => dispatch({ type: 'TOGGLE_GRID' })}
          onToggleGuides={() => dispatch({ type: 'TOGGLE_GUIDES' })}
          onSave={handleSave}
          canUndo={state.history.past.length > 0}
          canRedo={state.history.future.length > 0}
          gridEnabled={state.gridEnabled}
          showGuides={state.showGuides}
        />

        {/* Editor Area */}
        <div className="flex-1 overflow-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <GridSystem
              enabled={state.gridEnabled}
              showGuides={state.showGuides}
            >
              <Droppable droppableId="editor">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-full p-4"
                  >
                    <ComponentList
                      components={state.components}
                      selectedId={state.selectedComponent?.id}
                      onSelect={(component) => 
                        dispatch({ 
                          type: 'SET_SELECTED', 
                          payload: component 
                        })
                      }
                      onDelete={(id) => 
                        dispatch({ 
                          type: 'DELETE_COMPONENT', 
                          payload: id 
                        })
                      }
                      isPremiumUser={isPremiumUser}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </GridSystem>
          </DragDropContext>
        </div>
      </div>

      {/* Right Panel */}
      {state.selectedComponent && (
        <div className="w-80 border-l bg-gray-50 p-4">
          <ComponentEditor
            component={state.selectedComponent}
            onChange={(updated) => 
              dispatch({
                type: 'UPDATE_COMPONENT',
                payload: updated
              })
            }
            isPremiumUser={isPremiumUser}
          />
        </div>
      )}

      {/* Device Preview */}
      <DevicePreview
        device={state.devicePreview}
        onDeviceChange={(device) => 
          dispatch({
            type: 'SET_DEVICE_PREVIEW',
            payload: device
          })
        }
        components={state.components}
      />
    </div>
  );
}
