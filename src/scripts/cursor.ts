import { gsap } from 'gsap';

export function initCursor() {
  // Only run on pointer-fine (non-touch) devices
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  if (!dot || !ring || !label) return;

  // Signal to CSS that custom cursor is active
  document.body.classList.add('custom-cursor-active');

  // Show cursor elements (they start hidden until first mousemove)
  dot.style.opacity = '0';
  ring.style.opacity = '0';

  let isVisible = false;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isVisible) {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    }

    // Dot follows cursor instantly
    gsap.set(dot, { x: e.clientX, y: e.clientY });

    // Ring follows with slight lag for spring feel
    gsap.to(ring, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.18,
      ease: 'power2.out',
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    if (!isVisible) {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      isVisible = true;
    }
  });

  // Context-aware cursor: elements with data-cursor="view|open|read|scroll"
  document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
    const cursorLabel = el.getAttribute('data-cursor') ?? '';

    el.addEventListener('mouseenter', () => {
      label.textContent = cursorLabel;
      ring.classList.add('is-active');
    });

    el.addEventListener('mouseleave', () => {
      label.textContent = '';
      ring.classList.remove('is-active');
    });
  });
}
