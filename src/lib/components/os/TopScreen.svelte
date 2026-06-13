<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, githubUrl, email } from '$lib/data/projects';
	import { skillGroups, about } from '$lib/data/skills';
	import type { App } from '$lib/data/os';

	let { active, compact = false }: { active: App; compact?: boolean } = $props();
	const title = $derived(active === 'home' ? 'etsuOS' : active);

	let clock = $state('--:--');
	let view = $state<HTMLElement>();

	onMount(() => {
		const tick = () => {
			const d = new Date();
			clock = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
		};
		tick();
		const t = setInterval(tick, 20000);
		return () => clearInterval(t);
	});

	$effect(() => {
		active;
		view?.scrollTo({ top: 0 });
	});
</script>

<div class="ts" class:compact>
	<div class="bar">
		<span class="t pixel">▸ {title}</span>
		<span class="c pixel">{clock}</span>
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div class="view" bind:this={view} tabindex="0" data-lenis-prevent role="region" aria-label="App content">
		<div class="boot" hidden={active !== 'home'}>
			<p class="logo pixel">etsuOS</p>
			<p class="name">Julien “etsu” Evrard</p>
			<p class="role">software engineer — AI · full-stack · DevOps</p>
			<p class="blurb">Apprentice @ Lemerpax (Polytech Nantes), interning at KU Leuven.</p>
			<p class="hint pixel">▼ tap an app below</p>
		</div>

		<div class="pane" hidden={active !== 'about'}>
			<p class="lead">{about.intro}</p>
			<ol class="log">
				{#each about.timeline as item}
					<li>
						<span class="when pixel">{item.when}</span>
						<h4>{item.title}</h4>
						<p class="where">{item.where}</p>
						<p class="det">{item.detail}</p>
					</li>
				{/each}
			</ol>
		</div>

		<div class="pane projects" hidden={active !== 'projects'}>
			{#each projects as p}
				<article class="prj" style="--a:{p.accent}">
					<div class="ph">
						<span class="pic">{p.icon}</span>
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
							<span class="lk pixel">🔒 private</span>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<div class="pane skills" hidden={active !== 'skills'}>
			{#each skillGroups as g}
				<div class="grp" style="--a:{g.accent}">
					<h4 class="pixel">{g.label}</h4>
					<ul>
						{#each g.items as it}<li>{it}</li>{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="pane contact" hidden={active !== 'contact'}>
			<h3>Let's build <span class="hl">something good.</span></h3>
			<p class="csub">Open to internships, apprenticeships and fun collaborations.</p>
			<div class="cbtns">
				<a class="btn primary" href="mailto:{email}">✉ Email me</a>
				<a class="btn ghost" href={githubUrl} target="_blank" rel="noopener noreferrer">★ GitHub</a>
			</div>
			<p class="ps2 pixel">ps — yes, this whole site is a nintendo 3ds 🎮</p>
		</div>
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

	[hidden] {
		display: none !important;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.4rem 0.7rem;
		background: color-mix(in srgb, var(--accent) 16%, var(--bg-crust));
		border-bottom: 1px solid var(--surface);
		flex: none;
	}
	.bar .t {
		font-size: 0.5rem;
		color: var(--accent);
		text-transform: uppercase;
	}
	.bar .c {
		font-size: 0.5rem;
		color: var(--faint);
	}

	.view {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 6cqw;
		font-size: clamp(0.75rem, 3.4cqw, 1rem);
	}
	.view::-webkit-scrollbar {
		width: 6px;
	}
	.view::-webkit-scrollbar-thumb {
		background: var(--surface-2);
		border-radius: 99px;
	}

	/* home / boot */
	.boot {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
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

	.pane h3 {
		font-family: var(--font-display);
		font-size: 1.7em;
	}
	.lead {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 1.15em;
		line-height: 1.5;
		margin-bottom: 1.1rem;
	}
	.log {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}
	.log li {
		border-left: 2px dashed var(--border);
		padding-left: 0.8rem;
	}
	.log .when {
		font-size: 0.5rem;
		color: var(--accent);
	}
	.log h4 {
		font-family: var(--font-display);
		font-size: 1.05em;
		margin-top: 0.15rem;
	}
	.log .where {
		color: var(--subtext1);
		font-size: 0.88em;
	}
	.log .det {
		color: var(--muted);
		font-size: 0.85em;
		margin-top: 0.2rem;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.prj {
		border: 1px solid var(--surface);
		border-left: 4px solid var(--a);
		border-radius: 10px;
		padding: 0.8rem 0.9rem;
		background: var(--bg-alt);
	}
	.ph {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
	}
	.pic {
		font-size: 1.3em;
		flex: none;
	}
	.ph h4 {
		font-family: var(--font-display);
		font-size: 1.05em;
	}
	.ptag {
		color: var(--a);
		font-size: 0.85em;
	}
	.py {
		margin-left: auto;
		font-size: 0.45rem;
		color: var(--faint);
	}
	.pdesc {
		color: var(--muted);
		font-size: 0.9em;
		margin: 0.45rem 0 0.55rem;
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
		font-size: 0.72em;
		padding: 0.12rem 0.45rem;
		border-radius: 6px;
		background: var(--bg-crust);
		border: 1px solid var(--border);
		color: var(--subtext1);
	}
	.pf {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.6rem;
	}
	.ps,
	.lk {
		font-size: 0.45rem;
		color: var(--faint);
	}
	.pf a {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.9em;
		color: var(--bg-crust);
		background: var(--a);
		padding: 0.2rem 0.65rem;
		border-radius: 999px;
	}

	.skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
		gap: 0.7rem;
	}
	.grp {
		border: 1px solid var(--surface);
		border-top: 4px solid var(--a);
		border-radius: 10px;
		padding: 0.7rem 0.8rem;
		background: var(--bg-alt);
	}
	.grp h4 {
		font-size: 0.5rem;
		color: var(--a);
		margin-bottom: 0.5rem;
	}
	.grp ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.grp li {
		font-size: 0.9em;
		color: var(--text);
		display: flex;
		gap: 0.45rem;
		align-items: center;
	}
	.grp li::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 2px;
		background: var(--a);
		flex: none;
	}

	.contact .hl {
		color: var(--accent);
	}
	.csub {
		color: var(--muted);
		margin: 0.7rem 0 1.2rem;
		max-width: 38ch;
	}
	.cbtns {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.cbtns .btn {
		font-size: 0.9em;
		padding: 0.55rem 1rem;
	}
	.ps2 {
		margin-top: 1.3rem;
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
	}
</style>
