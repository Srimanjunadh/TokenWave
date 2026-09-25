import React from 'react';
import { scrollToSection } from '../utils/scroll';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtextSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      scrollToSection('home');
    }
  };

  return (
    <a
      href="#home"
      onClick={handleLogoClick}
      className={`inline-flex items-center gap-3 group focus:outline-none transition-transform hover:scale-[1.01] ${className}`}
      aria-label="TokenWave AI - Return to top"
    >
      {/* Geometric Blue Faceted Polygon SVG Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(2,132,199,0.35)] transition-transform duration-300 group-hover:rotate-6"
        >
          <defs>
            <linearGradient id="facet-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#0284C7" />
            </linearGradient>
            <linearGradient id="facet-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0284C7" />
              <stop offset="100%" stop-color="#1D4ED8" />
            </linearGradient>
            <linearGradient id="facet-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1D4ED8" />
              <stop offset="100%" stop-color="#0F172A" />
            </linearGradient>
            <linearGradient id="facet-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#60A5FA" />
              <stop offset="100%" stop-color="#2563EB" />
            </linearGradient>
            <linearGradient id="border-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#2563EB" />
            </linearGradient>
          </defs>

          {/* Hexagonal Outer Contour with subtle precision stroke */}
          <polygon
            points="24,3 43,14 43,34 24,45 5,34 5,14"
            fill="#0B0F19"
            stroke="url(#border-glow)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Facets radiating from center (24, 24) */}
          <polygon points="24,3 43,14 24,24" fill="url(#facet-top)" opacity="0.95" />
          <polygon points="43,14 43,34 24,24" fill="url(#facet-right)" opacity="0.9" />
          <polygon points="43,34 24,45 24,24" fill="url(#facet-bottom)" opacity="0.98" />
          <polygon points="24,45 5,34 24,24" fill="url(#facet-right)" opacity="0.85" />
          <polygon points="5,34 5,14 24,24" fill="url(#facet-top)" opacity="0.8" />
          <polygon points="5,14 24,3 24,24" fill="url(#facet-left)" opacity="1" />

          {/* Inner Quantum Geometric Core Node */}
          <circle cx="24" cy="24" r="3.2" fill="#FFFFFF" />
          <circle cx="24" cy="24" r="1.6" fill="#0284C7" />
        </svg>
      </div>

      {/* Typography: TOKEN (bold) + WAVE (blue) & AI Subtext */}
      <div className="flex flex-col leading-none select-none">
        <div className={`font-heading font-extrabold tracking-tight ${textSizes[size]}`}>
          <span className={variant === 'dark' ? 'text-white' : 'text-slate-900'}>
            TOKEN
          </span>
          <span className="text-blue-600 ml-0.5">
            WAVE
          </span>
        </div>
        <div className={`font-mono font-bold text-slate-500 uppercase mt-0.5 ${subtextSizes[size]}`}>
          APPLIED AI ENGINEERING
        </div>
      </div>
    </a>
  );
};
