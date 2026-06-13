import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
	return lenis;
}

/**
 * Sets up Lenis smooth scrolling and binds it to GSAP's ticker + ScrollTrigger
 * so every scroll-driven animation reads the same (interpolated) scroll value.
 * Returns a cleanup function. Client-only; falls back to native scroll when the
 * user prefers reduced motion.
 */
export function initSmoothScroll(): () => void {
	if (typeof window === 'undefined') return () => {};

	gsap.registerPlugin(ScrollTrigger);

	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	lenis = new Lenis({
		duration: 1.05,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: !reduce,
		touchMultiplier: 1.6,
		wheelMultiplier: 1
	});

	lenis.on('scroll', ScrollTrigger.update);

	const raf = (time: number) => lenis?.raf(time * 1000);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);

	// ScrollTrigger drives layout; refresh once fonts/images settle.
	ScrollTrigger.refresh();

	return () => {
		gsap.ticker.remove(raf);
		lenis?.destroy();
		lenis = null;
	};
}

/** Smooth-scroll to an element or selector (used by the navbar anchors). */
export function scrollTo(target: string | HTMLElement, offset = 0) {
	if (lenis) {
		lenis.scrollTo(target, { offset, duration: 1.2 });
	} else if (typeof document !== 'undefined') {
		const el = typeof target === 'string' ? document.querySelector(target) : target;
		el?.scrollIntoView({ behavior: 'smooth' });
	}
}
