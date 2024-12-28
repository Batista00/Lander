import { EditorState, EditorAction, Component } from './types';

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'ADD_COMPONENT':
      const newComponents = [...state.components, action.payload];
      return {
        ...state,
        components: newComponents,
        history: {
          past: [...state.history.past, state.components],
          future: []
        }
      };

    case 'UPDATE_COMPONENT':
      const updatedComponents = state.components.map(component =>
        component.id === action.payload.id ? action.payload : component
      );
      return {
        ...state,
        components: updatedComponents,
        history: {
          past: [...state.history.past, state.components],
          future: []
        }
      };

    case 'DELETE_COMPONENT':
      const filteredComponents = state.components.filter(
        component => component.id !== action.payload
      );
      return {
        ...state,
        components: filteredComponents,
        selectedComponent: null,
        history: {
          past: [...state.history.past, state.components],
          future: []
        }
      };

    case 'REORDER_COMPONENTS':
      const { source, destination } = action.payload;
      const reorderedComponents = Array.from(state.components);
      const [removed] = reorderedComponents.splice(source.index, 1);
      reorderedComponents.splice(destination.index, 0, removed);
      
      return {
        ...state,
        components: reorderedComponents,
        history: {
          past: [...state.history.past, state.components],
          future: []
        }
      };

    case 'SET_SELECTED':
      return {
        ...state,
        selectedComponent: action.payload
      };

    case 'UNDO':
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);
      
      return {
        ...state,
        components: previous,
        history: {
          past: newPast,
          future: [state.components, ...state.history.future]
        }
      };

    case 'REDO':
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      
      return {
        ...state,
        components: next,
        history: {
          past: [...state.history.past, state.components],
          future: newFuture
        }
      };

    case 'TOGGLE_GRID':
      return {
        ...state,
        gridEnabled: !state.gridEnabled
      };

    case 'TOGGLE_GUIDES':
      return {
        ...state,
        showGuides: !state.showGuides
      };

    case 'SET_DEVICE_PREVIEW':
      return {
        ...state,
        devicePreview: action.payload
      };

    default:
      return state;
  }
}
