import { gsap } from 'gsap';

export function initLoadingScreen(onComplete: () => void) {
  const overlay = document.getElementById('loading-screen');
  const counter = document.getElementById('loading-counter');
  const curtain = document.getElementById('loading-curtain');

  if (!overlay || !counter || !curtain) {
    onComplete();
    return;
  }

  // Prevent scroll during loading
  document.body.style.overflow = 'hidden';

  const obj = { val: 0 };

  gsap.to(obj, {
    val: 100,
    duration: 2.4,
    ease: 'steps(14)',
    onUpdate() {
      counter.textContent = String(Math.round(obj.val)).padStart(3, '0');
    },
    onComplete() {
      // Lift the curtain upward
      gsap.to(curtain, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete() {
          overlay.remove();
          document.body.style.overflow = '';
          // Signal to hero and other scripts that loading is done
          window.dispatchEvent(new CustomEvent('loading-complete'));
          onComplete();
        },
      });
    },
  });
}
