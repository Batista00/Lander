import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  TextField,
  Chip,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Lead } from '@/types/leads';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LeadDetailsProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (leadId: string, newStatus: string) => void;
  onAddNote: (leadId: string, note: string) => void;
}

export default function LeadDetails({
  lead,
  open,
  onClose,
  onUpdateStatus,
  onAddNote,
}: LeadDetailsProps) {
  const [note, setNote] = React.useState('');

  if (!lead) return null;

  const handleAddNote = () => {
    if (note.trim()) {
      onAddNote(lead.id, note);
      setNote('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Detalles del Lead</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <Typography variant="subtitle2" color="textSecondary">
            Información Básica
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            {Object.entries(lead.formData).map(([key, value]) => (
              <Box key={key}>
                <Typography variant="caption" color="textSecondary">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography>{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" color="textSecondary">
            Metadata
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Fecha de Creación
              </Typography>
              <Typography>
                {format(lead.metadata.createdAt.toDate(), 'PPpp', { locale: es })}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Landing Page
              </Typography>
              <Typography>{lead.landingPageId}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Estado
              </Typography>
              <Chip label={lead.status} size="small" />
            </Box>
            {lead.metadata.tags && lead.metadata.tags.length > 0 && (
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Tags
                </Typography>
                <Box display="flex" gap={1}>
                  {lead.metadata.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" color="textSecondary">
            Notas
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box mb={2}>
            {lead.notes && lead.notes.length > 0 ? (
              lead.notes.map((note, index) => (
                <Box key={index} mb={1} p={1} bgcolor="grey.50" borderRadius={1}>
                  <Typography variant="body2">{note}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No hay notas
              </Typography>
            )}
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Añadir nota..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddNote}>
              Añadir
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
