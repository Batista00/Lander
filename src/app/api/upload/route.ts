import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Convertir el archivo a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Procesar la imagen con Sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(1920, 1080, { // Tamaño máximo para hero
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 }) // Convertir a WebP con calidad del 80%
      .toBuffer();

    // Generar nombre único para el archivo
    const fileName = `${randomUUID()}.webp`;
    
    // Ruta donde se guardarán las imágenes
    const publicDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(publicDir, fileName);

    // Guardar el archivo
    await writeFile(filePath, processedImageBuffer);

    // Devolver la URL de la imagen
    return NextResponse.json({
      url: `/uploads/${fileName}`
    });

  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    return NextResponse.json(
      { error: 'Error al procesar la imagen' },
      { status: 500 }
    );
  }
}
