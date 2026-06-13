<script lang="ts">
	import { about } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="about" class="section">
	<div class="container grid">
		<div class="lead">
			<p class="eyebrow" use:reveal>profile</p>
			<p class="intro" use:reveal={{ delay: 60 }}>{about.intro}</p>
		</div>

		<ol class="log" aria-label="Background">
			{#each about.timeline as item, i}
				<li use:reveal={{ delay: i * 90 }}>
					<span class="marker" aria-hidden="true"></span>
					<span class="when pixel">{item.when}</span>
					<div class="entry">
						<h3>{item.title}</h3>
						<p class="where">{item.where}</p>
						<p class="detail">{item.detail}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 4rem);
	}

	.intro {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 3vw, 1.55rem);
		font-weight: 500;
		line-height: 1.5;
		max-width: 30rem;
	}

	.log {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
	}

	.log li {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'when when' 'marker entry';
		gap: 0.35rem 1rem;
		padding-left: 1.4rem;
		border-left: var(--border-w) dashed var(--border);
	}

	.when {
		grid-area: when;
		font-size: 0.5rem;
		color: var(--accent);
	}

	.marker {
		grid-area: marker;
		width: 14px;
		height: 14px;
		border-radius: 4px;
		background: var(--accent);
		border: 2px solid var(--edge);
		box-shadow: 0 0 0 4px var(--bg);
		margin-left: calc(-1.4rem - 9px);
		margin-top: 0.3rem;
	}

	.entry {
		grid-area: entry;
		margin-left: -0.6rem;
	}
	.entry h3 {
		font-size: 1.1rem;
		font-weight: 700;
	}
	.where {
		color: var(--subtext1);
		font-size: 0.9rem;
		margin-top: 0.1rem;
	}
	.detail {
		color: var(--muted);
		font-size: 0.88rem;
		margin-top: 0.4rem;
	}

	@media (min-width: 860px) {
		.grid {
			grid-template-columns: 0.9fr 1.1fr;
			align-items: start;
		}
		.intro {
			position: sticky;
			top: 6.5rem;
		}
	}
</style>
