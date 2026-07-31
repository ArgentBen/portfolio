import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, User, Target, Zap } from 'lucide-react';
import { assetUrl } from './ui/utils';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Award,
      title: 'Качество',
      description: 'Высокие стандарты в каждом проекте',
    },
    {
      icon: User,
      title: 'Опыт',
      description: 'Более 5 лет в веб-разработке',
    },
    {
      icon: Target,
      title: 'Цели',
      description: 'Фокус на результате',
    },
    {
      icon: Zap,
      title: 'Скорость',
      description: 'Быстрая разработка и внедрение',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent" />

      <div className="container mx-auto relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{ fontWeight: 700 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Создаю будущее
              <br />
              <span className="text-primary">вместе с вами</span>
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Я — веб-разработчик, специализируюсь на создании современных цифровых решений.
              Моя задача — превращать сложные задачи в простые и эффективные продукты.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              С 2018 года я реализовал более 150 проектов для клиентов из разных отраслей.
              Каждый проект — возможность применить новые технологии и создать что-то уникальное.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 bg-card/50 rounded-xl border border-border hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm mb-1" style={{ fontWeight: 600 }}>
                      {feature.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {feature.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-primary/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={assetUrl('images/hero.png')}
                  alt="Веб-разработчик АРГЕНТУМ"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/5', objectPosition: 'top center' }}
                />
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-xl"
                animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>
                  98%
                </div>
                <div className="text-sm text-muted-foreground">
                  Удовлетворенность
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-xl"
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>
                  150+
                </div>
                <div className="text-sm text-muted-foreground">
                  Проектов
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
