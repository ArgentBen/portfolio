import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { S } from './Logo';

export function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 px-6 md:px-12 lg:px-24" style={{ background: '#0d0d0d' }}>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700, height: 700, left: '-15%', top: '-20%',
          background: 'radial-gradient(circle, rgba(196,201,207,0.08) 0%, transparent 65%)',
          filter: 'blur(80px)', y,
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600, height: 600, right: '-10%', bottom: '-10%',
          background: 'radial-gradient(circle, rgba(140,145,152,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
          y: useTransform(scrollYProgress, [0, 1], [-60, 60]),
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {[
        { w: 68, h: 68, top: '15%', right: '12%', delay: 0 },
        { w: 38, h: 38, bottom: '20%', left: '8%', delay: 1.5 },
        { w: 24, h: 24, top: '55%', right: '28%', delay: 3 },
      ].map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w, height: orb.h, top: orb.top, right: orb.right,
            bottom: orb.bottom, left: orb.left,
            background: `linear-gradient(135deg, ${S.bright}, ${S.mid})`,
            boxShadow: '0 0 20px rgba(196,201,207,0.25)', opacity: 0.65,
          }}
          animate={{ y: [0, -18, 0], x: [0, 7, 0] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
        />
      ))}

      <motion.div className="container mx-auto relative z-10 max-w-4xl text-center" style={{ y: textY }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8 }}
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 1.5rem' }}
        >
          Подпишитесь на свежие<br />
          <span style={{ background: S.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            обновления проектов.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}
          style={{ color: '#808080', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 3rem' }}
        >
          Рассказываю о новых проектах, технологиях и находках в мире веб-разработки. Без спама — только полезное.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-12"
        >
          <input type="email" placeholder="ваш@email.ru" className="flex-1 px-5 py-4 rounded-full outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '0.95rem' }}
          />
          <motion.button
            className="px-8 py-4 rounded-full flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${S.bright}, ${S.mid})`, color: '#0a0a0a', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '0.95rem', boxShadow: '0 0 25px rgba(196,201,207,0.2)' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196,201,207,0.35)' }}
            whileTap={{ scale: 0.95 }}
          >
            Подписаться <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[{ val: '100%', label: 'Индивидуальный подход' }, { val: '24/7', label: 'Техническая поддержка' }, { val: '∞', label: 'Возможности роста' }].map((item) => (
            <div key={item.label} className="text-center">
              <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, background: S.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {item.val}
              </div>
              <div className="mt-1 text-xs" style={{ color: '#808080' }}>{item.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}