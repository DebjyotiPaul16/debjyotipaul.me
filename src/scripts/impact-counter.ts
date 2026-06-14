import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initImpactCounters() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.fonts.ready.then(() => {
      // Section heading
      const heading = document.querySelector<HTMLElement>('[data-impact-heading]');
      if (heading) {
        const splitHeading = new SplitText(heading, { type: 'chars' });
        gsap.from(splitHeading.chars, {
          opacity: 0,
          y: 40,
          stagger: 0.03,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          },
        });
      }

      // Animated counters
      document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
        const target = Number(el.getAttribute('data-target') ?? 0);
        const prefix = el.getAttribute('data-prefix') ?? '';
        const suffix = el.getAttribute('data-suffix') ?? '';
        const decimals = Number(el.getAttribute('data-decimals') ?? 0);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 75%',
          once: true,
          onEnter() {
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate() {
                const formatted = decimals > 0
                  ? obj.val.toFixed(decimals)
                  : Math.round(obj.val).toLocaleString();
                el.textContent = prefix + formatted + suffix;
              },
            });
          },
        });

        // Card entrance
        const card = el.closest('[data-impact-card]');
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
            },
          });
        }
      });
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    // Show final values immediately
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
      const target = Number(el.getAttribute('data-target') ?? 0);
      const prefix = el.getAttribute('data-prefix') ?? '';
      const suffix = el.getAttribute('data-suffix') ?? '';
      el.textContent = prefix + target.toLocaleString() + suffix;
    });
    const elements = document.querySelectorAll('[data-impact-card], [data-impact-heading]');
    gsap.set(elements, { opacity: 1, y: 0 });
  });
}
