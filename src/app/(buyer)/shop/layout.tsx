import Footer from '@/features/landingPage/components/Footer';
import ShopShell from '@/features/shops/components/ShopShell';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen  w-full  bg-[#0A1628] text-[#F5F5F5] ">
      <ShopShell />
      <main className="max-w-350 mx-auto px-6 lg:px-10 py-8 fade-up">
        {children}
      </main>
      <Footer />
    </main>
  );
}
