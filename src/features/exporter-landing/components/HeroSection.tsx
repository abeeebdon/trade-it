import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg-soft ">
      <article className="relative mx-auto grid items-center gap-14 px-5 py-20 sm:px-8 md:pt-30 lg:grid-cols-[0.95fr_1.05fr] ">
        <article className="">
          <h1 className=" text-xl font-black leading-[1.012] tracking-[-0.045em] text-text sm:text-3xl lg:text-6xl">
            Take your Products{' '}
            <span className="text-primary">Beyond Borders.</span>
          </h1>

          <p
            className="mt-7  text-base leading-7 text-text sm:text-lg"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
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
        </article>

        {/* <DashboardPreview /> */}
      </article>
    </section>
  );
}
