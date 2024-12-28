// Web Worker para optimización de imágenes y recursos
self.onmessage = async function(e) {
  const { type, url, options } = e.data;

  switch (type) {
    case 'OPTIMIZE_IMAGE':
      try {
        const result = await optimizeImage(url, options);
        self.postMessage(result);
      } catch (error) {
        self.postMessage({ error: error.message });
      }
      break;
    
    default:
      self.postMessage({ error: 'Unknown operation type' });
  }
};

async function optimizeImage(url, options) {
  const response = await fetch(url);
  const originalSize = Number(response.headers.get('content-length')) || 0;
  const blob = await response.blob();

  // Crear un elemento imagen para procesar
  const imgBitmap = await createImageBitmap(blob);

  // Crear un OffscreenCanvas para el procesamiento
  const canvas = new OffscreenCanvas(
    Math.min(imgBitmap.width, options.maxWidth),
    Math.min(imgBitmap.height, options.maxWidth * (imgBitmap.height / imgBitmap.width))
  );
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Dibujar imagen redimensionada
  ctx.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);

  // Convertir a formato optimizado
  const optimizedBlob = await canvas.convertToBlob({
    type: `image/${options.format}`,
    quality: options.quality / 100
  });

  // Crear URL para la imagen optimizada
  const optimizedArrayBuffer = await optimizedBlob.arrayBuffer();
  
  return {
    optimizedBuffer: optimizedArrayBuffer,
    originalSize,
    optimizedSize: optimizedBlob.size,
    savings: ((originalSize - optimizedBlob.size) / originalSize) * 100
  };
}
