'use client';
import InputField from '@/components/form/InputFIeld';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  forgotPasswordSchema,
  forgotPasswordValues,
} from '../components/validation';
import { useForgotPassword } from '../hooks/useGetUserTypes';
import { Loader } from 'lucide-react';
import Link from 'next/link';

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: forgotPasswordValues) => {
    const postData = {
      email: data.email,
      resetUrl: `${window.location.origin}/reset-password`,
    };
    forgotPassword(postData);
  };
  return (
    <div className="w-full max-w-md mx-auto border helix-card p-8 fade-up">
      <div className="mb-6 ">
        <h1 className="text-2xl helix-h1 text-primary font-semibold tracking-tight">
          Forgot your password?
        </h1>
        <p className="mt-2 ">
          Enter your email address and we&apos;ll send you a one-time
          verification code to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email"
          placeholder="you@company.com"
          {...register('email')}
          error={errors.email?.message}
          name="email"
        />
        <button
          disabled={isPending}
          type="submit"
          className="helix-btn-primary flex justify-center  w-full"
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

export default ForgotPassword;
