import DashboardHeader from '@/features/landingPage/components/DashboardHeader';
import Sidebar from '@/features/landingPage/components/Sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-[#0A1628] text-[#F5F5F5]">
      <Sidebar />
      <div className="sm:pl-16 lg:pl-60 w-full bg-bg">
        <DashboardHeader />
        <main className="max-w-350 mx-auto px-6 lg:px-10 py-8 fade-up">
          {children}
        </main>
      </div>
    </main>
  );
}
