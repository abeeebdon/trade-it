import { Loading } from '@/components/loading';
import Header from '@/features/landingPage/components/Header';

export default function AppLoading() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="sm:pt-10 pt-5 px-4 sm:px-6 lg:px-10 pb-24">
        <div className="flex flex-col w-full items-center justify-center min-h-[60vh] gap-4">
          <Loading size="xl" />
        </div>
      </div>
    </main>
  );
}
