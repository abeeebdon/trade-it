import { AuthShell } from '@/features/authentication/components/AuthShell';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen  w-full  bg-[#0A1628] text-[#F5F5F5] flex">
      <AuthShell />
      <div className=" w-full md:w-1/2 flex items-center justify-center p-6">
        {children}
      </div>
    </main>
  );
}
