import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Edit, Eye, Copy, Rocket, Zap, Target, Users, ArrowRight, PlayCircle, ChevronRight, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { DashboardHead } from '@/components/dashboard/DashboardHead';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

// Tutorial steps
const tutorialSteps = [
  {
    title: "Bienvenido al Creador de Landing Pages",
    description: "Aquí podrás crear páginas de aterrizaje profesionales en minutos usando IA.",
    icon: Rocket,
    action: "¡Comencemos!"
  },
  {
    title: "Asistente de IA",
    description: "Nuestro asistente te guiará paso a paso en la creación de tu landing page perfecta.",
    icon: Zap,
    action: "Siguiente"
  },
  {
    title: "Personalización Total",
    description: "Personaliza cada aspecto de tu página para maximizar las conversiones.",
    icon: Target,
    action: "Crear mi Primera Landing"
  }
];

export default function LandingPages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [landings, setLandings] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [landingToDelete, setLandingToDelete] = useState<LandingPage | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);

  useEffect(() => {
    loadLandings();
  }, [user]);

  const loadLandings = async () => {
    if (!user) return;
    try {
      const pages = await landingPageService.getLandingPages(user.uid);
      setLandings(pages);
      // Mostrar tutorial solo si es nuevo usuario
      setShowTutorial(pages.length === 0);
    } catch (error) {
      console.error('Error loading landings:', error);
      toast.error("No se pudieron cargar las landing pages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (landing: LandingPage) => {
    setLandingToDelete(landing);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!landingToDelete) return;

    try {
      await landingPageService.deleteLandingPage(landingToDelete.id);
      setLandings(prev => prev.filter(l => l.id !== landingToDelete.id));
      toast.success("La landing page se ha eliminado correctamente");
    } catch (error) {
      console.error('Error deleting landing:', error);
      toast.error("No se pudo eliminar la landing page");
    } finally {
      setDeleteDialogOpen(false);
      setLandingToDelete(null);
    }
  };

  const handleDuplicate = async (landing: LandingPage) => {
    if (landings.length >= 3) {
      toast.error("Has alcanzado el límite de 3 landing pages");
      return;
    }

    try {
      const newLanding = await landingPageService.duplicateLandingPage(landing.id);
      setLandings(prev => [...prev, newLanding]);
      toast.success("La landing page se ha duplicado correctamente");
    } catch (error) {
      console.error('Error duplicating landing:', error);
      toast.error("No se pudo duplicar la landing page");
    }
  };

  const handleNextTutorialStep = () => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
      navigate('/dashboard/landing-pages/new');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <>
      <DashboardHead 
        title="Landing Pages"
        description="Gestiona todas tus landing pages, crea nuevas y monitorea su rendimiento."
      />
      <div className="p-6">
        {/* Header con estadísticas */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4">Landing Pages</h1>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#00DC8F]" />
                  <span className="text-gray-300">{landings.length} de 3 páginas creadas</span>
                </div>
                {landings.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#00DC8F]" />
                    <span className="text-gray-300">Tasa de conversión promedio: 2.5%</span>
                  </div>
                )}
              </div>
            </div>
            <Button 
              onClick={() => navigate('/dashboard/landing-pages/new')} 
              className="bg-[#00DC8F] hover:bg-[#00DC8F]/90 gap-2"
              disabled={landings.length >= 3}
            >
              Nueva Landing Page
              <Rocket className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tutorial Interactivo para Nuevos Usuarios */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-none p-6">
                <div className="flex items-start gap-8">
                  <div className="bg-[#00DC8F]/10 p-4 rounded-xl">
                    {tutorialSteps[currentTutorialStep].icon && 
                      <tutorialSteps[currentTutorialStep].icon className="h-8 w-8 text-[#00DC8F]" />
                    }
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {tutorialSteps[currentTutorialStep].title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {tutorialSteps[currentTutorialStep].description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={handleNextTutorialStep}
                        className="bg-[#00DC8F] hover:bg-[#00DC8F]/90 gap-2"
                      >
                        {tutorialSteps[currentTutorialStep].action}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      {currentTutorialStep < tutorialSteps.length - 1 && (
                        <Button 
                          variant="ghost" 
                          onClick={() => setShowTutorial(false)}
                          className="text-gray-400 hover:text-white"
                        >
                          Saltar Tutorial
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Estado Vacío Mejorado */}
        {landings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-none">
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="bg-[#00DC8F]/10 p-4 rounded-full mb-6">
                  <Rocket className="h-12 w-12 text-[#00DC8F]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Comienza tu Primera Landing Page</h2>
                <p className="text-gray-400 text-center max-w-md mb-6">
                  Crea una landing page profesional en minutos con nuestro asistente de IA.
                  Sin necesidad de conocimientos técnicos.
                </p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate('/dashboard/landing-pages/new')}
                    className="bg-[#00DC8F] hover:bg-[#00DC8F]/90 gap-2"
                  >
                    Crear mi Primera Landing
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('/tutorials', '_blank')}
                    className="border-[#00DC8F] text-[#00DC8F] hover:bg-[#00DC8F]/10 gap-2"
                  >
                    Ver Tutorial
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Quick Tips */}
            <div className="mb-8 p-4 bg-[#1a1a1a] rounded-lg flex items-center gap-4">
              <div className="bg-[#00DC8F]/10 p-2 rounded-lg">
                <Star className="h-5 w-5 text-[#00DC8F]" />
              </div>
              <div>
                <p className="text-sm text-white">
                  <span className="font-medium text-[#00DC8F]">Pro Tip:</span> Mantén tu mensaje principal visible en los primeros 5 segundos para aumentar las conversiones.
                </p>
              </div>
            </div>

            {/* Grid de Landing Pages */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {landings.map((landing) => (
                <motion.div
                  key={landing.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1E1E1E] rounded-lg p-4 hover:bg-[#252525] transition-colors"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-white">{landing.name}</h3>
                        <p className="text-[#00DC8F] text-sm">Estado: {landing.status}</p>
                        <p className="text-sm text-gray-400">
                          Actualizado: {new Date(landing.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicate(landing)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-400 hover:bg-blue-950/20"
                        disabled={landings.length >= 3}
                      >
                        <Copy className="h-4 w-4" />
                        Duplicar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(landing)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-400 hover:bg-red-950/20"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-white hover:text-[#00DC8F]"
                        onClick={() => navigate(`/dashboard/landing-pages/${landing.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-white hover:text-[#00DC8F]"
                        onClick={() => window.open(`/preview/${landing.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                        Vista Previa
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar landing page?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. La landing page se eliminará permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
