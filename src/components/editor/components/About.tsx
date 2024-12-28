import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

interface AboutProps {
  content: {
    heading: string;
    text: string;
    image?: string;
  };
  onEdit?: (content: any) => void;
  isEditing?: boolean;
}

export const About: React.FC<AboutProps> = ({ content, onEdit, isEditing }) => {
  const { heading, text, image } = content;

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              gutterBottom
              contentEditable={isEditing}
              onBlur={(e) => onEdit?.({ ...content, heading: e.currentTarget.textContent })}
            >
              {heading}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
              contentEditable={isEditing}
              onBlur={(e) => onEdit?.({ ...content, text: e.currentTarget.textContent })}
            >
              {text}
            </Typography>
          </Grid>
          {image && (
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={image}
                alt={heading}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
