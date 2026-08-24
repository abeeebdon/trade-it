import { Loading } from '@/components/loading';

export default function AppLoading() {
  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col w-full items-center justify-center h-full gap-4">
        <Loading size="xl" />
      </div>
    </main>
  );
}
