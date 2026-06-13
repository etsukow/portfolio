<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ThreeScene from './ThreeScene.svelte';
	import Whoami from './Whoami.svelte';

	let stage: HTMLElement;

	let progress = $state(0);
	let intro = $state(0);

	const clamp = (n: number) => Math.max(0, Math.min(1, n));
	const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

	const termT = $derived(map(progress, 0.04, 0.55));
	const threeOpen = $derived(map(progress, 0.34, 0.72));
	const threeSpin = $derived(map(progress, 0.62, 1));
	const scrollHint = $derived(1 - map(progress, 0, 0.12));
	const projectsHint = $derived(map(progress, 0.86, 1));

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		gsap.registerPlugin(ScrollTrigger);

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
			progress = 0.7;
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

<section class="hero" id="top">
	<div bind:this={stage} class="stage">
		<div class="inner">
			<div class="copy">
				<p class="eyebrow">press ▶ start</p>
				<h1>
					Software that <span class="w1">thinks</span>, <span class="w2">renders</span>
					&amp; <span class="w3">ships</span>.
				</h1>
				<p class="lede">
					I design and build data &amp; ML tooling, real-time apps, 3D on the web — and the
					pipelines that deploy them.
				</p>
				<div class="termwrap" style="opacity:{0.4 + termT * 0.6}">
					<Whoami t={termT} />
				</div>
			</div>

			<div class="screen" style="opacity:{0.4 + intro * 0.6}">
				<div class="screen__top">
					<span class="cam"></span>
					<span class="screen__title">3DS · SYSTEM</span>
					<span class="led"></span>
				</div>
				<div class="screen__panel">
					<ThreeScene open={threeOpen} spin={threeSpin} reveal={intro} />
				</div>
			</div>
		</div>

		<div class="hint" style="opacity:{scrollHint}" aria-hidden="true">
			<span class="pixel">scroll</span>
			<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
		</div>

		<a
			class="next pixel"
			href="#projects"
			style="opacity:{projectsHint}; pointer-events:{projectsHint > 0.6 ? 'auto' : 'none'}"
		>
			projects ▸
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

	.inner {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: var(--maxw);
		padding-inline: var(--gutter);
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.25rem, 4vw, 3rem);
		align-items: center;
	}
	.inner > * {
		min-width: 0;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: clamp(0.9rem, 3vw, 1.3rem);
		max-width: 38rem;
	}

	h1 {
		font-size: clamp(2rem, 8vw, 4.4rem);
		font-weight: 700;
		overflow-wrap: break-word;
	}
	.w1 {
		color: var(--ctp-mauve);
	}
	.w2 {
		color: var(--ctp-blue);
	}
	.w3 {
		color: var(--ctp-teal);
	}

	.lede {
		color: var(--muted);
		font-size: clamp(0.95rem, 2.4vw, 1.18rem);
		max-width: 34rem;
	}

	.termwrap {
		margin-top: 0.3rem;
		transition: opacity 0.2s linear;
	}

	/* ---- the "console screen" holding the 3D model ---- */
	.screen {
		order: -1;
		display: flex;
		flex-direction: column;
		background: var(--bg-alt);
		border: var(--border-w) solid var(--edge);
		border-radius: var(--radius-lg);
		box-shadow: 0 var(--lift) 0 0 var(--edge);
		overflow: hidden;
		transition: opacity 0.3s linear;
	}

	.screen__top {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.55rem 0.9rem;
		background: var(--bg-crust);
		border-bottom: var(--border-w) solid var(--edge);
	}
	.cam {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--surface-2);
		box-shadow: 0 0 0 2px var(--bg-alt);
	}
	.screen__title {
		font-family: var(--font-pixel);
		font-size: 0.55rem;
		color: var(--faint);
	}
	.led {
		margin-left: auto;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--ctp-green);
		box-shadow: 0 0 8px var(--ctp-green);
	}

	.screen__panel {
		position: relative;
		width: 100%;
		height: clamp(220px, 32svh, 460px);
		background:
			radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%),
			var(--bg-crust);
	}

	.hint {
		position: absolute;
		bottom: clamp(0.9rem, 4vh, 2rem);
		left: 50%;
		translate: -50% 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		color: var(--faint);
	}
	.hint .pixel {
		font-size: 0.55rem;
		color: var(--faint);
	}
	.hint svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		animation: bob 1.8s var(--ease) infinite;
	}

	.next {
		position: absolute;
		bottom: clamp(0.9rem, 4vh, 2rem);
		right: var(--gutter);
		z-index: 2;
		font-size: 0.6rem;
		color: var(--accent);
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
			grid-template-columns: 1.02fr 0.98fr;
			gap: 2.5rem;
		}
		.screen {
			order: 0;
		}
		.screen__panel {
			height: min(64svh, 520px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hint svg {
			animation: none;
		}
		.led,
		.cam {
			box-shadow: none;
		}
	}
</style>
