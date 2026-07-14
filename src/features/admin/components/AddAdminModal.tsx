'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import PressableBtn from '@/components/buttons/PressableBtn';
import InputField from '@/components/form/InputFIeld';
import { useCreateAdmin } from '../hooks/useAdminManagement';
import { RegisterPostData } from '@/features/authentication/types/auth';
import { isAxiosError } from 'axios';

const addAdminSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AddAdminFormData = z.infer<typeof addAdminSchema>;

const AddAdminModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<AddAdminFormData>({
    resolver: zodResolver(addAdminSchema),
  });

  const { mutate: createAdmin, isPending } = useCreateAdmin();

  const onSubmit = (data: AddAdminFormData) => {
    const postData: RegisterPostData = {
      ...data,
      customerTypeIds: [1],
      countryId: 125,
    };
    createAdmin(postData, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
      onError: (err) => {
        const message = isAxiosError(err)
          ? err.response?.data?.message || err.message
          : err instanceof Error
            ? err.message
            : 'Failed to create admin';

        setError('root', { message });
      },
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <PressableBtn
        title="Add Admin"
        leftComponent={<Plus size={18} />}
        handleClick={() => setIsOpen(true)}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dim transition-colors"
      />

      {isOpen && (
        <Modal title="Add New Admin" onClose={handleClose} maxWidth="max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Server / API Error */}
            {errors.root && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <p className="text-sm text-red-700 dark:text-red-400">
                  {errors.root.message}
                </p>
              </div>
            )}

            <InputField
              label="Full Name"
              placeholder="Enter full name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              error={errors.email?.message}
              {...register('email')}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex justify-end gap-3 pt-2">
              <PressableBtn
                title="Cancel"
                handleClick={handleClose}
                className="rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              />

              <PressableBtn
                title="Create Admin"
                loading={isPending}
                handleClick={handleSubmit(onSubmit)}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dim transition-colors"
              />
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddAdminModal;
