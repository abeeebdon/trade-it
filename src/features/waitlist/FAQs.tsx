'use client';

import { FC, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from './constants';

const FAQSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="my-15 px-4 py-20  text-center md:px-6">
      <div className="text-center">
        <p className="mb-2 text-lg font-semibold text-primary-300 md:text-2xl ">
          Let’s Answer You
        </p>
        <h2
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="600"
          className="mb-8 text-xl font-bold text-primary md:text-3xl"
        >
          Frequently Asked Question
        </h2>

        <div className="mx-auto w-full max-w-5xl space-y-3 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="600"
              className="overflow-hidden rounded-lg border border-purple"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium transition"
              >
                <span className="text-base font-semibold text-purple-50 ">
                  {faq.question}
                </span>
                {openIndex !== index ? (
                  <ChevronUp className="text-lg" />
                ) : (
                  <ChevronDown className="text-lg" />
                )}
              </button>
              {openIndex === index && (
                <p className=" px-4 py-3 text-sm text-purple-100/90">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
