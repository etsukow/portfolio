<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		project: Project;
		index: number;
	}
	let { project, index }: Props = $props();
</script>

<article
	class="app"
	style="--app:{project.accent}"
	use:reveal={{ delay: (index % 3) * 80 }}
>
	<span class="cursor" aria-hidden="true">▶</span>

	<div class="head">
		<div class="icon">{project.icon}</div>
		<div class="titles">
			<h3>{project.name}</h3>
			<p class="tag">{project.tagline}</p>
		</div>
		<span class="year pixel">{project.year}</span>
	</div>

	<p class="desc">{project.description}</p>

	<ul class="tech" aria-label="Tech stack">
		{#each project.tech as t}
			<li>{t}</li>
		{/each}
	</ul>

	<footer>
		<span class="scope pixel">{project.scope}</span>
		{#if project.href}
			<a class="open" href={project.href} target="_blank" rel="noopener noreferrer">
				open ▸
			</a>
		{:else}
			<span class="locked pixel">🔒 private</span>
		{/if}
	</footer>
</article>

<style>
	.app {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: clamp(1.2rem, 3vw, 1.6rem);
		background: var(--bg-alt);
		border: var(--border-w) solid var(--edge);
		border-radius: var(--radius);
		box-shadow: 0 var(--lift) 0 0 var(--edge);
		transition:
			transform 0.18s var(--ease),
			box-shadow 0.18s var(--ease),
			border-color 0.18s var(--ease);
	}

	.app:hover,
	.app:focus-within {
		transform: translateY(-4px);
		border-color: var(--app);
		box-shadow: 0 calc(var(--lift) + 4px) 0 0 var(--app);
	}

	/* console "selection" cursor */
	.cursor {
		position: absolute;
		left: -0.35rem;
		top: 1.4rem;
		color: var(--app);
		font-size: 0.9rem;
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity 0.18s var(--ease),
			transform 0.18s var(--ease);
	}
	.app:hover .cursor,
	.app:focus-within .cursor {
		opacity: 1;
		transform: translateX(0);
	}

	.head {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.icon {
		flex: none;
		width: 52px;
		height: 52px;
		display: grid;
		place-items: center;
		font-size: 1.6rem;
		border-radius: 14px;
		background: color-mix(in srgb, var(--app) 18%, var(--bg-crust));
		border: var(--border-w) solid var(--app);
		box-shadow: 0 3px 0 0 color-mix(in srgb, var(--app) 60%, var(--edge));
		transition: transform 0.2s var(--ease-pop);
	}
	.app:hover .icon {
		transform: rotate(-4deg) scale(1.06);
	}

	.titles {
		min-width: 0;
	}
	h3 {
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.tag {
		color: var(--app);
		font-weight: 500;
		font-size: 0.88rem;
		margin-top: 0.1rem;
	}
	.year {
		margin-left: auto;
		font-size: 0.5rem;
		color: var(--faint);
		padding-top: 0.3rem;
	}

	.desc {
		color: var(--muted);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.tech {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 0.3rem;
	}
	.tech li {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		padding: 0.2rem 0.55rem;
		border-radius: 8px;
		background: var(--bg-crust);
		color: var(--subtext1);
		border: 1px solid var(--border);
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 0.85rem;
		border-top: var(--border-w) solid var(--edge);
	}
	.scope,
	.locked {
		font-size: 0.5rem;
		color: var(--faint);
	}

	.open {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.92rem;
		color: var(--bg-crust);
		background: var(--app);
		padding: 0.35rem 0.9rem;
		border-radius: 999px;
		border: var(--border-w) solid var(--edge);
		box-shadow: 0 3px 0 0 var(--edge);
		transition:
			transform 0.12s var(--ease),
			box-shadow 0.12s var(--ease);
	}
	.open:hover {
		transform: translateY(2px);
		box-shadow: 0 1px 0 0 var(--edge);
	}
</style>
