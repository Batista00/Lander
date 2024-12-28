import React from 'react';
import { Section } from '../base/Section';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';

interface ContactProps {
  content: {
    title?: string;
    subtitle?: string;
    email?: string;
    phone?: string;
    address?: string;
    formTitle?: string;
    submitButton?: string;
  };
  styles?: any;
  isEditing?: boolean;
  onEdit?: (content: any) => void;
}

export const Contact: React.FC<ContactProps> = ({
  content,
  styles,
  isEditing,
  onEdit
}) => {
  const {
    title = 'Contacto',
    subtitle = 'Ponte en contacto con nosotros',
    email = 'info@empresa.com',
    phone = '+1 234 567 890',
    address = 'Dirección de la empresa',
    formTitle = 'Envíanos un mensaje',
    submitButton = 'Enviar'
  } = content;

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background="paper"
      spacing="large"
    >
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              contentEditable={isEditing}
              onBlur={(e) => onEdit?.({ ...content, formTitle: e.currentTarget.textContent })}
            >
              {formTitle}
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField label="Nombre" variant="outlined" fullWidth />
              <TextField label="Email" variant="outlined" fullWidth />
              <TextField label="Mensaje" variant="outlined" multiline rows={4} fullWidth />
              <Button
                variant="contained"
                color="primary"
                size="large"
                contentEditable={isEditing}
                onBlur={(e) => onEdit?.({ ...content, submitButton: e.currentTarget.textContent })}
              >
                {submitButton}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>Email</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                contentEditable={isEditing}
                onBlur={(e) => onEdit?.({ ...content, email: e.currentTarget.textContent })}
              >
                {email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Teléfono</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                contentEditable={isEditing}
                onBlur={(e) => onEdit?.({ ...content, phone: e.currentTarget.textContent })}
              >
                {phone}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>Dirección</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                contentEditable={isEditing}
                onBlur={(e) => onEdit?.({ ...content, address: e.currentTarget.textContent })}
              >
                {address}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};
