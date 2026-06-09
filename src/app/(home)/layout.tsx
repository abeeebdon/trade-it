import Footer from '@/features/landingPage/components/Footer';
import Header from '@/features/landingPage/components/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="pt-36 px-6 lg:px-10 pb-24">{children}</div>
      <Footer />
    </main>
  );
}
