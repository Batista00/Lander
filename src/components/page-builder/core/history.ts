import { Component, EditorState } from '../types';

export interface HistoryState {
  past: EditorState[];
  present: EditorState;
  future: EditorState[];
}

export interface HistoryAction {
  type: 'UNDO' | 'REDO' | 'UPDATE';
  payload?: EditorState;
}

const MAX_HISTORY_LENGTH = 50;

export class EditorHistory {
  private state: HistoryState;

  constructor(initialState: EditorState) {
    this.state = {
      past: [],
      present: initialState,
      future: []
    };
  }

  public canUndo(): boolean {
    return this.state.past.length > 0;
  }

  public canRedo(): boolean {
    return this.state.future.length > 0;
  }

  public undo(): EditorState {
    const { past, present, future } = this.state;
    if (past.length === 0) return present;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    this.state = {
      past: newPast,
      present: previous,
      future: [present, ...future]
    };

    return previous;
  }

  public redo(): EditorState {
    const { past, present, future } = this.state;
    if (future.length === 0) return present;

    const next = future[0];
    const newFuture = future.slice(1);

    this.state = {
      past: [...past, present],
      present: next,
      future: newFuture
    };

    return next;
  }

  public push(newState: EditorState): void {
    const { past, present } = this.state;

    // No guardar si el estado es igual al actual
    if (JSON.stringify(present) === JSON.stringify(newState)) {
      return;
    }

    this.state = {
      past: [...past, present].slice(-MAX_HISTORY_LENGTH),
      present: newState,
      future: []
    };
  }

  public getCurrentState(): EditorState {
    return this.state.present;
  }

  public clear(): void {
    const { present } = this.state;
    this.state = {
      past: [],
      present,
      future: []
    };
  }
}

export const createEditorHistory = (initialState: EditorState): EditorHistory => {
  return new EditorHistory(initialState);
};
