import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, Fade } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Template } from '../../types/templates';
import { greenGradientButton } from '../../theme/buttons';
import { templateService } from '../../services/templateService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getTemplateImage } from '../../utils/templateImages';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
}

export const TemplatePreviewModal = ({
  isOpen,
  onClose,
  template
}: TemplatePreviewModalProps) => {
  const navigate = useNavigate();

  const handleUseTemplate = async () => {
    try {
      if (template.premium) {
        toast.error('Esta es una plantilla premium. Por favor, adquiérela primero.');
        return;
      }

      // Crear nueva landing page basada en el template
      const newLanding = await templateService.useTemplate(template);
      
      // Redirigir al editor
      navigate(`/dashboard/landing-pages/editor/${newLanding.id}`);
      
      toast.success('¡Template cargado con éxito! Puedes comenzar a personalizarlo.');
      onClose();
    } catch (error) {
      console.error('Error al usar el template:', error);
      toast.error('Hubo un error al cargar el template. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Fade}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6">
          {template.title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'background.paper', p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box
            component="img"
            src={template.image || getTemplateImage(template.category)}
            alt={template.title}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: 1,
              mb: 3
            }}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography color="text.secondary" paragraph>
                {template.description}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Características
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {template.features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        mr: 1
                      }}
                    />
                    <Typography variant="body2">{feature.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Detalles
              </Typography>
              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Categoría
                  </Typography>
                  <Typography variant="body2">
                    {template.category}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Valoración
                  </Typography>
                  <Typography variant="body2">
                    ⭐ {template.rating}/5
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Usos
                  </Typography>
                  <Typography variant="body2">
                    {template.uses}
                  </Typography>
                </Box>
                {template.premium && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Precio
                    </Typography>
                    <Typography variant="body2" color="primary">
                      ${typeof template.price === 'object' ? template.price.sale || template.price.regular : template.price}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Secciones incluidas
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 2 
          }}>
            {template.sections.map((section, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 120,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    mb: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={getTemplateImage(template.category)}
                    alt={section.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Typography variant="subtitle2">
                  {section.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {section.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2, bgcolor: 'background.paper' }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={greenGradientButton}
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          onClick={handleUseTemplate}
          sx={greenGradientButton}
        >
          {template.premium ? 'Comprar Template' : 'Usar Template'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
