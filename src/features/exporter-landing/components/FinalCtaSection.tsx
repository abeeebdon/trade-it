import { ArrowRight, Globe2 } from 'lucide-react';
import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section className="bg-bg px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto  overflow-hidden rounded-4xl  shadow px-6 py-14 text-center sm:px-12">
        <div className="mx-auto grid size-12 place-items-center rounded-xl bg-primary text-text">
          <Globe2 className="size-5" />
        </div>
        <h2 className="mt-6 text-3xl font-black tracking-tight text-text sm:text-5xl">
          Ready to take your business further?
        </h2>
        <p className="mx-auto mt-5  text-sm leading-6 text-text/50 sm:text-base">
          Join JompShop and start{' '}
          <b className="text-primary">
            managing your products, orders, sales, and payouts{' '}
          </b>{' '}
          from one connected exporter platform.
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
  );
}
