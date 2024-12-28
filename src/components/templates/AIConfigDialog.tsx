import { useState } from 'react';
import { AIWorkflowContext } from '@/types/landing';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Box,
} from '@mui/material';

interface AIConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (config: AIWorkflowContext) => void;
}

interface Goal {
  id: string;
  label: string;
}

const AVAILABLE_GOALS: Goal[] = [
  { id: 'leads', label: 'Generar Leads' },
  { id: 'sales', label: 'Aumentar Ventas' },
  { id: 'awareness', label: 'Crear Awareness' },
  { id: 'engagement', label: 'Mejorar Engagement' },
  { id: 'conversion', label: 'Optimizar Conversión' },
];

export function AIConfigDialog({ open, onClose, onSubmit }: AIConfigDialogProps) {
  const [industry, setIndustry] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState('');
  const [brandName, setBrandName] = useState('');
  const [brandTone, setBrandTone] = useState('');
  const [style, setStyle] = useState({
    modern: false,
    minimal: false,
    colorful: false,
  });

  const handleSubmit = () => {
    const config: AIWorkflowContext = {
      industry,
      goals,
      targetAudience,
      brand: {
        name: brandName,
        colors: [], // Se puede agregar un selector de colores después
        tone: brandTone,
      },
      style,
    };
    onSubmit(config);
    onClose();
  };

  const handleGoalToggle = (goalId: string) => {
    setGoals(goals.includes(goalId) 
      ? goals.filter(g => g !== goalId)
      : [...goals, goalId]
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configurar Sugerencias de IA</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <TextField
            label="Industria"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            fullWidth
            placeholder="Ej: Tecnología, Salud, Educación..."
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Objetivos</FormLabel>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {AVAILABLE_GOALS.map((goal) => (
                <Chip
                  key={goal.id}
                  label={goal.label}
                  onClick={() => handleGoalToggle(goal.id)}
                  color={goals.includes(goal.id) ? 'primary' : 'default'}
                  variant={goals.includes(goal.id) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </FormControl>

          <TextField
            label="Audiencia Objetivo"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            fullWidth
            placeholder="Ej: Profesionales 25-45 años interesados en..."
          />

          <TextField
            label="Nombre de la Marca"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Tono de la Marca"
            value={brandTone}
            onChange={(e) => setBrandTone(e.target.value)}
            fullWidth
            placeholder="Ej: Profesional, Casual, Innovador..."
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Estilo</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={style.modern}
                    onChange={(e) => setStyle({ ...style, modern: e.target.checked })}
                  />
                }
                label="Moderno"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={style.minimal}
                    onChange={(e) => setStyle({ ...style, minimal: e.target.checked })}
                  />
                }
                label="Minimalista"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={style.colorful}
                    onChange={(e) => setStyle({ ...style, colorful: e.target.checked })}
                  />
                }
                label="Colorido"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Obtener Sugerencias
        </Button>
      </DialogActions>
    </Dialog>
  );
}
