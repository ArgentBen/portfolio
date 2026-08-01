import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { S } from './Logo';
import { assetUrl } from './ui/utils';

// Только реальный стек
const TECHS = [
  {
    name: 'HTML5',
    icon: 'html5',
    color: '#E34F26',
    desc: 'Разметка',
  },
  {
    name: 'CSS3',
    icon: 'css3',
    color: '#1572B6',
    desc: 'Стили',
  },
  {
    name: 'SCSS',
    icon: 'sass',
    color: '#CD6799',
    desc: 'Препроцессор',
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    color: '#F7DF1E',
    desc: 'Интерактивность',
  },
  {
    name: 'React',
    icon: 'react',
    color: '#61DAFB',
    desc: 'UI-библиотека',
  },
  {
    name: 'Next.js',
    icon: 'nextjs',
    color: '#FFFFFF',
    desc: 'Фреймворк',
  },
  {
    name: 'WordPress',
    icon: 'wordpress',
    color: '#21759B',
    desc: 'CMS',
  },
  {
    name: 'Tilda',
    icon: 'tilda',
    color: '#5B73FF',
    desc: 'Конструктор',
  },
];

function TechIcon({ tech }: { tech: (typeof TECHS)[0] }) {
  return (
    <img
      src={assetUrl(`icons/tech/${tech.icon}.svg`)}
      alt={tech.name}
      width={28}
      height={28}
      loading="lazy"
      decoding="async"
      className="w-7 h-7 object-contain"
      draggable={false}
    />
  );
}

function TechCard({ tech }: { tech: (typeof TECHS)[0] }) {
  return (
    <motion.div
      className="flex-shrink-0 relative overflow-hidden rounded-2xl"
      style={{
        width: 180,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      whileHover={{
        scale: 1.04,
        borderColor: `${tech.color}50`,
        background: `${tech.color}0a`,
      }}
      transition={{ duration: 0.22 }}
    >
      <div className="p-5">
        {/* Symbol */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${tech.color}18` }}
        >
          <TechIcon tech={tech} />
        </div>

        {/* Name */}
        <div
          style={{
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#e0e0e0',
            marginBottom: '0.25rem',
            lineHeight: 1.2,
          }}
        >
          {tech.name}
        </div>

        {/* Desc */}
        <div style={{ fontSize: '0.75rem', color: '#505050' }}>{tech.desc}</div>

        {/* Color accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 38,
}: {
  items: typeof TECHS;
  reverse?: boolean;
  speed?: number;
}) {
  // Triple for seamless loop
  const looped = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden relative">
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{ width: 140, background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{ width: 140, background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
      />
      <motion.div
        className="flex gap-4 py-2"
        animate={{ x: reverse ? ['-33.33%', 0] : [0, '-33.33%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{ width: 'max-content' }}
      >
        {looped.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split into two rows
  const row1 = TECHS.slice(0, 4); // HTML5, CSS3, SCSS, JS
  const row2 = TECHS.slice(4);    // React, Next.js, WordPress, Tilda

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(196,201,207,0.02) 50%, transparent 100%)',
        }}
      />

      <div
        className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 mb-14"
        ref={ref}
      >
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0,
              }}
            >
              Мой рабочий
              <br />
              <span
                style={{
                  background: S.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                инструментарий.
              </span>
            </h2>
          </div>
          <p
            style={{
              color: '#a0a0a0',
              maxWidth: 340,
              lineHeight: 1.7,
              fontSize: '0.95rem',
              marginBottom: 0,
            }}
          >
            Базовые технологии и платформы, с которыми я работаю каждый день для
            создания качественных сайтов.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <MarqueeRow items={row1} speed={36} />
        <MarqueeRow items={row2} reverse speed={32} />
      </motion.div>
    </section>
  );
}
