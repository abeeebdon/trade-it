'use client';

export default function DashboardFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-secondary/10 shadow bg-bg backdrop-blur-md">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase">
          <span className="text-secondary">Jompshop · Powered by</span>

          <span className="text-muted">Riby Inc</span>

          <span className="text-secondary">·</span>

          <span className="text-muted">JompStart Digital Limited</span>

          <span className="text-secondary">·</span>

          <span className="text-muted">Anchor</span>
        </div>
      </div>
    </footer>
  );
}
