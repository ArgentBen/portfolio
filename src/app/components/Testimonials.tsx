import { motion, useInView } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Алексей',
      position: 'redsquare-mebel.ru, руководитель',
      rating: 5,
      text: 'Заказывали сайт для мебельного центра Red Square в Краснодаре. Нужно было собрать понятную витрину категорий (кровати, кухни/столовые, детская, шкафы и хранение) и показать магазины партнёров в удобной навигации. Сделали структуру так, что посетителю быстро видно, куда перейти в каталог, а страницы салонов легко просматриваются. Отдельно отметили аккуратную верстку и удобные формы для заявок — после запуска стало больше целевых обращений.',
    },
    {
      id: 2,
      name: 'Инна',
      position: 'jewel-perm.ru, руководитель',
      rating: 5,
      text: 'Нам было важно, чтобы сайт выглядел “дорого” и при этом оставался простым: цены, услуги, контакты, истории работ и отзывы. Сделали именно такую подачу. На странице услуг стало меньше вопросов, заявки приходят по делу, а оформление реально помогает доверять мастерам. Отличная работа с деталями.',
    },
    {
      id: 3,
      name: 'Екатерина',
      position: 'nda.ru, маркетинг',
      rating: 5,
      text: 'Сайт для медицинской компании делали под каталог брендов и удобную навигацию. Нужно было, чтобы пользователи быстро находили позиции, а в разделах было всё по делу: категории, производители, контакты и документы. После запуска стало заметно, что посетители меньше “теряются”, и заявки стали качественнее. Спасибо за аккуратную верстку и продуманную структуру.',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30">
      <div className="container mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontWeight: 700 }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Что говорят наши клиенты
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Отзывы наших довольных клиентов о совместной работе
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute -top-4 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                animate={activeIndex === index ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-6 h-6 text-primary-foreground" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
