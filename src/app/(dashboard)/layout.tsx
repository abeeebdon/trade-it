import DashboardHeader from '@/features/landingPage/components/DashboardHeader';
import Sidebar from '@/features/landingPage/components/Sidebar';
import DashboardFooter from '@/features/landingPage/components/DashboardFooter';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-bg  overflow-hidden text-[#F5F5F5] relative">
      <Sidebar />
      <div className="sm:pl-16 lg:pl-60 w-full bg-bg">
        <DashboardHeader />
        <main className="max-w-350 mx-auto px-6 lg:px-10 py-8 pb-36  lg:pb-40 fade-up">
          {children}
          <DashboardFooter />
        </main>
      </div>
    </main>
  );
}
