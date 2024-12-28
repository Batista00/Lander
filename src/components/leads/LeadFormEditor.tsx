import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { LeadFormConfig, LeadFormField } from '@/types/leads';

const fieldTypes = [
  { value: 'text', label: 'Texto' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Teléfono' },
  { value: 'textarea', label: 'Área de texto' },
  { value: 'select', label: 'Selector' },
  { value: 'checkbox', label: 'Casilla de verificación' },
  { value: 'radio', label: 'Opción única' },
];

interface LeadFormEditorProps {
  config: LeadFormConfig;
  onChange: (config: LeadFormConfig) => void;
}

export default function LeadFormEditor({ config, onChange }: LeadFormEditorProps) {
  const [expandedField, setExpandedField] = useState<string | false>(false);

  const handleBasicConfigChange = (
    field: keyof Omit<LeadFormConfig, 'fields'>,
    value: any
  ) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleFieldChange = (index: number, field: keyof LeadFormField, value: any) => {
    const newFields = [...config.fields];
    newFields[index] = {
      ...newFields[index],
      [field]: value,
    };
    onChange({
      ...config,
      fields: newFields,
    });
  };

  const handleAddField = () => {
    const newField: LeadFormField = {
      name: `field_${config.fields.length + 1}`,
      label: 'Nuevo Campo',
      type: 'text',
      required: false,
    };
    onChange({
      ...config,
      fields: [...config.fields, newField],
    });
  };

  const handleDeleteField = (index: number) => {
    const newFields = config.fields.filter((_, i) => i !== index);
    onChange({
      ...config,
      fields: newFields,
    });
  };

  const handleOptionsChange = (index: number, options: string[]) => {
    handleFieldChange(index, 'options', options);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newFields = Array.from(config.fields);
    const [reorderedField] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, reorderedField);

    onChange({
      ...config,
      fields: newFields,
    });
  };

  const handleValidationChange = (
    index: number,
    field: keyof LeadFormField['validation'],
    value: any
  ) => {
    const newFields = [...config.fields];
    newFields[index] = {
      ...newFields[index],
      validation: {
        ...newFields[index].validation,
        [field]: value,
      },
    };
    onChange({
      ...config,
      fields: newFields,
    });
  };

  return (
    <Box>
      {/* Configuración básica */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Configuración básica
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título del formulario"
                value={config.title}
                onChange={(e) => handleBasicConfigChange('title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Descripción"
                value={config.description}
                onChange={(e) => handleBasicConfigChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Texto del botón"
                value={config.submitText}
                onChange={(e) => handleBasicConfigChange('submitText', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Diseño</InputLabel>
                <Select
                  value={config.layout}
                  label="Diseño"
                  onChange={(e) => handleBasicConfigChange('layout', e.target.value)}
                >
                  <MenuItem value="vertical">Vertical</MenuItem>
                  <MenuItem value="horizontal">Horizontal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Lista de campos */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Campos del formulario
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddField}
              variant="contained"
              size="small"
            >
              Agregar Campo
            </Button>
          </Box>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {config.fields.map((field, index) => (
                    <Draggable
                      key={field.name}
                      draggableId={field.name}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Accordion
                            expanded={expandedField === field.name}
                            onChange={() =>
                              setExpandedField(
                                expandedField === field.name ? false : field.name
                              )
                            }
                            sx={{ mb: 1 }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              {...provided.dragHandleProps}
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                width="100%"
                              >
                                <DragHandleIcon
                                  sx={{ mr: 1, color: 'text.secondary' }}
                                />
                                <Typography flex={1}>
                                  {field.label || 'Campo sin nombre'}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ mr: 2 }}
                                >
                                  {fieldTypes.find((t) => t.value === field.type)?.label}
                                </Typography>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Nombre del campo"
                                    value={field.name}
                                    onChange={(e) =>
                                      handleFieldChange(index, 'name', e.target.value)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Etiqueta"
                                    value={field.label}
                                    onChange={(e) =>
                                      handleFieldChange(index, 'label', e.target.value)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                    <InputLabel>Tipo</InputLabel>
                                    <Select
                                      value={field.type}
                                      label="Tipo"
                                      onChange={(e) =>
                                        handleFieldChange(index, 'type', e.target.value)
                                      }
                                    >
                                      {fieldTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                          {type.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Placeholder"
                                    value={field.placeholder}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        index,
                                        'placeholder',
                                        e.target.value
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={field.required}
                                        onChange={(e) =>
                                          handleFieldChange(
                                            index,
                                            'required',
                                            e.target.checked
                                          )
                                        }
                                      />
                                    }
                                    label="Campo requerido"
                                  />
                                </Grid>

                                {/* Opciones para select, checkbox y radio */}
                                {['select', 'checkbox', 'radio'].includes(field.type) && (
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Opciones
                                    </Typography>
                                    {field.options?.map((option, optionIndex) => (
                                      <Box
                                        key={optionIndex}
                                        display="flex"
                                        gap={1}
                                        mb={1}
                                      >
                                        <TextField
                                          fullWidth
                                          size="small"
                                          value={option}
                                          onChange={(e) => {
                                            const newOptions = [...(field.options || [])];
                                            newOptions[optionIndex] = e.target.value;
                                            handleOptionsChange(index, newOptions);
                                          }}
                                        />
                                        <IconButton
                                          size="small"
                                          onClick={() => {
                                            const newOptions = field.options?.filter(
                                              (_, i) => i !== optionIndex
                                            );
                                            handleOptionsChange(index, newOptions || []);
                                          }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </Box>
                                    ))}
                                    <Button
                                      startIcon={<AddIcon />}
                                      onClick={() => {
                                        const newOptions = [...(field.options || []), ''];
                                        handleOptionsChange(index, newOptions);
                                      }}
                                      size="small"
                                    >
                                      Agregar opción
                                    </Button>
                                  </Grid>
                                )}

                                {/* Validaciones */}
                                <Grid item xs={12}>
                                  <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                      <Typography>Validaciones</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Grid container spacing={2}>
                                        {field.type === 'text' && (
                                          <>
                                            <Grid item xs={12} sm={6}>
                                              <TextField
                                                fullWidth
                                                label="Longitud mínima"
                                                type="number"
                                                value={field.validation?.minLength || ''}
                                                onChange={(e) =>
                                                  handleValidationChange(
                                                    index,
                                                    'minLength',
                                                    parseInt(e.target.value)
                                                  )
                                                }
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                              <TextField
                                                fullWidth
                                                label="Longitud máxima"
                                                type="number"
                                                value={field.validation?.maxLength || ''}
                                                onChange={(e) =>
                                                  handleValidationChange(
                                                    index,
                                                    'maxLength',
                                                    parseInt(e.target.value)
                                                  )
                                                }
                                              />
                                            </Grid>
                                          </>
                                        )}
                                        <Grid item xs={12}>
                                          <TextField
                                            fullWidth
                                            label="Patrón de validación (RegExp)"
                                            value={field.validation?.pattern || ''}
                                            onChange={(e) =>
                                              handleValidationChange(
                                                index,
                                                'pattern',
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <TextField
                                            fullWidth
                                            label="Mensaje de error"
                                            value={field.validation?.message || ''}
                                            onChange={(e) =>
                                              handleValidationChange(
                                                index,
                                                'message',
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                  <Box display="flex" justifyContent="flex-end">
                                    <Button
                                      startIcon={<DeleteIcon />}
                                      onClick={() => handleDeleteField(index)}
                                      color="error"
                                    >
                                      Eliminar campo
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      {/* Configuración avanzada */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Configuración avanzada
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de redirección"
                value={config.redirectUrl}
                onChange={(e) => handleBasicConfigChange('redirectUrl', e.target.value)}
                helperText="URL a la que se redirigirá después del envío exitoso"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje de éxito"
                value={config.successMessage}
                onChange={(e) =>
                  handleBasicConfigChange('successMessage', e.target.value)
                }
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags"
                value={config.tags?.join(', ')}
                onChange={(e) =>
                  handleBasicConfigChange(
                    'tags',
                    e.target.value.split(',').map((tag) => tag.trim())
                  )
                }
                helperText="Separar tags con comas"
              />
            </Grid>
          </Grid>

          {/* Tracking */}
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Tracking
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.tracking?.enableGoogleAnalytics}
                      onChange={(e) =>
                        handleBasicConfigChange('tracking', {
                          ...config.tracking,
                          enableGoogleAnalytics: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Habilitar Google Analytics"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.tracking?.enableFacebookPixel}
                      onChange={(e) =>
                        handleBasicConfigChange('tracking', {
                          ...config.tracking,
                          enableFacebookPixel: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Habilitar Facebook Pixel"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Notificaciones */}
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Notificaciones
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Emails de notificación"
                  value={config.notifications?.email?.join(', ')}
                  onChange={(e) =>
                    handleBasicConfigChange('notifications', {
                      ...config.notifications,
                      email: e.target.value.split(',').map((email) => email.trim()),
                    })
                  }
                  helperText="Separar emails con comas"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Webhook URL"
                  value={config.notifications?.webhook}
                  onChange={(e) =>
                    handleBasicConfigChange('notifications', {
                      ...config.notifications,
                      webhook: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
