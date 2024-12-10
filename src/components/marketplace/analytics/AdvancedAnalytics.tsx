import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  ButtonGroup,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download,
  Info,
  TrendingUp,
  TrendingDown,
  Timeline,
} from '@mui/icons-material';

// Mock data
const salesData = [
  { month: 'Ene', sales: 65, revenue: 4200, visitors: 1200 },
  { month: 'Feb', sales: 59, revenue: 3800, visitors: 1100 },
  { month: 'Mar', sales: 80, revenue: 5200, visitors: 1400 },
  { month: 'Abr', sales: 81, revenue: 5300, visitors: 1300 },
  { month: 'May', sales: 56, revenue: 3600, visitors: 1000 },
  { month: 'Jun', sales: 55, revenue: 3500, visitors: 950 },
  { month: 'Jul', sales: 40, revenue: 2600, visitors: 800 },
];

const visitorSourceData = [
  { name: 'Búsqueda Directa', value: 400 },
  { name: 'Redes Sociales', value: 300 },
  { name: 'Referencias', value: 300 },
  { name: 'Email', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: number;
  period?: string;
  info?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  period = 'vs mes anterior',
  info,
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {info && (
          <Tooltip title={info}>
            <IconButton size="small">
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        {change > 0 ? (
          <TrendingUp color="success" fontSize="small" />
        ) : (
          <TrendingDown color="error" fontSize="small" />
        )}
        <Typography
          variant="body2"
          color={change > 0 ? 'success.main' : 'error.main'}
          sx={{ ml: 1 }}
        >
          {Math.abs(change)}%
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {period}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export const AdvancedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<'week' | 'month' | 'year'>('month');

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Análisis Avanzado</Typography>
        <Box>
          <ButtonGroup variant="outlined" size="small" sx={{ mr: 2 }}>
            <Button
              onClick={() => setTimeRange('week')}
              variant={timeRange === 'week' ? 'contained' : 'outlined'}
            >
              Semana
            </Button>
            <Button
              onClick={() => setTimeRange('month')}
              variant={timeRange === 'month' ? 'contained' : 'outlined'}
            >
              Mes
            </Button>
            <Button
              onClick={() => setTimeRange('year')}
              variant={timeRange === 'year' ? 'contained' : 'outlined'}
            >
              Año
            </Button>
          </ButtonGroup>
          <Button
            variant="contained"
            startIcon={<Download />}
          >
            Exportar Datos
          </Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Ingresos Totales"
            value="$28,200"
            change={12.5}
            info="Ingresos totales generados por ventas de templates"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Templates Vendidos"
            value="436"
            change={-5.2}
            info="Número total de templates vendidos"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Visitantes Únicos"
            value="8,742"
            change={8.1}
            info="Número de visitantes únicos en tus templates"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Tasa de Conversión"
            value="4.8%"
            change={1.2}
            info="Porcentaje de visitantes que realizan una compra"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Ventas y Visitantes"
              action={
                <Tooltip title="Comparativa de ventas y visitantes a lo largo del tiempo">
                  <IconButton>
                    <Info />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="Ventas"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="visitors"
                    stroke="#82ca9d"
                    name="Visitantes"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Fuentes de Tráfico"
              action={
                <Tooltip title="Distribución de las fuentes de tráfico">
                  <IconButton>
                    <Info />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={visitorSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {visitorSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Templates Más Vendidos"
              action={
                <Button
                  variant="text"
                  endIcon={<Timeline />}
                >
                  Ver Todos
                </Button>
              }
            />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Template</TableCell>
                    <TableCell align="right">Ventas</TableCell>
                    <TableCell align="right">Ingresos</TableCell>
                    <TableCell align="right">Conversión</TableCell>
                    <TableCell align="right">Tendencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Business Pro</TableCell>
                    <TableCell align="right">145</TableCell>
                    <TableCell align="right">$4,350</TableCell>
                    <TableCell align="right">5.2%</TableCell>
                    <TableCell align="right">
                      <TrendingUp color="success" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Portfolio Plus</TableCell>
                    <TableCell align="right">98</TableCell>
                    <TableCell align="right">$2,940</TableCell>
                    <TableCell align="right">4.8%</TableCell>
                    <TableCell align="right">
                      <TrendingDown color="error" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
