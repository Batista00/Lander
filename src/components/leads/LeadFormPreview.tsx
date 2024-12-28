import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LeadFormConfig } from '@/types/leads';
import LeadForm from './LeadForm';

interface LeadFormPreviewProps {
  config: LeadFormConfig;
}

export default function LeadFormPreview({ config }: LeadFormPreviewProps) {
  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Vista previa del formulario
        </Typography>
        <Box sx={{ mt: 2 }}>
          <LeadForm
            config={config}
            onSubmit={handleSubmit}
          />
        </Box>
      </Paper>
    </Box>
  );
}
