'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RegisterFormValues, registerSchema } from '../components/validation';
import InputField from '@/components/form/InputFIeld';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/store/store';
import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ROLES } from '../components/data';
import Loader from '@/components/buttons/Loader';
import { motion } from 'motion/react';
export default function Register() {
  const [loading, setLoading] = useState(false);
  // const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setBusy(true);
  //   try {
  //     const user = await register(form);
  //     toast.success(`Welcome to Jomp Trade, ${user.name.split(' ')[0]}`);
  //     if (user.role === 'consumer') nav('/shop');
  //     else nav('/onboarding');
  //   } catch (err) {
  //     toast.error(err.response?.data?.detail || 'Register failed');
  //   } finally {
  //     setBusy(false);
  //   }
  // };
  const router = useRouter();
  const { authRole } = useAppSelector((state) => state.auth);
  console.log(authRole);
  const role = useMemo(() => {
    if (!authRole) {
      return router.push('/getstarted');
    }
    return ROLES.find((r, i) => r.value == authRole);
  }, [authRole]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: authRole ?? 'buyer',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);

    setTimeout(() => {
      console.log('REGISTER DATA:', data);
      setLoading(false);
      router.push('/login');
    }, 3000);
  };

  return (
    <div className="w-full max-w-md helix-card p-8 fade-up">
      <button
        onClick={() => router.push('/getstarted')}
        className="text-[12px] text-[#9CA3AF] hover:text-[#F5F5F5] inline-flex items-center gap-1.5 mb-4"
        data-testid="back-to-roles"
      >
        <ArrowLeft size={12} /> change role
      </button>
      <h2 className="helix-kicker mb-2">Sign up · {role?.title}</h2>
      <h1 className="helix-h2">
        {role?.value === 'consumer'
          ? 'Start shopping in seconds'
          : 'Create your business profile'}
      </h1>
      <p className="text-[#9CA3AF] text-sm mt-2">{role?.blurb}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-4"
        data-testid="register-form"
      >
        {/* NAME */}
        <InputField
          label="Full name"
          placeholder="John Doe"
          {...register('name')}
          error={errors.name?.message}
          name="name"
        />

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

        {/* ROLE */}

        {/* SUBMIT */}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          className="helix-btn-primary w-full"
        >
          {loading ? <Loader /> : `Create my ${role?.title} account`}
        </motion.button>
      </form>
      <div className="mt-8 text-center text-[13px] text-[#9CA3AF]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#C9922A] font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  );
}
