import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

interface AboutSectionProps {
  content: {
    heading: string;
    text: string;
    image?: string;
    features?: Array<{
      title: string;
      description: string;
    }>;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h2" gutterBottom>
              {content.heading}
            </Typography>
            <Typography variant="body1" paragraph>
              {content.text}
            </Typography>
            {content.features && (
              <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  {content.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
          {content.image && (
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={content.image}
                alt={content.heading}
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
