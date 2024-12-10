import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configuración de multer para la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para subir archivos
router.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No se proporcionó ningún archivo' });
    }

    const fileId = uuidv4();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Asegurarse de que el directorio existe
    await fs.mkdir(uploadDir, { recursive: true });

    // Procesar y guardar la imagen
    await sharp(req.file.buffer)
      .resize(800) // Redimensionar a un ancho máximo de 800px
      .toFile(path.join(uploadDir, `${fileId}.jpg`));

    res.json({ 
      success: true, 
      message: 'Archivo cargado exitosamente',
      fileUrl: `/uploads/${fileId}.jpg`
    });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ success: false, message: 'Error al procesar el archivo' });
  }
});

export default router;
