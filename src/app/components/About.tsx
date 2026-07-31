import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, User, Target, Zap } from 'lucide-react';

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

  const stats = [
    { value: '150+', label: 'Проектов' },
    { value: '98%', label: 'Удовлетворенность' },
    { value: '24/7', label: 'Поддержка' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent" />

      <div className="container mx-auto relative z-10 max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
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
            className="text-lg text-muted-foreground mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            С 2018 года я реализовал более 150 проектов для клиентов из разных отраслей.
            Каждый проект — возможность применить новые технологии и создать что-то уникальное.
          </motion.p>

          <motion.div
            className="grid grid-cols-3 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-card/50 rounded-xl border border-border"
              >
                <div className="text-2xl md:text-3xl text-primary mb-1" style={{ fontWeight: 700 }}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 gap-4"
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
      </div>
    </section>
  );
}
