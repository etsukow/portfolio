<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="skills" class="section">
	<div class="container">
		<header class="head">
			<p class="eyebrow" use:reveal>inventory</p>
			<h2 use:reveal={{ delay: 60 }}>My loadout</h2>
		</header>

		<div class="groups">
			{#each skillGroups as group, i}
				<div class="group" style="--g:{group.accent}" use:reveal={{ delay: i * 70 }}>
					<h3 class="pixel">{group.label}</h3>
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
		gap: 0.85rem;
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
		background: var(--bg-alt);
		border: var(--border-w) solid var(--edge);
		border-radius: var(--radius);
		box-shadow: 0 var(--lift) 0 0 var(--edge);
		border-top: 5px solid var(--g);
	}

	.group h3 {
		font-size: 0.6rem;
		color: var(--g);
		margin-bottom: 1rem;
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
		width: 7px;
		height: 7px;
		border-radius: 2px;
		background: var(--g);
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
