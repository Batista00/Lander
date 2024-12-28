import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Rating,
  useTheme
} from '@mui/material';
import { Template } from '@/types';
import { FavoriteBorder, Favorite, Visibility } from '@mui/icons-material';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { landingPageService } from '../../services/landingPageService';
import { toast } from 'sonner';
import { useTemplates } from '../../contexts/TemplateContext';
import { greenGradientButton } from '../../theme/buttons';
import { trialService } from '@/services/trialService';

// Imágenes por defecto según la categoría
const defaultImages = {
  business: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
  startup: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
  technology: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
  education: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=600',
  health: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600',
  default: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600'
};

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  user?: User | null;
}

export default function TemplateCard({ template, onSelect, user }: TemplateCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const { favorites, toggleFavorite } = useTemplates();
  const [isFavorited, setIsFavorited] = useState(favorites.includes(template.id));

  const isPremium = template.premium;

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorited(!isFavorited);
    toggleFavorite(template.id);
  };

  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

  const getDefaultImage = (category: string) => {
    return defaultImages[category as keyof typeof defaultImages] || defaultImages.default;
  };

  const handleTemplateSelect = () => {
    if (!user) {
      // Si no hay usuario, redirigir al login
      // TODO: Implementar redirección al login
      return;
    }

    if (!template.premium) {
      // Si el template es gratuito, permitir selección directa
      onSelect(template);
      return;
    }

    // Verificar si el usuario tiene trial activo
    if (trialService.isTrialActive(user.id)) {
      onSelect(template);
      return;
    }

    // Verificar si el usuario puede iniciar un trial
    if (trialService.canStartTrial(user.id)) {
      setShowTrialModal(true);
      return;
    }

    // Si no puede iniciar trial, mostrar modal de upgrade
    navigate('/pricing');
    return;
  };

  const startTrial = () => {
    if (user) {
      trialService.startTrial(user.id);
      onSelect(template);
      setShowTrialModal(false);
    }
  };

  const daysRemaining = user ? trialService.getDaysRemaining(user.id) : 0;

  return (
    <>
      <Card 
        sx={{
          maxWidth: 345,
          height: '100%',
          minHeight: 380, 
          maxHeight: 420, 
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: 'background.paper',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="120"
            image={template.image || getDefaultImage(template.category)}
            alt={template.title}
            sx={{
              filter: 'brightness(0.9)',
              transition: 'all 0.3s ease',
              objectFit: 'cover',
              objectPosition: 'center center',
              '&:hover': {
                filter: 'brightness(0.7)',
              }
            }}
          />
          {/* Botón de vista previa centrado */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              }
            }}
            onClick={handlePreviewClick}
          >
            <IconButton
              sx={{
                ...greenGradientButton,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  ...greenGradientButton['&:hover'],
                  opacity: 1
                }
              }}
            >
              <Visibility />
            </IconButton>
          </Box>
          {/* Botón de favoritos */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1
            }}
          >
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                },
              }}
            >
              {isFavorited ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          {isPremium && (
            <Chip
              label="Premium"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: theme.palette.warning.main,
                color: 'white',
                fontWeight: 'bold',
                zIndex: 1
              }}
            />
          )}
          {user && daysRemaining > 0 && (
            <Chip
              label={`Trial: ${daysRemaining}d`}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: theme.palette.success.main,
                color: 'white',
                fontWeight: 'bold',
                zIndex: 1
              }}
            />
          )}
        </Box>

        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden' 
        }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              mb: 1,
              fontSize: '1.1rem', 
              lineHeight: 1.2 
            }}
          >
            {template.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={template.rating} readOnly size="small" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              ({template.downloads} usos)
            </Typography>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.9rem'
            }}
          >
            {template.description}
          </Typography>

          <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleTemplateSelect}
              sx={{
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                py: 1, 
                fontSize: '0.9rem' 
              }}
            >
              {isPremium ? 'Comprar' : 'Usar'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TemplatePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={template}
      />

      {/* Modal de prueba gratuita */}
      {showTrialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">¡Prueba Premium Gratis!</h3>
            <p className="text-gray-600 mb-4">
              Obtén acceso a todos los templates premium durante 14 días sin costo.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowTrialModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={startTrial}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Comenzar Prueba
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
