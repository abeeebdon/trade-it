import { CheckCircle2, Package, ShoppingBag } from 'lucide-react';

const ecosystemPoints = [
  'Create and manage your product catalog',
  'Receive and process customer orders',
  'Track your sales and inventory',
  'Monitor payments and payouts',
];

export default function EcosystemSection() {
  return (
    <section className="overflow-hidden bg-bg py-24 sm:py-28">
      <div className="mx-auto grid  items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            One connected ecosystem
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-text sm:text-4xl">
            You manage the business. JompShop connects it to buyers.
          </h2>
          <p className="mt-5  text-base leading-7 text-muted">
            Your exporter portal gives you control over your products and
            operations while the JompShop storefront gives customers a place to
            discover and purchase products.
          </p>

          <div className="mt-8 space-y-4">
            {ecosystemPoints.map((item, index) => (
              <div
                key={item}
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration={600 + index * 100}
                className="flex items-center gap-3"
              >
                <div className="grid size-7 place-items-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-10 rounded-full bg-bg/10 blur-3xl" />
          <div className="relative space-y-4">
            <div className="mx-auto  rounded-3xl border border-border-soft bg-bg p-6 text-text shadow-xl">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary text-text">
                  <Package className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-text/40">You</p>
                  <p className="font-bold">Exporter Portal</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-bg-soft shadow p-4">
                  <p className="text-xs text-text/40">Products</p>
                  <p className="mt-2 text-xl font-bold">42</p>
                </div>
                <div className="rounded-2xl bg-bg-soft shadow p-4">
                  <p className="text-xs text-text/40">Orders</p>
                  <p className="mt-2 text-xl font-bold">128</p>
                </div>
              </div>
            </div>

            <div className="mx-auto flex 260px] items-center justify-center">
              <div className="h-10 border-l border-dashed border-primary" />
            </div>

            <article className="mx-auto  rounded-3xl border border-border-soft bg-bg p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary text-text">
                  <ShoppingBag className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-text/40">Customer-facing</p>
                  <p className="font-bold text-text">JompShop Storefront</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600">
                <span className="size-2 rounded-full bg-emerald-500" />
                Products available to buyers
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
