import React from 'react';
import { useLandingStore } from '@/store/landingStore';
import { Clock, Save, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const ChangeViewer: React.FC = () => {
  const { components, hasUnsavedChanges, handleSave } = useLandingStore();

  return (
    <div className="fixed bottom-0 right-0 m-4 w-80 rounded-lg bg-white shadow-lg">
      <div className="border-b p-4">
        <h3 className="flex items-center text-lg font-semibold">
          <Clock className="mr-2 h-5 w-5" />
          Cambios Recientes
        </h3>
      </div>

      <div className="max-h-80 overflow-y-auto p-4">
        {hasUnsavedChanges ? (
          <div className="space-y-4">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Eye className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Cambios sin guardar
                  </h3>
                  <div className="mt-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center rounded-md bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-200"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {components.map((component, index) => (
                <div
                  key={component.id}
                  className="flex items-center rounded-md border border-gray-200 p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(), "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                    </p>
                  </div>
                  <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No hay cambios sin guardar</p>
          </div>
        )}
      </div>
    </div>
  );
};
