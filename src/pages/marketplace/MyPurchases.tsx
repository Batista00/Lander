import React, { useEffect, useState } from 'react';
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
  Tabs,
  Tab,
  Chip,
  Rating,
  Skeleton,
  Alert,
  Divider,
} from '@mui/material';
import {
  Download,
  AccessTime,
  CheckCircle,
  Error,
  Star,
} from '@mui/icons-material';
import { Order } from '../../types/marketplace';
import { toast } from 'sonner';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`purchases-tabpanel-${index}`}
      aria-labelledby={`purchases-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MyPurchases() {
  const { orders, loadOrders, loading, error } = useMarketplace();
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownload = (orderId: string) => {
    // Implementar lógica de descarga
    toast.success('Descarga iniciada');
  };

  const handleLeaveReview = (orderId: string) => {
    setSelectedOrder(orders.find(order => order.id === orderId) || null);
    // Implementar modal de reseña
  };

  const getStatusChip = (status: string) => {
    const statusConfig: Record<string, { color: "success" | "error" | "warning" | "default", icon: React.ReactNode }> = {
      completed: { color: "success", icon: <CheckCircle /> },
      pending: { color: "warning", icon: <AccessTime /> },
      failed: { color: "error", icon: <Error /> },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Chip
        icon={config.icon}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={config.color}
        size="small"
      />
    );
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
      <Typography variant="h4" gutterBottom>
        Mis Compras
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Todas" />
          <Tab label="Completadas" />
          <Tab label="Pendientes" />
        </Tabs>
      </Box>

      {loading ? (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Skeleton variant="rectangular" height={150} />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : orders.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No tienes compras realizadas aún.
        </Alert>
      ) : (
        <TabPanel value={tabValue} index={tabValue}>
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <CardMedia
                          component="img"
                          height="150"
                          image={order.template.previewUrl}
                          alt={order.template.title}
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6">
                            {order.template.title}
                          </Typography>
                          {getStatusChip(order.status)}
                        </Box>
                        <Typography color="text.secondary" gutterBottom>
                          Orden #{order.id} - {new Date(order.purchaseDate).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" color="primary" sx={{ mr: 2 }}>
                            ${order.amount}
                          </Typography>
                          {order.status === 'completed' && !order.reviewed && (
                            <Button
                              startIcon={<Star />}
                              variant="outlined"
                              size="small"
                              onClick={() => handleLeaveReview(order.id)}
                            >
                              Dejar Reseña
                            </Button>
                          )}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Vendedor: {order.template.developer.name}
                            </Typography>
                            {order.reviewed && (
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Rating value={order.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  Tu calificación
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          {order.status === 'completed' && (
                            <Button
                              startIcon={<Download />}
                              variant="contained"
                              onClick={() => handleDownload(order.id)}
                            >
                              Descargar
                            </Button>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      )}
    </Container>
  );
}
