import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { Trash2, Eye, Globe, Rocket, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function LandingList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [landings, setLandings] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [landingToDelete, setLandingToDelete] = useState<LandingPage | null>(null);
  const maxPages = 3; // Máximo de páginas permitidas

  useEffect(() => {
    loadLandings();
  }, [user]);

  const loadLandings = async () => {
    if (!user) return;
    try {
      const pages = await landingPageService.getLandingPages();
      setLandings(pages);
    } catch (error) {
      console.error('Error loading landings:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las landing pages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (landing: LandingPage) => {
    setLandingToDelete(landing);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!landingToDelete) return;

    try {
      await landingPageService.deleteLandingPage(landingToDelete.id);
      setLandings(prev => prev.filter(l => l.id !== landingToDelete.id));
      toast({
        title: "Landing eliminada",
        description: "La landing page se ha eliminado correctamente"
      });
    } catch (error) {
      console.error('Error deleting landing:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la landing page",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setLandingToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (landings.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Mis Landing Pages
            <span className="ml-2 text-sm font-normal text-gray-500">
              {landings.length} de {maxPages} páginas creadas
            </span>
          </h2>
          <Button onClick={() => navigate('/create')} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Crear Landing Page
          </Button>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 mt-8 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800"
        >
          <Rocket className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">¡Comienza a crear tu primera Landing Page!</h3>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            Crea páginas de aterrizaje profesionales en minutos. Elige entre nuestras plantillas o comienza desde cero.
          </p>
          <Button onClick={() => navigate('/create')} size="lg" className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Crear mi primera Landing Page
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Mis Landing Pages
          <span className="ml-2 text-sm font-normal text-gray-500">
            {landings.length} de {maxPages} páginas creadas
          </span>
        </h2>
        <Button 
          onClick={() => navigate('/create')} 
          className="bg-primary hover:bg-primary/90"
          disabled={landings.length >= maxPages}
        >
          <Plus className="mr-2 h-4 w-4" /> Crear Landing Page
        </Button>
      </div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {landings.map((landing) => (
          <motion.div
            key={landing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{landing.name}</span>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(landing)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar landing page</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-gray-500">
                  Creada: {new Date(landing.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Estado: {landing.status === 'published' ? 'Publicada' : 'Borrador'}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/preview/${landing.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Vista Previa
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver cómo se ve tu landing page</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {landing.status === 'published' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/p/${landing.id}`, '_blank')}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Ver Publicada
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ver tu landing page publicada</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Landing Page</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta landing page? Esta acción no se puede deshacer.
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
