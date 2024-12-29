import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Blocks } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';

const registerSchema = z.object({
  email: z.string()
    .email('Correo electrónico inválido')
    .refine((email) => {
      // Opcional: validar dominios específicos
      const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
      const domain = email.split('@')[1];
      return allowedDomains.includes(domain);
    }, 'Por favor, utiliza un proveedor de correo electrónico válido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const getFirebaseErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con este correo electrónico';
    case 'auth/invalid-email':
      return 'Correo electrónico inválido';
    case 'auth/operation-not-allowed':
      return 'El registro está temporalmente deshabilitado';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil';
    default:
      return 'Error al crear la cuenta. Por favor, intente de nuevo';
  }
};

export function Register() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Validación adicional de seguridad
      const commonPasswords = ['password', '12345678', 'qwerty123'];
      if (commonPasswords.includes(data.password.toLowerCase())) {
        setError('Por favor, elige una contraseña más segura');
        return;
      }

      await signUp(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(err));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear la cuenta. Por favor, intente de nuevo');
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
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-gray-400">
          Comienza a crear hermosas landing pages
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

            <div>
              <Input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirmar contraseña"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00E5B0] to-[#00D1FF] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/auth/login"
              className="text-[#00E5B0] hover:text-[#00E5B0]/80"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}