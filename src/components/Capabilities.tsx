import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  Bot, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Zap,
  Code2,
  CheckCircle2,
  X
} from 'lucide-react';
import type { CapabilityItem } from '../types';
import { CAPABILITIES_DATA } from '../data/mockData';

interface CapabilitiesProps {
  onSelectService?: (serviceName: string) => void;
}

interface CapabilityCardItem extends CapabilityItem {
  defaultBg: string;
  hoverImg: string;
  iconType: 'bot' | 'database' | 'cpu' | 'shield' | 'layers' | 'zap';
  ctaLabel: string;
}

const CARDS_CONFIG: CapabilityCardItem[] = [
  {
    ...CAPABILITIES_DATA[0],
    defaultBg: '#F4F4F0',
    hoverImg: '/card-team.jpg',
    iconType: 'bot',
    ctaLabel: 'Explore Swarm Architecture',
  },
  {
    ...CAPABILITIES_DATA[1],
    defaultBg: '#ECE8FB',
    hoverImg: '/card-mesh.jpg',
    iconType: 'database',
    ctaLabel: 'Inspect Vector Mesh',
  },
  {
    ...CAPABILITIES_DATA[2],
    defaultBg: '#ECF6B7',
    hoverImg: '/card-infra.jpg',
    iconType: 'cpu',
    ctaLabel: 'View Sovereign Specs',
  },
  {
    ...CAPABILITIES_DATA[3],
    defaultBg: '#E0F2FE',
    hoverImg: '/hero-bg.jpg',
    iconType: 'shield',
    ctaLabel: 'Inspect Formal Verification',
  },
  {
    ...CAPABILITIES_DATA[4],
    defaultBg: '#F1F5F9',
    hoverImg: '/card-team.jpg',
    iconType: 'layers',
    ctaLabel: 'View Foundation Benchmarks',
  },
  {
    ...CAPABILITIES_DATA[5],
    defaultBg: '#E8F5E9',
    hoverImg: '/card-infra.jpg',
    iconType: 'zap',
    ctaLabel: 'Explore Sovereign Models',
  },
];

export const Capabilities: React.FC<CapabilitiesProps> = ({ onSelectService }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedModalCap, setSelectedModalCap] = useState<CapabilityCardItem | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'architecture' | 'features'>('architecture');

  const cardsPerPage = 3;
  const maxStartIndex = Math.max(0, CARDS_CONFIG.length - cardsPerPage);

  const handlePrevSlide = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxStartIndex));
  };

  const handleNextSlide = () => {
    setStartIndex((prev) => (prev < maxStartIndex ? prev + 1 : 0));
  };

  const visibleCards = CARDS_CONFIG.slice(startIndex, startIndex + cardsPerPage);

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'bot':
        return <Bot className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'database':
        return <Database className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'cpu':
        return <Cpu className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'shield':
        return <ShieldCheck className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      case 'layers':
        return <Layers className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
      default:
        return <Zap className="w-7 h-7 text-slate-900" strokeWidth={1.8} />;
    }
  };

  const handleViewAllServices = () => {
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 64;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      history.pushState(null, '', '#contact');
    }
  };

  const handleDeployClick = (capTitle: string) => {
    if (onSelectService) {
      onSelectService(capTitle);
    }
    setSelectedModalCap(null);
    const element = document.getElementById('contact');
    if (element) {
      const navOffset = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
      history.pushState(null, '', '#contact');
    }
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

          {/* Right Column: Big Headline, Description & Pill CTA */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-950 font-heading tracking-tight leading-[1.1]">
              AI Engineering Built Around Your Enterprise, Deterministic and Sovereign
            </h2>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Safe, deterministic, and sovereign multi-agent swarms — all in one unified mesh.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleViewAllServices}
                className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>View All Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. Interactive Cards Row matching Image 1 (Default) & Image 2 (Hover)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-10">
          {visibleCards.map((card) => {
            return (
              <div
                key={card.id}
                onClick={() => setSelectedModalCap(card)}
                className="group relative rounded-[28px] overflow-hidden p-8 sm:p-9 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between transition-all duration-500 cursor-pointer shadow-xs hover:shadow-2xl"
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
                  <p className="mt-3 text-sm text-slate-600 group-hover:text-white/90 leading-relaxed transition-colors duration-300 line-clamp-3">
                    {card.shortDesc}
                  </p>

                  {/* Hover Pill CTA Button (IMAGE 2) */}
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
        {/* 3. Carousel Pagination Controls matching Image 1 & Image 2 (Bottom Left)  */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous capabilities"
            className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button (Dark Solid) */}
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next capabilities"
            className="w-11 h-11 rounded-full bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-2xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Technical Architecture Drill-Down Modal (Zero Red, Blue/Black/White)   */}
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
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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

              {/* Architecture Code Snippet */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Production Architecture Blueprint</span>
                  </h4>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('architecture')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        activeCodeTab === 'architecture' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Python/Ray
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('features')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        activeCodeTab === 'features' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Features
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                  {activeCodeTab === 'architecture' ? (
                    <pre>
                      <code>{selectedModalCap.architectureSnippet}</code>
                    </pre>
                  ) : (
                    <div className="space-y-2 py-2">
                      {selectedModalCap.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
