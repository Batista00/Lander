import React from 'react';
import { Box, Button } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit } from 'lucide-react';

interface PreviewLayoutProps {
  children: React.ReactNode;
}

export const PreviewLayout: React.FC<PreviewLayoutProps> = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      position: 'relative'
    }}>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        p: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        zIndex: 1000
      }}>
        <Link to={`/dashboard/landing-pages/editor/${id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            sx={{ bgcolor: '#00DC8F', '&:hover': { bgcolor: '#00DC8F/90' } }}
          >
            Editar
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
