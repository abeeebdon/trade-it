'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PartnerComponents from './components/PartnerComponents';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import HeroComponent from './components/HeroComponent';
import { catData, moduleArr } from './components/data';

const TEXTILE_IMG =
  'https://images.unsplash.com/photo-1768212566108-4ce4f329e4d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGV4dGlsZXMlMjBhZnJpY2FufGVufDB8fHx8MTc3NjgyNDU2MHww&ixlib=rb-4.1.0&q=85';
const AGRO_IMG =
  'https://images.unsplash.com/photo-1622676566956-b42b50c84c31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxhZ3JpY3VsdHVyZSUyMGZhcm1lciUyMGFmcmljYW58ZW58MHx8fHwxNzc2ODI0NTYxfDA&ixlib=rb-4.1.0&q=85';

export default function Landing() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-[] dark:bg-[#0A1628] dark:text-[#F5F5F5]">
      {/* HERO */}
      <HeroComponent />

      {/* MODULES */}
      <section id="modules" className="py-20 border-t border-[#1A7A6E]/15">
        <div className="max-w-350 mx-auto px-6 lg:px-10">
          <p data-aos="fade-down" className="helix-kicker mb-3">
            Five modules. One platform.
          </p>
          <h2 className="helix-h2 max-w-2xl">
            Everything your trade desk needs &mdash; already wired together.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {moduleArr.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  data-aos={i % 2 === 0 ? 'fade-up' : 'flip-down'}
                  className="helix-card p-6 "
                >
                  <Icon size={22} className="text-[#C9922A]" />
                  <h3 className="helix-h3 mt-4">{m.title}</h3>
                  <p className="text-[14px] text-[#9CA3AF] mt-3 leading-relaxed">
                    {m.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section id="solutions" className="py-20 border-t border-[#1A7A6E]/15">
        <div className="max-w-350 mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="helix-kicker mb-3">
              Built for the trades we actually move
            </p>
            <h2 className="helix-h2" data-aos="fade-down" data-aos-delay="200">
              Fashion &amp; textiles. Agriculture. Staple foods. Physical goods.
            </h2>
            <p className="text-[#9CA3AF] mt-5 leading-relaxed">
              From Adire panels shipping out of Abeokuta to single-origin Ofada
              rice headed to Brooklyn, Jomp Trade routes every dollar and
              document through one place &mdash; with Riby Inc holding buyer
              funds in escrow until goods land.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              {catData.map((s) => (
                <div
                  key={s}
                  className="helix-card p-3 text-center text-[13px] font-medium"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Image
              src={TEXTILE_IMG}
              alt="Textile"
              className="w-full h-72 object-cover rounded border border-[#1A7A6E]/25"
              height={72}
              width={72}
              data-aos="flip-down"
            />
            <Image
              src={AGRO_IMG}
              alt="Agriculture"
              className="w-full h-72 object-cover rounded border border-[#1A7A6E]/25 translate-y-8"
              height={72}
              width={72}
              data-aos="fade-up"
              data-aos-delay="300"
            />
          </div>
        </div>
      </section>

      <PartnerComponents />
      {/* FINAL CTA */}
      <section className="py-24 border-t border-[#1A7A6E]/15">
        <article className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="helix-h2">
            Ready to take your exports international?
          </h2>
          <p className="text-muted mt-4">
            Create your account, upload your CAC, and start receiving USD in
            minutes.
          </p>
          <div className="mt-8 flex flex-wrap sm:flex-nowrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => router.push('/getstarted')}
              className="helix-btn-primary inline-flex items-center gap-2"
            >
              Start free <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => router.push('/login')}
              className="helix-btn-secondary "
            >
              I already have an account
            </motion.button>
          </div>
        </article>
      </section>
    </main>
  );
}
