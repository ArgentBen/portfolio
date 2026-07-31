import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { TechStack } from './components/TechStack';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalBanner } from './components/LegalBanner';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main>
          <Hero />
          <Stats />
          <About />
          <Services />
          <TechStack />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer onOpenPrivacyPolicy={() => setPrivacyOpen(true)} />
        <LegalBanner onOpenPrivacyPolicy={() => setPrivacyOpen(true)} />
        <BackToTop />
        <PrivacyPolicy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      </div>
    </>
  );
}