import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent
} from '@mui/material';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  'Landing Pages',
  'Dashboards',
  'E-commerce',
  'Portfolios',
  'Blogs',
  'Admin Panels'
];

interface TemplateForm {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  features: string[];
  requirements: string[];
  includes: string[];
  compatibleWith: string[];
  version: string;
}

export const CreateTemplate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>('');
  const [templateFileName, setTemplateFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentTag, setCurrentTag] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentInclude, setCurrentInclude] = useState('');
  const [currentCompatible, setCurrentCompatible] = useState('');

  const [formData, setFormData] = useState<TemplateForm>({
    title: '',
    description: '',
    price: 0,
    category: '',
    tags: [],
    features: [],
    requirements: [],
    includes: [],
    compatibleWith: [],
    version: '1.0.0'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setFormData(prev => ({
      ...prev,
      category: event.target.value
    }));
  };

  const handlePreviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast('Por favor sube una imagen válida', { type: 'error' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast('La imagen no debe superar los 5MB', { type: 'error' });
      return;
    }

    setPreviewFile(file);
    setPreviewFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    toast('Imagen de preview subida correctamente', { type: 'success' });
  };

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast('El archivo no debe superar los 50MB', { type: 'error' });
      return;
    }

    setTemplateFile(file);
    setTemplateFileName(file.name);
    toast('Archivo de template subido correctamente', { type: 'success' });
  };

  const handleAddItem = (type: keyof TemplateForm, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      setter('');
    }
  };

  const handleRemoveItem = (type: keyof TemplateForm, index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const generateTemplateId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + 
      '-' + 
      Math.random().toString(36).substring(2, 7);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast('Debes iniciar sesión para crear un template', {
        type: 'error'
      });
      return;
    }

    // Validar campos requeridos
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast('Por favor completa todos los campos requeridos', {
        type: 'error'
      });
      return;
    }

    // Validar archivos
    if (!previewFile) {
      toast('Por favor sube una imagen de preview', {
        type: 'error'
      });
      return;
    }

    if (!templateFile) {
      toast('Por favor sube el archivo del template', {
        type: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      // Generar un ID único basado en el título
      const templateId = generateTemplateId(formData.title);

      // Configuración de metadata para los archivos
      const metadata = {
        contentType: previewFile.type,
        customMetadata: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000'
        }
      };

      // Subir preview image
      const previewRef = ref(storage, `templates/${templateId}/preview.${previewFile.name.split('.').pop()}`);
      await uploadBytes(previewRef, previewFile, metadata);
      const previewUrl = await getDownloadURL(previewRef);

      // Subir template file con metadata específica
      const templateRef = ref(storage, `templates/${templateId}/${templateFile.name}`);
      const templateMetadata = {
        contentType: templateFile.type || 'application/octet-stream',
        customMetadata: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000'
        }
      };
      await uploadBytes(templateRef, templateFile, templateMetadata);
      const templateUrl = await getDownloadURL(templateRef);

      // Crear documento en Firestore
      const templateData = {
        ...formData,
        id: templateId,
        sellerId: user.uid,
        previewUrl,
        templateUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: 'active'
      };

      await setDoc(doc(db, 'templates', templateId), templateData);

      toast('¡Template creado exitosamente!', {
        type: 'success'
      });
      resetForm();
      navigate(`/dashboard/marketplace/template/${templateId}`);
    } catch (error) {
      console.error('Error al crear el template:', error);
      toast('Error al crear el template. Por favor intenta nuevamente.', {
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      category: '',
      tags: [],
      features: [],
      requirements: [],
      includes: [],
      compatibleWith: [],
      version: '1.0.0'
    });
    setPreviewFile(null);
    setTemplateFile(null);
    setPreviewFileName('');
    setTemplateFileName('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nuevo Template
      </Typography>

      <Grid container spacing={4}>
        {/* Información básica */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información Básica
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleCategoryChange}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Versión"
                  name="version"
                  value={formData.version}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Etiquetas */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Etiquetas
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Agregar Etiqueta"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('tags', currentTag, setCurrentTag);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleAddItem('tags', currentTag, setCurrentTag)}
                    >
                      Agregar
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleRemoveItem('tags', index)}
                />
              ))}
            </Box>
          </Paper>

          {/* Características */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Características
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Agregar Característica"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('features', currentFeature, setCurrentFeature);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleAddItem('features', currentFeature, setCurrentFeature)}
                    >
                      Agregar
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  onDelete={() => handleRemoveItem('features', index)}
                />
              ))}
            </Box>
          </Paper>

          {/* Requisitos */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Requisitos
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Agregar Requisito"
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('requirements', currentRequirement, setCurrentRequirement);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleAddItem('requirements', currentRequirement, setCurrentRequirement)}
                    >
                      Agregar
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.requirements.map((requirement, index) => (
                <Chip
                  key={index}
                  label={requirement}
                  onDelete={() => handleRemoveItem('requirements', index)}
                />
              ))}
            </Box>
          </Paper>

          {/* Incluye */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Incluye
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Agregar Item"
                value={currentInclude}
                onChange={(e) => setCurrentInclude(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('includes', currentInclude, setCurrentInclude);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleAddItem('includes', currentInclude, setCurrentInclude)}
                    >
                      Agregar
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.includes.map((include, index) => (
                <Chip
                  key={index}
                  label={include}
                  onDelete={() => handleRemoveItem('includes', index)}
                />
              ))}
            </Box>
          </Paper>

          {/* Compatible Con */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Compatible Con
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Agregar Tecnología"
                value={currentCompatible}
                onChange={(e) => setCurrentCompatible(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem('compatibleWith', currentCompatible, setCurrentCompatible);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleAddItem('compatibleWith', currentCompatible, setCurrentCompatible)}
                    >
                      Agregar
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.compatibleWith.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  onDelete={() => handleRemoveItem('compatibleWith', index)}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Preview y Archivos */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Archivos del Template
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <div className="w-full">
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => document.getElementById('preview-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      {previewFileName || 'Subir Imagen de Preview'}
                    </Button>
                    <input
                      id="preview-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePreviewUpload}
                      className="hidden"
                    />
                  </div>
                </Box>
                <Box>
                  <div className="w-full">
                    <Button
                      variant="outline"
                      className="w-full flex items-center gap-2"
                      onClick={() => document.getElementById('template-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      {templateFileName || 'Subir Archivo de Template'}
                    </Button>
                    <input
                      id="template-upload"
                      type="file"
                      onChange={handleTemplateUpload}
                      className="hidden"
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Creando...' : 'Crear Template'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
