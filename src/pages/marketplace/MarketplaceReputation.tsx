import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Star,
  Verified,
  Speed,
  ThumbUp,
  LocalShipping,
  SupportAgent,
} from '@mui/icons-material';

interface ReputationMetrics {
  overallRating: number;
  totalReviews: number;
  responseRate: number;
  shippingTime: number;
  customerSatisfaction: number;
  metrics: {
    [key: string]: number;
  };
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const mockMetrics: ReputationMetrics = {
  overallRating: 4.8,
  totalReviews: 256,
  responseRate: 98,
  shippingTime: 1.2,
  customerSatisfaction: 96,
  metrics: {
    '5 estrellas': 200,
    '4 estrellas': 40,
    '3 estrellas': 10,
    '2 estrellas': 4,
    '1 estrella': 2,
  },
};

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Juan Pérez',
    rating: 5,
    comment: 'Excelente producto y muy buena atención. El envío fue rápido y el producto llegó en perfectas condiciones.',
    date: '2024-01-15',
    helpful: 12,
  },
  {
    id: '2',
    author: 'María García',
    rating: 4,
    comment: 'Buen producto, cumple con lo prometido. La entrega tardó un poco más de lo esperado.',
    date: '2024-01-14',
    helpful: 8,
  },
];

export const MarketplaceReputation: React.FC = () => {
  const StatCard = ({ icon, title, value, subtitle }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle?: string;
  }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, mr: 2, color: 'white' }}>
            {icon}
          </Box>
          <Typography color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reputación del Vendedor
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ mr: 3 }}>
                <Typography variant="h3">{mockMetrics.overallRating}</Typography>
                <Rating value={mockMetrics.overallRating} readOnly precision={0.1} />
                <Typography variant="body2" color="text.secondary">
                  {mockMetrics.totalReviews} reseñas
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                {Object.entries(mockMetrics.metrics).reverse().map(([label, count]) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 80 }}>
                      {label}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(count / mockMetrics.totalReviews) * 100}
                      sx={{ flexGrow: 1, mx: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<Speed />}
                title="Tasa de Respuesta"
                value={`${mockMetrics.responseRate}%`}
                subtitle="Promedio últimos 30 días"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<LocalShipping />}
                title="Tiempo de Envío"
                value={`${mockMetrics.shippingTime} días`}
                subtitle="Promedio últimos 30 días"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                icon={<ThumbUp />}
                title="Satisfacción"
                value={`${mockMetrics.customerSatisfaction}%`}
                subtitle="Basado en reseñas"
              />
            </Grid>
          </Grid>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Últimas Reseñas
            </Typography>
            <List>
              {mockReviews.map((review, index) => (
                <React.Fragment key={review.id}>
                  {index > 0 && <Divider />}
                  <ListItem sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar>{review.author[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} component="div">
                          <Typography variant="subtitle1" component="span">{review.author}</Typography>
                          <Rating value={review.rating} size="small" readOnly />
                        </Box>
                      }
                      secondary={
                        <>
                          <Box component="div" sx={{ mb: 1 }}>
                            {review.comment}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} component="div">
                            <Typography variant="caption" color="text.secondary" component="span">
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                            <Chip
                              size="small"
                              icon={<ThumbUp fontSize="small" />}
                              label={`${review.helpful} útil`}
                            />
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Badges y Logros
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Verified />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Vendedor Verificado"
                  secondary="Identidad verificada y confiable"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Vendedor Elite"
                  secondary="Top 10% en satisfacción"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <SupportAgent />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Soporte Excepcional"
                  secondary="98% tasa de respuesta"
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Consejos para Mejorar
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Respuesta Rápida"
                  secondary="Mantén una alta tasa de respuesta contestando en menos de 24 horas"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Fotos de Calidad"
                  secondary="Agrega fotos de alta calidad a tus productos"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Descripción Detallada"
                  secondary="Proporciona descripciones completas y precisas"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
