"use client";

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating?: number;
  isPremium?: boolean;
  sales: number;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  category,
  imageUrl,
  rating = 0,
  isPremium = false,
  sales,
  seller,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/marketplace/product/${id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Chip
            label={`$${price}`}
            color="primary"
            size="small"
          />
        </Box>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={rating}
              readOnly
              precision={0.5}
              size="small"
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({rating})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={category}
              variant="outlined"
              size="small"
            />
            {isPremium && (
              <Chip
                label="Premium"
                color="secondary"
                size="small"
              />
            )}
            <Chip
              label={`${sales} ventas`}
              variant="outlined"
              size="small"
            />
            <Chip
              label={`por ${seller.name}`}
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
        <button className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          Vista previa
        </button>
        <button className="flex-1 rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50">
          Comprar
        </button>
      </Box>
    </Card>
  );
};
