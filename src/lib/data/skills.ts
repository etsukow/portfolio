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
		"I'm a software engineer in training at Polytech Nantes (AI & data track), currently an apprentice. I like building end-to-end: from self-hosted AI systems and real-time apps to 3D on the web and the CI/CD that ships them.",
	timeline: [
		{
			when: 'now',
			title: 'Software engineering apprentice',
			where: 'Polytech Nantes — IDIA (AI & Data)',
			detail: 'Full-stack & ML engineering, alternating between coursework and company work.'
		},
		{
			when: '2024',
			title: 'Erasmus exchange',
			where: 'KU Leuven, Belgium',
			detail: 'Research-flavoured semester — built SensorBuddy, an AI-assisted extraction tool.'
		},
		{
			when: 'always',
			title: 'Tinkerer',
			where: 'Nintendo 3DS homebrew, Discord bots, game dev',
			detail: 'Side projects are where I learn the low-level and the fun stuff.'
		}
	] as TimelineEntry[]
};
