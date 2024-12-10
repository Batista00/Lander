import React from 'react';
import { Box, Card, Typography, LinearProgress, Grid, Tooltip } from '@mui/material';
import { Diamond, EmojiEvents, LocalOffer, Storefront } from '@mui/icons-material';

interface RewardLevel {
  name: string;
  points: number;
  benefits: string[];
  icon: React.ReactNode;
}

const rewardLevels: RewardLevel[] = [
  {
    name: 'Bronze',
    points: 100,
    benefits: [
      '5% descuento adicional',
      'Acceso anticipado a nuevos templates',
    ],
    icon: <EmojiEvents color="action" />
  },
  {
    name: 'Silver',
    points: 500,
    benefits: [
      '10% descuento adicional',
      'Templates exclusivos mensuales',
      'Soporte prioritario',
    ],
    icon: <EmojiEvents color="primary" />
  },
  {
    name: 'Gold',
    points: 1000,
    benefits: [
      '15% descuento adicional',
      'Acceso a eventos exclusivos',
      'Mentorías mensuales',
      'Promoción destacada',
    ],
    icon: <Diamond color="secondary" />
  }
];

interface RewardsSystemProps {
  currentPoints: number;
  totalEarned: number;
  salesCount: number;
}

export const RewardsSystem: React.FC<RewardsSystemProps> = ({
  currentPoints,
  totalEarned,
  salesCount
}) => {
  const getCurrentLevel = () => {
    let currentLevel = rewardLevels[0];
    for (const level of rewardLevels) {
      if (currentPoints >= level.points) {
        currentLevel = level;
      } else {
        break;
      }
    }
    return currentLevel;
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const currentIndex = rewardLevels.findIndex(level => level.name === currentLevel.name);
    return rewardLevels[currentIndex + 1] || null;
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Programa de Recompensas
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {currentLevel.icon}
              <Typography variant="h5" sx={{ ml: 2 }}>
                Nivel {currentLevel.name}
              </Typography>
            </Box>

            {nextLevel && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Progreso hacia {nextLevel.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(currentPoints / nextLevel.points) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {currentPoints}/{nextLevel.points} puntos
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <LocalOffer color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6">{currentPoints}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Puntos Actuales
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Storefront color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h6">${totalEarned}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ganancias Totales
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <EmojiEvents color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6">{salesCount}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Templates Vendidos
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Beneficios Actuales
            </Typography>
            <Box sx={{ mt: 2 }}>
              {currentLevel.benefits.map((benefit, index) => (
                <Tooltip key={index} title="Beneficio Activo">
                  <Typography
                    variant="body1"
                    sx={{
                      py: 1,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'success.main'
                    }}
                  >
                    • {benefit}
                  </Typography>
                </Tooltip>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
