import FAQSection from '@/features/waitlist/FAQs';
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Package,
  ShieldCheck,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { benefits, steps } from '../components/constants';
import DashboardPreview from '../components/DashboardPreview';

const NewExporterLandingPage = () => {
  return (
    <main className="">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071322]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(201,146,42,0.16),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(26,122,110,0.12),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:56px_56px]" />

        <article className="relative mx-auto grid min-h-190 max-w-7xl items-center gap-14 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9922A]/25 bg-[#C9922A]/10 px-3.5 py-2 text-xs font-semibold text-[#e4bd69]">
              <Zap className="size-3.5" />
              Built for ambitious exporters
            </div>

            <h1 className="text-balance text-5xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Take your products{' '}
              <span className="text-primary">beyond borders.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-text/55 sm:text-lg">
              JompShop gives exporters the tools to showcase products, manage
              orders, track sales, and grow their business through one connected
              commerce platform.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="register?role=Exporter"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9922A] px-6 py-3.5 text-sm font-bold text-[#0A1628] transition hover:-translate-y-0.5 hover:bg-[#d9a83f]"
              >
                Become an exporter
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-9 grid max-w-lg grid-cols-2 gap-3 text-sm text-white/55 sm:grid-cols-4">
              {[
                'Product management',
                'Order tracking',
                'Sales insights',
                'Payout management',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#C9922A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <DashboardPreview />
        </article>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        className="border-b border-slate-100 bg-white py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9922A]">
              One platform
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0A1628] sm:text-4xl">
              Everything you need to sell and grow.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              Spend less time jumping between tools and more time growing your
              export business.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C9922A]/40 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="grid size-12 place-items-center rounded-2xl bg-[#0A1628] text-[#C9922A] transition group-hover:bg-[#C9922A] group-hover:text-[#0A1628]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 font-bold text-[#0A1628]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9922A]">
              Simple by design
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0A1628] sm:text-4xl">
              Start selling in three steps.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              From your first account to your first order, JompShop keeps the
              process straightforward.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-7"
              >
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-12 hidden w-5 translate-x-full border-t border-dashed border-slate-300 lg:block" />
                )}

                <span className="text-5xl font-black tracking-tight text-slate-100">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold text-[#0A1628]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="overflow-hidden bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9922A]">
              One connected ecosystem
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0A1628] sm:text-4xl">
              You manage the business. JompShop connects it to buyers.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
              Your exporter portal gives you control over your products and
              operations while the JompShop storefront gives customers a place
              to discover and purchase products.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Create and manage your product catalog',
                'Receive and process customer orders',
                'Track your sales and inventory',
                'Monitor payments and payouts',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full bg-[#C9922A]/10">
                    <CheckCircle2 className="size-4 text-[#C9922A]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-10 rounded-full bg-[#C9922A]/10 blur-3xl" />
            <div className="relative space-y-4">
              <div className="mx-auto max-w-sm rounded-3xl border border-slate-200 bg-[#0A1628] p-6 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#C9922A] text-[#0A1628]">
                    <Package className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">You</p>
                    <p className="font-bold">Exporter Portal</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.06] p-4">
                    <p className="text-xs text-white/40">Products</p>
                    <p className="mt-2 text-xl font-bold">42</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.06] p-4">
                    <p className="text-xs text-white/40">Orders</p>
                    <p className="mt-2 text-xl font-bold">128</p>
                  </div>
                </div>
              </div>

              <div className="mx-auto flex max-w-[260px] items-center justify-center">
                <div className="h-10 border-l border-dashed border-[#C9922A]" />
              </div>

              <div className="mx-auto max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#0A1628] text-[#C9922A]">
                    <ShoppingBag className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Customer-facing</p>
                    <p className="font-bold text-[#0A1628]">
                      JompShop Storefront
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Products available to buyers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard showcase */}
      <section className="bg-[#071322] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9922A]">
                Your business at a glance
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Know what is happening in your business.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/50">
                From recent orders to sales performance, get a clear picture of
                your business without digging through multiple tools.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  [
                    'Sales insights',
                    'Understand revenue and performance over time.',
                  ],
                  [
                    'Order management',
                    'See what needs your attention and act quickly.',
                  ],
                  [
                    'Inventory visibility',
                    'Know what is available and what needs restocking.',
                  ],
                ].map(([title, description]) => (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg bg-[#C9922A]/10 text-[#C9922A]">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/40">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-slate-100 bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#0A1628] text-[#C9922A]">
            <ShieldCheck className="size-7" />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#C9922A]">
            Built around trust
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0A1628] sm:text-4xl">
            A platform designed for serious businesses.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
            Verification, account security, transaction visibility, and clear
            business workflows help create a more trusted commerce experience.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              [
                'Verified accounts',
                'Business and identity verification workflows',
              ],
              [
                'Secure access',
                'Protected account and authentication experience',
              ],
              [
                'Transaction visibility',
                'Clear records for orders, payments, and payouts',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 p-5 text-left"
              >
                <h3 className="font-bold text-[#0A1628]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className=" py-24 sm:py-28">
        <FAQSection />
      </section>

      {/* Final CTA */}
      <section className="bg-[#071322] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102238] to-[#0A1628] px-6 py-14 text-center sm:px-12">
          <div className="mx-auto grid size-12 place-items-center rounded-xl bg-[#C9922A] text-[#0A1628]">
            <Globe2 className="size-5" />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Ready to take your business further?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Join JompShop and start managing your products, orders, sales, and
            payouts from one connected exporter platform.
          </p>
          <Link
            href="register?role=Exporter"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C9922A] px-6 py-3.5 text-sm font-bold text-[#0A1628] transition hover:-translate-y-0.5 hover:bg-[#d9a83f]"
          >
            Become an exporter
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NewExporterLandingPage;
