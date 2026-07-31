import { motion, useInView } from 'motion/react';
import React, { useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { S } from './Logo';

const platforms = [
  {
    id: 'tilda',
    num: '01',
    name: 'Tilda',
    color: '#5B73FF',
    tagline: 'Лендинги и корпоративные сайты',
    description:
      'Создаю красивые, быстрые лендинги и многостраничные корпоративные сайты на Tilda. Кастомный дизайн, анимации при скролле, интеграции с CRM — сайт готов за считанные дни.',
    features: [
      'Продающие лендинги',
      'Корпоративные сайты',
      'Сайты-портфолио',
      'Интеграция с CRM',
      'SEO-оптимизация',
      'Аналитика и цели',
    ],
    badge: 'Быстрый старт',
  },
  {
    id: 'wp',
    num: '02',
    name: 'WordPress',
    color: '#21A0DB',
    tagline: 'Блоги, каталоги и магазины',
    description:
      'Разрабатываю сайты на WordPress: новостные порталы, корпоративные каталоги и интернет-магазины на WooCommerce. Кастомные темы с нуля, без конструкторов.',
    features: [
      'Интернет-магазины (WooCommerce)',
      'Каталоги товаров и услуг',
      'Корпоративные сайты',
      'Новостные порталы и блоги',
      'Безопасность и защита',
      'Поддержка и обновления',
    ],
    badge: 'Гибкость',
  },
  {
    id: 'react',
    num: '03',
    name: 'Проект React',
    color: '#61DAFB',
    tagline: 'Сайты с богатой интерактивностью',
    description:
      'Верстаю и разрабатываю корпоративные сайты и каталоги на React, когда нужна максимальная интерактивность, скорость и уникальный пользовательский опыт.',
    features: [
      'Корпоративные порталы',
      'Интерактивные каталоги',
      'Сайты с личным кабинетом',
      'Высокая скорость загрузки',
      'Уникальная анимация',
      'Интеграции с API',
    ],
    badge: 'Интерактивность',
  },
  {
    id: 'nextjs',
    num: '04',
    name: 'Проект Next.js',
    color: '#C4C9CF',
    tagline: 'SEO-сайты и высоконагруженные проекты',
    description:
      'Создаю сайты на Next.js с серверным рендерингом для максимально быстрого старта в поисковиках. Идеально для крупных каталогов, маркетплейсов и проектов с большим трафиком.',
    features: [
      'SEO-оптимизированные сайты',
      'Каталоги и маркетплейсы',
      'Высоконагруженные сайты',
      'SSR и SSG страницы',
      'Быстрая индексация',
      'Масштабирование',
    ],
    badge: 'SEO & Масштаб',
  },
  {
    id: 'django',
    num: '05',
    name: 'Django',
    color: '#44B78B',
    tagline: 'Каталоги, порталы и веб-приложения',
    description:
      'Разрабатываю сайты и сервисы на Django: каталоги, корпоративные порталы, личные кабинеты и интеграции с внешними системами. Надёжная админка и гибкая бизнес-логика под ваши задачи.',
    features: [
      'Каталоги и B2B-порталы',
      'Админ-панель под задачи',
      'Интеграции с CRM и 1С',
      'REST API',
      'Безопасность и права доступа',
      'Масштабирование проекта',
    ],
    badge: 'Backend',
  },
  {
    id: 'hostcms',
    num: '06',
    name: 'HostCMS',
    color: '#F59E0B',
    tagline: 'Корпоративные сайты и каталоги',
    description:
      'Создаю и дорабатываю сайты на HostCMS: корпоративные ресурсы, каталоги товаров и услуг, многоязычные версии. Удобное управление контентом и стабильная работа на хостинге.',
    features: [
      'Корпоративные сайты',
      'Каталоги товаров и услуг',
      'Многоязычность',
      'SEO и структура разделов',
      'Интеграция форм и заявок',
      'Поддержка и доработки',
    ],
    badge: 'CMS',
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      id="services"
    >
      {/* Ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          left: '-8%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(140,145,152,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0,
              }}
            >
              Создаю сайты,
              <br />
              <span
                style={{
                  background: S.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                которые работают.
              </span>
            </h2>
          </motion.div>

          <motion.p
            style={{ color: '#a0a0a0', maxWidth: 400, lineHeight: 1.7, fontSize: '0.95rem' }}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Специализируюсь на создании сайтов — от лендинга на Tilda и WordPress
            до проектов на React, Django и HostCMS. Без воды, только результат.
          </motion.p>
        </div>

        {/* Platform cards 2×2 */}
        <div className="grid md:grid-cols-2 gap-4">
          {platforms.map((p, index) => {
            const isHovered = hovered === p.id;
            return (
              <motion.div
                key={p.id}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${p.color}0d 0%, rgba(255,255,255,0.03) 100%)`
                    : 'rgba(255,255,255,0.03)',
                  border: isHovered
                    ? `1px solid ${p.color}40`
                    : '1px solid rgba(255,255,255,0.07)',
                  transition: 'background 0.35s ease, border-color 0.35s ease',
                  cursor: 'default',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * index, duration: 0.65, ease: 'easeOut' }}
                onHoverStart={() => setHovered(p.id)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-8">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Platform badge */}
                      <div
                        className="px-4 py-2 rounded-xl"
                        style={{
                          background: `${p.color}18`,
                          border: `1px solid ${p.color}40`,
                        }}
                      >
                        <span
                          style={{
                            color: p.color,
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {p.name}
                        </span>
                      </div>
                      {/* Badge */}
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: '#606060',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>

                    {/* Number */}
                    <span
                      style={{
                        color: isHovered ? p.color : 'rgba(255,255,255,0.15)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        transition: 'color 0.3s',
                      }}
                    >
                      {p.num}
                    </span>
                  </div>

                  {/* Tagline */}
                  <h3
                    className="mb-3"
                    style={{
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      color: '#ffffff',
                      lineHeight: 1.3,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {p.tagline}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-6 text-sm"
                    style={{ color: '#808080', lineHeight: 1.7, margin: '0 0 1.5rem' }}
                  >
                    {p.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-7">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: p.color }}
                        />
                        <span className="text-xs" style={{ color: '#909090', lineHeight: 1.4 }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 text-sm"
                    style={{
                      color: isHovered ? p.color : '#606060',
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'color 0.3s',
                    }}
                    whileHover={{ x: 3 }}
                  >
                    Обсудить проект
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}