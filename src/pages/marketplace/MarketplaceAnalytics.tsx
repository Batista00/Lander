import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  Visibility,
  AttachMoney,
} from '@mui/icons-material';

interface AnalyticsSummary {
  totalRevenue: number;
  totalSales: number;
  totalViews: number;
  conversionRate: number;
}

interface TopTemplate {
  id: string;
  title: string;
  sales: number;
  revenue: number;
  views: number;
  conversionRate: number;
}

const mockSummary: AnalyticsSummary = {
  totalRevenue: 12599.99,
  totalSales: 421,
  totalViews: 15678,
  conversionRate: 2.68,
};

const mockTopTemplates: TopTemplate[] = [
  {
    id: '1',
    title: 'Business Pro Template',
    sales: 156,
    revenue: 4679.44,
    views: 3245,
    conversionRate: 4.81,
  },
  {
    id: '2',
    title: 'E-commerce Starter',
    sales: 98,
    revenue: 4899.02,
    views: 2156,
    conversionRate: 4.55,
  },
  {
    id: '3',
    title: 'Portfolio Master',
    sales: 87,
    revenue: 2174.13,
    views: 1987,
    conversionRate: 4.38,
  },
];

export const MarketplaceAnalytics: React.FC = () => {
  const StatCard = ({ title, value, icon }: {
    title: string;
    value: string;
    icon: React.ReactNode;
  }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 1, mr: 2 }}>
            {icon}
          </Box>
          <Typography color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Métricas y estadísticas de tus templates
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Resumen de Estadísticas */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ingresos Totales"
            value={`$${mockSummary.totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ventas Totales"
            value={mockSummary.totalSales.toString()}
            icon={<ShoppingCart />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Vistas Totales"
            value={mockSummary.totalViews.toLocaleString()}
            icon={<Visibility />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tasa de Conversión"
            value={`${mockSummary.conversionRate}%`}
            icon={<TrendingUp />}
          />
        </Grid>

        {/* Gráficos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ventas por Período
            </Typography>
            {/* Aquí iría un gráfico de ventas */}
          </Paper>
        </Grid>

        {/* Tabla de Templates más Vendidos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Templates Más Vendidos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Template</TableCell>
                    <TableCell align="right">Ventas</TableCell>
                    <TableCell align="right">Ingresos</TableCell>
                    <TableCell align="right">Vistas</TableCell>
                    <TableCell align="right">Conversión</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTopTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.title}</TableCell>
                      <TableCell align="right">{template.sales}</TableCell>
                      <TableCell align="right">${template.revenue.toFixed(2)}</TableCell>
                      <TableCell align="right">{template.views.toLocaleString()}</TableCell>
                      <TableCell align="right">{template.conversionRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Gráfico de Fuentes de Tráfico */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fuentes de Tráfico
            </Typography>
            {/* Aquí iría un gráfico de fuentes de tráfico */}
          </Paper>
        </Grid>

        {/* Gráfico de Categorías Populares */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Categorías Populares
            </Typography>
            {/* Aquí iría un gráfico de categorías */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
