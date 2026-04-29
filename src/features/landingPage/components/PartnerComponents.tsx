import { helixCards } from './data';

const PartnerComponents = () => {
  return (
    <section id="partners" className="py-20 border-t border-secondary-dim">
      <div className="max-w-350 mx-auto px-6 lg:px-10">
        <div className="text-center">
          <div className="helix-kicker mb-3" data-aos="fade-down">
            Powered By
          </div>
          <h2
            className="helix-h2 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Three operating partners. One unified platform.
          </h2>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {helixCards.map((card, index) => (
            <article
              key={index}
              className="helix-card p-6"
              data-aos="zoom-up"
              data-aos-delay={`${index * 100}`}
            >
              <header>
                <h3 className="text-[#C9922A] font-bold tracking-[0.22em] text-sm">
                  {card.title}
                </h3>

                <p className="text-[10px] tracking-[0.3em] text-[#1A7A6E] font-mono mt-1">
                  {card.subtitle}
                </p>
              </header>

              <p className="text-[12px] text-[#9CA3AF] mt-4 leading-relaxed">
                {card.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
};

export default PartnerComponents;
