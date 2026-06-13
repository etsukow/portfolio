<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ThreeScene from './ThreeScene.svelte';
	import DeviceImage from './DeviceImage.svelte';
	import ConsoleShell from './ConsoleShell.svelte';
	import { getLenis } from '$lib/scroll/smooth';

	let introEl = $state<HTMLElement>();
	let stageEl = $state<HTMLElement>();
	let osEl = $state<HTMLElement>();

	let mode = $state<'pending' | '3d' | 'flat'>('pending'); // flat = CSS shell (mobile/reduced)
	let entered = $state(false);
	let progress = $state(0);

	const clamp = (n: number) => Math.max(0, Math.min(1, n));
	const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

	const open = $derived(map(progress, 0.08, 0.62));
	const zoom = $derived(map(progress, 0.5, 1));
	const hint = $derived(1 - map(progress, 0, 0.18));

	async function enter() {
		if (entered) return;
		entered = true;
		getLenis()?.stop();
		await tick();
		osEl?.querySelector<HTMLElement>('.apps')?.focus();
	}

	function exit() {
		entered = false;
		const lenis = getLenis();
		lenis?.start();
		lenis ? lenis.scrollTo(0, { duration: 0.8 }) : window.scrollTo(0, 0);
	}

	function start() {
		const o = { v: progress };
		gsap.to(o, {
			v: 1,
			duration: 1.3,
			ease: 'power2.inOut',
			onUpdate: () => (progress = o.v),
			onComplete: enter
		});
	}

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const small = window.matchMedia('(max-width: 759px)').matches;

		if (reduce || small) {
			mode = 'flat';
			entered = true;
			return;
		}

		mode = '3d';
		gsap.registerPlugin(ScrollTrigger);
		const st = ScrollTrigger.create({
			trigger: introEl!,
			start: 'top top',
			end: () => '+=' + window.innerHeight * 2.2,
			pin: stageEl!,
			pinSpacing: true,
			anticipatePin: 1,
			onUpdate: (self) => {
				progress = self.progress;
				if (self.progress > 0.9) enter();
				else if (self.progress < 0.85 && entered) {
					entered = false;
					getLenis()?.start();
				}
			}
		});

		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			st.kill();
		};
	});
</script>

{#if mode === '3d'}
	<section bind:this={introEl} class="intro">
		<div bind:this={stageEl} class="stage">
			<div class="canvas" aria-hidden="true">
				<ThreeScene {open} {zoom} reveal={1} />
			</div>
			<button
				class="start"
				style="opacity:{hint}; pointer-events:{hint > 0.5 ? 'auto' : 'none'}"
				onclick={start}
				aria-label="Start — enter the portfolio"
			>
				<span class="ps pixel">▶ press start</span>
				<span class="sub pixel">scroll · or click</span>
			</button>
		</div>
	</section>
{/if}

<div bind:this={osEl} class="os" class:entered class:instant={mode === 'flat'}>
	{#if mode === 'flat'}
		<ConsoleShell />
	{:else}
		<DeviceImage />
		{#if entered}
			<button class="power" onclick={exit} aria-label="Back to start">⏻ exit</button>
		{/if}
	{/if}
</div>

<style>
	.intro {
		position: relative;
	}
	.stage {
		position: relative;
		height: 100svh;
		display: grid;
		place-items: center;
		overflow: hidden;
	}
	.canvas {
		width: min(92vw, 620px);
		height: min(70svh, 560px);
	}

	.start {
		position: absolute;
		bottom: clamp(1.5rem, 6vh, 3.5rem);
		left: 50%;
		translate: -50% 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		transition: opacity 0.3s var(--ease);
	}
	.start .ps {
		font-size: 0.8rem;
		color: var(--accent);
		animation: blink 1.4s steps(1) infinite;
	}
	.start .sub {
		font-size: 0.5rem;
		color: var(--faint);
	}

	.os {
		position: fixed;
		inset: 0;
		z-index: 40;
		display: grid;
		place-items: center;
		padding: clamp(74px, 11vh, 92px) clamp(0.6rem, 3vw, 2rem) clamp(0.8rem, 3vh, 1.5rem);
		background:
			radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%),
			var(--bg);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.6s var(--ease),
			visibility 0.6s var(--ease);
	}
	.os.entered {
		opacity: 1;
		visibility: visible;
	}
	.os.instant {
		opacity: 1;
		visibility: visible;
		transition: none;
	}

	.power {
		position: fixed;
		top: clamp(74px, 10vh, 88px);
		right: clamp(0.8rem, 3vw, 1.5rem);
		z-index: 41;
		font-family: var(--font-pixel);
		font-size: 0.5rem;
		color: var(--faint);
		padding: 0.5rem 0.7rem;
		border-radius: 999px;
		border: var(--border-w) solid var(--edge);
		background: var(--bg-alt);
		box-shadow: 0 3px 0 0 var(--edge);
	}
	.power:hover {
		color: var(--ctp-red);
	}

	@keyframes blink {
		50% {
			opacity: 0.4;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.start .ps {
			animation: none;
		}
		.os {
			transition: none;
		}
	}
</style>
