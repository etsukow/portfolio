export type Theme = 'mocha' | 'latte';

const STORAGE_KEY = 'theme';

function readInitial(): Theme {
	if (typeof document !== 'undefined') {
		const attr = document.documentElement.getAttribute('data-theme');
		if (attr === 'latte' || attr === 'mocha') return attr;
	}
	return 'mocha';
}

// Reactive, shared across the app (Svelte 5 runes module state).
export const theme = $state<{ value: Theme }>({ value: readInitial() });

export function setTheme(next: Theme) {
	theme.value = next;
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	root.setAttribute('data-theme', next);
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		/* ignore quota / privacy mode */
	}
	const meta = document.querySelector('meta[name="theme-color"]');
	meta?.setAttribute('content', next === 'latte' ? '#eff1f5' : '#1e1e2e');
}

export function toggleTheme() {
	setTheme(theme.value === 'mocha' ? 'latte' : 'mocha');
}
