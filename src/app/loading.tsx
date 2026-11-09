import JompShopLogo from '@/assets/JompShopIcon';

export default function AppLoading() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="relative grid place-items-center">
        {/* Expanding background halos */}
        <span
          aria-hidden
          className="logo-ripple pointer-events-none absolute size-20 rounded-2xl bg-primary/20"
        />
        <span
          aria-hidden
          className="logo-ripple logo-ripple-delay pointer-events-none absolute size-20 rounded-2xl bg-primary/20"
        />

        <JompShopLogo className="relative size-20 animate-pulse" />
      </div>
    </main>
  );
}
