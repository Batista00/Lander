import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const PublishedLanding = () => {
  const { id } = useParams();

  return (
    <Box>
      {/* Aquí se renderiza la landing page publicada */}
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        Landing page publicada
      </Typography>
    </Box>
  );
};

export default PublishedLanding;
