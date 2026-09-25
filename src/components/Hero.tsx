import React, { useState, useEffect, useRef, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { TechLogosTicker } from './TechLogosTicker';
import { scrollToSection } from '../utils/scroll';

interface HeroProps {
  isPreloaderDone?: boolean;
}

export const HeroComponent: React.FC<HeroProps> = ({ isPreloaderDone = false }) => {
  // Staged entrance states for layered reveal sequence
  const [bgRevealed, setBgRevealed] = useState(false);
  const [headingLine1Revealed, setHeadingLine1Revealed] = useState(false);
  const [headingLine2Revealed, setHeadingLine2Revealed] = useState(false);
  const [paraRevealed, setParaRevealed] = useState(false);
  const [btn1Revealed, setBtn1Revealed] = useState(false);
  const [btn2Revealed, setBtn2Revealed] = useState(false);

  // Direct DOM refs for 120fps hardware-accelerated scroll parallax without triggering React re-renders
  const contentParallaxRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y <= 750) {
            const contentParallaxY = Math.min(y * 0.26, 140);
            const contentOpacity = Math.max(0, 1 - y / 520);
            const bgParallaxY = Math.min(y * 0.12, 90);

            if (contentParallaxRef.current) {
              contentParallaxRef.current.style.transform = `translate3d(0, -${contentParallaxY}px, 0)`;
              contentParallaxRef.current.style.opacity = `${contentOpacity}`;
            }
            if (bgParallaxRef.current) {
              bgParallaxRef.current.style.transform = `translate3d(0, ${bgParallaxY}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger staged layered entrance once preloader completes
  useEffect(() => {
    if (isPreloaderDone) {
      // 1. First fade in hero background with subtle scale-down (t = 40ms)
      const t0 = setTimeout(() => setBgRevealed(true), 40);

      // 2. Main heading line-by-line staggered fade-up reveal (t = 420ms & 580ms)
      const t1 = setTimeout(() => setHeadingLine1Revealed(true), 420);
      const t2 = setTimeout(() => setHeadingLine2Revealed(true), 580);

      // 3. Supporting paragraph subtle fade-up transition (t = 760ms)
      const t3 = setTimeout(() => setParaRevealed(true), 760);

      // 4. CTA buttons with upward movement & staggered opacity reveal (t = 940ms & 1060ms)
      const t4 = setTimeout(() => setBtn1Revealed(true), 940);
      const t5 = setTimeout(() => setBtn2Revealed(true), 1060);

      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    } else {
      // Direct mount fallback
      const fallback = setTimeout(() => {
        setBgRevealed(true);
        setHeadingLine1Revealed(true);
        setHeadingLine2Revealed(true);
        setParaRevealed(true);
        setBtn1Revealed(true);
        setBtn2Revealed(true);
      }, 3400);
      return () => clearTimeout(fallback);
    }
  }, [isPreloaderDone]);

  const handleScrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <section id="home" className="relative w-full overflow-hidden bg-white">
      
      {/* ========================================================================= */}
      {/* 1. Full-Screen Edge-to-Edge Sky-Blue Photographic Hero Section            */}
      {/* ========================================================================= */}
      <div
        className="relative w-full min-h-screen min-h-[100dvh] pt-16 flex flex-col justify-center overflow-hidden"
        style={{
          backgroundColor: '#0284c7',
        }}
      >
        {/* Parallax Container for Full-Bleed Sky-Blue Background Image & Continuous Motion */}
        <div
          ref={bgParallaxRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div
            className={`absolute inset-0 bg-cover bg-no-repeat transition-all duration-1000 ease-premium ${
              bgRevealed ? 'opacity-100 scale-100 animate-hero-subtle' : 'opacity-0 scale-[1.06]'
            }`}
            style={{
              backgroundImage: 'url("/hero-bg.jpg")',
              backgroundPosition: 'right 20% center',
            }}
          />

          {/* Atmosphere Gradient Wash for Optimal High-Contrast Typography & Sky Brightness */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/50 via-sky-900/25 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/50 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Hero Content Container inside full width with Scroll Parallax */}
        <div
          ref={contentParallaxRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-24"
        >
          <div className="max-w-2xl lg:max-w-3xl">
            
            {/* Large White Headline: “Take Control of Autonomous AI” with Staggered Line-by-Line Reveal */}
            <h1 className="hero-title select-none drop-shadow-sm">
              <div className="overflow-hidden py-1">
                <span
                  className={`inline-block transition-all duration-700 ease-premium ${
                    headingLine1Revealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  Take Control of
                </span>
              </div>
              <div className="overflow-hidden py-1">
                <span
                  className={`inline-block text-white transition-all duration-700 ease-premium ${
                    headingLine2Revealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  Autonomous AI
                </span>
              </div>
            </h1>

            {/* Short Supporting Description with subtle fade-up transition */}
            <p
              className={`text-base sm:text-lg lg:text-xl text-white/95 max-w-xl font-normal leading-relaxed mt-5 sm:mt-6 drop-shadow-xs transition-all duration-700 ease-premium ${
                paraRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Safe, deterministic, and sovereign multi-agent swarms all in one unified mesh. Sub-45ms latency with zero data egress.
            </p>

            {/* Two Pill-Shaped CTAs with Upward Movement, Hover Lift, Scale, Shadow & Smooth Color Transitions */}
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-4">
              {/* Dark Pill CTA: “Explore Capabilities” */}
              <button
                type="button"
                onClick={() => handleScrollTo('capabilities')}
                className={`group px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-slate-950 hover:bg-slate-900 shadow-md hover:shadow-xl hover:shadow-slate-950/25 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] active:translate-y-0 cursor-pointer border border-slate-800/80 flex items-center gap-2 ${
                  btn1Revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
              </button>

              {/* Crisp White Pill CTA: “Book Enterprise Demo” with smooth non-abrupt color transition */}
              <button
                type="button"
                onClick={() => handleScrollTo('contact')}
                className={`group px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-white hover:bg-slate-950 hover:text-white shadow-md hover:shadow-xl transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] active:translate-y-0 cursor-pointer border border-transparent hover:border-slate-800 flex items-center gap-2 ${
                  btn2Revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span>Book Enterprise Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Tech Stack Logo Ticker                                                 */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <TechLogosTicker />
      </div>
    </section>
  );
};

export const Hero = memo(HeroComponent);
