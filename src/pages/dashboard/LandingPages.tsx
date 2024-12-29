import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Plus,
  Settings,
  Trash2,
  Eye,
  Rocket,
  Zap,
  Target,
  Users,
  ArrowRight,
  PlayCircle,
  ChevronRight,
  Star,
  Edit,
  Copy
} from 'lucide-react';
import { PageBuilder } from '@/components/page-builder/PageBuilder';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLandingStore } from '@/store/landingStore';
import { useAuthStore } from '@/store/auth';
import type { Landing } from '@/store/landingStore';
import { landingPageService } from '@/services/landingPageService';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Tutorial steps
const tutorialSteps = [
  {
    title: "Bienvenido a Mis Landing Pages",
    description: "Aquí podrás crear y gestionar tus páginas de aterrizaje profesionales.",
    icon: Rocket,
    action: "¡Comencemos!"
  },
  {
    title: "Asistente Inteligente",
    description: "Nuestro asistente te guiará en la creación de landing pages efectivas.",
    icon: Zap,
    action: "Siguiente"
  },
  {
    title: "Personalización Total",
    description: "Personaliza cada aspecto para maximizar tus conversiones.",
    icon: Target,
    action: "Crear mi Primera Landing"
  }
];

export function LandingPages() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [isBuilding, setIsBuilding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [landingToDelete, setLandingToDelete] = useState<Landing | null>(null);
  const [showNewLandingDialog, setShowNewLandingDialog] = useState(false);
  const [newLandingName, setNewLandingName] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const { landings = [], removeLanding, addLanding, currentLanding, loadLandings } = useLandingStore();

  useEffect(() => {
    loadLandings();
  }, [loadLandings]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDelete = async (landing: Landing) => {
    setLandingToDelete(landing);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!landingToDelete) return;

    try {
      await landingPageService.deleteLandingPage(landingToDelete.id);
      removeLanding(landingToDelete.id);
      toast.success("La landing page se ha eliminado correctamente");
    } catch (error) {
      console.error('Error deleting landing:', error);
      toast.error("No se pudo eliminar la landing page");
    } finally {
      setDeleteDialogOpen(false);
      setLandingToDelete(null);
    }
  };

  const handleDuplicate = async (landing: Landing) => {
    if (landings.length >= 3) {
      toast.error("Has alcanzado el límite de 3 landing pages");
      return;
    }

    try {
      const duplicatedLanding = await landingPageService.duplicateLandingPage(landing.id);
      await loadLandings();
      toast.success("La landing page se ha duplicado correctamente");
    } catch (error) {
      console.error('Error duplicating landing:', error);
      toast.error("No se pudo duplicar la landing page");
    }
  };

  const filteredLandings = landings.filter(landing => 
    landing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    if (landings.length >= 3) {
      toast.error("Has alcanzado el límite de 3 landing pages");
      return;
    }
    setShowNewLandingDialog(true);
  };

  const handleCreateLanding = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (user.subscription?.plan === 'free' && landings.length >= 1) {
      toast.error("Tu plan gratuito permite crear solo una landing page. Actualiza tu plan para crear más.");
      setShowNewLandingDialog(false);
      return;
    }

    if (newLandingName.trim()) {
      try {
        const newLanding = await addLanding(newLandingName.trim());
        setNewLandingName('');
        setShowNewLandingDialog(false);
        
        if (newLanding && newLanding.id) {
          await loadLandings();
          navigate(`/dashboard/landing-pages/editor/${newLanding.id}`);
        }
      } catch (error) {
        console.error('Error creating landing:', error);
        toast.error("No se pudo crear la landing page");
      }
    }
  };

  const handleNextTutorialStep = () => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
      setCurrentTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
      handleCreateNew();
    }
  };

  return (
    <div className="p-6">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">Mis Landing Pages</h1>
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
            onClick={handleCreateNew} 
            className="bg-[#00DC8F] hover:bg-[#00DC8F]/90 gap-2"
            disabled={landings.length >= 3}
          >
            Nueva Landing Page
            <Rocket className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tutorial Interactivo */}
      <AnimatePresence>
        {showTutorial && landings.length === 0 && (
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

      {/* Estado Vacío */}
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
                Crea una landing page profesional en minutos con nuestro asistente.
                Sin necesidad de conocimientos técnicos.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={handleCreateNew}
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

          {/* Buscador */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Buscar landing pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md bg-[#1a1a1a] border-[#2a2a2a]"
            />
          </div>

          {/* Grid de Landing Pages */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLandings.map((landing) => (
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
                      onClick={() => navigate(`/dashboard/landing-pages/editor/${landing.id}`)}
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

      {/* Modal de Nueva Landing Page */}
      <Dialog open={showNewLandingDialog} onOpenChange={setShowNewLandingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Landing Page</DialogTitle>
            <DialogDescription>
              Dale un nombre descriptivo a tu nueva landing page.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newLandingName}
            onChange={(e) => setNewLandingName(e.target.value)}
            placeholder="Ej: Landing Page Principal"
            className="bg-[#1a1a1a] border-[#2a2a2a]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewLandingDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateLanding} className="bg-[#00DC8F] hover:bg-[#00DC8F]/90">
              Crear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Eliminación */}
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
    </div>
  );
}