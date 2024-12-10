import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Avatar,
  Tooltip,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  EmojiEvents,
  Storefront,
  Star,
  TrendingUp,
  LocalOffer,
  People,
  Favorite,
  ThumbUp,
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  rewards: {
    type: 'points' | 'badge' | 'discount' | 'feature';
    value: string | number;
    description: string;
  }[];
}

const achievements: Achievement[] = [
  {
    id: 'first_sale',
    title: 'Primera Venta',
    description: 'Realiza tu primera venta en el marketplace',
    icon: <Storefront color="primary" />,
    points: 100,
    progress: 0,
    maxProgress: 1,
    completed: false,
    rewards: [
      { type: 'points', value: 100, description: 'Puntos de recompensa' },
      { type: 'badge', value: 'Vendedor Novato', description: 'Badge exclusivo' },
    ],
  },
  {
    id: 'popular_template',
    title: 'Template Popular',
    description: 'Consigue 100 ventas en un solo template',
    icon: <Star color="secondary" />,
    points: 500,
    progress: 45,
    maxProgress: 100,
    completed: false,
    rewards: [
      { type: 'points', value: 500, description: 'Puntos de recompensa' },
      { type: 'discount', value: 15, description: '15% de descuento en comisiones' },
    ],
  },
  {
    id: 'trending_creator',
    title: 'Creador Trending',
    description: 'Aparece en la sección de tendencias',
    icon: <TrendingUp color="success" />,
    points: 300,
    progress: 1,
    maxProgress: 1,
    completed: true,
    rewards: [
      { type: 'points', value: 300, description: 'Puntos de recompensa' },
      { type: 'feature', value: 'Destacado', description: 'Promoción destacada por 1 semana' },
    ],
  },
];

interface UserProgress {
  level: number;
  currentPoints: number;
  nextLevelPoints: number;
  totalAchievements: number;
  completedAchievements: number;
}

const userProgress: UserProgress = {
  level: 5,
  currentPoints: 1250,
  nextLevelPoints: 2000,
  totalAchievements: achievements.length,
  completedAchievements: achievements.filter(a => a.completed).length,
};

export const AchievementSystem: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = React.useState<Achievement | null>(null);

  return (
    <Box sx={{ py: 4 }}>
      {/* Progress Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Avatar
                      sx={{ width: 22, height: 22, bgcolor: 'primary.main' }}
                    >
                      {userProgress.level}
                    </Avatar>
                  }
                >
                  <Avatar
                    sx={{ width: 80, height: 80, bgcolor: 'secondary.main' }}
                  >
                    <EmojiEvents sx={{ fontSize: 40 }} />
                  </Avatar>
                </Badge>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Nivel {userProgress.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userProgress.currentPoints} puntos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Progreso al siguiente nivel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userProgress.currentPoints} / {userProgress.nextLevelPoints}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(userProgress.currentPoints / userProgress.nextLevelPoints) * 100}
                  sx={{ height: 8, borderRadius: 4, mt: 1 }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{userProgress.completedAchievements}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Logros Completados
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{userProgress.totalAchievements}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Logros Totales
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{userProgress.currentPoints}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Puntos Totales
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: achievement.completed ? 'success.main' : 'action.disabled',
                      mr: 2,
                    }}
                  >
                    {achievement.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{achievement.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.points} puntos
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" paragraph>
                  {achievement.description}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progreso
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.progress}/{achievement.maxProgress}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(achievement.progress / achievement.maxProgress) * 100}
                    color={achievement.completed ? "success" : "primary"}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Achievement Detail Dialog */}
      <Dialog
        open={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedAchievement && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {selectedAchievement.icon}
                </Avatar>
                <Box>
                  {selectedAchievement.title}
                  <Typography variant="body2" color="text.secondary">
                    {selectedAchievement.points} puntos
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedAchievement.description}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Recompensas
              </Typography>
              <Grid container spacing={2}>
                {selectedAchievement.rewards.map((reward, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                            {reward.type === 'points' && <Star />}
                            {reward.type === 'badge' && <EmojiEvents />}
                            {reward.type === 'discount' && <LocalOffer />}
                            {reward.type === 'feature' && <TrendingUp />}
                          </Avatar>
                          <Box>
                            <Typography variant="body1">
                              {reward.type === 'points' && `${reward.value} puntos`}
                              {reward.type === 'badge' && `Badge: ${reward.value}`}
                              {reward.type === 'discount' && `${reward.value}% descuento`}
                              {reward.type === 'feature' && `${reward.value}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {reward.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};
