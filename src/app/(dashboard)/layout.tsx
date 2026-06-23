import DashboardHeader from '@/features/landingPage/components/DashboardHeader';
import Sidebar from '@/features/landingPage/components/Sidebar';
import DashboardFooter from '@/features/landingPage/components/DashboardFooter';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex w-full bg-bg  overflow-hidden text-text ">
      <Sidebar />
      <div className="flex-1 w-full max-h-screen overflow-y-auto bg-bg">
        <DashboardHeader />
        <main className="max-w-350  mx-auto px-6 lg:px-10 py-8 pb-36 lg:pb-40 ">
          {children}
          <DashboardFooter />
        </main>
      </div>
    </main>
  );
}
