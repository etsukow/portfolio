<script lang="ts">
	import { about } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="about" class="section">
	<div class="container grid">
		<div class="lead">
			<p class="eyebrow" use:reveal>about</p>
			<p class="intro" use:reveal={{ delay: 60 }}>{about.intro}</p>
		</div>

		<ol class="timeline" aria-label="Background">
			{#each about.timeline as item, i}
				<li use:reveal={{ delay: i * 90 }}>
					<span class="when">{item.when}</span>
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
		font-size: clamp(1.2rem, 3vw, 1.6rem);
		line-height: 1.5;
		letter-spacing: -0.01em;
		max-width: 30rem;
	}

	.timeline {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.timeline li {
		display: grid;
		grid-template-columns: 5.5rem 1fr;
		gap: 1rem;
		position: relative;
		padding-left: 1.25rem;
		border-left: 2px solid var(--border);
	}

	.timeline li::before {
		content: '';
		position: absolute;
		left: -7px;
		top: 0.35rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 4px var(--bg);
	}

	.when {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
		padding-top: 0.15rem;
	}

	.entry h3 {
		font-size: 1.05rem;
		font-weight: 700;
	}

	.where {
		color: var(--subtext1, var(--muted));
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
			top: 6rem;
		}
	}
</style>
