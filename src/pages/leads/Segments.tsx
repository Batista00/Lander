import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
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
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Filter {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: string;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  filters: Filter[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  leadCount: number;
}

export default function LeadsSegments() {
  const { user } = useAuth();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    filters: [] as Filter[],
  });

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      setLoading(true);
      const segmentsQuery = query(
        collection(db, 'segments'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(segmentsQuery);
      const segmentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Segment[];
      setSegments(segmentsData);
    } catch (error) {
      console.error('Error fetching segments:', error);
      toast.error('Error al cargar los segmentos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const segmentData = {
        ...formData,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        leadCount: 0,
      };

      if (selectedSegment) {
        await updateDoc(doc(db, 'segments', selectedSegment.id), {
          ...segmentData,
          createdAt: selectedSegment.createdAt,
        });
        toast.success('Segmento actualizado correctamente');
      } else {
        await addDoc(collection(db, 'segments'), segmentData);
        toast.success('Segmento creado correctamente');
      }

      setIsDialogOpen(false);
      setSelectedSegment(null);
      setFormData({ name: '', description: '', filters: [] });
      fetchSegments();
    } catch (error) {
      console.error('Error saving segment:', error);
      toast.error('Error al guardar el segmento');
    }
  };

  const handleDelete = async (segmentId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este segmento?')) {
      try {
        await deleteDoc(doc(db, 'segments', segmentId));
        setSegments((prev) => prev.filter((segment) => segment.id !== segmentId));
        toast.success('Segmento eliminado correctamente');
      } catch (error) {
        console.error('Error deleting segment:', error);
        toast.error('Error al eliminar el segmento');
      }
    }
  };

  const handleAddFilter = () => {
    setFormData((prev) => ({
      ...prev,
      filters: [...prev.filters, { field: '', operator: 'equals', value: '' }],
    }));
  };

  const handleRemoveFilter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index),
    }));
  };

  const handleFilterChange = (index: number, field: keyof Filter, value: string) => {
    setFormData((prev) => ({
      ...prev,
      filters: prev.filters.map((filter, i) =>
        i === index ? { ...filter, [field]: value } : filter
      ),
    }));
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Segmentos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Nuevo Segmento
        </Button>
      </Box>

      <Grid container spacing={3}>
        {segments.map((segment) => (
          <Grid item xs={12} md={6} lg={4} key={segment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {segment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {segment.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <FilterIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {segment.filters.length} filtros
                  </Typography>
                  <Chip label={`${segment.leadCount} leads`} size="small" color="primary" />
                </Box>
                <List dense>
                  {segment.filters.map((filter, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${filter.field} ${filter.operator} ${filter.value}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelectedSegment(segment);
                    setFormData({
                      name: segment.name,
                      description: segment.description,
                      filters: segment.filters,
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(segment.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedSegment(null);
          setFormData({ name: '', description: '', filters: [] });
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedSegment ? 'Editar Segmento' : 'Nuevo Segmento'}
        </DialogTitle>
        <DialogContent>
          <Box mt={2} display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Nombre"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Filtros
              </Typography>
              {formData.filters.map((filter, index) => (
                <Box key={index} display="flex" gap={2} mb={2}>
                  <FormControl fullWidth>
                    <InputLabel>Campo</InputLabel>
                    <Select
                      value={filter.field}
                      label="Campo"
                      onChange={(e) => handleFilterChange(index, 'field', e.target.value)}
                    >
                      <MenuItem value="name">Nombre</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="source">Origen</MenuItem>
                      <MenuItem value="status">Estado</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Operador</InputLabel>
                    <Select
                      value={filter.operator}
                      label="Operador"
                      onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                    >
                      <MenuItem value="equals">Igual a</MenuItem>
                      <MenuItem value="contains">Contiene</MenuItem>
                      <MenuItem value="greater">Mayor que</MenuItem>
                      <MenuItem value="less">Menor que</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Valor"
                    fullWidth
                    value={filter.value}
                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                  />
                  <IconButton onClick={() => handleRemoveFilter(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddFilter}>
                Agregar Filtro
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsDialogOpen(false);
              setSelectedSegment(null);
              setFormData({ name: '', description: '', filters: [] });
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
