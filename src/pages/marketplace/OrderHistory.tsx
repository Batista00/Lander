import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  template: string;
  price: number;
  status: 'completed' | 'processing' | 'failed';
  downloadable: boolean;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-12-10',
    template: 'Business Pro Template',
    price: 29.99,
    status: 'completed',
    downloadable: true,
  },
  {
    id: 'ORD-002',
    date: '2024-12-09',
    template: 'E-commerce Starter',
    price: 49.99,
    status: 'completed',
    downloadable: true,
  },
  {
    id: 'ORD-003',
    date: '2024-12-08',
    template: 'Portfolio Master',
    price: 24.99,
    status: 'processing',
    downloadable: false,
  },
];

export const OrderHistory: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'processing':
        return 'Procesando';
      case 'failed':
        return 'Fallido';
      default:
        return status;
    }
  };

  const handleDownload = (orderId: string) => {
    // Implementar lógica de descarga
    console.log('Descargando orden:', orderId);
  };

  const handleViewDetails = (orderId: string) => {
    // Implementar vista de detalles
    console.log('Viendo detalles de orden:', orderId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Historial de Pedidos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tus compras y descarga tus templates
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Template</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.template}</TableCell>
                <TableCell>${order.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(order.status)}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {order.downloadable && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleDownload(order.id)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {mockOrders.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" gutterBottom>
            No tienes pedidos aún
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard/marketplace')}
          >
            Explorar Templates
          </Button>
        </Box>
      )}
    </Container>
  );
};
