import { SxProps } from '@mui/material';

export const greenGradientButton: SxProps = {
  background: 'linear-gradient(45deg, #1bb55e 30%, #1bb55e 90%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #1bb55e 30%, #1bb55e 90%)',
    opacity: 0.9
  }
};

export const greenOutlinedButton: SxProps = {
  border: '1px solid #1bb55e',
  color: '#1bb55e',
  '&:hover': {
    border: '1px solid #1bb55e',
    background: 'rgba(27, 181, 94, 0.04)'
  }
};
