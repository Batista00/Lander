import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster position="top-right" richColors />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
