<script lang="ts">
	import { scrollTo } from '$lib/scroll/smooth';
	import { githubUrl, email } from '$lib/data/projects';

	const year = 2026;
</script>

<footer class="footer">
	<div class="container">
		<p class="coin pixel">★ insert coin to continue ★</p>
		<div class="row">
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
	</div>
</footer>

<style>
	.footer {
		border-top: var(--border-w) solid var(--edge);
		padding-block: 2.25rem;
		background: var(--bg-alt);
	}

	.coin {
		text-align: center;
		font-size: 0.55rem;
		color: var(--accent);
		margin-bottom: 1.5rem;
		animation: blink 1.6s steps(1) infinite;
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
		color: var(--subtext1);
		font-weight: 600;
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

	@keyframes blink {
		50% {
			opacity: 0.35;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.coin {
			animation: none;
		}
	}

	@media (min-width: 720px) {
		.row {
			flex-direction: row;
			justify-content: space-between;
			text-align: left;
		}
	}
</style>
