import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent GSAP from fighting Lenis RAF timing
gsap.ticker.lagSmoothing(0);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Drive Lenis via GSAP ticker so both share the same RAF cycle
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Keep ScrollTrigger scroll position in sync with Lenis virtual scroll
lenis.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to proxy scroll reads through Lenis
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value?: number) {
    if (arguments.length && value !== undefined) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.body.style.transform ? 'transform' : 'fixed',
});

export { lenis };

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
