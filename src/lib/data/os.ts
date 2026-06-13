export type App = 'home' | 'about' | 'projects' | 'skills' | 'contact';

export const apps: { id: App; label: string; icon: string; accent: string }[] = [
	{ id: 'about', label: 'About', icon: '👤', accent: 'var(--ctp-mauve)' },
	{ id: 'projects', label: 'Projects', icon: '🎮', accent: 'var(--ctp-blue)' },
	{ id: 'skills', label: 'Skills', icon: '🎒', accent: 'var(--ctp-green)' },
	{ id: 'contact', label: 'Contact', icon: '✉️', accent: 'var(--ctp-peach)' }
];

// Screen rectangles (fractions of the open-3DS image), measured from the model.
// Used to place the HTML screens onto static/models/3ds-open.png.
export const DEVICE_IMG = '/models/3ds-open.png';
export const DEVICE_ASPECT = 0.948; // width / height of the image
export const SCREEN_RECTS = {
	top: { x: 0.201, y: 0.117, w: 0.599, h: 0.349 },
	bottom: { x: 0.276, y: 0.568, w: 0.447, h: 0.321 }
};
