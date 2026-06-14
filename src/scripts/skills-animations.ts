import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initSkillsAnimations() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.fonts.ready.then(() => {
      // Section heading
      const heading = document.querySelector<HTMLElement>('[data-skills-heading]');
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

      // Group labels
      document.querySelectorAll<HTMLElement>('[data-skill-group-label]').forEach((label) => {
        gsap.from(label, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 85%',
          },
        });
      });

      // Skill pills — staggered per group
      document.querySelectorAll<HTMLElement>('[data-skill-group]').forEach((group) => {
        const pills = group.querySelectorAll('[data-skill-pill]');
        gsap.from(pills, {
          opacity: 0,
          y: 20,
          scale: 0.85,
          stagger: 0.07,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
          },
        });
      });
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    const elements = document.querySelectorAll('[data-skills-heading], [data-skill-pill], [data-skill-group-label]');
    gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1 });
  });
}
