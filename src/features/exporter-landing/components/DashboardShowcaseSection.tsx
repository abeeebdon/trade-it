import { CheckCircle2 } from 'lucide-react';

const dashboardHighlights: [string, string][] = [
  ['Sales insights', 'Understand revenue and performance over time.'],
  ['Order management', 'See what needs your attention and act quickly.'],
  ['Inventory visibility', 'Know what is available and what needs restocking.'],
];

export default function DashboardShowcaseSection() {
  return (
    <section className="bg-bg-soft py-24 sm:py-28">
      <div className="mx-auto  px-5 sm:px-8 lg:px-10">
        <div className="items-center gap-14 ">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Your business at a glance
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-text sm:text-4xl">
              Know what is happening in your business.
            </h2>
            <p className="mt-5 text-base leading-7 text-text/50">
              From recent orders to sales performance, get a clear picture of
              your business without digging through multiple tools.
            </p>

            <div className="mt-8 space-y-5">
              {dashboardHighlights.map(([title, description]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-text/40">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
