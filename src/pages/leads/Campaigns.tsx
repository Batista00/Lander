import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Schedule as ScheduleIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { collection, query, getDocs, addDoc, deleteDoc, doc, updateDoc, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';

interface Campaign {
  id: string;
  name: string;
  description: string;
  segmentId: string;
  emailTemplate: {
    subject: string;
    body: string;
  };
  schedule: {
    type: 'immediate' | 'scheduled';
    date?: Date;
  };
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'error';
  stats?: {
    sent: number;
    opened: number;
    clicked: number;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Campaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    segmentId: '',
    emailTemplate: {
      subject: '',
      body: '',
    },
    schedule: {
      type: 'immediate' as const,
      date: new Date(),
    },
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const campaignsQuery = query(
        collection(db, 'campaigns'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(campaignsQuery);
      const campaignsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Campaign[];
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Error al cargar las campañas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const campaignData = {
        ...formData,
        userId: user.uid,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (selectedCampaign) {
        await updateDoc(doc(db, 'campaigns', selectedCampaign.id), campaignData);
        toast.success('Campaña actualizada correctamente');
      } else {
        await addDoc(collection(db, 'campaigns'), campaignData);
        toast.success('Campaña creada correctamente');
      }

      setIsDialogOpen(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error('Error al guardar la campaña');
    }
  };

  const handleDelete = async (campaignId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta campaña?')) {
      try {
        await deleteDoc(doc(db, 'campaigns', campaignId));
        toast.success('Campaña eliminada correctamente');
        fetchCampaigns();
      } catch (error) {
        console.error('Error deleting campaign:', error);
        toast.error('Error al eliminar la campaña');
      }
    }
  };

  const handleSendCampaign = async (campaignId: string) => {
    if (window.confirm('¿Estás seguro de que deseas enviar esta campaña?')) {
      try {
        await sendCampaign(campaignId);
        toast.success('Campaña iniciada correctamente');
        fetchCampaigns();
      } catch (error) {
        console.error('Error sending campaign:', error);
        toast.error('Error al enviar la campaña');
      }
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'draft': return 'default';
      case 'scheduled': return 'info';
      case 'sending': return 'warning';
      case 'completed': return 'success';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h1 className="text-2xl font-bold">Campañas</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedCampaign(null);
            setFormData({
              name: '',
              description: '',
              segmentId: '',
              emailTemplate: {
                subject: '',
                body: '',
              },
              schedule: {
                type: 'immediate',
                date: new Date(),
              },
            });
            setIsDialogOpen(true);
          }}
        >
          Nueva Campaña
        </Button>
      </Box>

      {/* Lista de Campañas */}
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={6} lg={4} key={campaign.id}>
            <Card sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h6">{campaign.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {campaign.description}
                  </Typography>
                </Box>
                <Chip
                  label={campaign.status}
                  color={getStatusColor(campaign.status)}
                  size="small"
                />
              </Box>

              {campaign.stats && (
                <Box mt={2} display="flex" gap={2}>
                  <Typography variant="body2">
                    Enviados: {campaign.stats.sent}
                  </Typography>
                  <Typography variant="body2">
                    Abiertos: {campaign.stats.opened}
                  </Typography>
                  <Typography variant="body2">
                    Clicks: {campaign.stats.clicked}
                  </Typography>
                </Box>
              )}

              <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    setFormData({
                      name: campaign.name,
                      description: campaign.description,
                      segmentId: campaign.segmentId,
                      emailTemplate: campaign.emailTemplate,
                      schedule: campaign.schedule,
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(campaign.id)}
                >
                  <DeleteIcon />
                </IconButton>
                {campaign.status === 'draft' && (
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleSendCampaign(campaign.id)}
                  >
                    <SendIcon />
                  </IconButton>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para crear/editar campaña */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCampaign ? 'Editar Campaña' : 'Nueva Campaña'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={2}>
            <TextField
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Descripción"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              fullWidth
              multiline
              rows={2}
            />
            
            <FormControl fullWidth>
              <InputLabel>Segmento</InputLabel>
              <Select
                value={formData.segmentId}
                label="Segmento"
                onChange={(e) => setFormData(prev => ({ ...prev, segmentId: e.target.value }))}
              >
                <MenuItem value="">Seleccionar segmento</MenuItem>
                {/* TODO: Cargar segmentos desde la base de datos */}
              </Select>
            </FormControl>

            <Typography variant="subtitle2" mt={2}>
              Plantilla de Email
            </Typography>
            
            <TextField
              label="Asunto"
              value={formData.emailTemplate.subject}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                emailTemplate: {
                  ...prev.emailTemplate,
                  subject: e.target.value,
                },
              }))}
              fullWidth
            />
            
            <TextField
              label="Contenido"
              value={formData.emailTemplate.body}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                emailTemplate: {
                  ...prev.emailTemplate,
                  body: e.target.value,
                },
              }))}
              fullWidth
              multiline
              rows={6}
            />

            <FormControl fullWidth>
              <InputLabel>Programación</InputLabel>
              <Select
                value={formData.schedule.type}
                label="Programación"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  schedule: {
                    ...prev.schedule,
                    type: e.target.value as 'immediate' | 'scheduled',
                  },
                }))}
              >
                <MenuItem value="immediate">Enviar inmediatamente</MenuItem>
                <MenuItem value="scheduled">Programar envío</MenuItem>
              </Select>
            </FormControl>

            {formData.schedule.type === 'scheduled' && (
              <TextField
                type="datetime-local"
                label="Fecha y hora"
                value={format(formData.schedule.date || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  schedule: {
                    ...prev.schedule,
                    date: new Date(e.target.value),
                  },
                }))}
                fullWidth
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCampaign ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
