import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

interface HeroProps {
  content: {
    heading: string;
    subheading: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  onEdit?: (content: any) => void;
  isEditing?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ content, onEdit, isEditing }) => {
  const { heading, subheading, backgroundImage, ctaText, ctaLink } = content;

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage || 'https://source.unsplash.com/random/1920x1080'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 600 }}>
          <Typography 
            variant="h1" 
            gutterBottom
            contentEditable={isEditing}
            onBlur={(e) => onEdit?.({ ...content, heading: e.currentTarget.textContent })}
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 2
            }}
          >
            {heading}
          </Typography>
          <Typography 
            variant="h4"
            gutterBottom
            contentEditable={isEditing}
            onBlur={(e) => onEdit?.({ ...content, subheading: e.currentTarget.textContent })}
            sx={{ 
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mb: 4,
              opacity: 0.9
            }}
          >
            {subheading}
          </Typography>
          {ctaText && (
            <Button 
              variant="contained" 
              size="large"
              href={ctaLink}
              sx={{ 
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                textTransform: 'none',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              {ctaText}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};
