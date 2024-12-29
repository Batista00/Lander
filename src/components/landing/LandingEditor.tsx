import { useLocation } from 'react-router-dom';
import type { BusinessContext } from '@/services/ai/types';

interface LocationState {
  templateId: string;
  context: BusinessContext;
}

export const LandingEditor = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Editor de Landing Page</h1>
        {state?.templateId ? (
          <div>
            <p>Template ID: {state.templateId}</p>
            <p>Industria: {state.context.industry}</p>
            <p>Objetivos: {state.context.goals.join(', ')}</p>
          </div>
        ) : (
          <p>No se ha seleccionado una plantilla</p>
        )}
      </div>
    </div>
  );
};
