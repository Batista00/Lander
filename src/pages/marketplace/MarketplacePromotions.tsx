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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalOffer,
  CalendarToday,
  Percent,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface PromotionFormData {
  id?: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  templateIds: string[];
  minPurchaseAmount?: number;
  maxUses?: number;
  usedCount: number;
}

export const MarketplacePromotions = () => {
  const { 
    promotions,
    templates,
    loadPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
    loading,
    error 
  } = useMarketplace();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<PromotionFormData | null>(null);
  const [formData, setFormData] = useState<PromotionFormData>({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    startDate: new Date(),
    endDate: new Date(),
    active: true,
    templateIds: [],
    usedCount: 0,
  });

  useEffect(() => {
    loadPromotions();
  }, [loadPromotions]);

  const handleOpenDialog = (promotion?: PromotionFormData) => {
    if (promotion) {
      setEditingPromotion(promotion);
      setFormData(promotion);
    } else {
      setEditingPromotion(null);
      setFormData({
        title: '',
        description: '',
        discountType: 'percentage',
        discountValue: 0,
        startDate: new Date(),
        endDate: new Date(),
        active: true,
        templateIds: [],
        usedCount: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPromotion(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingPromotion) {
        await updatePromotion(formData);
        toast.success('Promoción actualizada con éxito');
      } else {
        await createPromotion(formData);
        toast.success('Promoción creada con éxito');
      }
      handleCloseDialog();
    } catch (error) {
      toast.error('Error al guardar la promoción');
    }
  };

  const handleDelete = async (promotionId: string) => {
    try {
      await deletePromotion(promotionId);
      toast.success('Promoción eliminada con éxito');
    } catch (error) {
      toast.error('Error al eliminar la promoción');
    }
  };

  const getPromotionProgress = (promotion: PromotionFormData) => {
    if (!promotion.maxUses) return 100;
    return (promotion.usedCount / promotion.maxUses) * 100;
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Promociones
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nueva Promoción
          </Button>
        </Box>

        {loading ? (
          <Grid container spacing={3}>
            {Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Skeleton variant="rectangular" width={100} height={32} />
                      <Skeleton variant="rectangular" width={100} height={32} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : promotions.length === 0 ? (
          <Alert severity="info">
            No hay promociones activas. Crea una nueva promoción para empezar.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {promotions.map((promotion) => (
              <Grid item xs={12} key={promotion.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {promotion.title}
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                          {promotion.description}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton onClick={() => handleOpenDialog(promotion)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(promotion.id!)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Chip
                        icon={<Percent />}
                        label={`${promotion.discountValue}${promotion.discountType === 'percentage' ? '%' : '€'} descuento`}
                        color="primary"
                      />
                      <Chip
                        icon={<CalendarToday />}
                        label={`${new Date(promotion.startDate).toLocaleDateString()} - ${new Date(promotion.endDate).toLocaleDateString()}`}
                      />
                      <Chip
                        icon={<LocalOffer />}
                        label={`${promotion.usedCount}${promotion.maxUses ? `/${promotion.maxUses}` : ''} usos`}
                      />
                    </Box>

                    {promotion.maxUses && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Progreso
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={getPromotionProgress(promotion)}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingPromotion ? 'Editar Promoción' : 'Nueva Promoción'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Descuento</InputLabel>
                  <Select
                    value={formData.discountType}
                    label="Tipo de Descuento"
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                  >
                    <MenuItem value="percentage">Porcentaje</MenuItem>
                    <MenuItem value="fixed">Monto Fijo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valor del Descuento"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Fecha de Inicio"
                  value={formData.startDate}
                  onChange={(date) => date && setFormData({ ...formData, startDate: date })}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Fecha de Fin"
                  value={formData.endDate}
                  onChange={(date) => date && setFormData({ ...formData, endDate: date })}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Monto Mínimo de Compra"
                  value={formData.minPurchaseAmount || ''}
                  onChange={(e) => setFormData({ ...formData, minPurchaseAmount: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Máximo de Usos"
                  value={formData.maxUses || ''}
                  onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Templates Aplicables</InputLabel>
                  <Select
                    multiple
                    value={formData.templateIds}
                    label="Templates Aplicables"
                    onChange={(e) => setFormData({ ...formData, templateIds: e.target.value as string[] })}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={templates.find(t => t.id === value)?.title || value}
                            size="small"
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {templates.map((template) => (
                      <MenuItem key={template.id} value={template.id}>
                        {template.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />
                  }
                  label="Promoción Activa"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingPromotion ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};
