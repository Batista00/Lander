import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontPaths = {
  'Inter': path.join(__dirname, '../../public/fonts/Inter-Regular.ttf'),
  'Montserrat': path.join(__dirname, '../../public/fonts/Montserrat-Regular.ttf')
};

export async function loadFont(doc, fontName) {
  try {
    const fontPath = fontPaths[fontName];
    if (!fontPath) {
      throw new Error(`Font ${fontName} not found`);
    }
    
    doc.registerFont(fontName, fontPath);
    return fontPath;
  } catch (error) {
    console.error(`Error loading font ${fontName}:`, error);
    throw error;
  }
}
