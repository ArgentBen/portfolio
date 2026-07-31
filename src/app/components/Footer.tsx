import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import { Logo, S } from './Logo';

export function Footer({ onOpenPrivacyPolicy }: { onOpenPrivacyPolicy: () => void }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Сайты на Tilda', href: '#services' },
      { name: 'Сайты на WordPress', href: '#services' },
      { name: 'Проект React', href: '#services' },
      { name: 'Проект Next.js', href: '#services' },
      { name: 'Django', href: '#services' },
      { name: 'HostCMS', href: '#services' },
    ],
    company: [
      { name: 'Обо мне', href: '#about' },
      { name: 'Портфолио', href: '#portfolio' },
      { name: 'Услуги', href: '#services' },
      { name: 'Контакты', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <>
      <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(196,201,207,0.08)' }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#home" style={{ textDecoration: 'none' }}>
                <Logo size="md" className="mb-5" />
              </a>
              <p className="text-muted-foreground mb-6 max-w-sm text-sm" style={{ lineHeight: 1.7 }}>
                Создаю сайты на Tilda, WordPress, React, Django, HostCMS и т.д. — от быстрых лендингов до масштабных проектов.
                Качество, скорость, результат.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(196,201,207,0.06)',
                      border: '1px solid rgba(196,201,207,0.12)',
                      color: '#808080',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3
                className="text-sm mb-5"
                style={{ fontWeight: 700, letterSpacing: '0.1em', color: S.mid }}
              >
                УСЛУГИ
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3
                className="text-sm mb-5"
                style={{ fontWeight: 700, letterSpacing: '0.1em', color: S.mid }}
              >
                НАВИГАЦИЯ
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3
                className="text-sm mb-5"
                style={{ fontWeight: 700, letterSpacing: '0.1em', color: S.mid }}
              >
                ПРАВОВОЕ
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    id="privacy-policy-footer"
                    onClick={onOpenPrivacyPolicy}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Политика конфиденциальности
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenPrivacyPolicy}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Согласие на обработку данных
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground text-center md:text-left">
                © {currentYear} АРГЕНТУМ. Все права защищены.
              </p>
              <p className="text-xs text-muted-foreground text-center md:text-right">
                Разработано с соблюдением требований законодательства РФ
              </p>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
}
