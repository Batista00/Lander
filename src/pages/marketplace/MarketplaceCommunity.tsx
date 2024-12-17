import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Forum,
  ThumbUp,
  Comment,
  Share,
  Send,
  Favorite,
  Star,
} from '@mui/icons-material';

interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

const mockPosts: ForumPost[] = [
  {
    id: '1',
    author: {
      name: 'Juan Pérez',
      avatar: '/avatars/1.jpg',
    },
    title: '¿Cómo mejorar las ventas en el marketplace?',
    content: 'He estado vendiendo por 3 meses y quisiera compartir algunas estrategias que me han funcionado...',
    date: '2024-01-15',
    likes: 24,
    comments: 12,
    tags: ['ventas', 'consejos', 'estrategia'],
  },
  {
    id: '2',
    author: {
      name: 'María García',
      avatar: '/avatars/2.jpg',
    },
    title: 'Tips para mejorar las descripciones de productos',
    content: 'La clave está en ser detallado pero conciso. Aquí les comparto mi método...',
    date: '2024-01-14',
    likes: 18,
    comments: 8,
    tags: ['descripción', 'productos', 'marketing'],
  },
];

export const MarketplaceCommunity: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const PostCard = ({ post }: { post: ForumPost }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={post.author.avatar} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">{post.author.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(post.date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {post.tags.map((tag) => (
            <Button
              key={tag}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'lowercase' }}
            >
              #{tag}
            </Button>
          ))}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button startIcon={<ThumbUp />} size="small">
              {post.likes}
            </Button>
            <Button startIcon={<Comment />} size="small">
              {post.comments}
            </Button>
            <Button startIcon={<Share />} size="small">
              Compartir
            </Button>
          </Box>
          <Button variant="contained" size="small">
            Ver discusión
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Comunidad</Typography>
        <Button variant="contained" startIcon={<Forum />}>
          Nueva Publicación
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Destacados" />
              <Tab label="Recientes" />
              <Tab label="Más comentados" />
            </Tabs>
          </Paper>

          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Contribuidores
            </Typography>
            <List>
              {[1, 2, 3].map((i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>{i}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Usuario ${i}`}
                    secondary={`${i * 10} contribuciones`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <Star color="primary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Temas Populares
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['ventas', 'marketing', 'consejos', 'productos', 'estrategia'].map((tag) => (
                <Button
                  key={tag}
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: 'lowercase' }}
                >
                  #{tag}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
