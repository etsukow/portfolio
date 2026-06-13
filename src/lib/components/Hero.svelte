<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ThreeScene from './ThreeScene.svelte';
	import Whoami from './Whoami.svelte';

	let section: HTMLElement;
	let stage: HTMLElement;

	let progress = $state(0);
	let intro = $state(0); // page-load entrance for the 3D scene

	const clamp = (n: number) => Math.max(0, Math.min(1, n));
	const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

	// Scroll choreography derived from a single progress value.
	const termT = $derived(map(progress, 0.04, 0.55));
	const threeOpen = $derived(map(progress, 0.34, 0.72));
	const threeSpin = $derived(map(progress, 0.62, 1));
	const scrollHint = $derived(1 - map(progress, 0, 0.12));
	const projectsHint = $derived(map(progress, 0.86, 1));

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		gsap.registerPlugin(ScrollTrigger);

		// Entrance for the 3D model.
		const introObj = { v: 0 };
		if (reduce) intro = 1;
		else
			gsap.to(introObj, {
				v: 1,
				duration: 1.1,
				delay: 0.15,
				ease: 'power2.out',
				onUpdate: () => (intro = introObj.v)
			});

		if (reduce) {
			progress = 0.7; // resolved static state, no pinning
			return;
		}

		const st = ScrollTrigger.create({
			trigger: stage,
			start: 'top top',
			end: () => '+=' + window.innerHeight * 3,
			pin: stage,
			pinSpacing: true,
			anticipatePin: 1,
			onUpdate: (self) => (progress = self.progress)
		});

		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);

		return () => {
			window.removeEventListener('load', onLoad);
			st.kill();
		};
	});
</script>

<section bind:this={section} class="hero" id="top">
	<div bind:this={stage} class="stage">
		<div class="glow" style="opacity:{0.5 + intro * 0.5}"></div>

		<div class="inner">
			<div class="copy">
				<p class="eyebrow">hi, i'm julien</p>
				<h1>
					Software that <span class="gradient-text">thinks, renders</span> &amp; ships.
				</h1>
				<p class="lede">
					I design and build AI workspaces, real-time apps, 3D on the web — and the
					pipelines that deploy them.
				</p>
				<div class="termwrap" style="opacity:{0.35 + termT * 0.65}">
					<Whoami t={termT} />
				</div>
			</div>

			<div class="visual">
				<ThreeScene open={threeOpen} spin={threeSpin} reveal={intro} />
			</div>
		</div>

		<div class="hint" style="opacity:{scrollHint}" aria-hidden="true">
			<span>scroll</span>
			<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
		</div>

		<a
			class="next"
			href="#projects"
			style="opacity:{projectsHint}; pointer-events:{projectsHint > 0.6 ? 'auto' : 'none'}"
		>
			projects ↓
		</a>
	</div>
</section>

<style>
	.hero {
		position: relative;
	}

	.stage {
		position: relative;
		min-height: 100svh;
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.glow {
		position: absolute;
		inset: -20% -10% auto auto;
		width: min(70vw, 720px);
		aspect-ratio: 1;
		background:
			radial-gradient(circle at 65% 35%, color-mix(in srgb, var(--ctp-mauve) 38%, transparent), transparent 60%),
			radial-gradient(circle at 35% 70%, color-mix(in srgb, var(--ctp-blue) 30%, transparent), transparent 60%);
		filter: blur(40px);
		pointer-events: none;
		z-index: 0;
	}

	.inner {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: var(--maxw);
		padding-inline: var(--gutter);
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 4vw, 3rem);
		align-items: center;
	}

	/* allow grid tracks to shrink below content size (prevents mobile overflow) */
	.inner > * {
		min-width: 0;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: clamp(0.9rem, 3vw, 1.25rem);
		max-width: 38rem;
	}

	h1 {
		font-size: clamp(1.95rem, 8vw, 4.4rem);
		font-weight: 800;
		overflow-wrap: break-word;
	}

	.lede {
		color: var(--muted);
		font-size: clamp(0.95rem, 2.4vw, 1.18rem);
		max-width: 34rem;
	}

	.termwrap {
		margin-top: 0.5rem;
		transition: opacity 0.2s linear;
	}

	.visual {
		position: relative;
		width: 100%;
		height: clamp(210px, 30svh, 460px);
		order: -1; /* visual above copy on mobile */
	}

	.hint {
		position: absolute;
		bottom: clamp(1rem, 4vh, 2.2rem);
		left: 50%;
		translate: -50% 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.hint svg {
		width: 20px;
		height: 20px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		animation: bob 1.8s var(--ease) infinite;
	}

	.next {
		position: absolute;
		bottom: clamp(1rem, 4vh, 2.2rem);
		right: var(--gutter);
		z-index: 2;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--accent);
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
		padding-bottom: 2px;
		transition: opacity 0.3s var(--ease);
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}

	@media (min-width: 860px) {
		.inner {
			grid-template-columns: 1.05fr 0.95fr;
			gap: 2.5rem;
		}
		.visual {
			order: 0;
			height: min(70svh, 560px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hint svg {
			animation: none;
		}
	}
</style>
