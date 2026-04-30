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
      <footer className="border-t border-[#1A7A6E]/15 py-8 mt-10">
        <div className="max-w-350 mx-auto px-6 lg:px-10 text-center">
          <div className="text-[12px] text-[#9CA3AF]">
            Jomp Shop — Direct-from-Africa commerce, powered by the Jomp Trade
            platform.
          </div>
          <div className="text-[11px] text-[#1A7A6E] font-mono tracking-widest mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span>JOMP TRADE · POWERED BY</span>
            <span>·</span>
            <span>RIBY INC</span>
            <span>·</span>
            <span>JOMPSTART DIGITAL</span>
            <span>·</span>
            <span>ANCHOR</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
