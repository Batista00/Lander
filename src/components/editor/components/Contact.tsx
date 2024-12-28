import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

interface ContactProps {
  content: {
    heading: string;
    text: string;
    fields?: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
    }>;
  };
  onEdit?: (content: any) => void;
  isEditing?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ content, onEdit, isEditing }) => {
  const { heading, text, fields = defaultFields } = content;
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío del formulario
    console.log('Form data:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          contentEditable={isEditing}
          onBlur={(e) => onEdit?.({ ...content, heading: e.currentTarget.textContent })}
        >
          {heading}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 6 }}
          contentEditable={isEditing}
          onBlur={(e) => onEdit?.({ ...content, text: e.currentTarget.textContent })}
        >
          {text}
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {fields.map((field) => (
                <Grid item xs={12} sm={field.type === 'textarea' ? 12 : 6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    required={field.required}
                    type={field.type === 'textarea' ? 'text' : field.type}
                    multiline={field.type === 'textarea'}
                    rows={field.type === 'textarea' ? 4 : 1}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    value={formData[field.name] || ''}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Enviar Mensaje
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

const defaultFields = [
  { name: 'name', label: 'Nombre', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Teléfono', type: 'tel', required: false },
  { name: 'message', label: 'Mensaje', type: 'textarea', required: true },
];
