import React from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Download, TrendingUp, People, AttachMoney } from '@mui/icons-material';

interface SalesData {
  date: string;
  sales: number;
  revenue: number;
  visitors: number;
}

interface TopTemplate {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  rating: number;
}

const mockSalesData: SalesData[] = [
  { date: '2024-01', sales: 45, revenue: 1350, visitors: 1200 },
  { date: '2024-02', sales: 52, revenue: 1560, visitors: 1400 },
  { date: '2024-03', sales: 61, revenue: 1830, visitors: 1600 },
  // Añadir más datos según necesidad
];

const mockTopTemplates: TopTemplate[] = [
  {
    id: '1',
    name: 'Business Pro',
    sales: 120,
    revenue: 3600,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Portfolio Plus',
    sales: 95,
    revenue: 2850,
    rating: 4.6,
  },
  // Añadir más templates según necesidad
];

export const SellerDashboard: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Panel de Vendedor</Typography>
        <Button
          variant="contained"
          startIcon={<Download />}
          color="primary"
        >
          Exportar Reporte
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney color="primary" sx={{ fontSize: 40 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4">$6,740</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingresos Totales
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp color="success" sx={{ fontSize: 40 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4">158</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ventas Totales
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <People color="info" sx={{ fontSize: 40 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4">4,200</Typography>
                <Typography variant="body2" color="text.secondary">
                  Visitantes
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp color="warning" sx={{ fontSize: 40 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h4">4.7</Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating Promedio
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ventas Mensuales
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ingresos vs Visitantes
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#1976d2" />
                <Line type="monotone" dataKey="visitors" stroke="#2e7d32" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Top Templates Table */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Templates Más Vendidos
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Ventas</TableCell>
                  <TableCell align="right">Ingresos</TableCell>
                  <TableCell align="right">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockTopTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>{template.name}</TableCell>
                    <TableCell align="right">{template.sales}</TableCell>
                    <TableCell align="right">${template.revenue}</TableCell>
                    <TableCell align="right">{template.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
