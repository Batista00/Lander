import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configuración global para pruebas
beforeEach(() => {
  // Limpieza del DOM después de cada prueba
  cleanup();
});

// Configuración de mocks globales
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/dashboard',
  }),
}));

// Configuración de variables de entorno para pruebas
process.env = {
  ...process.env,
  NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
};
