'use client';
import { useAppDispatch } from '@/hooks/store/store';
import { login, setAuthRole } from '@/store/auth/auth.slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import InputField from '@/components/form/InputFIeld';
import { LoginFormValues, loginSchema } from '../components/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '@/components/buttons/Loader';
import api from '@/configs/api-config';
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
        const userDetails = {
          email: result.data.email,
          fullName: result.data.fullName,
        };
        console.log('User Details:', userDetails);
        dispatch(login(userDetails));
        switch (result.data.roles[0].toLowerCase()) {
          case 'export admin':
            dispatch(setAuthRole('admin'));
            router.push('/admin');
            break;
          case 'reseller':
            dispatch(setAuthRole('reseller'));
            router.push('/buyer');
            break;
          case 'direct customer':
            dispatch(setAuthRole('customer'));
            router.push('/');
            break;
          case 'african exporter':
            dispatch(setAuthRole('exporter'));
            router.push('/exporter');
            break;
          default:
            router.push('/');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error as any)?.response?.data?.message;
      toast.error(
        message ?? 'An error occurred during registration. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/authentication');
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full border max-w-md mx-auto helix-card p-8 fade-up">
      <h1 className="helix-kicker mb-2">Jomp Trade · Sign in</h1>
      <h1 className="helix-h2">Access your command center</h1>
      <p className="text-[#9CA3AF] text-sm mt-2">
        Exporter, buyer, consumer, or admin &mdash; one login.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-4"
        data-testid="login-form"
      >
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

        {/* SUBMIT */}
        <button
          disabled={loading}
          type="submit"
          className="helix-btn-primary w-full"
        >
          {loading ? <Loader /> : 'Sign in'}
        </button>
      </form>
      <div className="flex items-center gap-3 my-6 text-[11px] font-mono tracking-widest text-[#9CA3AF]">
        <div className="flex-1 h-px bg-[#1A7A6E]/25" /> OR{' '}
        <div className="flex-1 h-px bg-[#1A7A6E]/25" />
      </div>

      <button
        data-testid="google-login-btn"
        className="w-full cursor-pointer flex items-center justify-center gap-3 border border-secondary/40 rounded px-4 py-3 text-sm text-text font-medium hover:bg-secondary/10 transition"
      >
        <Image
          src="/icons/googleicon.png"
          alt="Google icon"
          width={18}
          height={18}
        />
        Continue with Google
      </button>

      <div className="mt-8 text-center text-[13px] text-[#9CA3AF]">
        New to Helix?{' '}
        <Link href="/getstarted" className="text-[#C9922A] font-semibold">
          Create an account
        </Link>
      </div>
    </div>
  );
}
