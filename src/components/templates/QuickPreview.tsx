import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  styled,
  Paper,
  Tabs,
  Tab,
  Chip,
  Slider,
  Button,
} from '@mui/material';
import {
  Laptop,
  TabletMac,
  PhoneAndroid,
  Palette,
  FormatSize,
  Speed,
  DevicesOutlined,
  Favorite,
  FavoriteBorder,
  History,
  ColorLens,
  Upload,
  Star,
} from '@mui/icons-material';
import { Template, DeviceCompatibility } from '../../types/templates';
import { useTemplates } from '../../contexts/TemplateContext';
import { useAuth } from '../../contexts/AuthContext';

const PreviewContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  width: 500,
  maxHeight: '80vh',
  overflowY: 'auto',
  zIndex: 1300,
  boxShadow: theme.shadows[8],
  transition: 'opacity 0.3s ease, transform 0.3s ease',
}));

const PreviewImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
});

const ColorButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: color,
  width: 24,
  height: 24,
  padding: 0,
  '&:hover': {
    backgroundColor: color,
    opacity: 0.8,
  },
}));

interface QuickPreviewProps {
  template: Template;
  position: { x: number; y: number };
  onDeviceChange: (device: DeviceCompatibility) => void;
  onColorChange: (color: string) => void;
  onFontChange: (font: string) => void;
  currentDevice: DeviceCompatibility;
  visible: boolean;
}

const QuickPreview: React.FC<QuickPreviewProps> = ({
  template,
  position,
  onDeviceChange,
  onColorChange,
  onFontChange,
  currentDevice,
  visible,
}) => {
  const { user } = useAuth();
  const {
    favorites,
    toggleFavorite,
    addToHistory,
    saveCustomization,
    customizations,
  } = useTemplates();

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState(template.customization.colors.primary);
  const [selectedFont, setSelectedFont] = useState(template.customization.fonts.heading);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(
    customizations.find(c => c.templateId === template.id)?.logo
  );

  const isFavorite = favorites.includes(template.id);
  const currentCustomization = customizations.find(c => c.templateId === template.id);

  useEffect(() => {
    if (visible) {
      addToHistory(template.id);
    }
  }, [visible, template.id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
    saveCustomization(template.id, {
      ...currentCustomization,
      colors: { ...template.customization.colors, primary: color },
      fonts: { ...template.customization.fonts },
    });
  };

  const handleFontSelect = (font: string) => {
    setSelectedFont(font);
    onFontChange(font);
    saveCustomization(template.id, {
      ...currentCustomization,
      colors: { ...template.customization.colors },
      fonts: { ...template.customization.fonts, heading: font },
    });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implementar subida de logo
      const fakeUrl = URL.createObjectURL(file);
      setLogoUrl(fakeUrl);
      saveCustomization(template.id, {
        ...currentCustomization,
        logo: fakeUrl,
      });
    }
  };

  return (
    <PreviewContainer
      sx={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Vista Previa Rápida</Typography>
          <Box sx={{ ml: 'auto' }}>
            <IconButton
              size="small"
              onClick={() => toggleFavorite(template.id)}
              color={isFavorite ? 'primary' : 'default'}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton size="small">
              <History />
            </IconButton>
          </Box>
        </Stack>

        <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<DevicesOutlined />} label="Dispositivos" />
          <Tab icon={<ColorLens />} label="Personalizar" />
          <Tab icon={<Speed />} label="Métricas" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2 }}>
        {currentTab === 0 && (
          <>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <IconButton
                size="small"
                onClick={() => onDeviceChange('desktop')}
                color={currentDevice === 'desktop' ? 'primary' : 'default'}
              >
                <Laptop />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDeviceChange('tablet')}
                color={currentDevice === 'tablet' ? 'primary' : 'default'}
              >
                <TabletMac />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDeviceChange('mobile')}
                color={currentDevice === 'mobile' ? 'primary' : 'default'}
              >
                <PhoneAndroid />
              </IconButton>
            </Stack>

            <Box
              sx={{
                width: currentDevice === 'mobile' ? '375px' :
                       currentDevice === 'tablet' ? '450px' : '450px',
                margin: '0 auto',
                transition: 'width 0.3s ease',
                overflow: 'hidden',
              }}
            >
              {template.sections?.map((section, index) => (
                <Box key={index} sx={{ position: 'relative', mb: 2 }}>
                  <PreviewImage
                    src={section.preview}
                    alt={section.name}
                    loading="lazy"
                  />
                  {section.seoScore && (
                    <Tooltip title={`Score SEO: ${section.seoScore}`}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'background.paper',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 1,
                        }}
                      >
                        <Speed
                          fontSize="small"
                          color={
                            section.seoScore > 80 ? 'success' :
                            section.seoScore > 60 ? 'warning' : 'error'
                          }
                        />
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              ))}
            </Box>
          </>
        )}

        {currentTab === 1 && (
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Colores
              </Typography>
              <Stack direction="row" spacing={1}>
                {Object.entries(template.customization.colors).map(([key, color]) => (
                  <ColorButton
                    key={key}
                    color={color}
                    onClick={() => handleColorSelect(color)}
                    sx={{ border: selectedColor === color ? 2 : 0, borderColor: 'primary.main' }}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Tipografía
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant={selectedFont === 'Roboto' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => handleFontSelect('Roboto')}
                >
                  Roboto
                </Button>
                <Button
                  variant={selectedFont === 'Open Sans' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => handleFontSelect('Open Sans')}
                >
                  Open Sans
                </Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Logo
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {logoUrl ? (
                  <Box
                    component="img"
                    src={logoUrl}
                    alt="Logo"
                    sx={{ width: 40, height: 40, objectFit: 'contain' }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Upload />
                  </Box>
                )}
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  startIcon={<Upload />}
                >
                  Subir Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </Button>
              </Stack>
            </Box>
          </Stack>
        )}

        {currentTab === 2 && (
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                SEO Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Speed
                  color={
                    template.seoDetails.score > 80 ? 'success' :
                    template.seoDetails.score > 60 ? 'warning' : 'error'
                  }
                />
                <Typography>{template.seoDetails.score}/100</Typography>
              </Box>
              <Stack spacing={1} sx={{ mt: 1 }}>
                <Box>
                  <Typography variant="caption">Performance</Typography>
                  <Slider
                    value={template.seoDetails.performance}
                    disabled
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="caption">Accessibility</Typography>
                  <Slider
                    value={template.seoDetails.accessibility}
                    disabled
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="caption">Best Practices</Typography>
                  <Slider
                    value={template.seoDetails.bestPractices}
                    disabled
                    size="small"
                  />
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Estadísticas
              </Typography>
              <Stack direction="row" spacing={2}>
                <Chip
                  icon={<Star fontSize="small" />}
                  label={`${template.analytics.averageRating}`}
                  size="small"
                />
                <Chip
                  icon={<DevicesOutlined fontSize="small" />}
                  label={`${template.analytics.implementations} usos`}
                  size="small"
                />
              </Stack>
            </Box>
          </Stack>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Tiempo estimado: {template.implementationTime}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Nivel: {template.customizationLevel}
          </Typography>
        </Stack>
      </Box>
    </PreviewContainer>
  );
};

export default QuickPreview;
