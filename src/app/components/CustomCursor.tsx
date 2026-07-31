import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Main cursor — fast, precise
  const mainX = useSpring(rawX, { stiffness: 600, damping: 40, mass: 0.3 });
  const mainY = useSpring(rawY, { stiffness: 600, damping: 40, mass: 0.3 });

  // Ring — slower, laggy feel
  const ringX = useSpring(rawX, { stiffness: 180, damping: 24, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 24, mass: 0.6 });

  useEffect(() => {
    setIsMobile('ontouchstart' in window || window.innerWidth <= 768);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        !!(
          t.tagName === 'BUTTON' ||
          t.tagName === 'A' ||
          t.closest('button') ||
          t.closest('a') ||
          t.closest('[data-hover]') ||
          t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA'
        )
      );
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isVisible, rawX, rawY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot — sharp, instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          x: mainX,
          y: mainY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'linear-gradient(135deg, #ffffff, #C4C9CF)',
          boxShadow: '0 0 10px rgba(196,201,207,0.8), 0 0 4px rgba(255,255,255,0.6)',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(196,201,207,0.6)',
          boxShadow: '0 0 12px rgba(196,201,207,0.15)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.3s ease',
        }}
        animate={{
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
