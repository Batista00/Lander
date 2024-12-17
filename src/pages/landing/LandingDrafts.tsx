import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingDrafts = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with real data from your backend
  const drafts = [
    {
      id: '1',
      title: 'Landing Page Draft 1',
      lastModified: '2024-01-15',
    },
    // Add more mock drafts as needed
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Borradores
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/dashboard/landing-pages/editor/new')}
        >
          Nueva Landing Page
        </Button>
      </Box>

      <Grid container spacing={3}>
        {drafts.map((draft) => (
          <Grid item xs={12} sm={6} md={4} key={draft.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {draft.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Última modificación: {draft.lastModified}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate(`/dashboard/landing-pages/editor/${draft.id}`)}
                  >
                    Editar
                  </Button>
                  <Button variant="outlined" color="error">
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LandingDrafts;
