import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { collection, query, getDocs, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: Date;
  notes?: string;
}

export default function LeadsAll() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      console.log('Usuario autenticado:', user.uid);
      fetchLeads();
    } else {
      console.log('Esperando autenticación...');
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      if (!user) {
        console.log('No hay usuario autenticado');
        return;
      }

      setLoading(true);
      console.log('Consultando leads para usuario:', user.uid);
      
      const leadsQuery = query(
        collection(db, 'leads'),
        where('userId', '==', user.uid),
        orderBy('metadata.createdAt', 'desc')
      );
      
      const snapshot = await getDocs(leadsQuery);
      console.log('Leads encontrados:', snapshot.size);
      
      const leadsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.formData?.name || '',
          email: data.formData?.email || '',
          phone: data.formData?.phone || '',
          source: data.metadata?.source?.url || '',
          status: data.status || 'new',
          createdAt: data.metadata?.createdAt?.toDate() || new Date(),
          notes: data.notes || ''
        };
      }) as Lead[];
      
      setLeads(leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Error al cargar los leads');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        status: newStatus,
        updatedAt: new Date()
      });
      setLeads(prev =>
        prev.map(lead =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
      toast.success('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDelete = async (leadId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este lead?')) {
      try {
        await deleteDoc(doc(db, 'leads', leadId));
        setLeads(prev => prev.filter(lead => lead.id !== leadId));
        toast.success('Lead eliminado correctamente');
      } catch (error) {
        console.error('Error deleting lead:', error);
        toast.error('Error al eliminar el lead');
      }
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: 'info',
      contacted: 'warning',
      qualified: 'primary',
      converted: 'success',
      lost: 'error'
    };
    return colors[status];
  };

  const getStatusText = (status: Lead['status']) => {
    const texts = {
      new: 'Nuevo',
      contacted: 'Contactado',
      qualified: 'Calificado',
      converted: 'Convertido',
      lost: 'Perdido'
    };
    return texts[status];
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const displayedLeads = filteredLeads
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Todos los Leads</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Nuevo Lead
        </Button>
      </Box>

      {/* Filtros */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" gap={2}>
            {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
              <Chip
                key={status}
                label={status === 'all' ? 'Todos' : getStatusText(status as Lead['status'])}
                onClick={() => setStatusFilter(status)}
                color={statusFilter === status ? 'primary' : 'default'}
                variant={statusFilter === status ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Tabla de Leads */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Origen</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone || '-'}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(lead.status)}
                    color={getStatusColor(lead.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {format(lead.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(lead.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredLeads.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />

      {/* Dialog para editar/crear lead */}
      <Dialog
        open={isDialogOpen || !!selectedLead}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedLead(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedLead ? 'Editar Lead' : 'Nuevo Lead'}
        </DialogTitle>
        <DialogContent>
          {/* Formulario aquí */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsDialogOpen(false);
              setSelectedLead(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Lógica para guardar
              setIsDialogOpen(false);
              setSelectedLead(null);
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
