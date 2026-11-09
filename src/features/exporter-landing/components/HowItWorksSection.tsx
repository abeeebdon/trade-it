import { steps } from './constants';

export default function HowItWorksSection() {
  return (
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
              <h3 className="mt-5 text-xl font-bold text-text">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
