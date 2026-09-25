import React, { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const containerRef = useRef<HTMLHeadingElement>(null);
  const tokenRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Measure exact boundary percentage between "Token" and "Wave"
    let splitPercent = 50.8;
    if (tokenRef.current && containerRef.current) {
      const tokenWidth = tokenRef.current.getBoundingClientRect().width;
      const totalWidth = containerRef.current.getBoundingClientRect().width;
      if (totalWidth > 0) {
        splitPercent = (tokenWidth / totalWidth) * 100;
      }
    }

    let animationFrameId: number;
    const startTime = performance.now();

    // Timeline phases:
    // 1. Reveal "Token" (0% -> splitPercent) over 1200ms
    // 2. Micro-pause (small stop between the two words) for 400ms
    // 3. Continuation to reveal "Wave" (splitPercent -> 100%) over 1200ms
    const duration1 = 1200;
    const pauseDuration = 400;
    const duration2 = 1200;
    const totalDuration = duration1 + pauseDuration + duration2; // 2800ms total

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      let currentProgress = 0;

      if (elapsed <= duration1) {
        // Phase 1: Progressive reveal across "Token"
        const t = Math.min(elapsed / duration1, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        currentProgress = ease * splitPercent;
      } else if (elapsed <= duration1 + pauseDuration) {
        // Phase 2: Noticeable small stop exactly between "Token" and "Wave"
        currentProgress = splitPercent;
      } else if (elapsed <= totalDuration) {
        // Phase 3: Continuation across "Wave" to 100%
        const t = Math.min((elapsed - duration1 - pauseDuration) / duration2, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        currentProgress = splitPercent + ease * (100 - splitPercent);
      } else {
        currentProgress = 100;
      }

      setProgress(Math.min(Math.round(currentProgress), 100));

      if (elapsed < totalDuration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        // Brief hold at 100% (250ms), then graceful smooth fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          onCompleteRef.current?.();

          setTimeout(() => {
            setIsRemoved(true);
          }, 700);
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out select-none touch-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Pristine Clean White Canvas: Centered Wordmark Only */}
      <div className="relative flex flex-col items-center px-4 max-w-5xl mx-auto">
        {/* Dual-Tone Masked Wordmark */}
        <div className="relative inline-block leading-none">
          {/* Base Layer: Inactive Light Gray Text */}
          <h1
            ref={containerRef}
            className="text-6xl sm:text-8xl md:text-9xl font-bold font-serif select-none text-[#E5E7EB] tracking-tight"
          >
            <span ref={tokenRef}>Token</span>
            <span>Wave</span>
          </h1>

          {/* Top Layer: Active Dark Filled Text with Clip-Path Progressive Reveal */}
          <div
            className="absolute inset-0 select-none overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          >
            <h1
              className="text-6xl sm:text-8xl md:text-9xl font-bold font-serif select-none text-[#0B0F19] tracking-tight"
            >
              <span>Token</span>
              <span>Wave</span>
            </h1>
          </div>

          {/* Synchronized Percentage Indicator Directly Beneath Logo Cut Line */}
          <div
            className="absolute top-full mt-2 sm:mt-3 font-serif font-bold text-sm sm:text-base md:text-lg text-[#0B0F19] -translate-x-1/2 transition-all duration-75 ease-out select-none pointer-events-none"
            style={{
              left: `clamp(16px, ${progress}%, calc(100% - 16px))`,
            }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
