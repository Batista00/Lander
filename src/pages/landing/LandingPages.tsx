import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { usePlan } from '@/contexts/PlanContext';
import { BusinessContext, LandingPage } from '@/types/landing';
import { landingPageService } from '@/services/landing/LandingPageService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Rocket, Zap, Target, Users, ArrowRight, PlayCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';

// Tutorial steps
const tutorialSteps = [
  {
    title: "Bienvenido al Creador de Landing Pages",
    description: "Aquí podrás crear páginas de aterrizaje profesionales en minutos usando IA.",
    icon: Rocket
  },
  {
    title: "Asistente de IA",
    description: "Nuestro asistente te guiará paso a paso en la creación de tu landing page perfecta.",
    icon: Zap
  },
  {
    title: "Personalización Total",
    description: "Personaliza cada aspecto de tu página para maximizar las conversiones.",
    icon: Target
  }
];

export function LandingPages() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { plan, getRemainingQuota } = usePlan();
  const [loading, setLoading] = useState(true);
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);

  useEffect(() => {
    const loadLandingPages = async () => {
      if (!user?.uid) return;
      
      try {
        setLoading(true);
        const pages = await landingPageService.getLandingPages(user.uid);
        setLandingPages(pages);
        // Mostrar tutorial solo si es la primera vez
        setShowTutorial(pages.length === 0);
      } catch (error) {
        console.error('Error loading landing pages:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las landing pages',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadLandingPages();
  }, [user?.uid]);

  const handleQuickStartClick = () => {
    const remainingPages = getRemainingQuota('landingPages');
    if (remainingPages <= 0) {
      toast({
        title: 'Límite alcanzado',
        description: 'Has alcanzado el límite de landing pages para tu plan actual',
        variant: 'destructive'
      });
      return;
    }

    navigate('/dashboard/landing-pages/editor/new', {
      state: {
        fromQuickStart: true,
        context: {
          businessName: '',
          industry: '',
          description: '',
          goals: [],
          audience: '',
          brand: {
            tone: '',
            values: []
          }
        } as BusinessContext
      }
    });
  };

  const handleEditPage = (page: LandingPage) => {
    navigate(`/dashboard/landing-pages/editor/${page.id}`, {
      state: { landingPage: page }
    });
  };

  const handlePreviewPage = (page: LandingPage) => {
    navigate(`/dashboard/landing-pages/preview/${page.id}`);
  };

  const handleNextTutorialStep = () => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Landing Pages</h1>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{plan && `${landingPages.length} de ${plan.features.landingPages} páginas`}</span>
              </div>
              {landingPages.length > 0 && (
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <span>Tasa de conversión promedio: 2.5%</span>
                </div>
              )}
            </div>
          </div>
          <Button 
            onClick={handleQuickStartClick}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Crear Landing Page
            <Rocket className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tutorial Interactivo */}
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none">
            <CardContent className="p-8">
              <div className="flex items-start gap-8">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  {React.createElement(tutorialSteps[currentTutorialStep].icon, {
                    className: "h-8 w-8 text-blue-600"
                  })}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {tutorialSteps[currentTutorialStep].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tutorialSteps[currentTutorialStep].description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Button onClick={handleQuickStartClick} className="gap-2">
                      Comenzar Ahora
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={handleNextTutorialStep}>
                      {currentTutorialStep < tutorialSteps.length - 1 ? 'Siguiente Tip' : 'Finalizar Tutorial'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : landingPages.length === 0 ? (
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-none">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="bg-white p-4 rounded-full shadow-sm mb-6">
              <Rocket className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl mb-4">Comienza tu Primera Landing Page</CardTitle>
            <CardDescription className="text-center max-w-md mb-6">
              Crea una landing page profesional en minutos con nuestro asistente de IA.
              Sin necesidad de conocimientos técnicos.
            </CardDescription>
            <div className="flex gap-4">
              <Button onClick={handleQuickStartClick} className="gap-2">
                Crear mi Primera Landing
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => window.open('/tutorials', '_blank')} className="gap-2">
                Ver Tutorial
                <PlayCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Quick Tips */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg flex items-center gap-4">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-600">
              <span className="font-medium">Pro Tip:</span> Mantén tu mensaje principal visible en los primeros 5 segundos para aumentar las conversiones.
            </p>
          </div>

          {/* Grid de Landing Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((page) => (
              <Card key={page.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{page.name}</CardTitle>
                  <CardDescription>
                    {page.businessContext.industry} • {format(new Date(page.createdAt), 'PP', { locale: es })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {page.businessContext.description}
                  </p>
                  <div className="mt-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      page.status === 'draft' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {page.status === 'draft' ? 'Borrador' : 'Publicada'}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 mt-auto">
                  <Button variant="outline" onClick={() => handlePreviewPage(page)}>
                    Vista previa
                  </Button>
                  <Button onClick={() => handleEditPage(page)}>
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
