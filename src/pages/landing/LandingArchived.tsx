import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const LandingArchived = () => {
  // Mock data - replace with real data from your backend
  const archivedPages = [
    {
      id: '1',
      title: 'Landing Page Archivada 1',
      archivedDate: '2024-01-10',
    },
    // Add more mock archived pages as needed
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Landing Pages Archivadas
      </Typography>

      <Grid container spacing={3}>
        {archivedPages.map((page) => (
          <Grid item xs={12} sm={6} md={4} key={page.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {page.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Archivada el: {page.archivedDate}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="contained" color="primary">
                    Restaurar
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

export default LandingArchived;
