import QRCode from 'qrcode';

interface QROptions {
  width?: number;
  margin?: number;
  color?: {
    dark: string;
    light: string;
  };
}

const defaultOptions: QROptions = {
  width: 200,
  margin: 2,
  color: {
    dark: '#1F2937',
    light: '#FFFFFF'
  }
};

export async function generateQRCode(
  data: string,
  options: QROptions = defaultOptions
): Promise<Buffer> {
  try {
    // Generar URL de verificación
    const verificationUrl = `https://lander.com/verify/${data}`;
    
    // Configurar opciones de QR
    const qrOptions = {
      ...defaultOptions,
      ...options,
      type: 'png',
      errorCorrectionLevel: 'H'
    };

    // Generar QR como Buffer
    return await QRCode.toBuffer(verificationUrl, qrOptions);
  } catch (error) {
    console.error('Error al generar código QR:', error);
    throw error;
  }
}

export async function generateQRDataUrl(
  data: string,
  options: QROptions = defaultOptions
): Promise<string> {
  try {
    const verificationUrl = `https://lander.com/verify/${data}`;
    const qrOptions = {
      ...defaultOptions,
      ...options,
      errorCorrectionLevel: 'H'
    };

    return await QRCode.toDataURL(verificationUrl, qrOptions);
  } catch (error) {
    console.error('Error al generar QR como Data URL:', error);
    throw error;
  }
}
