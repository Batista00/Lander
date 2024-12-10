import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Badge,
  Breadcrumbs,
  Link,
  Container,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Store,
  Category,
  Dashboard,
  ShoppingCart,
  Favorite,
  History,
  Person,
  Settings,
  Search,
} from '@mui/icons-material';
import { MarketplaceSearch } from './MarketplaceSearch';

const drawerWidth = 240;

export const MarketplaceLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Explorar', icon: <Store />, path: '/marketplace' },
    { text: 'Categorías', icon: <Category />, path: '/marketplace/categories' },
    { text: 'Panel de Vendedor', icon: <Dashboard />, path: '/marketplace/seller-dashboard' },
    { text: 'Carrito', icon: <ShoppingCart />, path: '/marketplace/cart' },
    { text: 'Lista de Deseos', icon: <Favorite />, path: '/marketplace/wishlist' },
    { text: 'Historial', icon: <History />, path: '/marketplace/orders' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Marketplace
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <MarketplaceSearch />
            
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                color: 'white',
                '& .MuiBreadcrumbs-separator': { color: 'white' },
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {getBreadcrumbs()}
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              color="secondary"
              startIcon={<Store />}
              onClick={() => navigate('/marketplace/seller-dashboard/templates/create')}
            >
              Vender Template
            </Button>

            <IconButton
              onClick={() => navigate('/marketplace/seller-dashboard/settings')}
              sx={{ ml: 1 }}
            >
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
