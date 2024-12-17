import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Version {
  id: string;
  timestamp: number;
  components: any[];
  description: string;
}

interface VersionState {
  versions: Record<string, Version[]>; // pageId -> versions[]
  currentVersion: Record<string, string>; // pageId -> versionId
  maxVersions: number;
  addVersion: (pageId: string, components: any[], description: string) => void;
  setCurrentVersion: (pageId: string, versionId: string) => void;
  getVersions: (pageId: string) => Version[];
  getCurrentVersion: (pageId: string) => Version | undefined;
  clearVersions: (pageId: string) => void;
}

export const useVersionStore = create<VersionState>()(
  devtools(
    persist(
      (set, get) => ({
        versions: {},
        currentVersion: {},
        maxVersions: 50, // Mantener máximo 50 versiones por página

        addVersion: (pageId, components, description) => {
          set((state) => {
            const pageVersions = state.versions[pageId] || [];
            const newVersion: Version = {
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              components: JSON.parse(JSON.stringify(components)), // Deep copy
              description
            };

            // Mantener solo las últimas maxVersions versiones
            const updatedVersions = [newVersion, ...pageVersions]
              .slice(0, state.maxVersions);

            return {
              versions: {
                ...state.versions,
                [pageId]: updatedVersions
              },
              currentVersion: {
                ...state.currentVersion,
                [pageId]: newVersion.id
              }
            };
          });
        },

        setCurrentVersion: (pageId, versionId) => {
          set((state) => ({
            currentVersion: {
              ...state.currentVersion,
              [pageId]: versionId
            }
          }));
        },

        getVersions: (pageId) => {
          const state = get();
          return state.versions[pageId] || [];
        },

        getCurrentVersion: (pageId) => {
          const state = get();
          const versionId = state.currentVersion[pageId];
          const versions = state.versions[pageId] || [];
          return versions.find(v => v.id === versionId);
        },

        clearVersions: (pageId) => {
          set((state) => ({
            versions: {
              ...state.versions,
              [pageId]: []
            },
            currentVersion: {
              ...state.currentVersion,
              [pageId]: undefined
            }
          }));
        }
      }),
      {
        name: 'landing-versions'
      }
    )
  )
);
