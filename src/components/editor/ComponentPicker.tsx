import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Article as HeroIcon,
  ViewModule as FeaturesIcon,
  Info as AboutIcon,
  Mail as ContactIcon,
  Collections as GalleryIcon,
  PlayCircle as VideoIcon,
  LocationOn as MapIcon,
  People as TeamIcon,
  Book as BlogIcon,
  QuestionAnswer as FAQIcon,
  Email as NewsletterIcon,
  Event as BookingIcon,
  ViewCarousel as CarouselIcon,
  Description as FormIcon,
  AttachMoney as PricingIcon,
  Timeline as TimelineIcon,
  BarChart as StatsIcon,
  Videocam as VideoPlayerIcon,
  AudioFile as AudioPlayerIcon,
  ThreeDRotation as ThreeDViewerIcon,
  Public as MapsIcon,
  Share as SocialFeedIcon,
  Chat as ChatIcon,
  Star as TestimoniosIcon,
  Business as ClientsIcon,
  Analytics as AnalyticsIcon,
  Code as ProgramsIcon,
  Build as ServicesIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

interface ComponentCategory {
  id: string;
  name: string;
  components: ComponentItem[];
}

interface ComponentItem {
  type: string;
  name: string;
  description: string;
  icon: any;
  isPremium?: boolean;
}

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: 'essential',
    name: 'Esenciales',
    components: [
      {
        type: 'hero',
        name: 'Hero',
        description: 'Sección principal con título y llamada a la acción',
        icon: HeroIcon,
      },
      {
        type: 'features',
        name: 'Características',
        description: 'Muestra las características o servicios principales',
        icon: FeaturesIcon,
      },
      {
        type: 'about',
        name: 'Sobre Nosotros',
        description: 'Información sobre la empresa o proyecto',
        icon: AboutIcon,
      },
      {
        type: 'contact',
        name: 'Contacto',
        description: 'Formulario de contacto e información',
        icon: ContactIcon,
      },
    ],
  },
  {
    id: 'media',
    name: 'Multimedia',
    components: [
      {
        type: 'gallery',
        name: 'Galería',
        description: 'Galería de imágenes o portfolio',
        icon: GalleryIcon,
      },
      {
        type: 'video',
        name: 'Video',
        description: 'Sección con video destacado',
        icon: VideoIcon,
      },
      {
        type: 'carousel',
        name: 'Carrusel',
        description: 'Presentación de imágenes en carrusel',
        icon: CarouselIcon,
        isPremium: true,
      },
      {
        type: 'videoPlayer',
        name: 'Reproductor de Video',
        description: 'Reproductor de video avanzado',
        icon: VideoPlayerIcon,
        isPremium: true,
      },
      {
        type: 'audioPlayer',
        name: 'Reproductor de Audio',
        description: 'Reproductor de audio con playlist',
        icon: AudioPlayerIcon,
        isPremium: true,
      },
      {
        type: 'threeDViewer',
        name: 'Visor 3D',
        description: 'Visualizador de modelos 3D',
        icon: ThreeDViewerIcon,
        isPremium: true,
      },
    ],
  },
  {
    id: 'content',
    name: 'Contenido',
    components: [
      {
        type: 'team',
        name: 'Equipo',
        description: 'Presenta a los miembros del equipo',
        icon: TeamIcon,
      },
      {
        type: 'blog',
        name: 'Blog',
        description: 'Sección de artículos o noticias',
        icon: BlogIcon,
      },
      {
        type: 'faq',
        name: 'Preguntas Frecuentes',
        description: 'Lista de preguntas y respuestas',
        icon: FAQIcon,
      },
      {
        type: 'testimonios',
        name: 'Testimonios',
        description: 'Opiniones de clientes',
        icon: TestimoniosIcon,
      },
      {
        type: 'clients',
        name: 'Clientes',
        description: 'Logos de clientes o partners',
        icon: ClientsIcon,
      },
      {
        type: 'timeline',
        name: 'Línea de Tiempo',
        description: 'Muestra eventos en orden cronológico',
        icon: TimelineIcon,
        isPremium: true,
      },
    ],
  },
  {
    id: 'business',
    name: 'Negocios',
    components: [
      {
        type: 'services',
        name: 'Servicios',
        description: 'Lista detallada de servicios',
        icon: ServicesIcon,
      },
      {
        type: 'pricing',
        name: 'Precios',
        description: 'Tabla de precios y planes',
        icon: PricingIcon,
      },
      {
        type: 'programs',
        name: 'Programas',
        description: 'Lista de programas o cursos',
        icon: ProgramsIcon,
      },
      {
        type: 'booking',
        name: 'Reservas',
        description: 'Sistema de reservas avanzado',
        icon: BookingIcon,
        isPremium: true,
      },
      {
        type: 'stats',
        name: 'Estadísticas',
        description: 'Muestra datos y métricas',
        icon: StatsIcon,
        isPremium: true,
      },
    ],
  },
  {
    id: 'interaction',
    name: 'Interacción',
    components: [
      {
        type: 'form',
        name: 'Formulario',
        description: 'Formulario personalizable',
        icon: FormIcon,
      },
      {
        type: 'newsletter',
        name: 'Newsletter',
        description: 'Suscripción a newsletter',
        icon: NewsletterIcon,
      },
      {
        type: 'map',
        name: 'Mapa',
        description: 'Mapa interactivo con ubicación',
        icon: MapIcon,
      },
      {
        type: 'socialFeed',
        name: 'Redes Sociales',
        description: 'Feed de redes sociales',
        icon: SocialFeedIcon,
        isPremium: true,
      },
      {
        type: 'chat',
        name: 'Chat',
        description: 'Chat en vivo con visitantes',
        icon: ChatIcon,
        isPremium: true,
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Analítica',
    components: [
      {
        type: 'analytics',
        name: 'Analítica',
        description: 'Estadísticas y métricas del sitio',
        icon: AnalyticsIcon,
        isPremium: true,
      },
    ],
  },
];

import { useComponents } from '@/contexts/ComponentContext';
import { FavoritesLibrary } from './FavoritesLibrary';

interface ComponentPickerProps {
  open: boolean;
  onClose: () => void;
  onSelectComponent: (type: string) => void;
  allowedComponents?: string[];
}

export const ComponentPicker: React.FC<ComponentPickerProps> = ({
  open,
  onClose,
  onSelectComponent,
  allowedComponents,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { saveToFavorites, isFavorite } = useComponents();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFavoriteClick = async (component: ComponentItem, event: React.MouseEvent) => {
    event.stopPropagation();
    await saveToFavorites({
      id: component.type,
      type: component.type,
      name: component.name,
      preview: '', // Aquí podrías agregar una vista previa si la tienes
      props: {},
      styles: {},
    });
  };

  const renderComponentCard = (component: ComponentItem) => {
    const isComponentFavorite = isFavorite(component.type);

    return (
      <Card
        sx={{
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 3,
          },
        }}
        onClick={() => onSelectComponent(component.type)}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component="div">
              {component.name}
              {component.isPremium && (
                <Chip
                  label="Premium"
                  size="small"
                  color="primary"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
            <Tooltip title={isComponentFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
              <IconButton
                size="small"
                onClick={(e) => handleFavoriteClick(component, e)}
              >
                {isComponentFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            {React.createElement(component.icon, { fontSize: 'small' })}
            <Typography variant="body2" color="text.secondary">
              {component.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Seleccionar Componente</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Favoritos" />
            {COMPONENT_CATEGORIES.map((category) => (
              <Tab key={category.id} label={category.name} />
            ))}
          </Tabs>
        </Box>

        {selectedTab === 0 ? (
          <FavoritesLibrary onSelectComponent={(favorite) => onSelectComponent(favorite.type)} />
        ) : (
          <Grid container spacing={2}>
            {COMPONENT_CATEGORIES[selectedTab - 1].components
              .filter(
                (component) =>
                  !allowedComponents || allowedComponents.includes(component.type)
              )
              .map((component) => (
                <Grid item xs={12} sm={6} md={4} key={component.type}>
                  {renderComponentCard(component)}
                </Grid>
              ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
