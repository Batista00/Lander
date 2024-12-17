import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { toast } from 'sonner';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  Chip,
  Divider,
  Rating,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Skeleton,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Facebook,
  Language,
  LocationOn,
  Code,
  WorkHistory,
  School,
  Star,
  Share,
  WhatsApp,
  Telegram,
  Edit as EditIcon
} from '@mui/icons-material';

interface DeveloperProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  bio: string;
  rating: number;
  reviews: number;
  completedProjects: number;
  languages: Array<{ name: string; level: number }>;
  technologies: string[];
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  portfolio: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
}

const mockProfile: DeveloperProfile = {
  id: '1',
  name: 'Juan Pérez',
  title: 'Desarrollador Full Stack Senior',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  location: 'Buenos Aires, Argentina',
  bio: 'Desarrollador Full Stack con más de 8 años de experiencia en desarrollo web y aplicaciones móviles. Especializado en React, Node.js y arquitecturas cloud.',
  rating: 4.8,
  reviews: 127,
  completedProjects: 85,
  languages: [
    { name: 'JavaScript', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'Java', level: 75 }
  ],
  technologies: [
    'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'GraphQL', 'Redux', 'Next.js'
  ],
  education: [
    {
      institution: 'Universidad de Buenos Aires',
      degree: 'Ingeniería en Informática',
      year: '2015'
    },
    {
      institution: 'Platzi',
      degree: 'Master en Desarrollo Web Full Stack',
      year: '2017'
    }
  ],
  experience: [
    {
      company: 'TechCorp',
      position: 'Senior Full Stack Developer',
      period: '2020 - Presente',
      description: 'Desarrollo de aplicaciones web escalables usando React y Node.js'
    },
    {
      company: 'StartupX',
      position: 'Full Stack Developer',
      period: '2017 - 2020',
      description: 'Implementación de características clave para la plataforma principal'
    }
  ],
  portfolio: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Plataforma de comercio electrónico completa con pasarela de pagos',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      link: 'https://project1.com'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Aplicación de gestión de tareas en tiempo real',
      technologies: ['React', 'Firebase', 'Material-UI'],
      link: 'https://project2.com'
    }
  ],
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    website: 'https://mywebsite.com'
  }
};

export function DeveloperProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const { 
    developerProfile: profile,
    loadDeveloperProfile,
    updateDeveloperProfile,
    loading,
    error: contextError 
  } = useMarketplace();

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(profile);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (id === 'me' && !user) {
        setError('Usuario no autenticado');
        return;
      }

      const developerId = id === 'me' ? user?.uid : id;
      if (!developerId) {
        setError('ID de desarrollador no válido');
        return;
      }

      try {
        console.log('Intentando cargar perfil para:', developerId);
        await loadDeveloperProfile(developerId);
        if (!isMounted) return;
      } catch (err) {
        if (!isMounted) return;
        console.error('Error al cargar perfil:', err);
        setError('Error al cargar el perfil del desarrollador');
      }
    };

    setError('');
    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [id, user?.uid]);

  useEffect(() => {
    if (profile) {
      setEditData(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      document.title = `${profile.name} - ${profile.title || 'Perfil de Desarrollador'} | Marketplace`;
    }
  }, [profile]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando perfil...</Typography>
      </Box>
    );
  }

  if (error || contextError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || contextError}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          No se encontró el perfil del desarrollador
        </Alert>
      </Container>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = profile ? `Conoce a ${profile.name}, ${profile.title}` : '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      if (profile && editData) {
        await updateDeveloperProfile(profile.id, editData);
        setEditMode(false);
        toast.success('Perfil actualizado correctamente');
      }
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditData(profile);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const isOwner = user?.uid === profile.userId;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                sx={{ width: 200, height: 200, mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {Object.entries(profile.socialLinks).map(([platform, link]) => (
                  link && (
                    <IconButton
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                    >
                      {platform === 'github' && <GitHub />}
                      {platform === 'linkedin' && <LinkedIn />}
                      {platform === 'twitter' && <Twitter />}
                      {platform === 'facebook' && <Facebook />}
                      {platform === 'website' && <Language />}
                    </IconButton>
                  )
                ))}
              </Box>
              {isOwner && (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ mt: 2 }}
                >
                  Editar Perfil
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {profile.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {profile.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 1 }} color="action" />
                  <Typography variant="body1" color="text.secondary">
                    {profile.location}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Share />}
                  onClick={() => handleShare('facebook')}
                >
                  Compartir
                </Button>
                <IconButton onClick={() => handleShare('whatsapp')} color="success">
                  <WhatsApp />
                </IconButton>
                <IconButton onClick={() => handleShare('telegram')} color="primary">
                  <Telegram />
                </IconButton>
              </Box>
            </Box>
            <Typography paragraph>
              {profile.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              <Box>
                <Typography variant="h4">{profile.rating}</Typography>
                <Rating value={profile.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {profile.reviews} reseñas
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4">{profile.completedProjects}</Typography>
                <Typography color="text.secondary">
                  Proyectos completados
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Lenguajes de Programación
            </Typography>
            {profile?.languages?.map((lang) => (
              <Box key={lang.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{lang.name}</Typography>
                  <Typography>{lang.level}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={lang.level}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Tecnologías
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile?.technologies?.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Educación
            </Typography>
            {profile?.education?.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {edu.degree}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.institution}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.year}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Experiencia
          </Typography>
          {profile?.experience?.map((exp, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                {exp.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.company} • {exp.period}
              </Typography>
              <Typography variant="body2">
                {exp.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Portfolio
          </Typography>
          <Grid container spacing={2}>
            {profile?.portfolio?.map((project) => (
              <Grid item xs={12} sm={6} key={project.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {project?.technologies?.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver proyecto
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={editMode} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              value={editData?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Título"
              value={editData?.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Ubicación"
              value={editData?.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Biografía"
              value={editData?.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              sx={{ mb: 2 }}
            />
            {/* Add more fields as needed */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
