import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  Brain, 
  Database, 
  Sparkles, 
  Cloud, 
  Code2, 
  Zap,
  CheckCircle2,
  X
} from 'lucide-react';
import type { CapabilityItem } from '../types';
import { CAPABILITIES_DATA } from '../data/mockData';
import { scrollToSection } from '../utils/scroll';

interface CapabilitiesProps {
  onSelectService?: (serviceName: string) => void;
}

interface CapabilityCardItem extends CapabilityItem {
  defaultBg: string;
  hoverImg: string;
  iconType: 'brain' | 'database' | 'sparkles' | 'cloud' | 'code';
  ctaLabel: string;
}

const CARDS_CONFIG: CapabilityCardItem[] = [
  {
    ...CAPABILITIES_DATA[0],
    defaultBg: '#F4F4F0',
    hoverImg: '/card-team.jpg',
    iconType: 'brain',
    ctaLabel: 'Explore Applied AI',
  },
  {
    ...CAPABILITIES_DATA[1],
    defaultBg: '#ECE8FB',
    hoverImg: '/card-mesh.jpg',
    iconType: 'database',
    ctaLabel: 'Inspect Data Architecture',
  },
  {
    ...CAPABILITIES_DATA[2],
    defaultBg: '#FEF9C3',
    hoverImg: '/hero-bg.jpg',
    iconType: 'sparkles',
    ctaLabel: 'Explore GenAI Solutions',
  },
  {
    ...CAPABILITIES_DATA[3],
    defaultBg: '#E0F2FE',
    hoverImg: '/card-infra.jpg',
    iconType: 'cloud',
    ctaLabel: 'View DevOps & SRE Specs',
  },
  {
    ...CAPABILITIES_DATA[4],
    defaultBg: '#F1F5F9',
    hoverImg: '/card-team.jpg',
    iconType: 'code',
    ctaLabel: 'Inspect Product Engineering',
  },
];

export const CapabilitiesComponent: React.FC<CapabilitiesProps> = ({ onSelectService }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedModalCap, setSelectedModalCap] = useState<CapabilityCardItem | null>(null);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const prev = currentIndex > 0 ? currentIndex - 1 : CARDS_CONFIG.length - 1;
    scrollToIndex(prev);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % CARDS_CONFIG.length;
    scrollToIndex(next);
  };

  // Automatic scrolling every 4.5s, pauses on hover / touch
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % CARDS_CONFIG.length;
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const cards = container.children;
          if (cards[next]) {
            const card = cards[next] as HTMLElement;
            container.scrollTo({
              left: card.offsetLeft - container.offsetLeft,
              behavior: 'smooth',
            });
          }
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Keep currentIndex synchronized on manual swipe or scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    let closest = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.offsetLeft - container.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = idx;
      }
    });
    setCurrentIndex(closest);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'brain':
        return <Brain className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'database':
        return <Database className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'sparkles':
        return <Sparkles className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'cloud':
        return <Cloud className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'code':
        return <Code2 className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      default:
        return <Brain className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
    }
  };

  const handleDeployClick = (capTitle: string) => {
    if (onSelectService) {
      onSelectService(capTitle);
    }
    setSelectedModalCap(null);
    scrollToSection('contact');
  };

  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ========================================================================= */}
        {/* 1. Top Split Section Header matching Image 1                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 sm:mb-16">
          {/* Left Column: Small Tagline */}
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-slate-500 max-w-[240px] leading-relaxed">
              TokenWave is built for sovereign enterprise intelligence.
            </p>
          </div>

          {/* Right Column: Big Headline & Description */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-950 font-heading tracking-tight leading-[1.1]">
              AI Engineering Built Around Your Enterprise, Deterministic and Sovereign
            </h2>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl text-justify">
              Scalable, deterministic, and sovereign architectures across applied AI, enterprise data, generative AI, cloud reliability, and software product engineering.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. Horizontal Scrollable Cards with Automatic Scrolling                   */}
        {/* ========================================================================= */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onScroll={handleScroll}
          className="flex gap-6 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 mb-10 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CARDS_CONFIG.map((card) => {
            return (
              <div
                key={card.id}
                onClick={() => setSelectedModalCap(card)}
                className="w-[88vw] sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] shrink-0 snap-start group relative rounded-[28px] overflow-hidden p-8 sm:p-9 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between transition-all duration-500 cursor-pointer shadow-xs hover:shadow-2xl"
                style={{
                  backgroundColor: card.defaultBg,
                }}
              >
                {/* Full-Bleed Hover Photographic Background (IMAGE 2 EFFECT) */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  style={{
                    backgroundImage: `url("${card.hoverImg}")`,
                  }}
                />

                {/* Dark Gradient Overlay on Hover for Pure White High-Contrast Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Top: Clean Icon (fades gracefully when photo appears) */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-900 shadow-2xs group-hover:opacity-0 transition-opacity duration-300">
                    {getCardIcon(card.iconType)}
                  </div>
                </div>

                {/* Card Bottom: Title, Description, and Hover Pill CTA */}
                <div className="relative z-10 mt-auto pt-6">
                  {/* Title: Dark by default, pure white on hover */}
                  <h3 className="text-2xl sm:text-[26px] font-extrabold text-slate-950 group-hover:text-white font-heading tracking-tight transition-colors duration-300 leading-snug">
                    {card.title}
                  </h3>

                  {/* Description: Slate by default, crisp white on hover */}
                  <p className="mt-3 text-sm text-slate-600 group-hover:text-white/90 leading-relaxed transition-colors duration-300 line-clamp-3 text-justify">
                    {card.shortDesc}
                  </p>

                  {/* Hover Pill CTA Button */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-out pt-0 group-hover:pt-5">
                    <div className="w-full py-3 px-5 rounded-full bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 shadow-lg group-hover:translate-y-0 translate-y-2 duration-300">
                      <span>{card.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. Carousel Controls: Arrows (Left) & Indicator Dots (Right)              */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between">
          {/* Arrow Buttons (Bottom Left matching images) */}
          <div className="flex items-center gap-3">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous capabilities"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Right Arrow Button (Dark Solid) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next capabilities"
              className="w-11 h-11 rounded-full bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-2xs hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {CARDS_CONFIG.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to capability ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Technical Architecture Drill-Down Modal                                */}
      {/* ========================================================================= */}
      {selectedModalCap && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedModalCap(null)}
        >
          <div
            className="w-full max-w-4xl bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-800 flex items-start justify-between bg-slate-900/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  {getCardIcon(selectedModalCap.iconType)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {selectedModalCap.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedModalCap(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6" data-lenis-prevent>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
                {selectedModalCap.fullDesc}
              </p>

              {/* Benchmarks Metrics Ticker */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>SLA &amp; Performance Benchmarks</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedModalCap.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xl font-bold font-mono text-white text-blue-300">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features & Architecture Specifications */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Key Architectural Specifications</span>
                </h4>

                <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                  <div className="space-y-2.5">
                    {selectedModalCap.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Integrated Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModalCap.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-300 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Air-Gapped Sovereign Readiness: 100%
              </span>
              <button
                type="button"
                onClick={() => handleDeployClick(selectedModalCap.title)}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Deploy into Enterprise Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const Capabilities = memo(CapabilitiesComponent);
