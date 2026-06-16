'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../hooks/useGetUserTypes';
import {
  resetPasswordSchema,
  ResetPasswordValues,
} from '../components/validation';
import InputField from '@/components/form/InputFIeld';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  useEffect(() => {
    if (!token || !email) {
      toast.error('Please try the link again');
      router.push('/login');
      return;
    }
  }, []);
  const { mutateAsync: forgotPassword, isPending } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordValues) => {
    const postData = {
      email: email,
      token: token,
      newPassword: data.password,
    };
    forgotPassword(postData);
  };
  return (
    <div className="w-full max-w-md mx-auto border helix-card p-8 fade-up">
      <div className="mb-6">
        <h1 className="text-2xl helix-h1 text-primary font-semibold tracking-tight">
          Create a new password
        </h1>

        <p className="mt-2 text-muted-foreground">
          Enter and confirm your new password below to regain access to your
          account.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="New Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <InputField
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <button
          disabled={isPending}
          type="submit"
          className="helix-btn-primary w-full flex justify-center items-center"
        >
          {isPending ? <Loader /> : 'Continue'}
        </button>
      </form>
      <div className="flex justify-center items-center gap-2 mt-4 text-sm">
        <span>Remember your password?</span>
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
