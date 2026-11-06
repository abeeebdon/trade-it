import { ShieldCheck } from 'lucide-react';

const trustPoints: [string, string][] = [
  ['Verified accounts', 'Business and identity verification workflows'],
  ['Secure access', 'Protected account and authentication experience'],
  ['Transaction visibility', 'Clear records for orders, payments, and payouts'],
];

export default function TrustSection() {
  return (
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
          {trustPoints.map(([title, description]) => (
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
  );
}
