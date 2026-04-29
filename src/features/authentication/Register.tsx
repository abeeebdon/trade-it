'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RegisterFormValues, registerSchema } from './components/validation';
import InputField from '@/components/form/InputFIeld';
import SelectField from '@/components/form/SelectField';
import { useRouter } from 'next/navigation';

export default function Register() {
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'exporter',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log('REGISTER DATA:', data);
    router.push('/login');
  };

  return (
    <div className="w-full max-w-md helix-card p-8 fade-up">
      <div className="helix-kicker mb-2">Jomp Trade · Create account</div>
      <h1 className="helix-h2">Start trading in minutes</h1>
      <p className="text-[#9CA3AF] text-sm mt-2">
        Open your business profile, upload CAC, receive USD.
      </p>
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
        <SelectField
          label="I am registering as"
          {...register('role')}
          error={errors.role?.message}
          name="role"
        >
          <option value="exporter">Exporter / Supplier (Business)</option>
          <option value="buyer">Buyer / Importer (Business)</option>
          <option value="consumer">Consumer — just shopping</option>
        </SelectField>

        {/* SUBMIT */}
        <button
          data-testid="register-submit"
          disabled={isSubmitting}
          className="helix-btn-primary w-full"
        >
          {isSubmitting ? 'Creating…' : 'Create account'}
        </button>
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
