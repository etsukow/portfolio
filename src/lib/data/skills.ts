export interface SkillGroup {
	label: string;
	accent: string;
	items: string[];
}

export const skillGroups: SkillGroup[] = [
	{
		label: 'Languages',
		accent: 'var(--ctp-mauve)',
		items: ['Python', 'TypeScript', 'Go', 'C / C++', 'Rust', 'SQL']
	},
	{
		label: 'Frontend',
		accent: 'var(--ctp-blue)',
		items: ['Svelte / SvelteKit', 'React', 'React Native / Expo', 'Three.js', 'GSAP']
	},
	{
		label: 'Backend',
		accent: 'var(--ctp-green)',
		items: ['FastAPI', 'Node / Express', 'Prisma', 'PostgreSQL', 'MySQL', 'Socket.IO']
	},
	{
		label: 'AI / ML',
		accent: 'var(--ctp-teal)',
		items: ['LLMs & RAG', 'Embeddings', 'ChromaDB', 'MCP', 'PyTorch', 'Ollama']
	},
	{
		label: 'DevOps & Data',
		accent: 'var(--ctp-peach)',
		items: ['Docker', 'CI/CD', 'GitHub Actions', 'Terraform', 'dbt', 'Snowflake']
	}
];

export interface TimelineEntry {
	when: string;
	title: string;
	where: string;
	detail: string;
}

export const about = {
	intro:
		"I'm a software-engineering apprentice at Lemerpax through Polytech Nantes (IDIA — AI & data track), currently on a summer research internship at KU Leuven. I like building end-to-end: from data & ML tooling to real-time apps, 3D on the web, and the CI/CD that ships them.",
	timeline: [
		{
			when: 'Jun–Aug 2026',
			title: 'Research internship',
			where: 'KU Leuven, Belgium',
			detail:
				'Summer internship (while still on my apprenticeship) — building AI-assisted tooling such as SensorBuddy.'
		},
		{
			when: '2024–2027',
			title: 'Software engineering apprentice',
			where: 'Lemerpax × Polytech Nantes (IDIA)',
			detail: 'Work-study in the AI & data engineering track — full-stack and ML, school and company.'
		},
		{
			when: 'always',
			title: 'Tinkerer',
			where: 'Nintendo 3DS homebrew · Discord bots · game dev',
			detail: 'Side projects are where I learn the low-level and the fun stuff.'
		}
	] as TimelineEntry[]
};
