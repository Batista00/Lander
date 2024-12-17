import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Blocks } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const getFirebaseErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Correo electrónico o contraseña incorrectos';
    case 'auth/user-not-found':
      return 'No existe una cuenta con este correo electrónico';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Por favor, intente más tarde';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada';
    default:
      return 'Error al iniciar sesión. Por favor, intente de nuevo';
  }
};

export function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      setError('');
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(err));
      } else {
        setError('Error al iniciar sesión. Por favor, intente de nuevo');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <Link to="/" className="flex items-center space-x-2 group mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <Blocks className="w-8 h-8 text-white relative" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text">
            LANDER
          </span>
        </Link>
        <h2 className="text-3xl font-bold text-white">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-gray-400">
          Inicia sesión para continuar
        </p>
      </div>

      <Card className="max-w-md w-full bg-[#1A1F2E]/50 backdrop-blur-xl border-white/10">
        <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Correo electrónico"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register('password')}
                type="password"
                placeholder="Contraseña"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#00E5B0] focus:ring-[#00E5B0] focus:ring-offset-gray-900"
              />
              <label className="ml-2 text-sm text-gray-300">
                Recordarme
              </label>
            </div>
            <Link
              to="/auth/reset-password"
              className="text-sm text-[#00E5B0] hover:text-[#00E5B0]/80"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00E5B0] to-[#00D1FF] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/auth/register"
              className="text-[#00E5B0] hover:text-[#00E5B0]/80"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}