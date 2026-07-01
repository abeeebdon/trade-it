'use client';

import { FC, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from './constants';

const FAQSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="my-15 px-4 py-20  text-center md:px-6">
      <div className="text-center">
        <p className="mb-2 text-lg font-semibold text-primary-300 md:text-2xl ">
          Let’s Answer Your
        </p>
        <h2
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="600"
          className="mb-10 text-xl font-bold text-primary md:text-3xl"
        >
          Frequently Asked Question
        </h2>

        <div className="mx-auto w-full max-w-5xl space-y-10 text-left">
          {faqData.map((section) => (
            <section key={section.section}>
              <h2 className="text-xl font-bold text-primary mb-4">
                {section.section}
              </h2>
              <article className="space-y-3">
                {section.items.map((faq, index) => (
                  <div
                    style={{
                      borderColor: '#CF9F99',
                    }}
                    key={index}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    className="overflow-hidden rounded-lg border  "
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between p-4 text-left font-medium transition"
                    >
                      <span className="text-base font-semibold text-purple-100/90 ">
                        {faq.question}
                      </span>
                      {openIndex !== index ? (
                        <ChevronUp className="text-lg" />
                      ) : (
                        <ChevronDown className="text-lg" />
                      )}
                    </button>
                    {openIndex === index && (
                      <p className=" px-4 py-3 text-sm text-white">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </article>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
