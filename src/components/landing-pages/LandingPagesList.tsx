import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, LayoutGrid, List, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanStore } from '@/store/planStore';
import { toast } from 'sonner';

type ViewMode = 'grid' | 'list';
type StatusFilter = 'all' | 'active' | 'draft' | 'archived';

export function LandingPagesList() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const { currentPlan, usage, isTrialing } = usePlanStore();

  const handleCreateNew = () => {
    if (!currentPlan) return;

    const maxPages = currentPlan.features.landingPages;
    if (maxPages !== -1 && usage.landingPages >= maxPages) {
      toast.error(
        'Has alcanzado el límite de landing pages para tu plan actual',
        {
          description: 'Actualiza tu plan para crear más landing pages',
          action: {
            label: 'Actualizar Plan',
            onClick: () => {/* Implementar navegación a planes */}
          }
        }
      );
      return;
    }

    // Navegar a la página de creación
    window.location.href = '/dashboard/landing-pages/new';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mis Landing Pages</h1>
          <p className="text-gray-500">
            {usage.landingPages} de {currentPlan?.features.landingPages === -1 ? '∞' : currentPlan?.features.landingPages} páginas creadas
          </p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Landing Page
        </Button>
      </div>

      {/* Trial Banner */}
      {isTrialing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-blue-700">
              Estás en período de prueba del plan {currentPlan?.name}
            </p>
            <p className="text-xs text-blue-600">
              Aprovecha todas las características premium durante tu prueba gratuita
            </p>
          </div>
        </div>
      )}

      {/* Filters and View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="draft">Borradores</option>
            <option value="archived">Archivadas</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Landing Pages Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {/* Aquí irá el mapeo de las landing pages */}
        {/* Por ahora es un placeholder */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold">Landing Page de Ejemplo</h3>
          <p className="text-sm text-gray-500">Última edición: hace 2 días</p>
        </div>
      </div>
    </div>
  );
}
