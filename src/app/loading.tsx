import { Loading } from '@/components/loading';

export default function AppLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-sm gap-5">
      <Loading size="lg" />
      <p className="text-muted text-sm animate-pulse tracking-wide">
        Loading JompTrade…
      </p>
    </div>
  );
}
