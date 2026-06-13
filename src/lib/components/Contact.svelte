<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { email, githubUrl } from '$lib/data/projects';
</script>

<section id="contact" class="section">
	<div class="container">
		<div class="panel" use:reveal>
			<p class="eyebrow">get in touch</p>
			<h2>Let's build<br /><span class="gradient-text">something good.</span></h2>
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
					<svg viewBox="0 0 24 24" aria-hidden="true"
						><path
							d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
						/></svg
					>
					GitHub
				</a>
			</div>

			<p class="ps">ps — yes, that hero really is a Nintendo 3DS. 🎮</p>
		</div>
	</div>
</section>

<style>
	.panel {
		position: relative;
		padding: clamp(2.5rem, 7vw, 5rem);
		border-radius: var(--radius-lg);
		background:
			radial-gradient(120% 120% at 0% 0%, color-mix(in srgb, var(--ctp-mauve) 14%, transparent), transparent 55%),
			radial-gradient(120% 120% at 100% 100%, color-mix(in srgb, var(--ctp-blue) 14%, transparent), transparent 55%),
			color-mix(in srgb, var(--bg-alt) 80%, transparent);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	h2 {
		font-size: clamp(2.4rem, 8vw, 4.5rem);
		margin: 0.75rem 0 1rem;
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

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.8rem 1.4rem;
		border-radius: 999px;
		font-weight: 600;
		font-size: 0.95rem;
		transition:
			transform 0.3s var(--ease),
			filter 0.3s var(--ease),
			background-color 0.3s var(--ease);
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

	.btn.primary {
		background: var(--accent);
		color: var(--bg-crust);
	}
	.btn.primary svg path {
		stroke: var(--bg-crust);
	}

	.btn.ghost {
		border: 1px solid var(--border-strong);
		color: var(--text);
	}
	.btn.ghost svg path {
		fill: currentColor;
		stroke: none;
	}

	.btn:hover {
		transform: translateY(-2px);
		filter: brightness(1.05);
	}

	.ps {
		margin-top: 2.25rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--faint);
	}
</style>
