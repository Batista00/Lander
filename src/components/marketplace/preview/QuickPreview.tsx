import React from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Rating,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  Speed,
  Devices,
  Support,
} from '@mui/icons-material';

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  previewUrl: string;
  features: string[];
  technologies: string[];
  responsiveSupport: string[];
  rating: number;
  reviews: number;
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
}

interface QuickPreviewProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

export const QuickPreview: React.FC<QuickPreviewProps> = ({
  template,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [activeDevice, setActiveDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceSizes = {
    desktop: { width: '100%', height: '500px' },
    tablet: { width: '768px', height: '500px' },
    mobile: { width: '375px', height: '500px' },
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '80vh',
        },
      }}
    >
      <DialogContent>
        <Grid container spacing={3}>
          {/* Preview Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Button
                variant={activeDevice === 'desktop' ? 'contained' : 'outlined'}
                onClick={() => setActiveDevice('desktop')}
                startIcon={<Devices />}
              >
                Desktop
              </Button>
              <Button
                variant={activeDevice === 'tablet' ? 'contained' : 'outlined'}
                onClick={() => setActiveDevice('tablet')}
                startIcon={<Devices />}
              >
                Tablet
              </Button>
              <Button
                variant={activeDevice === 'mobile' ? 'contained' : 'outlined'}
                onClick={() => setActiveDevice('mobile')}
                startIcon={<Devices />}
              >
                Mobile
              </Button>
            </Box>
            <Box
              sx={{
                position: 'relative',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: deviceSizes[activeDevice].width,
                  height: deviceSizes[activeDevice].height,
                  transition: 'all 0.3s ease',
                }}
              >
                <iframe
                  src={template.previewUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                  title={template.title}
                />
              </Box>
            </Box>
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              {template.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={template.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({template.reviews} reviews)
              </Typography>
            </Box>

            <Typography variant="h4" color="primary" gutterBottom>
              ${template.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {template.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tecnologías
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {template.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    icon={<Code />}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Características
              </Typography>
              <List dense>
                {template.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={onAddToCart}
              >
                Añadir al Carrito
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                onClick={() => window.open(template.previewUrl, '_blank')}
              >
                Vista Completa
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
