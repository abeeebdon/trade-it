'use client';
import { useAppDispatch } from '@/hooks/store/store';
import jwt from 'jsonwebtoken';
import { login } from '@/store/auth/auth.slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import InputField from '@/components/form/InputFIeld';
import { LoginFormValues, loginSchema } from '../components/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cookiesStorage } from '@/lib/helpers/cookie';
import Loader from '@/components/buttons/Loader';
import { UserRole } from '@/types';

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
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const newData = { ...result, name: 'JompStart' };

      dispatch(login(newData));

      // redirect based on role returned from server
      switch (result.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'buyer':
          router.push('/buyer');
          break;
        case 'consumer':
          router.push('/');
          break;
        default:
          router.push('/exporter');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full border max-w-md mx-auto helix-card p-8 fade-up">
      <div className="helix-kicker mb-2">Jomp Trade · Sign in</div>
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
