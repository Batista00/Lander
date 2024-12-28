import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useComponents } from '@/contexts/ComponentContext';

interface FavoritesLibraryProps {
  onSelectComponent: (componentData: any) => void;
}

export const FavoritesLibrary: React.FC<FavoritesLibraryProps> = ({
  onSelectComponent,
}) => {
  const {
    library,
    favoritesLoading,
    getFavoritesByCategory,
    removeFromFavorites,
  } = useComponents();

  if (favoritesLoading) {
    return (
      <Box p={2}>
        <Typography>Cargando favoritos...</Typography>
      </Box>
    );
  }

  if (!library || library.favorites.length === 0) {
    return (
      <Box p={2}>
        <Typography>
          No tienes componentes favoritos. Guarda tus componentes más usados para acceder rápidamente a ellos.
        </Typography>
      </Box>
    );
  }

  const handleRemoveFavorite = async (componentId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    await removeFromFavorites(componentId);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {library.favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} key={favorite.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
              onClick={() => onSelectComponent(favorite)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    {favorite.name}
                  </Typography>
                  <Tooltip title="Eliminar de favoritos">
                    <IconButton
                      size="small"
                      onClick={(e) => handleRemoveFavorite(favorite.id, e)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {favorite.type}
                </Typography>
                {favorite.category && (
                  <Typography variant="caption" display="block" color="text.secondary">
                    Categoría: {favorite.category}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
