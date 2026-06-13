<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="skills" class="section">
	<div class="container">
		<header class="head">
			<p class="eyebrow" use:reveal>toolbox</p>
			<h2 use:reveal={{ delay: 60 }}>Things I work with</h2>
		</header>

		<div class="groups">
			{#each skillGroups as group, i}
				<div class="group" style="--g-accent:{group.accent}" use:reveal={{ delay: i * 70 }}>
					<h3>{group.label}</h3>
					<ul>
						{#each group.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
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

	.groups {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.group {
		padding: 1.4rem;
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--bg-alt) 70%, transparent);
		border: 1px solid var(--border);
		border-top: 3px solid var(--g-accent);
	}

	.group h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		color: var(--g-accent);
		margin-bottom: 0.9rem;
	}

	.group ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.group li {
		font-size: 0.92rem;
		color: var(--text);
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.group li::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--g-accent);
		flex: none;
	}

	@media (min-width: 560px) {
		.groups {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 960px) {
		.groups {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
