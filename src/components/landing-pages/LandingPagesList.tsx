import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPlan } from '@/hooks';
import { Button } from '@/components/ui/button';
import { AIQuickStart } from '@/components/ai/AIQuickStart';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function LandingPagesList() {
  const [showQuickStart, setShowQuickStart] = useState(false);
  const navigate = useNavigate();
  const { plan, loading } = useUserPlan();

  const handleCreateNew = () => {
    if (!plan) return;

    const maxPages = plan.limits.landingPages;
    // TODO: Implementar la lógica para obtener el número actual de páginas
    const currentPages = 0;

    if (maxPages !== -1 && currentPages >= maxPages) {
      toast.error('Has alcanzado el límite de landing pages', {
        description: 'Actualiza tu plan para crear más landing pages'
      });
      return;
    }

    setShowQuickStart(true);
  };

  const handleQuickStartComplete = (templateId: string, context: any) => {
    console.log('QuickStart complete:', { templateId, context });
    setShowQuickStart(false);
    
    // Navegar al editor con los parámetros necesarios
    navigate('/dashboard/landing-pages/editor/new', { 
      state: { 
        templateId, 
        context,
        isNew: true 
      } 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mis Landing Pages</h1>
          <p className="text-gray-500">
            {/* TODO: Implementar la lógica para obtener el número actual de páginas */}
            0 de {plan?.limits?.landingPages === -1 ? '∞' : plan?.limits?.landingPages || 0} páginas creadas
          </p>
        </div>
        <Button onClick={handleCreateNew} variant="default">
          <Plus className="w-4 h-4 mr-2" />
          Crear Landing Page
        </Button>
      </div>

      {showQuickStart && (
        <AIQuickStart
          onComplete={handleQuickStartComplete}
          onClose={() => setShowQuickStart(false)}
        />
      )}
    </div>
  );
}
