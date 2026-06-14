import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export function initHeroAnimations() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.fonts.ready.then(() => {
      const nameEl = document.querySelector<HTMLElement>('[data-hero-name]');
      const roleEl = document.querySelector<HTMLElement>('[data-hero-role]');
      const taglineEl = document.querySelector<HTMLElement>('[data-hero-tagline]');
      const ctaEl = document.querySelector<HTMLElement>('[data-hero-cta]');
      const scrollHintEl = document.querySelector<HTMLElement>('[data-hero-scroll-hint]');

      if (!nameEl) return;

      // Split name into characters
      const splitName = new SplitText(nameEl, { type: 'chars,words' });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(splitName.chars, {
        opacity: 0,
        y: 80,
        rotationX: -90,
        stagger: 0.04,
        duration: 0.9,
      });

      if (roleEl) {
        tl.from(
          roleEl,
          {
            clipPath: 'inset(0 100% 0 0)',
            duration: 1.1,
            ease: 'power4.inOut',
          },
          '-=0.3'
        );
      }

      if (taglineEl) {
        const splitTagline = new SplitText(taglineEl, { type: 'lines' });
        tl.from(
          splitTagline.lines,
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.7,
          },
          '-=0.5'
        );
      }

      if (ctaEl) {
        tl.from(
          ctaEl,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.3'
        );
      }

      if (scrollHintEl) {
        tl.from(
          scrollHintEl,
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.2'
        );
      }
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    // Ensure everything is immediately visible
    const elements = document.querySelectorAll(
      '[data-hero-name], [data-hero-role], [data-hero-tagline], [data-hero-cta], [data-hero-scroll-hint]'
    );
    gsap.set(elements, { opacity: 1, y: 0, clipPath: 'none' });
  });
}
