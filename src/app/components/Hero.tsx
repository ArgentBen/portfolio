import { motion } from 'motion/react';
import { S } from './Logo';
import { assetUrl } from './ui/utils';

const HERO_AVATAR_WEBP = assetUrl('images/avatar.webp');
const HERO_AVATAR = assetUrl('images/avatar.png');
const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1769071167136-f25178b607dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwcm9ncmFtbWVyJTIwZGFyayUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3Mzk5MDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080';

export function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Ambient silver glows ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 560,
          height: 560,
          top: '-8%',
          right: '4%',
          background: `radial-gradient(circle, ${S.glow} 0%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420,
          height: 420,
          bottom: '4%',
          left: '-4%',
          background: `radial-gradient(circle, rgba(140,145,152,0.10) 0%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Floating silver orbs ── */}
      {[
        { w: 72, h: 72, top: '13%', right: '27%', delay: 0 },
        { w: 44, h: 44, top: '62%', right: '17%', delay: 1.6 },
        { w: 30, h: 30, bottom: '18%', left: '31%', delay: 3.1 },
        { w: 52, h: 52, top: '28%', left: '14%', delay: 2.2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            right: orb.right,
            bottom: orb.bottom,
            left: orb.left,
            background: `linear-gradient(135deg, ${S.bright}, ${S.mid})`,
            boxShadow: `0 0 20px rgba(196,201,207,0.3)`,
            opacity: 0.75,
          }}
          animate={{ y: [0, -16, 0], x: [0, 6, 0], scale: [1, 1.06, 1] }}
          transition={{
            duration: 5 + i * 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-7rem)]">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              <span style={{ color: '#ffffff' }}>Создаю</span>
              <br />
              <span style={{ background: S.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                современные
              </span>
              <br />
              <span style={{ color: '#ffffff' }}>веб-сайты.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-8 mb-10 text-lg"
              style={{ color: '#a0a0a0', maxWidth: 480, lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Разрабатываю уникальные цифровые решения с фокусом на дизайн, производительность
              и пользовательский опыт. Каждый проект — это история.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <motion.a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full"
                style={{
                  border: `1px solid rgba(196,201,207,0.3)`,
                  color: S.mid,
                  background: 'rgba(196,201,207,0.05)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                whileHover={{ scale: 1.05, background: 'rgba(196,201,207,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Портфолио
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-14 pt-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                { value: '50+', label: 'Проектов' },
                { value: '30+', label: 'Клиентов' },
                { value: '5+', label: 'Лет опыта' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      background: S.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: '#a0a0a0' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          >
            <div className="relative" style={{ width: '100%', maxWidth: 460 }}>
              {/* Silver glow behind portrait */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${S.glow} 0%, transparent 70%)`,
                  filter: 'blur(24px)',
                  transform: 'scale(1.1)',
                }}
              />
              <picture>
                <source srcSet={HERO_AVATAR_WEBP} type="image/webp" />
                <img
                  src={HERO_AVATAR}
                  alt="Веб-разработчик АРГЕНТУМ"
                  className="relative w-full object-cover rounded-3xl"
                  width={460}
                  height={613}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  style={{
                    aspectRatio: '3/4',
                    objectPosition: 'top center',
                    border: `1px solid rgba(196,201,207,0.15)`,
                  }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== HERO_FALLBACK) img.src = HERO_FALLBACK;
                  }}
                />
              </picture>

              {/* Floating tech card */}
              <motion.div
                className="absolute rounded-2xl px-5 py-4"
                style={{
                  top: '8%',
                  right: '-14%',
                  background: 'rgba(18,18,18,0.92)',
                  border: `1px solid rgba(196,201,207,0.2)`,
                  backdropFilter: 'blur(14px)',
                  minWidth: 150,
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-xs mb-2" style={{ color: '#808080' }}>Технологии</div>
                <div className="flex gap-1.5 flex-wrap">
                  {['React', 'TS', 'Next'].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: 'rgba(196,201,207,0.1)', color: S.mid }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                className="absolute rounded-2xl px-5 py-4"
                style={{
                  bottom: '12%',
                  left: '-14%',
                  background: 'rgba(18,18,18,0.92)',
                  border: `1px solid rgba(140,145,152,0.2)`,
                  backdropFilter: 'blur(14px)',
                  minWidth: 160,
                }}
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div
                  className="text-2xl mb-0.5"
                  style={{
                    fontWeight: 800,
                    lineHeight: 1,
                    background: S.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  98%
                </div>
                <div className="text-xs" style={{ color: '#808080' }}>
                  Удовлетворённость клиентов
                </div>
              </motion.div>

              {/* Silver rotating orb corner */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 58,
                  height: 58,
                  bottom: '-18px',
                  right: '10%',
                  background: `linear-gradient(135deg, ${S.bright}, ${S.dark})`,
                  boxShadow: `0 0 30px rgba(196,201,207,0.4)`,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', textDecoration: 'none' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs" style={{ color: '#606060', letterSpacing: '0.12em' }}>
          ПРОКРУТИТЕ
        </span>
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: `1px solid rgba(196,201,207,0.25)` }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: S.mid }}
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.a>
    </section>
  );
}
