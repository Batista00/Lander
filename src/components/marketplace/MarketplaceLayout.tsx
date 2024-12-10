import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Badge,
  Breadcrumbs,
  Link,
  Container,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Store,
  Category,
  Dashboard,
  ShoppingCart,
  Favorite,
  History,
} from '@mui/icons-material';
import { MarketplaceSearch } from './MarketplaceSearch';

export const MarketplaceLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState(0);

  const tabs = [
    { label: 'Explorar', icon: <Store />, path: '/dashboard/marketplace' },
    { label: 'Categorías', icon: <Category />, path: '/dashboard/marketplace/categories' },
    { label: 'Panel de Vendedor', icon: <Dashboard />, path: '/dashboard/marketplace/seller-dashboard' },
    { label: 'Carrito', icon: <ShoppingCart />, path: '/dashboard/marketplace/cart' },
    { label: 'Lista de Deseos', icon: <Favorite />, path: '/dashboard/marketplace/wishlist' },
    { label: 'Historial', icon: <History />, path: '/dashboard/marketplace/orders' },
  ];

  // Actualizar la pestaña activa basada en la ruta actual
  React.useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabs.findIndex(tab => tab.path === currentPath);
    if (tabIndex !== -1) {
      setCurrentTab(tabIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    navigate(tabs[newValue].path);
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = paths.map((path, index) => {
      const to = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1);
      
      return (
        <Link
          key={to}
          color="inherit"
          href={to}
          onClick={(e) => {
            e.preventDefault();
            navigate(to);
          }}
        >
          {name}
        </Link>
      );
    });

    return breadcrumbs;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Barra Superior del Marketplace */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <MarketplaceSearch />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Store />}
            onClick={() => navigate('/dashboard/marketplace/seller-dashboard/templates/create')}
          >
            Vender Template
          </Button>
        </Box>
      </Box>

      {/* Navegación por Pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2 }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 3 }}>
            {getBreadcrumbs()}
          </Breadcrumbs>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
