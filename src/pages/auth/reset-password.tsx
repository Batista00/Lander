import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Blocks } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export function ResetPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      await resetPassword(data.email);
      setSuccess('Password reset instructions have been sent to your email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
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
          Reset your password
        </h2>
        <p className="mt-2 text-gray-400">
          Enter your email to receive reset instructions
        </p>
      </div>

      <Card className="max-w-md w-full bg-[#1A1F2E]/50 backdrop-blur-xl border-white/10">
        <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Email address"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-emerald-500 text-center">
              {success}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white hover:opacity-90 transition-opacity"
          >
            {isLoading ? 'Sending...' : 'Send reset instructions'}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Remember your password?{' '}
            <Link
              to="/auth/login"
              className="text-[#00E5B0] hover:text-[#00D1FF] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
