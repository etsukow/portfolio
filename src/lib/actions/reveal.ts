import type { Action } from 'svelte/action';

export interface RevealOptions {
	/** Stagger delay in ms applied via CSS custom property. */
	delay?: number;
	/** Reveal only once (default) or re-animate on every entry. */
	once?: boolean;
	/** Intersection threshold (0–1). */
	threshold?: number;
}

/**
 * Fade/slide an element into view when it enters the viewport.
 * Pairs with the `[data-reveal]` styles in app.css and respects
 * prefers-reduced-motion (in which case the element is shown immediately).
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	let { delay = 0, once = true, threshold = 0.15 } = options ?? {};

	node.setAttribute('data-reveal', '');
	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduce || typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					if (once) observer.unobserve(node);
				} else if (!once) {
					node.classList.remove('is-visible');
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
