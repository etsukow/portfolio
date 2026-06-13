export interface Project {
	name: string;
	tagline: string;
	description: string;
	tech: string[];
	/** Public source/demo link. Leave empty for private/coursework repos. */
	href?: string;
	demo?: string;
	/** Catppuccin accent token used for the card. */
	accent: string;
	year: string;
	scope: string;
}

// NOTE: a few flagship repos live under other orgs or are private — links left
// empty are placeholders to confirm before publishing.
export const projects: Project[] = [
	{
		name: 'Odysseus',
		tagline: 'A self-hosted AI workspace',
		description:
			'A private, all-in-one AI workspace: multi-model chat (vLLM, Ollama, OpenAI…), an agent with tool access, deep research, document editing, email triage and calendar — all running on your own hardware.',
		tech: ['Python', 'FastAPI', 'ChromaDB', 'MCP', 'PostgreSQL', 'Docker'],
		accent: 'var(--ctp-mauve)',
		year: '2025',
		scope: '~34k LOC · solo'
	},
	{
		name: 'Luma3DS · DiscordRPC',
		tagline: 'Discord Rich Presence on a Nintendo 3DS',
		description:
			'A Luma3DS plugin that broadcasts what you are playing on a 3DS to Discord. A full cross-stack project: low-level C/Assembly on the console, a Rust bridge, and a Svelte companion app.',
		tech: ['Svelte', 'Rust', 'C', 'Assembly', 'Docker'],
		href: 'https://github.com/etsukow/Luma3DS-Plugin-DiscordRPC',
		accent: 'var(--ctp-blue)',
		year: '2026',
		scope: 'in development'
	},
	{
		name: 'iWHA',
		tagline: 'Real-time glyph recognition',
		description:
			'Draw a glyph and watch it get classified live — rings, sigils, spirals, waves — using stroke simplification, ring detection and Hausdorff-distance matching on the canvas.',
		tech: ['React 19', 'TypeScript', 'Vite', 'Canvas', 'Geometry'],
		accent: 'var(--ctp-teal)',
		year: '2026',
		scope: 'solo'
	},
	{
		name: 'baki',
		tagline: 'A full-stack social mobile app',
		description:
			'Cross-platform social network with real-time 1:1 and group messaging, events, feeds, push notifications and verified pro accounts — from the React Native app down to the API and database.',
		tech: ['Expo / RN', 'Express', 'Prisma', 'MySQL', 'Socket.IO'],
		accent: 'var(--ctp-peach)',
		year: '2025',
		scope: 'team'
	},
	{
		name: 'sae_go',
		tagline: 'A 2D particle engine',
		description:
			'A configurable real-time particle system with an interactive GUI: gravity, bounce, rotation, draw and arrow modes, all tunable live and driven by JSON presets.',
		tech: ['Go', 'Ebitengine', 'JSON'],
		accent: 'var(--ctp-green)',
		year: '2024',
		scope: 'team'
	},
	{
		name: 'SensorBuddy',
		tagline: 'AI-assisted data extraction',
		description:
			'A desktop app that pulls sensor specifications out of scientific PDFs, combining rule-based parsing with a local LLM, confidence scoring and a validation workflow. Built during my Erasmus at KU Leuven.',
		tech: ['Python', 'PySide6', 'Ollama', 'SQLite'],
		accent: 'var(--ctp-sapphire)',
		year: '2025',
		scope: 'KU Leuven'
	}
];

export const githubUrl = 'https://github.com/etsukow';
export const email = 'julienevrard148@gmail.com';
