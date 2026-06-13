<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, githubUrl, email } from '$lib/data/projects';
	import { skillGroups, about } from '$lib/data/skills';
	import type { App } from '$lib/data/os';
	import Icon from '../Icon.svelte';

	let { active, compact = false }: { active: App; compact?: boolean } = $props();
	const title = $derived(active === 'home' ? 'etsuOS' : active);

	let clock = $state('--:--');
	let view = $state<HTMLElement>();
	let current = $state(0);
	let count = $state(1);

	onMount(() => {
		const tick = () => {
			const d = new Date();
			clock = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
		};
		tick();
		const t = setInterval(tick, 20000);
		return () => clearInterval(t);
	});

	const slides = () => Array.from(view?.querySelectorAll<HTMLElement>('.slide') ?? []);

	// Track which full-screen section is in view (drives the page dots).
	$effect(() => {
		if (!view) return;
		const el = view;
		const onScroll = () => {
			let best = 0;
			let bestD = Infinity;
			slides().forEach((s, i) => {
				const d = Math.abs(s.offsetTop - el.scrollTop);
				if (d < bestD) {
					bestD = d;
					best = i;
				}
			});
			current = best;
		};
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => el.removeEventListener('scroll', onScroll);
	});

	// Reset to the first section + recount when the app changes.
	$effect(() => {
		active;
		if (!view) return;
		view.scrollTo({ top: 0, behavior: 'instant' }); // instant reset, no smooth-scroll flash
		current = 0;
		count = slides().length || 1;
	});

	function goTo(i: number) {
		const el = slides()[i];
		if (el && view) view.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
	}
</script>

<div class="ts" class:compact>
	<div class="bar">
		<span class="t pixel">▸ {title}</span>
		{#if count > 1}
			<div class="dots" role="tablist" aria-label="Sections">
				{#each Array(count) as _, i}
					<button
						class="dot"
						class:on={i === current}
						role="tab"
						aria-selected={i === current}
						aria-label="Section {i + 1}"
						onclick={() => goTo(i)}
					></button>
				{/each}
			</div>
		{/if}
		<span class="c pixel">{clock}</span>
	</div>

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div class="view" bind:this={view} tabindex="0" data-lenis-prevent role="region" aria-label="App content">
		{#if active === 'home'}
			<section class="slide boot">
				<p class="logo pixel">etsuOS</p>
				<p class="name">Julien “etsu” Evrard</p>
				<p class="role">software engineer — AI · full-stack · DevOps</p>
				<p class="blurb">Apprentice @ Lemerpax (Polytech Nantes), interning at KU Leuven.</p>
				<p class="hint pixel">▼ tap an app below</p>
			</section>
		{:else if active === 'about'}
			<section class="slide">
				<p class="lead">{about.intro}</p>
			</section>
			{#each about.timeline as item}
				<section class="slide">
					<div class="entry">
						<span class="when pixel">{item.when}</span>
						<h4>{item.title}</h4>
						<p class="where">{item.where}</p>
						<p class="det">{item.detail}</p>
					</div>
				</section>
			{/each}
		{:else if active === 'projects'}
			{#each projects as p}
				<section class="slide">
					<article class="prj" style="--a:{p.accent}">
						<div class="ph">
							<span class="pic">{p.name.charAt(0)}</span>
							<div>
								<h4>{p.name}</h4>
								<p class="ptag">{p.tagline}</p>
							</div>
							<span class="py pixel">{p.year}</span>
						</div>
						<p class="pdesc">{p.description}</p>
						<ul class="tech">
							{#each p.tech as t}<li>{t}</li>{/each}
						</ul>
						<div class="pf">
							<span class="ps pixel">{p.scope}</span>
							{#if p.href}
								<a href={p.href} target="_blank" rel="noopener noreferrer">open ▸</a>
							{:else}
								<span class="lk pixel"><Icon name="lock" size={10} />private</span>
							{/if}
						</div>
					</article>
				</section>
			{/each}
		{:else if active === 'skills'}
			{#each skillGroups as g}
				<section class="slide">
					<div class="grp" style="--a:{g.accent}">
						<h4 class="pixel">{g.label}</h4>
						<ul>
							{#each g.items as it}<li>{it}</li>{/each}
						</ul>
					</div>
				</section>
			{/each}
		{:else if active === 'contact'}
			<section class="slide contact">
				<h3>Let's build <span class="hl">something good.</span></h3>
				<p class="csub">Awaiting my diploma — always glad to talk code, projects, or ideas.</p>
				<div class="cbtns">
					<a class="btn primary" href="mailto:{email}"><Icon name="mail" size={15} />Email me</a>
					<a class="btn ghost" href={githubUrl} target="_blank" rel="noopener noreferrer"
						><Icon name="github" size={15} />GitHub</a
					>
				</div>
				<p class="ps2 pixel">ps — yes, this whole site is a nintendo 3ds</p>
			</section>
		{/if}
	</div>
</div>

<style>
	.ts {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		background: var(--bg-crust);
		container-type: inline-size;
	}

	.bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.7rem;
		background: color-mix(in srgb, var(--accent) 16%, var(--bg-crust));
		border-bottom: 1px solid var(--surface);
		flex: none;
	}
	.bar .t {
		justify-self: start;
		font-size: 0.5rem;
		color: var(--accent);
		text-transform: uppercase;
	}
	.bar .c {
		justify-self: end;
		font-size: 0.5rem;
		color: var(--faint);
	}
	.dots {
		justify-self: center;
		display: flex;
		gap: 5px;
	}
	.dot {
		width: 7px;
		height: 7px;
		padding: 0;
		border-radius: 50%;
		border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
		background: transparent;
		cursor: pointer;
		transition:
			background-color 0.15s var(--ease),
			transform 0.15s var(--ease);
	}
	.dot.on {
		background: var(--accent);
		transform: scale(1.2);
	}

	.view {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		scrollbar-width: none;
	}
	.view::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	/* each section fills the screen and snaps — never a half-element mid-scroll */
	.slide {
		min-height: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.55rem;
		padding: 3cqw 6cqw;
		font-size: clamp(0.72rem, 3.3cqw, 0.98rem);
		animation: fade 0.3s var(--ease) both;
	}
	/* opacity-only — no transform, so switching sections never nudges the content */
	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	/* home / boot */
	.slide.boot {
		align-items: center;
		text-align: center;
		gap: 0.5rem;
	}
	.boot .logo {
		font-size: clamp(1rem, 7cqw, 1.7rem);
		color: var(--accent);
		line-height: 1.4;
	}
	.boot .name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.1rem, 6cqw, 1.7rem);
		color: var(--text);
	}
	.boot .role {
		color: var(--ctp-lavender);
		font-size: 0.92em;
	}
	.boot .blurb {
		color: var(--muted);
		max-width: 34ch;
		font-size: 0.88em;
	}
	.boot .hint {
		margin-top: 0.5rem;
		font-size: 0.5rem;
		color: var(--faint);
		animation: blink 1.6s steps(1) infinite;
	}

	/* about */
	.lead {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 1.1em;
		line-height: 1.55;
		color: var(--subtext1);
	}
	.entry {
		border: 1px solid color-mix(in srgb, var(--accent) 24%, var(--surface));
		border-left: 3px solid var(--accent);
		border-radius: 12px;
		padding: 0.85rem 0.9rem;
		background:
			radial-gradient(130% 90% at 0% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%),
			var(--bg-alt);
	}
	.entry .when {
		display: inline-block;
		font-size: 0.45rem;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
		padding: 0.12rem 0.45rem;
		border-radius: 999px;
	}
	.entry h4 {
		font-family: var(--font-display);
		font-size: 1.12em;
		margin-top: 0.35rem;
	}
	.entry .where {
		color: var(--subtext1);
		font-size: 0.86em;
	}
	.entry .det {
		color: var(--muted);
		font-size: 0.84em;
		line-height: 1.45;
		margin-top: 0.25rem;
	}

	/* projects */
	.prj {
		border: 1px solid color-mix(in srgb, var(--a) 26%, var(--surface));
		border-radius: 14px;
		padding: 0.7rem 0.85rem;
		background:
			radial-gradient(130% 90% at 0% 0%, color-mix(in srgb, var(--a) 14%, transparent), transparent 70%),
			var(--bg-alt);
		box-shadow: 0 2px 12px rgb(0 0 0 / 0.28);
		transition:
			transform 0.16s var(--ease),
			box-shadow 0.16s var(--ease),
			border-color 0.16s var(--ease);
	}
	.prj:hover {
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--a) 60%, var(--surface));
		box-shadow: 0 10px 24px color-mix(in srgb, var(--a) 24%, transparent);
	}
	.ph {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.ph > div {
		flex: 1;
		min-width: 0;
	}
	.pic {
		flex: none;
		width: 2.1em;
		height: 2.1em;
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15em;
		color: var(--a);
		text-transform: uppercase;
		border-radius: 10px;
		background: color-mix(in srgb, var(--a) 18%, var(--bg-crust));
		border: 1px solid color-mix(in srgb, var(--a) 35%, transparent);
	}
	.ph h4 {
		font-family: var(--font-display);
		font-size: 1.05em;
		line-height: 1.2;
	}
	.ptag {
		color: var(--a);
		font-size: 0.83em;
	}
	.py {
		align-self: flex-start;
		margin-left: auto;
		font-size: 0.42rem;
		color: var(--subtext0);
		background: var(--bg-crust);
		border: 1px solid var(--border);
		padding: 0.14rem 0.42rem;
		border-radius: 5px;
	}
	.pdesc {
		color: var(--muted);
		font-size: 0.82em;
		line-height: 1.4;
		margin: 0.45rem 0 0.5rem;
	}
	.tech {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}
	.tech li {
		font-family: var(--font-mono);
		font-size: 0.68em;
		padding: 0.16rem 0.5rem;
		border-radius: 5px;
		background: color-mix(in srgb, var(--a) 12%, var(--bg-crust));
		border: 1px solid color-mix(in srgb, var(--a) 28%, var(--border));
		color: var(--subtext1);
	}
	.pf {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.ps,
	.lk {
		font-size: 0.45rem;
		color: var(--faint);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.lk {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}
	.pf a {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.85em;
		color: var(--bg-crust);
		background: var(--a);
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		transition:
			transform 0.14s var(--ease),
			box-shadow 0.14s var(--ease);
	}
	.pf a:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--a) 45%, transparent);
	}

	/* skills */
	.grp {
		border: 1px solid color-mix(in srgb, var(--a) 24%, var(--surface));
		border-top: 3px solid var(--a);
		border-radius: 12px;
		padding: 0.9rem 1rem;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--a) 12%, transparent), transparent 55%),
			var(--bg-alt);
		transition:
			transform 0.16s var(--ease),
			box-shadow 0.16s var(--ease);
	}
	.grp:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px color-mix(in srgb, var(--a) 20%, transparent);
	}
	.grp h4 {
		font-size: 0.55rem;
		color: var(--a);
		margin-bottom: 0.65rem;
		letter-spacing: 0.05em;
	}
	.grp ul {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.4rem 0.7rem;
	}
	.grp li {
		font-size: 0.92em;
		color: var(--text);
		display: flex;
		gap: 0.45rem;
		align-items: center;
	}
	.grp li::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--a);
		flex: none;
		box-shadow: 0 0 6px color-mix(in srgb, var(--a) 70%, transparent);
	}

	/* contact */
	.contact h3 {
		font-family: var(--font-display);
		font-size: 1.7em;
		line-height: 1.15;
	}
	.contact .hl {
		color: var(--accent);
	}
	.csub {
		color: var(--muted);
		margin: 0.5rem 0 0.9rem;
		max-width: 38ch;
	}
	.cbtns {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.cbtns .btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.9em;
		padding: 0.55rem 1rem;
	}
	.ps2 {
		margin-top: 1rem;
		font-size: 0.5rem;
		color: var(--faint);
		line-height: 1.7;
	}

	@keyframes blink {
		50% {
			opacity: 0.4;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.boot .hint {
			animation: none;
		}
		.slide {
			animation: none;
		}
		.view {
			scroll-behavior: auto;
		}
	}
</style>
