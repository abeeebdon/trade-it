import { benefits } from './constants';

export default function BenefitsSection() {
  return (
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
  );
}
