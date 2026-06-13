<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		project: Project;
		index: number;
	}
	let { project, index }: Props = $props();

	let card: HTMLElement;

	function onMove(e: PointerEvent) {
		if (!card) return;
		const r = card.getBoundingClientRect();
		card.style.setProperty('--mx', `${e.clientX - r.left}px`);
		card.style.setProperty('--my', `${e.clientY - r.top}px`);
	}
</script>

<article
	bind:this={card}
	class="card"
	style="--card-accent:{project.accent}"
	use:reveal={{ delay: (index % 3) * 80 }}
	onpointermove={onMove}
>
	<header>
		<h3>{project.name}</h3>
		<span class="year">{project.year}</span>
	</header>

	<p class="tagline">{project.tagline}</p>
	<p class="desc">{project.description}</p>

	<ul class="tech" aria-label="Tech stack">
		{#each project.tech as t}
			<li>{t}</li>
		{/each}
	</ul>

	<footer>
		<span class="scope">{project.scope}</span>
		{#if project.href}
			<a class="link" href={project.href} target="_blank" rel="noopener noreferrer">
				Source
				<svg viewBox="0 0 24 24" aria-hidden="true"
					><path d="M7 17 17 7M9 7h8v8" /></svg
				>
			</a>
		{:else}
			<span class="link muted">Private</span>
		{/if}
	</footer>
</article>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--bg-alt) 80%, transparent);
		border: 1px solid var(--border);
		overflow: hidden;
		isolation: isolate;
		transition:
			transform 0.4s var(--ease),
			border-color 0.4s var(--ease),
			box-shadow 0.4s var(--ease);
	}

	/* cursor spotlight */
	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: radial-gradient(
			220px circle at var(--mx, 50%) var(--my, 0%),
			color-mix(in srgb, var(--card-accent) 16%, transparent),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.4s var(--ease);
	}

	/* top accent line */
	.card::after {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 3px;
		background: var(--card-accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.45s var(--ease);
	}

	.card:hover {
		transform: translateY(-5px);
		border-color: color-mix(in srgb, var(--card-accent) 55%, var(--border));
		box-shadow: var(--shadow-lg);
	}

	.card:hover::before {
		opacity: 1;
	}

	.card:hover::after {
		transform: scaleX(1);
	}

	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	h3 {
		font-size: 1.3rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.year {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--faint);
	}

	.tagline {
		color: var(--card-accent);
		font-weight: 600;
		font-size: 0.95rem;
	}

	.desc {
		color: var(--muted);
		font-size: 0.92rem;
		line-height: 1.6;
	}

	.tech {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 0.5rem;
	}

	.tech li {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 55%, transparent);
		color: var(--subtext1, var(--muted));
		border: 1px solid var(--border);
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 0.85rem;
		margin-top: 0.4rem;
		border-top: 1px solid var(--border);
	}

	.scope {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--faint);
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text);
	}

	.link.muted {
		color: var(--faint);
		font-weight: 500;
	}

	.link svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: var(--card-accent);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform 0.3s var(--ease);
	}

	.link:hover svg {
		transform: translate(2px, -2px);
	}
</style>
