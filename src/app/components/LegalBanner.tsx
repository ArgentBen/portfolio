import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';

export function LegalBanner({ onOpenPrivacyPolicy }: { onOpenPrivacyPolicy: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem('legal-consent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legal-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-lg">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm mb-2" style={{ fontWeight: 600 }}>
              Согласие на обработку данных
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              В соответствии с Федеральным законом № 152-ФЗ "О персональных данных" и законом №168-ФЗ, 
              мы используем файлы cookie для улучшения работы сайта. Продолжая использование сайта, 
              вы соглашаетесь с нашей{' '}
              <a
                href="#"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setIsVisible(false);
                  onOpenPrivacyPolicy();
                }}
              >
                политикой конфиденциальности
              </a>
              .
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={handleAccept}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Принять
              </motion.button>
              <motion.button
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 border border-border rounded-lg text-xs hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Отклонить
              </motion.button>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
