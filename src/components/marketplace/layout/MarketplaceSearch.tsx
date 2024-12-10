import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Popper,
  Fade,
  ClickAwayListener,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp,
  History,
  Clear,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'template' | 'category' | 'seller';
  subtitle: string;
}

export const MarketplaceSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [recentSearches] = useState<string[]>([
    'Landing Page Templates',
    'E-commerce Templates',
    'Portfolio Designs',
  ]);
  const [trendingSearches] = useState<string[]>([
    'React Templates',
    'Responsive Designs',
    'Business Templates',
  ]);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/marketplace/search?q=${encodeURIComponent(searchTerm)}`);
      setAnchorEl(null);
    }
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ position: 'relative', maxWidth: 600, width: '100%' }}>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSearchClick}
          placeholder="Buscar templates, categorías o vendedores..."
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm('')}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        style={{ width: anchorEl?.clientWidth, zIndex: 1400 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                elevation={3}
                sx={{
                  mt: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {!searchTerm && (
                  <>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Búsquedas Recientes
                      </Typography>
                      <List dense>
                        {recentSearches.map((search, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => {
                              setSearchTerm(search);
                              handleSearch(new Event('submit') as any);
                            }}
                          >
                            <ListItemIcon>
                              <History fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={search} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tendencias
                      </Typography>
                      <List dense>
                        {trendingSearches.map((search, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => {
                              setSearchTerm(search);
                              handleSearch(new Event('submit') as any);
                            }}
                          >
                            <ListItemIcon>
                              <TrendingUp fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={search} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </>
                )}

                {searchTerm && (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Sugerencias
                    </Typography>
                    <List dense>
                      <ListItem
                        button
                        onClick={() => {
                          navigate(`/marketplace/search?q=${encodeURIComponent(searchTerm)}`);
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <SearchIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Buscar "${searchTerm}"`}
                          secondary="Ver todos los resultados"
                        />
                      </ListItem>
                    </List>
                  </Box>
                )}
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};
