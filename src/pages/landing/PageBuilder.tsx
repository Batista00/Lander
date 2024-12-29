import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';
import { landingPageService } from '@/services/landing/LandingPageService';
import { aiLandingService } from '@/services/ai-landing-service';
import { BusinessContext, AIComponent, LandingPage, GlobalStyles } from '@/types/landing';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons'; // Corregido la importación de Icons
import { Section } from '@/components/landing/Section';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ComponentContent {
  title: string;
  description?: string;
  cta?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  benefits?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  style?: {
    background?: string;
    textColor?: string;
    ctaStyle?: {
      background: string;
      color: string;
      hoverEffect: string;
    };
  };
}

export function PageBuilder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tokens, spendTokens } = useTokens();
  
  const [components, setComponents] = useState<AIComponent[]>([]);
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
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>({
    fontFamily: 'Inter, sans-serif',
    accentColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    spacing: {
      section: '4rem',
      element: '1.5rem'
    }
  });
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as { 
      fromQuickStart?: boolean;
      templateId?: string; 
      context?: BusinessContext; 
      landingPage?: LandingPage 
    };
    
    if (state?.landingPage) {
      const { components: pageComponents, businessContext: context, globalStyles: styles } = state.landingPage;
      setComponents(pageComponents);
      setBusinessContext(context);
      setGlobalStyles(styles || globalStyles);
    } else if (state?.fromQuickStart && state?.templateId && state?.context) {
      handleQuickStartComplete(state.templateId, state.context);
    } else {
      toast.error('No se pudo cargar la página');
      navigate('/dashboard/landing-pages');
    }
  }, [location.state]);

  const handleQuickStartComplete = async (templateId: string, context: BusinessContext) => {
    try {
      setGenerating(true);
      setError(null);

      const initialComponents = await aiLandingService.generateInitialComponents(templateId, context);
      setComponents(initialComponents);
      setBusinessContext(context);

      toast.success('Landing page generada exitosamente');
    } catch (error) {
      console.error('Error generating landing page:', error);
      setError('Error al generar la landing page');
      toast.error('No se pudo generar la landing page');
      navigate('/dashboard/landing-pages');
    } finally {
      setGenerating(false);
    }
  };

  const handleUpdateComponent = (updatedComponent: AIComponent) => {
    setComponents(prev => 
      prev.map(c => c.id === updatedComponent.id ? updatedComponent : c)
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      if (!user?.uid) {
        throw new Error('Usuario no autenticado');
      }

      const landingPage: LandingPage = {
        id: crypto.randomUUID(),
        name: businessContext.businessName || 'Nueva Landing Page',
        components,
        businessContext,
        globalStyles,
        status: 'draft',
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await landingPageService.createLandingPage(landingPage);
      toast.success('Landing page guardada exitosamente');
      navigate('/dashboard/landing-pages');

    } catch (error) {
      console.error('Error saving landing page:', error);
      setError('Error al guardar la landing page');
      toast.error('No se pudo guardar la landing page');
    } finally {
      setSaving(false);
    }
  };

  const renderComponent = (component: AIComponent) => {
    const content = component.content as ComponentContent;
    
    const componentStyle = {
      background: content.style?.background || globalStyles.backgroundColor,
      color: content.style?.textColor || globalStyles.textColor,
      padding: globalStyles.spacing.section,
      fontFamily: globalStyles.fontFamily
    };

    const ctaStyle = content.style?.ctaStyle || {
      background: globalStyles.accentColor,
      color: '#ffffff',
      hoverEffect: 'brightness(1.1)'
    };
    
    switch (component.type) {
      case 'hero':
        return (
          <Section
            component={component}
            onUpdate={handleUpdateComponent}
            remainingTokens={tokens.remaining}
          >
            <div className="max-w-4xl mx-auto space-y-4" style={componentStyle}>
              <h2 className="text-4xl font-bold">{content.title}</h2>
              <p className="text-xl">{content.description}</p>
              {content.cta && (
                <Button 
                  size="lg"
                  style={{
                    background: ctaStyle.background,
                    color: ctaStyle.color,
                    transition: 'all 0.2s',
                    ':hover': {
                      filter: ctaStyle.hoverEffect
                    }
                  }}
                >
                  {content.cta}
                </Button>
              )}
            </div>
          </Section>
        );

      case 'features':
        return (
          <Section
            component={component}
            onUpdate={handleUpdateComponent}
            remainingTokens={tokens.remaining}
          >
            <div className="max-w-6xl mx-auto space-y-8" style={componentStyle}>
              <h2 className="text-3xl font-bold text-center">{content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.features?.map((feature, index) => {
                  const Icon = Icons[feature.icon as keyof typeof Icons] || Icons.Circle;
                  return (
                    <div 
                      key={index} 
                      className="space-y-4 p-6 rounded-lg"
                      style={{
                        background: content.style?.cardBackground || 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <Icon 
                        className="w-8 h-8"
                        style={{ color: content.style?.iconColor || globalStyles.accentColor }}
                      />
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>
        );

      case 'benefits':
        return (
          <Section
            component={component}
            onUpdate={handleUpdateComponent}
            remainingTokens={tokens.remaining}
          >
            <div className="max-w-6xl mx-auto space-y-8" style={componentStyle}>
              <h2 className="text-3xl font-bold text-center">{content.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.benefits?.map((benefit, index) => {
                  const Icon = Icons[benefit.icon as keyof typeof Icons] || Icons.Circle;
                  return (
                    <div key={index} className="flex space-x-4">
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ 
                          background: content.style?.iconBackground || globalStyles.accentColor,
                          color: content.style?.iconColor || '#ffffff'
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{benefit.title}</h3>
                        <p>{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>
        );

      case 'cta':
        return (
          <Section
            component={component}
            onUpdate={handleUpdateComponent}
            remainingTokens={tokens.remaining}
          >
            <div className="text-center max-w-4xl mx-auto space-y-4" style={componentStyle}>
              <h2 className="text-3xl font-bold">{content.title}</h2>
              {content.description && <p className="text-xl">{content.description}</p>}
              {content.cta && (
                <Button 
                  size="lg"
                  style={{
                    background: ctaStyle.background,
                    color: ctaStyle.color,
                    transition: 'all 0.2s',
                    ':hover': {
                      filter: ctaStyle.hoverEffect
                    }
                  }}
                >
                  {content.cta}
                </Button>
              )}
            </div>
          </Section>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Necesitas iniciar sesión</h2>
          <Button onClick={() => navigate('/login')}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-lg">Generando landing page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: globalStyles.backgroundColor, color: globalStyles.textColor }}>
      {/* Barra de herramientas */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard/landing-pages')}>
              Volver
            </Button>
            <h1 className="text-xl font-bold">
              {businessContext.businessName || 'Nueva Landing Page'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Tokens disponibles: {tokens.remaining}
            </div>
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor de componentes */}
      <div className="max-w-7xl mx-auto py-8">
        {components.map(component => (
          <div key={component.id} className="mb-8">
            {renderComponent(component)}
          </div>
        ))}
      </div>
    </div>
  );
}
