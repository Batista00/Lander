import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import { ComponentProvider } from '@/contexts/ComponentContext';
import { Toaster } from '@/components/ui/toaster';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ComponentProvider>
        <Component {...pageProps} />
        <Toaster />
      </ComponentProvider>
    </AuthProvider>
  );
}
