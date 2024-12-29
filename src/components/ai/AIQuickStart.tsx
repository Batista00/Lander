import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { BusinessContext, AIRecommendation } from '@/types/landing';
import { aiLandingService } from '@/services/ai-landing-service';

export function AIQuickStart() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businessContext, setBusinessContext] = useState<BusinessContext>({
    businessName: '',
    industry: '',
    description: '',
    goals: [],
    audience: '',
    brand: {
      tone: '',
      values: []
    }
  });
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  const handleIndustrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessContext.industry || !businessContext.businessName || !businessContext.description) {
      toast({
        title: 'Error',
        description: 'Por favor complete todos los campos',
        variant: 'destructive'
      });
      return;
    }
    setStep(2);
  };

  const handleGoalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessContext.goals.length) {
      toast({
        title: 'Error',
        description: 'Por favor agregue al menos un objetivo',
        variant: 'destructive'
      });
      return;
    }
    setStep(3);
  };

  const handleAudienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessContext.audience) {
      toast({
        title: 'Error',
        description: 'Por favor describa su audiencia objetivo',
        variant: 'destructive'
      });
      return;
    }
    setStep(4);
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessContext.brand.tone || !businessContext.brand.values.length) {
      toast({
        title: 'Error',
        description: 'Por favor complete la información de marca',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const recommendations = await aiLandingService.getRecommendations(businessContext);
      setRecommendations(recommendations);
      setStep(5);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError('Error al obtener recomendaciones');
      toast({
        title: 'Error',
        description: 'No se pudieron obtener las recomendaciones',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = async (recommendation: AIRecommendation) => {
    try {
      navigate('/dashboard/landing-pages/editor/new', {
        state: {
          fromQuickStart: true,
          templateId: recommendation.templateId,
          context: businessContext
        }
      });
    } catch (error) {
      console.error('Error navigating to editor:', error);
      toast({
        title: 'Error',
        description: 'No se pudo navegar al editor',
        variant: 'destructive'
      });
    }
  };

  const handleGoalAdd = (goal: string) => {
    if (!goal.trim()) return;
    setBusinessContext(prev => ({
      ...prev,
      goals: [...prev.goals, goal.trim()]
    }));
  };

  const handleGoalRemove = (index: number) => {
    setBusinessContext(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const handleBrandValueAdd = (value: string) => {
    if (!value.trim()) return;
    setBusinessContext(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        values: [...prev.brand.values, value.trim()]
      }
    }));
  };

  const handleBrandValueRemove = (index: number) => {
    setBusinessContext(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        values: prev.brand.values.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        {step === 1 && (
          <form onSubmit={handleIndustrySubmit}>
            <h2 className="text-2xl font-bold mb-4">Información del Negocio</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Nombre del Negocio</Label>
                <Input
                  id="businessName"
                  value={businessContext.businessName}
                  onChange={e => setBusinessContext(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Ej: Mi Empresa"
                />
              </div>
              <div>
                <Label htmlFor="industry">Industria</Label>
                <Input
                  id="industry"
                  value={businessContext.industry}
                  onChange={e => setBusinessContext(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="Ej: Tecnología, Salud, Educación"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={businessContext.description}
                  onChange={e => setBusinessContext(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe brevemente tu negocio..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">Siguiente</Button>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleGoalsSubmit}>
            <h2 className="text-2xl font-bold mb-4">Objetivos del Negocio</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goals">Objetivos</Label>
                <div className="flex gap-2">
                  <Input
                    id="goals"
                    placeholder="Ej: Aumentar ventas, Mejorar visibilidad"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleGoalAdd((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('goals') as HTMLInputElement;
                      handleGoalAdd(input.value);
                      input.value = '';
                    }}
                  >
                    Agregar
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {businessContext.goals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>{goal}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleGoalRemove(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Atrás
                </Button>
                <Button type="submit">Siguiente</Button>
              </div>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleAudienceSubmit}>
            <h2 className="text-2xl font-bold mb-4">Audiencia Objetivo</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="audience">Audiencia</Label>
                <Textarea
                  id="audience"
                  value={businessContext.audience}
                  onChange={e => setBusinessContext(prev => ({ ...prev, audience: e.target.value }))}
                  placeholder="Describe tu audiencia objetivo..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Atrás
                </Button>
                <Button type="submit">Siguiente</Button>
              </div>
            </div>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={handleBrandSubmit}>
            <h2 className="text-2xl font-bold mb-4">Información de Marca</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="brandTone">Tono de Marca</Label>
                <Input
                  id="brandTone"
                  value={businessContext.brand.tone}
                  onChange={e => setBusinessContext(prev => ({
                    ...prev,
                    brand: { ...prev.brand, tone: e.target.value }
                  }))}
                  placeholder="Ej: Profesional, Casual, Amigable"
                />
              </div>
              <div>
                <Label htmlFor="brandValues">Valores de Marca</Label>
                <div className="flex gap-2">
                  <Input
                    id="brandValues"
                    placeholder="Ej: Innovación, Confianza, Calidad"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleBrandValueAdd((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('brandValues') as HTMLInputElement;
                      handleBrandValueAdd(input.value);
                      input.value = '';
                    }}
                  >
                    Agregar
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {businessContext.brand.values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>{value}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBrandValueRemove(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  Atrás
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    'Generar Recomendaciones'
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Plantillas Recomendadas</h2>
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="p-4 border rounded hover:border-primary cursor-pointer"
                  onClick={() => handleTemplateSelect(recommendation)}
                >
                  <h3 className="font-semibold">{recommendation.name}</h3>
                  <p className="text-sm text-gray-600">{recommendation.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Confianza: {Math.round(recommendation.confidence * 100)}%
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setStep(4)}>
                  Atrás
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
