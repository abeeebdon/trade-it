'use client';
import PressableBtn from '@/components/buttons/PressableBtn';
import { useRouter } from 'next/navigation';

const NotFOund = () => {
  const router = useRouter();
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-sm mx-4 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-center">Page Not Found</h1>
        <p className="text-center text-gray-500 mt-4">
          The page you are looking for is under development. Please check back
          later or return to the homepage.
        </p>
        <PressableBtn
          title="Return to Home"
          className="helix-btn-primary"
          handleClick={() => router.push('/')}
        />
      </div>
    </section>
  );
};

export default NotFOund;
