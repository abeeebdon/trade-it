import Footer from '@/features/landingPage/components/Footer';
import Header from '@/features/landingPage/components/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full">
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
