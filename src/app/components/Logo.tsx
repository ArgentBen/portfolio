import { motion } from 'motion/react';

// Silver color constants
export const S = {
  bright: '#E8EAEC',
  mid: '#C4C9CF',
  dark: '#8C9198',
  deep: '#606570',
  gradient: 'linear-gradient(135deg, #ffffff 0%, #E2E6E9 20%, #B0B5BA 45%, #8E9399 65%, #D4D8DC 85%, #ffffff 100%)',
  gradientShort: 'linear-gradient(135deg, #ffffff, #C4C9CF, #8C9198)',
  glow: 'rgba(196, 201, 207, 0.15)',
  glowStrong: 'rgba(196, 201, 207, 0.25)',
};

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showMark?: boolean;
}

export function Logo({ size = 'md', className = '', showMark = true }: LogoProps) {
  const fontSize = size === 'lg' ? '1.4rem' : size === 'sm' ? '0.85rem' : '1.1rem';
  const markSize = size === 'lg' ? 46 : size === 'sm' ? 28 : 36;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Diamond mark */}
      {showMark && (
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width={markSize}
            height={markSize}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Main silver fill */}
              <linearGradient id="argMark" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#DCE0E4" />
                <stop offset="45%" stopColor="#9EA4AA" />
                <stop offset="70%" stopColor="#C8CDD2" />
                <stop offset="100%" stopColor="#ECEEF0" />
              </linearGradient>
              {/* Inner shadow / depth */}
              <linearGradient id="argInner" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="50%" stopColor="rgba(140,145,152,0.0)" />
                <stop offset="100%" stopColor="rgba(100,105,112,0.4)" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="argGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer glow ring */}
            <path
              d="M22 1 L43 22 L22 43 L1 22 Z"
              fill="none"
              stroke="rgba(196,201,207,0.25)"
              strokeWidth="0.5"
              transform="scale(1.04) translate(-0.9, -0.9)"
            />

            {/* Diamond body */}
            <path
              d="M22 2 L42 22 L22 42 L2 22 Z"
              fill="url(#argMark)"
            />
            {/* Highlight overlay */}
            <path
              d="M22 2 L42 22 L22 42 L2 22 Z"
              fill="url(#argInner)"
            />
            {/* Border */}
            <path
              d="M22 2 L42 22 L22 42 L2 22 Z"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.7"
            />

            {/* Stylized А letter — two strokes forming the glyph */}
            {/* Left stroke */}
            <line x1="15.5" y1="30" x2="22" y2="15" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" />
            {/* Right stroke */}
            <line x1="22" y1="15" x2="28.5" y2="30" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" />
            {/* Crossbar */}
            <line x1="17.8" y1="24.5" x2="26.2" y2="24.5" stroke="#0D0D0D" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Wordmark АРГЕНТУМ */}
      <motion.span
        style={{
          fontWeight: 800,
          fontSize,
          letterSpacing: '0.22em',
          lineHeight: 1,
          background: S.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        whileHover={{
          background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 30%, #C4C9CF 60%, #E8EAEC 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
        transition={{ duration: 0.3 }}
      >
        АРГЕНТУМ
      </motion.span>
    </div>
  );
}
