import React from 'react';
import { Logo, S } from './Logo';

export function Footer() {
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
    ],
  };

  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(196,201,207,0.08)' }}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <a href="#home" style={{ textDecoration: 'none' }}>
              <Logo size="md" className="mb-5" />
            </a>
            <p className="text-muted-foreground max-w-sm text-sm" style={{ lineHeight: 1.7 }}>
              Создаю сайты на Tilda, WordPress, React, Django, HostCMS и т.д. — от быстрых лендингов до масштабных проектов.
              Качество, скорость, результат.
            </p>
          </div>

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
        </div>
      </div>
    </footer>
  );
}
