export interface Project {
	name: string;
	tagline: string;
	description: string;
	tech: string[];
	/** Public source/demo link. Leave empty for private/coursework repos. */
	href?: string;
	demo?: string;
	/** Catppuccin accent token used for the tile. */
	accent: string;
	/** Emoji shown in the "app icon". */
	icon: string;
	year: string;
	scope: string;
}

export const projects: Project[] = [
	{
		name: 'Luma3DS · DiscordRPC',
		tagline: 'Discord Rich Presence on a Nintendo 3DS',
		description:
			'A Luma3DS plugin that broadcasts what you are playing on a 3DS to Discord. A full cross-stack project: low-level C/Assembly on the console, a Rust bridge, and a Svelte companion app.',
		tech: ['Svelte', 'Rust', 'C', 'Assembly', 'Docker'],
		href: 'https://github.com/etsukow/Luma3DS-Plugin-DiscordRPC',
		accent: 'var(--ctp-blue)',
		icon: '🎮',
		year: '2026',
		scope: 'in development'
	},
	{
		name: 'SensorBuddy',
		tagline: 'AI-assisted data extraction',
		description:
			'A desktop app that pulls sensor specifications out of scientific PDFs, combining rule-based parsing with a local LLM, confidence scoring and a validation workflow. Built during my internship at KU Leuven.',
		tech: ['Python', 'PySide6', 'Ollama', 'SQLite'],
		accent: 'var(--ctp-sapphire)',
		icon: '🔬',
		year: '2026',
		scope: 'KU Leuven'
	},
	{
		name: 'sae_go',
		tagline: 'A 2D particle engine',
		description:
			'A configurable real-time particle system with an interactive GUI: gravity, bounce, rotation, draw and arrow modes, all tunable live and driven by JSON presets.',
		tech: ['Go', 'Ebitengine', 'JSON'],
		accent: 'var(--ctp-green)',
		icon: '✨',
		year: '2024',
		scope: 'team'
	}
];

export const githubUrl = 'https://github.com/etsukow';
export const email = 'julienevrard148@gmail.com';
