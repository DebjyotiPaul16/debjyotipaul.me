import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initTimelineAnimations() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.fonts.ready.then(() => {
      const section = document.querySelector('[data-timeline-section]');
      const line = document.querySelector<HTMLElement>('[data-timeline-line]');

      if (!section || !line) return;

      // Draw the timeline line as user scrolls through the section
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        }
      );

      // Each experience card reveals as it enters viewport
      document.querySelectorAll<HTMLElement>('[data-timeline-card]').forEach((card, i) => {
        const isLeft = i % 2 === 0;

        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -50 : 50,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        });

        // Stagger in the bullet points inside each card
        const bullets = card.querySelectorAll('[data-timeline-bullet]');
        if (bullets.length) {
          gsap.from(bullets, {
            opacity: 0,
            x: 15,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
            },
          });
        }
      });

      // Section heading
      const heading = document.querySelector<HTMLElement>('[data-timeline-heading]');
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
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    const elements = document.querySelectorAll('[data-timeline-line], [data-timeline-card], [data-timeline-bullet], [data-timeline-heading]');
    gsap.set(elements, { opacity: 1, x: 0, y: 0, scaleY: 1 });
  });
}
