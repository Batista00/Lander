import React, { useEffect, useState } from 'react';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { toast } from 'sonner';

interface MarketplaceSettingsForm {
  generalSettings: {
    marketplaceName: string;
    description: string;
    currency: string;
    language: string;
    timezone: string;
  };
  sellerSettings: {
    commissionRate: number;
    minWithdrawalAmount: number;
    autoApproveProducts: boolean;
    requireSellerVerification: boolean;
  };
  purchaseSettings: {
    allowGuestPurchases: boolean;
    requireEmailVerification: boolean;
    maxPurchaseAmount: number;
    refundPeriod: number;
  };
  notificationSettings: {
    emailNotifications: boolean;
    newOrderNotification: boolean;
    lowStockNotification: boolean;
    reviewNotification: boolean;
  };
}

const defaultSettings: MarketplaceSettingsForm = {
  generalSettings: {
    marketplaceName: '',
    description: '',
    currency: 'EUR',
    language: 'es',
    timezone: 'Europe/Madrid',
  },
  sellerSettings: {
    commissionRate: 10,
    minWithdrawalAmount: 50,
    autoApproveProducts: false,
    requireSellerVerification: true,
  },
  purchaseSettings: {
    allowGuestPurchases: false,
    requireEmailVerification: true,
    maxPurchaseAmount: 1000,
    refundPeriod: 14,
  },
  notificationSettings: {
    emailNotifications: true,
    newOrderNotification: true,
    lowStockNotification: true,
    reviewNotification: true,
  },
};

export const MarketplaceSettings = () => {
  const { settings, loadSettings, updateSettings, loading, error } = useMarketplace();
  const [formData, setFormData] = useState<MarketplaceSettingsForm>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (section: keyof MarketplaceSettingsForm, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateSettings(formData);
      toast.success('Configuración guardada con éxito');
      setHasChanges(false);
    } catch (error) {
      toast.error('Error al guardar la configuración');
    }
  };

  const handleReset = () => {
    if (settings) {
      setFormData(settings);
      setHasChanges(false);
    }
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Configuración del Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            disabled={!hasChanges || loading}
          >
            Restaurar
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!hasChanges || loading}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" width="60%" />
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Skeleton variant="rectangular" height={56} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Skeleton variant="rectangular" height={56} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <SettingsSection title="Configuración General">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre del Marketplace"
                  value={formData.generalSettings.marketplaceName}
                  onChange={(e) => handleChange('generalSettings', 'marketplaceName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Descripción"
                  value={formData.generalSettings.description}
                  onChange={(e) => handleChange('generalSettings', 'description', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Moneda</InputLabel>
                  <Select
                    value={formData.generalSettings.currency}
                    label="Moneda"
                    onChange={(e) => handleChange('generalSettings', 'currency', e.target.value)}
                  >
                    <MenuItem value="EUR">Euro (€)</MenuItem>
                    <MenuItem value="USD">Dólar ($)</MenuItem>
                    <MenuItem value="GBP">Libra (£)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Idioma</InputLabel>
                  <Select
                    value={formData.generalSettings.language}
                    label="Idioma"
                    onChange={(e) => handleChange('generalSettings', 'language', e.target.value)}
                  >
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Zona Horaria</InputLabel>
                  <Select
                    value={formData.generalSettings.timezone}
                    label="Zona Horaria"
                    onChange={(e) => handleChange('generalSettings', 'timezone', e.target.value)}
                  >
                    <MenuItem value="Europe/Madrid">Madrid (UTC+1)</MenuItem>
                    <MenuItem value="America/New_York">New York (UTC-5)</MenuItem>
                    <MenuItem value="Asia/Tokyo">Tokyo (UTC+9)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </SettingsSection>

          <SettingsSection title="Configuración de Vendedores">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Tasa de Comisión (%)"
                  value={formData.sellerSettings.commissionRate}
                  onChange={(e) => handleChange('sellerSettings', 'commissionRate', Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Monto Mínimo de Retiro"
                  value={formData.sellerSettings.minWithdrawalAmount}
                  onChange={(e) => handleChange('sellerSettings', 'minWithdrawalAmount', Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.sellerSettings.autoApproveProducts}
                      onChange={(e) => handleChange('sellerSettings', 'autoApproveProducts', e.target.checked)}
                    />
                  }
                  label="Aprobar Productos Automáticamente"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.sellerSettings.requireSellerVerification}
                      onChange={(e) => handleChange('sellerSettings', 'requireSellerVerification', e.target.checked)}
                    />
                  }
                  label="Requerir Verificación de Vendedor"
                />
              </Grid>
            </Grid>
          </SettingsSection>

          <SettingsSection title="Configuración de Compras">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Monto Máximo de Compra"
                  value={formData.purchaseSettings.maxPurchaseAmount}
                  onChange={(e) => handleChange('purchaseSettings', 'maxPurchaseAmount', Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Período de Reembolso (días)"
                  value={formData.purchaseSettings.refundPeriod}
                  onChange={(e) => handleChange('purchaseSettings', 'refundPeriod', Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.purchaseSettings.allowGuestPurchases}
                      onChange={(e) => handleChange('purchaseSettings', 'allowGuestPurchases', e.target.checked)}
                    />
                  }
                  label="Permitir Compras como Invitado"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.purchaseSettings.requireEmailVerification}
                      onChange={(e) => handleChange('purchaseSettings', 'requireEmailVerification', e.target.checked)}
                    />
                  }
                  label="Requerir Verificación de Email"
                />
              </Grid>
            </Grid>
          </SettingsSection>

          <SettingsSection title="Configuración de Notificaciones">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationSettings.emailNotifications}
                      onChange={(e) => handleChange('notificationSettings', 'emailNotifications', e.target.checked)}
                    />
                  }
                  label="Activar Notificaciones por Email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationSettings.newOrderNotification}
                      onChange={(e) => handleChange('notificationSettings', 'newOrderNotification', e.target.checked)}
                    />
                  }
                  label="Notificar Nuevos Pedidos"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationSettings.lowStockNotification}
                      onChange={(e) => handleChange('notificationSettings', 'lowStockNotification', e.target.checked)}
                    />
                  }
                  label="Notificar Stock Bajo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationSettings.reviewNotification}
                      onChange={(e) => handleChange('notificationSettings', 'reviewNotification', e.target.checked)}
                    />
                  }
                  label="Notificar Nuevas Reseñas"
                />
              </Grid>
            </Grid>
          </SettingsSection>
        </>
      )}
    </Container>
  );
};
