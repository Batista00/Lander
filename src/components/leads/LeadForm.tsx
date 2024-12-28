import React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { LeadFormConfig, LeadFormField } from '@/types/leads';

interface LeadFormProps {
  config: LeadFormConfig;
  onSubmit: (data: Record<string, string>) => void;
  loading?: boolean;
}

export default function LeadForm({ config, onSubmit, loading = false }: LeadFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const renderField = (field: LeadFormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{
              required: field.required && 'Este campo es requerido',
              pattern: field.validation?.pattern ? {
                value: new RegExp(field.validation.pattern),
                message: field.validation.message
              } : undefined,
              minLength: field.validation?.minLength ? {
                value: field.validation.minLength,
                message: `Mínimo ${field.validation.minLength} caracteres`
              } : undefined,
              maxLength: field.validation?.maxLength ? {
                value: field.validation.maxLength,
                message: `Máximo ${field.validation.maxLength} caracteres`
              } : undefined,
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={value}
                onChange={onChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
                size="small"
                margin="normal"
              />
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required && 'Este campo es requerido' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                multiline
                rows={4}
                label={field.label}
                placeholder={field.placeholder}
                value={value}
                onChange={onChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
                size="small"
                margin="normal"
              />
            )}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required && 'Este campo es requerido' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                label={field.label}
                value={value}
                onChange={onChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
                size="small"
                margin="normal"
              >
                {field.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={false}
            rules={{ required: field.required && 'Este campo es requerido' }}
            render={({ field: { onChange, value } }) => (
              <FormControl 
                error={!!errors[field.name]}
                margin="normal"
                fullWidth
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value}
                      onChange={onChange}
                    />
                  }
                  label={field.label}
                />
                {errors[field.name] && (
                  <FormHelperText>{errors[field.name]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'radio':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required && 'Este campo es requerido' }}
            render={({ field: { onChange, value } }) => (
              <FormControl 
                error={!!errors[field.name]}
                margin="normal"
                fullWidth
              >
                <FormLabel>{field.label}</FormLabel>
                <RadioGroup value={value} onChange={onChange}>
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {errors[field.name] && (
                  <FormHelperText>{errors[field.name]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: '100%' }}
    >
      {config.fields.map((field) => (
        <Box key={field.name}>
          {renderField(field)}
        </Box>
      ))}
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Enviando...' : (config.submitButtonText || 'Enviar')}
      </Button>
    </Box>
  );
}
