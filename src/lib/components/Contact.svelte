<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { email, githubUrl } from '$lib/data/projects';
</script>

<section id="contact" class="section">
	<div class="container">
		<div class="panel" use:reveal>
			<p class="eyebrow">connect</p>
			<h2>Let's build <span class="hl">something good.</span></h2>
			<p class="sub">
				Open to internships, apprenticeships and interesting collaborations. The fastest way
				to reach me is email.
			</p>

			<div class="cta">
				<a class="btn primary" href="mailto:{email}">
					<svg viewBox="0 0 24 24" aria-hidden="true"
						><path d="M3 6h18v12H3z" /><path d="m3 7 9 6 9-6" /></svg
					>
					Email me
				</a>
				<a class="btn ghost" href={githubUrl} target="_blank" rel="noopener noreferrer">
					<svg class="gh" viewBox="0 0 24 24" aria-hidden="true"
						><path
							d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
						/></svg
					>
					GitHub
				</a>
			</div>

			<p class="ps pixel">ps — yes, that hero really is a nintendo 3ds 🎮</p>
		</div>
	</div>
</section>

<style>
	.panel {
		position: relative;
		padding: clamp(2.25rem, 7vw, 4.5rem);
		background: var(--bg-alt);
		border: var(--border-w) solid var(--edge);
		border-radius: var(--radius-lg);
		box-shadow: 0 var(--lift) 0 0 var(--edge);
		overflow: hidden;
	}

	h2 {
		font-size: clamp(2.2rem, 8vw, 4.2rem);
		margin: 0.75rem 0 1rem;
	}
	.hl {
		color: var(--accent);
	}

	.sub {
		color: var(--muted);
		max-width: 32rem;
		font-size: 1.05rem;
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		margin-top: 2rem;
	}

	.btn svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.btn.primary svg path {
		stroke: var(--bg-crust);
	}
	.btn .gh path {
		fill: currentColor;
		stroke: none;
	}

	.ps {
		margin-top: 2.25rem;
		font-size: 0.55rem;
		color: var(--faint);
		line-height: 1.7;
	}
</style>
