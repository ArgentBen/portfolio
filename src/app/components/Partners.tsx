import { motion } from 'motion/react';

export function Partners() {
  const partners = [
    'Яндекс',
    'Сбербанк',
    'ВТБ',
    'МТС',
    'Мегафон',
    'Альфа-Банк',
    'Тинькофф',
    'Ростелеком',
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Нам доверяют</p>
        </motion.div>

        {/* Infinite scroll animation */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate partners for seamless loop */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 text-muted-foreground/50 hover:text-primary transition-colors text-xl"
                style={{ fontWeight: 600 }}
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
