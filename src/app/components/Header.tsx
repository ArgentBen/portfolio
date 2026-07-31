import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Главная', href: '#home' },
    { name: 'Услуги', href: '#services' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        className="container mx-auto rounded-2xl px-6 py-4 flex items-center justify-between"
        animate={{
          background: scrolled
            ? 'rgba(10,10,10,0.85)'
            : 'rgba(10,10,10,0.4)',
          borderColor: scrolled
            ? 'rgba(196,201,207,0.2)'
            : 'rgba(196,201,207,0.08)',
          backdropFilter: 'blur(16px)',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
            : 'none',
        }}
        style={{ border: '1px solid rgba(196,201,207,0.08)' }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none' }}>
          <Logo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative text-sm"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.4 }}
              whileHover={{ color: '#ffffff' }}
            >
              {item.name}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, #C4C9CF, transparent)',
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <motion.a
          href="#contact"
          className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm"
          style={{
            background: 'linear-gradient(135deg, #C4C9CF, #8C9198)',
            color: '#0a0a0a',
            fontWeight: 700,
            letterSpacing: '0.03em',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(196,201,207,0.2)',
          }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(196,201,207,0.35)' }}
          whileTap={{ scale: 0.96 }}
        >
          Связаться
        </motion.a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          style={{ color: '#C4C9CF' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="container mx-auto mt-2 rounded-2xl px-6 py-6 flex flex-col gap-5"
            style={{
              background: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(196,201,207,0.15)',
              backdropFilter: 'blur(16px)',
            }}
            initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm py-2"
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-6 py-3 rounded-full text-sm text-center"
              style={{
                background: 'linear-gradient(135deg, #C4C9CF, #8C9198)',
                color: '#0a0a0a',
                fontWeight: 700,
                textDecoration: 'none',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Связаться
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
