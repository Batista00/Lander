import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Información de Pago', 'Revisión', 'Confirmación'];

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    // Aquí iría la lógica de procesamiento del pago
    navigate('/marketplace/orders');
  };

  const PaymentForm = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Método de Pago</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Tarjeta de Crédito"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {paymentMethod === 'credit' && (
          <>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Número de Tarjeta"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Fecha de Vencimiento"
                variant="outlined"
                placeholder="MM/AA"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="CVV"
                variant="outlined"
                type="password"
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Nombre en la Tarjeta"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const ReviewForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resumen del Pedido
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Business Pro Template
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Licencia: Estándar
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              $29.99
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Método de Pago
        </Typography>
        <Typography>
          {paymentMethod === 'credit' ? 'Tarjeta de Crédito' : 'PayPal'}
        </Typography>
      </Box>
    </Box>
  );

  const ConfirmationStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h5" gutterBottom>
        ¡Gracias por tu compra!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Tu pedido ha sido procesado exitosamente.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/marketplace/orders')}
        sx={{ mt: 4 }}
      >
        Ver Mis Pedidos
      </Button>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PaymentForm />;
      case 1:
        return <ReviewForm />;
      case 2:
        return <ConfirmationStep />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && activeStep !== 2 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Atrás
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleFinish}
            >
              Finalizar
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 2 ? 'Confirmar Pedido' : 'Siguiente'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
