import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initAboutAnimations() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.fonts.ready.then(() => {
      // Heading
      const heading = document.querySelector<HTMLElement>('[data-about-heading]');
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

      // Bio text — line-by-line clip-path reveal
      const bioEl = document.querySelector<HTMLElement>('[data-about-bio]');
      if (bioEl) {
        const splitBio = new SplitText(bioEl, { type: 'lines', linesClass: 'bio-line' });
        // Wrap each line in overflow hidden container
        splitBio.lines.forEach((line) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.from(splitBio.lines, {
          y: '100%',
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioEl,
            start: 'top 80%',
          },
        });
      }

      // Stats card slide in from right
      const statsCard = document.querySelector<HTMLElement>('[data-about-stats]');
      if (statsCard) {
        gsap.from(statsCard, {
          opacity: 0,
          x: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsCard,
            start: 'top 80%',
          },
        });
      }

      // Individual stat items stagger
      const statItems = document.querySelectorAll<HTMLElement>('[data-stat-item]');
      if (statItems.length) {
        gsap.from(statItems, {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statItems[0],
            start: 'top 80%',
          },
        });
      }
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    const elements = document.querySelectorAll('[data-about-heading], [data-about-bio], [data-about-stats], [data-stat-item]');
    gsap.set(elements, { opacity: 1, x: 0, y: 0 });
  });
}
