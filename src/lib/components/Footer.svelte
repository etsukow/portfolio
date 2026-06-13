<script lang="ts">
	import { scrollTo } from '$lib/scroll/smooth';
	import { githubUrl, email } from '$lib/data/projects';

	// Static prerender → fixed year is fine and avoids hydration drift.
	const year = 2026;
</script>

<footer class="footer">
	<div class="container row">
		<p class="copy">© {year} Julien Evrard</p>
		<p class="built">
			Built with <span>SvelteKit</span> · <span>Three.js</span> · <span>Catppuccin</span>
		</p>
		<div class="right">
			<a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
			<a href="mailto:{email}">Email</a>
			<button onclick={() => scrollTo('#top')}>Top ↑</button>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--border);
		padding-block: 2rem;
		background: var(--bg-alt);
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
		text-align: center;
		font-size: 0.85rem;
		color: var(--muted);
	}

	.built span {
		color: var(--subtext1, var(--text));
	}

	.right {
		display: flex;
		gap: 1.25rem;
		align-items: center;
	}

	.right a:hover,
	.right button:hover {
		color: var(--accent);
	}

	@media (min-width: 720px) {
		.row {
			flex-direction: row;
			justify-content: space-between;
			text-align: left;
		}
	}
</style>
