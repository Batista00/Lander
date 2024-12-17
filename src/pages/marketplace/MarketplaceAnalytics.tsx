import React, { useEffect, useState } from 'react';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  Star,
  AttachMoney,
  Group,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
}

export const MarketplaceAnalytics = () => {
  const { analytics, loadAnalytics, loading, error } = useMarketplace();
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    loadAnalytics(timeRange);
  }, [loadAnalytics, timeRange]);

  const StatCard = ({ title, value, trend, icon }: StatCardProps) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
          {icon}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend > 0 ? (
            <ArrowUpward sx={{ color: 'success.main', mr: 1 }} />
          ) : (
            <ArrowDownward sx={{ color: 'error.main', mr: 1 }} />
          )}
          <Typography
            variant="body2"
            color={trend > 0 ? 'success.main' : 'error.main'}
          >
            {Math.abs(trend)}% vs periodo anterior
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (loading || !analytics?.data) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="rectangular" height={60} />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  const data = analytics.data;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Analytics del Marketplace
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Periodo</InputLabel>
          <Select
            value={timeRange}
            label="Periodo"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7d">Últimos 7 días</MenuItem>
            <MenuItem value="30d">Últimos 30 días</MenuItem>
            <MenuItem value="90d">Últimos 90 días</MenuItem>
            <MenuItem value="1y">Último año</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ventas Totales"
            value={`$${data.totalSales.toLocaleString()}`}
            trend={data.salesTrend}
            icon={<AttachMoney sx={{ fontSize: 40, color: 'primary.main' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Órdenes"
            value={data.totalOrders}
            trend={data.ordersTrend}
            icon={<ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Calificación Promedio"
            value={data.averageRating.toFixed(1)}
            trend={data.ratingTrend}
            icon={<Star sx={{ fontSize: 40, color: 'primary.main' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Usuarios Totales"
            value={data.totalUsers}
            trend={data.usersTrend}
            icon={<Group sx={{ fontSize: 40, color: 'primary.main' }} />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ventas por Día
              </Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                {data.salesData.length > 0 ? (
                  <ResponsiveContainer>
                    <LineChart data={data.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="amount" stroke="#1976d2" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography color="text.secondary">No hay datos disponibles</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Órdenes por Día
              </Typography>
              <Box sx={{ height: 300, width: '100%' }}>
                {data.ordersData.length > 0 ? (
                  <ResponsiveContainer>
                    <BarChart data={data.ordersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="count" fill="#1976d2" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography color="text.secondary">No hay datos disponibles</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {data.topTemplates.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Templates Más Vendidos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Template</TableCell>
                    <TableCell align="right">Ventas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.topTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.title}</TableCell>
                      <TableCell align="right">{template.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
