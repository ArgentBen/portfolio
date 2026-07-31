import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Logo, S } from './Logo';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        return Math.min(prev + Math.random() * 14, 100);
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0a' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
        >
          {/* Ambient glows */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 500,
              height: 500,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -60%)',
              background: 'radial-gradient(circle, rgba(196,201,207,0.07) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <Logo size="lg" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mb-10 text-sm"
            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ВЕБ-РАЗРАБОТКА
          </motion.p>

          {/* Progress bar */}
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 220,
              height: 2,
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${S.deep}, ${S.mid}, ${S.bright})`,
                boxShadow: `0 0 12px ${S.glowStrong}`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            {/* Shimmer */}
            <motion.div
              className="absolute inset-y-0 w-16 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              }}
              animate={{ x: [-60, 280] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
            />
          </div>

          {/* Progress text */}
          <motion.p
            className="mt-4 text-xs"
            style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Three pulsing dots */}
          <div className="flex gap-2 mt-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: S.mid }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
