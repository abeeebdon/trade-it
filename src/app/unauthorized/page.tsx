'use client';

import { ShieldX } from 'lucide-react';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <ShieldX className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>

          <p className="mt-3 text-sm text-gray-500">
            You do not have permission to access this page.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Please go back to your dashboard.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <PressableBtn
            title="Go to HomePage"
            className="flex h-12 items-center justify-center rounded-xl bg-black text-sm font-medium text-white transition hover:opacity-90"
            handleClick={() => router.push('/')}
          />
        </div>
      </div>
    </main>
  );
}
