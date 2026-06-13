<script lang="ts">
	import { projects, githubUrl } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projects" class="section">
	<div class="container">
		<header class="head">
			<p class="eyebrow" use:reveal>selected work</p>
			<h2 use:reveal={{ delay: 60 }}>Things I've built</h2>
			<p class="sub" use:reveal={{ delay: 120 }}>
				A mix of AI systems, full-stack apps, low-level tinkering and graphics. More on
				<a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>.
			</p>
		</header>

		<div class="grid">
			{#each projects as project, i}
				<ProjectCard {project} index={i} />
			{/each}
		</div>
	</div>
</section>

<style>
	.head {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	h2 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.sub {
		color: var(--muted);
		max-width: 40rem;
	}

	.sub a {
		color: var(--accent);
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
