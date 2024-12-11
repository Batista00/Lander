import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const uiComponentsDir = path.join(projectRoot, 'src', 'components', 'ui');

// Ensure all UI component files have .tsx extension
fs.readdirSync(uiComponentsDir).forEach(file => {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) {
    const filePath = path.join(uiComponentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const newPath = filePath.replace(/\.ts$/, '.tsx');
    
    if (filePath !== newPath) {
      fs.writeFileSync(newPath, content);
      fs.unlinkSync(filePath);
    }
  }
});

// Create a temporary copy of button.tsx to ensure it exists during build
const buttonPath = path.join(uiComponentsDir, 'button.tsx');
const buttonContent = fs.readFileSync(buttonPath, 'utf8');
const tempButtonPath = path.join(uiComponentsDir, '_button.tsx');
fs.writeFileSync(tempButtonPath, buttonContent);

console.log('Build preparation completed successfully.');
