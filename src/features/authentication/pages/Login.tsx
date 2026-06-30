'use client';
import { useAppDispatch } from '@/hooks/store/store';
import { login, setAuthRole } from '@/store/auth/auth.slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import InputField from '@/components/form/InputFIeld';
import { LoginFormValues, loginSchema } from '../components/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '@/components/buttons/Loader';
import { toast } from 'sonner';
import { loginApi } from '../api/auth';
import { saveCookie } from '@/store/auth/cookies';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    try {
      const result = await loginApi(data);
      if (result.success) {
        toast.success(result.message);
        saveCookie('token', result.data.token);
        saveCookie('refreshToken', result.data.refreshToken);
        const userDetails = {
          email: result.data.email,
          fullName: result.data.fullName,
        };
        dispatch(login(userDetails));
        switch (result.data.roles[0].toLowerCase()) {
          case 'admin':
            dispatch(setAuthRole('admin'));
            router.push('/admin');
            break;
          case 'retailer':
            dispatch(setAuthRole('retailer'));
            router.push('/buyer');
            break;
          case 'consumer':
            dispatch(setAuthRole('consumer'));
            router.push('/');
            break;
          case 'exporter':
            dispatch(setAuthRole('exporter'));
            router.push('/exporter');
            break;
          case 'export admin':
            dispatch(setAuthRole('exporter'));
            router.push('/exporter');
            break;
          default:
            toast.error('Contact Support');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error as any)?.response?.data.message;
      toast.error(
        message ?? 'An error occurred during login. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border max-w-md mx-auto helix-card p-8 fade-up">
      <h1 className="helix-kicker mb-2">Jomp Trade · Sign in</h1>
      <h1 className="helix-h2">Access your command center</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
        {/* EMAIL */}
        <InputField
          label="Email"
          placeholder="you@company.com"
          {...register('email')}
          error={errors.email?.message}
          name="email"
        />

        {/* PASSWORD */}
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
          name="password"
        />
        <div className="flex items-center py-2 justify-end">
          <Link
            href="/forgot-password "
            className="font-semibold text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        {/* SUBMIT */}
        <button
          disabled={loading}
          type="submit"
          className="helix-btn-primary w-full"
        >
          {loading ? <Loader /> : 'Sign in'}
        </button>
      </form>
      <div className="mt-8 text-center text-[13px] text-[#9CA3AF]">
        New to Jompshop?{' '}
        <Link href="/getstarted" className="text-[#C9922A] font-semibold">
          Create an account
        </Link>
      </div>
    </div>
  );
}
