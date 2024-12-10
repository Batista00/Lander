import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  getSellerAnalytics,
  getSellerOrders,
  getTemplates,
  Template,
  Order
} from '../../services/marketplace';
import { useAuth } from '../../contexts/AuthContext';
import { InitializeMarketplace } from '../../components/marketplace/InitializeMarketplace';

export const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{ totalSales: number; totalTemplates: number; totalOrders: number; } | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.uid) return;

      try {
        setLoading(true);
        setError(null);
        const [analyticsData, ordersData, templatesData] = await Promise.all([
          getSellerAnalytics(user.uid),
          getSellerOrders(user.uid),
          getTemplates()
        ]);

        setAnalytics(analyticsData);
        setRecentOrders(ordersData.slice(0, 5));
        setTemplates(templatesData.filter(t => t.sellerId === user.uid));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si no hay templates ni órdenes, mostrar el componente de inicialización
  if (!templates.length && !recentOrders.length) {
    return <InitializeMarketplace />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Panel de Vendedor
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/dashboard/marketplace/templates/create')}
        >
          Crear Nuevo Template
        </Button>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        {/* Estadísticas */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ventas Totales
            </Typography>
            <Typography variant="h4">
              ${analytics?.totalSales.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Templates Publicados
            </Typography>
            <Typography variant="h4">
              {analytics?.totalTemplates}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Órdenes Completadas
            </Typography>
            <Typography variant="h4">
              {analytics?.totalOrders}
            </Typography>
          </Paper>
        </Grid>

        {/* Órdenes Recientes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Órdenes Recientes
              </Typography>
              <List>
                {recentOrders.map((order) => (
                  <ListItem key={order.id}>
                    <ListItemText
                      primary={`Orden #${order.id.slice(0, 8)}`}
                      secondary={`$${order.price} - ${order.status}`}
                    />
                  </ListItem>
                ))}
              </List>
              {recentOrders.length === 0 && (
                <Typography color="textSecondary" align="center">
                  No hay órdenes recientes
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Templates */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mis Templates
              </Typography>
              <List>
                {templates.map((template) => (
                  <ListItem
                    key={template.id}
                    button
                    onClick={() => navigate(`/dashboard/marketplace/templates/${template.id}`)}
                  >
                    <ListItemText
                      primary={template.title}
                      secondary={`$${template.price} - ${template.status}`}
                    />
                  </ListItem>
                ))}
              </List>
              {templates.length === 0 && (
                <Typography color="textSecondary" align="center">
                  No tienes templates publicados
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
