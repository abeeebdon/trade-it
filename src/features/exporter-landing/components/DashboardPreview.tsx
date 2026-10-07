import { ShoppingBag, TrendingUp } from 'lucide-react';
import { stats } from './constants';

export default function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="absolute -inset-10 rounded-full bg-[#C9922A]/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1628] shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-[#C9922A] text-[#0A1628]">
              <ShoppingBag className="size-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/50">JompShop</p>
              <p className="text-sm font-semibold text-white">
                Exporter Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/50">Live</span>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="text-xs text-white/40">{stat.label}</p>
              <p className="mt-2 text-xl font-bold tracking-tight text-white">
                {stat.value}
              </p>
              <div className="mt-3 h-1 rounded-full bg-white/10">
                <div className="h-1 w-2/3 rounded-full bg-[#C9922A]" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 px-5 pb-5 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/40">Sales overview</p>
                <p className="mt-1 text-lg font-semibold text-white">$24,580</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <TrendingUp className="size-3" />
                18.4%
              </span>
            </div>

            <div className="mt-6 flex h-36 items-end gap-2">
              {[35, 46, 40, 62, 52, 78, 70, 92, 74, 100, 84, 94].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-[#C9922A] to-[#e5bd69]/50"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-white/30">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs text-white/40">Recent orders</p>

            <div className="mt-4 space-y-3">
              {[
                ['#JMP-10283', '$1,250'],
                ['#JMP-10271', '$800'],
                ['#JMP-10264', '$620'],
                ['#JMP-10251', '$430'],
              ].map(([order, amount]) => (
                <div
                  key={order}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3"
                >
                  <div>
                    <p className="text-xs font-medium text-white">{order}</p>
                    <p className="mt-1 text-[10px] text-white/35">Processing</p>
                  </div>
                  <p className="text-xs font-semibold text-white">{amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
