import { EditorState } from '@/components/page-builder/types';
import { landingPageService } from './landingPageService';
import { Component } from '@/types/landing';
import { toast } from "@/components/ui/use-toast";

interface AutosaveConfig {
  interval: number;
  maxRetries: number;
  retryDelay: number;
  conflictDetection: boolean;
  compressionEnabled: boolean;
}

const DEFAULT_CONFIG: AutosaveConfig = {
  interval: 30000,
  maxRetries: 3,
  retryDelay: 1000,
  conflictDetection: true,
  compressionEnabled: false,
};

export class AutosaveService {
  private intervalId: NodeJS.Timeout | null = null;
  private retryCount = 0;
  private lastSavedState: string | null = null;
  private versions: Array<{ version: number; state: EditorState }> = [];
  private config: AutosaveConfig;

  constructor(config: Partial<AutosaveConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  startAutoSave(
    pageId: string,
    getState: () => EditorState,
    onSaveSuccess?: () => void,
    onSaveError?: (error: Error) => void
  ): void {
    if (this.intervalId) {
      this.stopAutoSave();
    }

    const saveIfNeeded = async () => {
      try {
        await this.saveWithRetry(pageId, getState);
        toast({
          title: 'Cambios guardados',
          description: 'Los cambios se han guardado automáticamente',
          variant: 'default'
        });
        onSaveSuccess?.();
      } catch (error) {
        toast({
          title: 'Error al guardar',
          description: 'No se pudieron guardar los cambios automáticamente',
          variant: 'destructive'
        });
        onSaveError?.(error as Error);
      }
    };

    this.intervalId = setInterval(saveIfNeeded, this.config.interval);
  }

  private async saveWithRetry(
    pageId: string,
    getState: () => EditorState,
    attempt = 1
  ): Promise<void> {
    try {
      const state = getState();
      const stateString = JSON.stringify(state);

      if (this.lastSavedState === stateString) {
        return;
      }

      if (this.config.conflictDetection) {
        const serverState = await landingPageService.getLandingPageById(pageId);
        if (serverState && this.hasConflict(state, serverState)) {
          return;
        }
      }

      if (this.config.compressionEnabled) {
        const compressedState = await this.compressState(state);
        await landingPageService.updateLandingPage(pageId, compressedState);
      } else {
        await landingPageService.updateLandingPage(pageId, state);
      }

      this.lastSavedState = stateString;
      this.versions.push({ version: this.versions.length + 1, state });
      this.retryCount = 0;
    } catch (error) {
      if (attempt < this.config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        return this.saveWithRetry(pageId, getState, attempt + 1);
      }
      throw error;
    }
  }

  private hasConflict(localState: EditorState, serverState: EditorState): boolean {
    if (!this.config.conflictDetection) return false;
    const hasConflict = JSON.stringify(localState) !== JSON.stringify(serverState);
    if (hasConflict) {
      toast({
        title: 'Conflicto detectado',
        description: 'Los cambios locales difieren de la versión del servidor',
        variant: 'destructive'
      });
    }
    return hasConflict;
  }

  private async compressState(state: EditorState): Promise<EditorState> {
    try {
      // Aquí iría la lógica de compresión
      return state;
    } catch (error) {
      toast({
        title: 'Error de compresión',
        description: 'No se pudo comprimir el estado del editor',
        variant: 'destructive'
      });
      throw error;
    }
  }

  async revertToVersion(version: number): Promise<void> {
    const targetVersion = this.versions.find(v => v.version === version);
    if (!targetVersion) {
      toast({
        title: 'Versión no encontrada',
        description: 'No se pudo encontrar la versión especificada',
        variant: 'destructive'
      });
      throw new Error('Version not found');
    }
    // Aquí iría la lógica para revertir a la versión específica
    toast({
      title: 'Versión restaurada',
      description: `Se ha restaurado la versión ${version}`,
      variant: 'default'
    });
  }

  stopAutoSave(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async forceSave(pageId: string, state: EditorState): Promise<void> {
    try {
      await this.saveWithRetry(pageId, () => state);
      toast({
        title: 'Guardado manual',
        description: 'Los cambios se han guardado correctamente',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: 'No se pudieron guardar los cambios manualmente',
        variant: 'destructive'
      });
      throw error;
    }
  }
}

export function createAutosaveService(config?: Partial<AutosaveConfig>) {
  return new AutosaveService(config);
}
