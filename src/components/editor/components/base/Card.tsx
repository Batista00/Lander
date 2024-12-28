import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  onEdit?: (field: string, value: string) => void;
  isEditing?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  icon,
  onEdit,
  isEditing
}) => {
  return (
    <MuiCard 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
      )}
      <CardContent>
        {icon && (
          <Box sx={{ mb: 2, color: 'primary.main' }}>
            {icon}
          </Box>
        )}
        <Typography
          variant="h6"
          gutterBottom
          contentEditable={isEditing}
          onBlur={(e) => onEdit?.('title', e.currentTarget.textContent || '')}
          sx={{ 
            fontWeight: 'bold',
            minHeight: isEditing ? 24 : 'auto'
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            color="text.secondary"
            contentEditable={isEditing}
            onBlur={(e) => onEdit?.('description', e.currentTarget.textContent || '')}
            sx={{ 
              minHeight: isEditing ? 48 : 'auto'
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </MuiCard>
  );
};
