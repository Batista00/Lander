import { nanoid } from 'nanoid';

export interface Command {
  id: string;
  name: string;
  description: string;
  shortcut?: string;
  category: 'file' | 'edit' | 'view' | 'help';
  execute: () => void;
}

export class CommandRegistry {
  private commands: Map<string, Command> = new Map();

  register(command: Command) {
    this.commands.set(command.id, command);
  }

  execute(commandId: string) {
    const command = this.commands.get(commandId);
    if (command) {
      command.execute();
    }
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  getCommandsByCategory(category: string): Command[] {
    return this.getCommands().filter(cmd => cmd.category === category);
  }
}

export const createEditorCommands = (editor: any) => {
  const registry = new CommandRegistry();

  // Comandos de archivo
  registry.register({
    id: nanoid(),
    name: 'Nuevo',
    description: 'Crear nueva página',
    shortcut: 'Ctrl+N',
    category: 'file',
    execute: () => editor.createNew()
  });

  registry.register({
    id: nanoid(),
    name: 'Guardar',
    description: 'Guardar cambios',
    shortcut: 'Ctrl+S',
    category: 'file',
    execute: () => editor.save()
  });

  // Comandos de edición
  registry.register({
    id: nanoid(),
    name: 'Deshacer',
    description: 'Deshacer último cambio',
    shortcut: 'Ctrl+Z',
    category: 'edit',
    execute: () => editor.undo()
  });

  registry.register({
    id: nanoid(),
    name: 'Rehacer',
    description: 'Rehacer último cambio',
    shortcut: 'Ctrl+Y',
    category: 'edit',
    execute: () => editor.redo()
  });

  // Comandos de vista
  registry.register({
    id: nanoid(),
    name: 'Vista previa',
    description: 'Alternar vista previa',
    shortcut: 'Ctrl+P',
    category: 'view',
    execute: () => editor.togglePreview()
  });

  registry.register({
    id: nanoid(),
    name: 'Pantalla completa',
    description: 'Alternar pantalla completa',
    shortcut: 'F11',
    category: 'view',
    execute: () => editor.toggleFullscreen()
  });

  return registry;
};
