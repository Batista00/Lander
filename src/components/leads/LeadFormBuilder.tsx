import React, { useState } from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import { LeadFormConfig } from '@/types/leads';
import LeadFormEditor from './LeadFormEditor';
import LeadFormPreview from './LeadFormPreview';

interface LeadFormBuilderProps {
  initialConfig?: Partial<LeadFormConfig>;
  onSave?: (config: LeadFormConfig) => void;
}

const defaultConfig: LeadFormConfig = {
  title: 'Nuevo Formulario',
  fields: [],
  submitText: 'Enviar',
  successMessage: '¡Gracias por tu mensaje!',
  layout: 'vertical',
  tracking: {
    enableGoogleAnalytics: false,
    enableFacebookPixel: false,
  },
};

export default function LeadFormBuilder({
  initialConfig,
  onSave,
}: LeadFormBuilderProps) {
  const [config, setConfig] = useState<LeadFormConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleConfigChange = (newConfig: LeadFormConfig) => {
    setConfig(newConfig);
    onSave?.(newConfig);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Editor */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              height: '100%',
              overflow: 'auto',
              p: 2,
              bgcolor: 'background.default',
            }}
          >
            <LeadFormEditor config={config} onChange={handleConfigChange} />
          </Box>
        </Grid>

        {/* Preview */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: isMobile ? 'auto' : '100%',
              overflow: 'auto',
              position: isMobile ? 'relative' : 'sticky',
              top: 0,
              p: 2,
            }}
          >
            <LeadFormPreview config={config} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
