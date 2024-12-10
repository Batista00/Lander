import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface Template {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  price: number;
  status: 'active' | 'draft' | 'review';
  sales?: number;
  category: string;
  sellerId: string;
}

export const MyTemplates: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      if (!user) return;

      try {
        const templatesQuery = query(
          collection(db, 'templates'),
          where('sellerId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(templatesQuery);
        const templatesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Template));

        setTemplates(templatesData);
      } catch (error) {
        console.error('Error al cargar los templates:', error);
        toast('Error al cargar los templates', {
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [user]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, templateId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(templateId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };

  const handleEdit = (templateId: string) => {
    navigate(`/dashboard/marketplace/seller-dashboard/templates/edit/${templateId}`);
    handleMenuClose();
  };

  const handleDelete = (templateId: string) => {
    // Implementar lógica de eliminación
    console.log('Eliminando template:', templateId);
    handleMenuClose();
  };

  const handlePreview = (templateId: string) => {
    navigate(`/dashboard/marketplace/template/${templateId}`);
    handleMenuClose();
  };

  const getStatusColor = (status: Template['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'review':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Template['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'draft':
        return 'Borrador';
      case 'review':
        return 'En Revisión';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography variant="h4" gutterBottom>
                Mis Templates
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gestiona tus templates publicados y borradores
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/dashboard/marketplace/seller-dashboard/templates/create')}
            >
              Nuevo Template
            </Button>
          </Box>

          <Grid container spacing={3}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={template.previewUrl}
                    alt={template.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {template.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, template.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {template.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip
                        label={getStatusLabel(template.status)}
                        color={getStatusColor(template.status)}
                        size="small"
                      />
                      <Chip label={template.category} size="small" variant="outlined" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ${template.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.sales} ventas
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(template.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handlePreview(template.id)}
                    >
                      Vista Previa
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => selectedTemplate && handleEdit(selectedTemplate)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => selectedTemplate && handlePreview(selectedTemplate)}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Vista Previa</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => selectedTemplate && handleDelete(selectedTemplate)}
              sx={{ color: 'error.main' }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Eliminar</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
    </Container>
  );
};
