import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  IconButton,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  FilterList,
} from '@mui/icons-material';
import { Template, MarketplaceFilters } from '../../types/marketplace';
import { toast } from 'sonner';

const ProductGrid = () => {
  const { 
    templates,
    loadTemplates,
    loading,
    error 
  } = useMarketplace();

  const [filters, setFilters] = useState<MarketplaceFilters>({
    category: '',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    sortBy: 'newest',
    sortOrder: 'desc',
    page: 1,
    limit: 12,
    search: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadTemplates(filters);
  }, [filters, loadTemplates]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: event.target.value }));
  };

  const handleCategoryChange = (event: any) => {
    setFilters(prev => ({ ...prev, category: event.target.value }));
  };

  const handleSortChange = (event: any) => {
    setFilters(prev => ({ ...prev, sortBy: event.target.value }));
  };

  const handlePriceRangeChange = (event: any, newValue: number | number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        min: Array.isArray(newValue) ? newValue[0] : 0,
        max: Array.isArray(newValue) ? newValue[1] : newValue
      }
    }));
  };

  const handleRatingChange = (event: any, newValue: number | null) => {
    setFilters(prev => ({ ...prev, rating: newValue || 0 }));
  };

  const toggleFavorite = (templateId: string) => {
    if (favorites.includes(templateId)) {
      setFavorites(prev => prev.filter(id => id !== templateId));
      toast.success('Eliminado de favoritos');
    } else {
      setFavorites(prev => [...prev, templateId]);
      toast.success('Agregado a favoritos');
    }
  };

  const addToCart = (template: Template) => {
    // Aquí implementaremos la lógica del carrito
    toast.success('Agregado al carrito');
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search and Filters Bar */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar templates..."
              value={filters.search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={filters.category}
                  label="Categoría"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="landing">Landing Pages</MenuItem>
                  <MenuItem value="ecommerce">E-commerce</MenuItem>
                  <MenuItem value="blog">Blog</MenuItem>
                  <MenuItem value="portfolio">Portfolio</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Ordenar por"
                  onChange={handleSortChange}
                >
                  <MenuItem value="newest">Más recientes</MenuItem>
                  <MenuItem value="price">Precio</MenuItem>
                  <MenuItem value="rating">Calificación</MenuItem>
                  <MenuItem value="sales">Ventas</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={() => setShowFilters(!showFilters)}>
                <FilterList />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>Rango de Precio</Typography>
                <Slider
                  value={[filters.priceRange.min, filters.priceRange.max]}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>Calificación mínima</Typography>
                <Rating
                  value={filters.rating}
                  onChange={handleRatingChange}
                  precision={0.5}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {loading ? (
          // Loading skeletons
          Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : templates.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">
              No se encontraron templates que coincidan con los filtros seleccionados.
            </Alert>
          </Grid>
        ) : (
          templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={template.previewUrl}
                  alt={template.title}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" component={Link} to={`/dashboard/marketplace/product/${template.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {template.title}
                    </Typography>
                    <IconButton onClick={() => toggleFavorite(template.id)}>
                      {favorites.includes(template.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {template.category}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={template.rating || 0} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({template.rating || 0})
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    {template.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ${template.price}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => addToCart(template)}
                    >
                      Comprar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
