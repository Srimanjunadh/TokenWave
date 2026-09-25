import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  Quote, 
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Briefcase
} from 'lucide-react';
import type { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/mockData';

interface InsightsProps {
  onOpenCaseStudyModal: (caseStudy: CaseStudy) => void;
}

export const InsightsComponent: React.FC<InsightsProps> = ({ onOpenCaseStudyModal }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    const prev = currentIndex > 0 ? currentIndex - 1 : CASE_STUDIES.length - 1;
    scrollToIndex(prev);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % CASE_STUDIES.length;
    scrollToIndex(next);
  };

  // Automatic scrolling with 4.5s time limit, pausing on hover/touch
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % CASE_STUDIES.length;
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

  // Synchronize active dot index on manual scroll
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

  return (
    <section id="our-work" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Anchor targets for legacy links */}
      <span id="insights" className="absolute -top-24 pointer-events-none" />
      <span id="casestudies" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-semibold mb-4 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>OUR WORK &amp; CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight">
            Proven Systems Delivered in Live Production Environments
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto text-center leading-relaxed">
            Explore how our unified architectures, autonomous AI pipelines, and enterprise platforms solve complex operational challenges with quantifiable, measurable impact.
          </p>
        </div>


        {/* Carousel Header Controls Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider">
              Case Study {String(currentIndex + 1).padStart(2, '0')} of {String(CASE_STUDIES.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous case study"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-2xs hover:shadow active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next case study"
              className="w-10 h-10 rounded-full bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-2xs hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Single Row Horizontal Scrolling Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="w-[88vw] sm:w-[380px] md:w-[410px] shrink-0 snap-start flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Header Tag / Product Category */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3.5">
                  <span className="font-bold text-blue-600 tracking-wide">{study.industry}</span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-slate-200 font-semibold text-slate-900 shadow-2xs">
                    {study.client}
                  </span>
                </div>

                {/* Case Study Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 font-heading leading-snug group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed text-justify">
                  {study.summary}
                </p>

                {/* Optional Tags */}
                {study.tags && study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {study.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/70 font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Key Metrics */}
                <div className="mt-auto pt-6 border-t border-slate-200/80 space-y-2.5">
                  {study.metrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                      <span className="text-xs text-slate-600 font-medium">{m.label}</span>
                      <span className="text-sm font-extrabold font-mono text-blue-600">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Executive Quote */}
                {study.quote && study.quote.text && (
                  <div className="mt-5 p-3.5 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 italic relative text-justify leading-relaxed">
                    <Quote className="w-3.5 h-3.5 text-blue-500/40 mb-1" />
                    "{study.quote.text}"
                    <div className="mt-2 font-mono not-italic text-[11px] font-bold text-slate-900">
                      — {study.quote.author}, <span className="text-slate-500 font-normal">{study.quote.title}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Action Bar */}
              <div className="px-6 py-4 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onOpenCaseStudyModal(study)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Brief</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {study.link && (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs group/btn cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-blue-600 shadow-xs'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Jump to case study ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Insights = memo(InsightsComponent);

