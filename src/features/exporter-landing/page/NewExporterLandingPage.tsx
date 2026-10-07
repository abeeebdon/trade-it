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
      <section className="relative overflow-hidden bg-[#e0d0bf80] dark:bg-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(201,146,42,0.16),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(26,122,110,0.12),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-size:56px_56px" />

        <article className="relative mx-auto grid min-h-190  items-center gap-14 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-28">
          <div className="">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft/10 px-3.5 py-2 text-xs font-semibold text-primary"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000"
            >
              <Zap className="size-3.5" />
              Built for ambitious exporters
            </div>

            <h1 className="text-balance text-xl font-black leading-[1.012] tracking-[-0.045em] text-text sm:text-3xl lg:text-6xl">
              Take your products{' '}
              <span className="text-primary">beyond borders.</span>
            </h1>

            <p
              className="mt-7  text-base leading-7 text-text sm:text-lg"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000"
            >
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
                className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/4 px-6 py-3.5 text-sm font-semibold text-text transition hover:bg-bg/8"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-9 grid  grid-cols-2 gap-3 text-sm text-text/55 ">
              {['Product management', 'Order tracking'].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
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
        className="border-b border-border bg-bg py-24 sm:py-28"
      >
        <div className="mx-auto  px-5 sm:px-8 lg:px-10">
          <div className="">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              One platform
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-text sm:text-4xl">
              Everything you need to sell and grow.
            </h2>
            <p className="mt-4 text-base leading-7 text-text/50">
              Spend less time jumping between tools and more time growing your
              export business.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  data-aos={i % 2 === 1 ? 'fade-down' : 'fade-up'}
                  data-aos-easing="linear"
                  data-aos-duration="600"
                  className="group rounded-3xl border border-surface bg-bg p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C9922A]/40 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="grid size-12 place-items-center rounded-2xl bg-bg-soft shadow text-primary transition group-hover:bg-[#C9922A] group-hover:text-[#0A1628]">
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
      <section id="how-it-works" className="bg-bg-soft py-24 sm:py-28">
        <div className="mx-auto  px-5 sm:px-8 lg:px-10">
          <div className="mx-auto  text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-dim">
              Simple by design
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-text sm:text-4xl">
              Start selling in three steps.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              From your first account to your first order, JompShop keeps the
              process straightforward.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                data-aos={index % 2 === 1 ? 'zoom-down' : 'fade-up'}
                data-aos-easing="linear"
                data-aos-duration="600"
                className="relative rounded-3xl border border-border-soft bg-bg p-7"
              >
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-12 hidden w-5 translate-x-full border-t border-dashed border-border-soft lg:block" />
                )}

                <span className="text-5xl font-black tracking-tight text-muted">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold text-text">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
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
              operations while the JompShop storefront gives customers a place
              to discover and purchase products.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Create and manage your product catalog',
                'Receive and process customer orders',
                'Track your sales and inventory',
                'Monitor payments and payouts',
              ].map((item, index) => (
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

      {/* Dashboard showcase */}
      <section className="bg-bg-soft py-24 sm:py-28">
        <div className="mx-auto  px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[0.7fr_1.3fr]">
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

            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-border-soft bg-bg  py-24 sm:py-28">
        <div className="mx-auto  px-5 text-center sm:px-8">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-muted">
            <ShieldCheck className="size-7" />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Built around trust
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-text sm:text-4xl">
            A platform designed for serious businesses.
          </h2>
          <p className="mx-auto mt-5  text-base leading-7 text-text/50 sm:text-lg">
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
                className="rounded-2xl border border-border-soft p-5 text-left"
              >
                <h3 className="font-bold text-text">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-text/50">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-10 bg-bg-soft sm:py-14">
        <FAQSection />
      </section>

      {/* Final CTA */}
      <section className="bg-bg px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto  overflow-hidden rounded-4xl border border-border shadow bg-[#e0d0bf80] dark:bg-bg  px-6 py-14 text-center sm:px-12">
          <div className="mx-auto grid size-12 place-items-center rounded-xl bg-primary text-text">
            <Globe2 className="size-5" />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-text sm:text-5xl">
            Ready to take your business further?
          </h2>
          <p className="mx-auto mt-5  text-sm leading-6 text-text/50 sm:text-base">
            Join JompShop and start managing your products, orders, sales, and
            payouts from one connected exporter platform.
          </p>
          <Link
            href="register?role=Exporter"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-text transition hover:-translate-y-0.5 hover:bg-primary/90"
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
