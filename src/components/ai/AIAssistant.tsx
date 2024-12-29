import React from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export const AIAssistant = () => {
  const {
    state,
    generateSuggestions,
    applySuggestion,
    setBusinessContext
  } = useAIWorkflow();

  const handleAnalyze = async () => {
    if (!state.activeComponent) return;
    await generateSuggestions(state.activeComponent);
  };

  const handleApply = async (suggestionId: string) => {
    await applySuggestion(suggestionId);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">AI Assistant</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBusinessContext(null)}
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>

        {state.loading ? (
          <div className="text-center py-2">
            <span className="text-sm text-muted-foreground">
              Analizando...
            </span>
          </div>
        ) : state.error ? (
          <div className="text-center py-2">
            <span className="text-sm text-red-500">
              {state.error}
            </span>
          </div>
        ) : (
          <>
            {state.suggestions.length > 0 ? (
              <div className="space-y-2">
                {state.suggestions.map((suggestion: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 bg-muted rounded-lg"
                  >
                    <p className="text-sm mb-2">{suggestion.content}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApply(suggestion.id)}
                    >
                      Aplicar
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2">
                <span className="text-sm text-muted-foreground">
                  No hay sugerencias disponibles
                </span>
              </div>
            )}

            {state.activeComponent && (
              <Button
                className="w-full mt-4"
                onClick={handleAnalyze}
                variant="outline"
              >
                Analizar Componente
              </Button>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
