import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configurar el directorio de subidas
const uploadsDir = path.join(__dirname, '../../uploads');

// Asegurarse de que el directorio existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configurar multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB límite
  },
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif)'));
  }
});

// Ruta para subir archivos
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    // Procesar la imagen con sharp
    const processedImagePath = path.join(uploadsDir, 'processed-' + req.file.filename);
    await sharp(req.file.path)
      .resize(800) // Redimensionar a 800px de ancho manteniendo el aspect ratio
      .jpeg({ quality: 80 }) // Convertir a JPEG con calidad 80
      .toFile(processedImagePath);

    // Eliminar el archivo original
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'Archivo subido y procesado exitosamente',
      filename: 'processed-' + req.file.filename
    });
  } catch (error) {
    console.error('Error procesando archivo:', error);
    res.status(500).json({
      message: 'Error procesando archivo',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
