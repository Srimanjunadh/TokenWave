import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export interface ScrollOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

/**
 * Determines whether an input event is from a touchpad, trackpad, or touchscreen.
 * Touchpads and touchscreens already have native hardware-accelerated inertia and 1:1 precision.
 * Intercepting them with software scroll-jacking causes artificial lag and section-boundary sticking.
 */
function isTouchOrTouchpad(event: Event): boolean {
  // Direct touch events (touch screens, mobile, tablets, 2-in-1 laptops)
  if (event.type.includes('touch')) {
    return true;
  }

  // Wheel events
  if ('deltaMode' in event) {
    const wheel = event as WheelEvent;
    // deltaMode 1 (DOM_DELTA_LINE) or 2 (DOM_DELTA_PAGE) is always a physical notched mouse wheel
    if (wheel.deltaMode !== 0) {
      return false;
    }

    // Touchpads on Windows/Mac emit fractional pixel deltas (e.g. 0.8, 1.25, 3.4)
    if (wheel.deltaY % 1 !== 0 || wheel.deltaX % 1 !== 0) {
      return true;
    }

    // Touchpads emit micro-deltas (< 50px) continuously during swipes
    if (Math.abs(wheel.deltaY) < 50 && Math.abs(wheel.deltaY) > 0) {
      return true;
    }

    // Physical mouse wheels with discrete notches emit exact increments (100, 120, etc.)
    if (
      Math.abs(wheel.deltaY) >= 100 &&
      (Math.abs(wheel.deltaY) % 100 === 0 || Math.abs(wheel.deltaY) % 120 === 0)
    ) {
      return false;
    }
  }

  return false;
}

/**
 * Initializes the global Lenis smooth scrolling instance
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Cleanup any existing instance
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  lenisInstance = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    // Snappy, responsive duration for mouse wheel notches (0.5s instead of sluggish 1.1s)
    duration: 0.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.0,
    syncTouch: false,
    autoToggle: false,
    // Bypass virtual scroll for touch & touchpads so native hardware acceleration is 100% instant & smooth
    virtualScroll: (data) => {
      if (isTouchOrTouchpad(data.event)) {
        return false;
      }
      return true;
    },
  });

  return lenisInstance;
}

/**
 * Get the active Lenis instance
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Smoothly scroll to a section or element by ID
 */
export function scrollToSection(targetId: string, options: ScrollOptions = {}) {
  const { offset = -64, duration = 0.8, immediate = false } = options;

  if (targetId === 'home' || targetId === 'top' || targetId === '') {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration, offset: 0, immediate });
    } else {
      window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
    }
    history.pushState(null, '', '#home');
    return;
  }

  const cleanId = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  const targetEl = document.getElementById(cleanId);

  if (targetEl) {
    if (lenisInstance) {
      lenisInstance.scrollTo(targetEl, {
        offset,
        duration,
        immediate,
      });
    } else {
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({
        top,
        behavior: immediate ? 'auto' : 'smooth',
      });
    }
    history.pushState(null, '', `#${cleanId}`);
  }
}

/**
 * Temporarily pause smooth scroll
 */
export function stopScroll() {
  lenisInstance?.stop();
}

/**
 * Resume smooth scroll
 */
export function startScroll() {
  lenisInstance?.start();
}
