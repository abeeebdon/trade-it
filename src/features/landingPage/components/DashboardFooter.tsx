'use client';

export default function DashboardFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1A7A6E]/15 bg-[#081120]/95 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase">
          <span className="text-[#1A7A6E]">Jomp Shop · Powered by</span>

          <span className="text-[#9CA3AF]">Riby Inc</span>

          <span className="text-[#1A7A6E]">·</span>

          <span className="text-[#9CA3AF]">JompStart Digital Limited</span>

          <span className="text-[#1A7A6E]">·</span>

          <span className="text-[#9CA3AF]">Anchor</span>
        </div>
      </div>
    </footer>
  );
}
