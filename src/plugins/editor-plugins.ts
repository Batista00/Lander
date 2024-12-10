import { nanoid } from 'nanoid';

export interface EditorPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  initialize: () => void;
  cleanup: () => void;
}

class AnalyticsPlugin implements EditorPlugin {
  id = nanoid();
  name = 'Analytics';
  description = 'Tracking de acciones del editor';
  version = '1.0.0';
  enabled = true;

  initialize() {
    // Implementar tracking
  }

  cleanup() {
    // Limpiar listeners
  }
}

class AutoSavePlugin implements EditorPlugin {
  id = nanoid();
  name = 'AutoSave';
  description = 'Guardado automático de cambios';
  version = '1.0.0';
  enabled = true;

  initialize() {
    // Configurar autosave
  }

  cleanup() {
    // Limpiar intervalos
  }
}

class KeyboardShortcutsPlugin implements EditorPlugin {
  id = nanoid();
  name = 'Keyboard Shortcuts';
  description = 'Atajos de teclado personalizables';
  version = '1.0.0';
  enabled = true;

  initialize() {
    // Registrar atajos
  }

  cleanup() {
    // Remover atajos
  }
}

export const plugins = [
  new AnalyticsPlugin(),
  new AutoSavePlugin(),
  new KeyboardShortcutsPlugin()
];
