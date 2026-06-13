<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, githubUrl, email } from '$lib/data/projects';
	import { skillGroups, about } from '$lib/data/skills';

	type App = 'home' | 'about' | 'projects' | 'skills' | 'contact';

	const apps: { id: App; label: string; icon: string; accent: string }[] = [
		{ id: 'about', label: 'About', icon: '👤', accent: 'var(--ctp-mauve)' },
		{ id: 'projects', label: 'Projects', icon: '🎮', accent: 'var(--ctp-blue)' },
		{ id: 'skills', label: 'Skills', icon: '🎒', accent: 'var(--ctp-green)' },
		{ id: 'contact', label: 'Contact', icon: '✉️', accent: 'var(--ctp-peach)' }
	];

	let active = $state<App>('home');
	const title = $derived(active === 'home' ? 'etsuOS' : active);

	let clock = $state('--:--');
	onMount(() => {
		const tick = () => {
			const d = new Date();
			clock = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
		};
		tick();
		const t = setInterval(tick, 20000);
		return () => clearInterval(t);
	});

	let screen: HTMLElement | undefined;
	function open(app: App) {
		active = app;
		screen?.scrollTo({ top: 0 });
	}

	function onMenuKey(e: KeyboardEvent) {
		const i = apps.findIndex((a) => a.id === active);
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			open(apps[(Math.max(0, i) + 1) % apps.length].id);
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			open(apps[(Math.max(0, i) - 1 + apps.length) % apps.length].id);
		}
	}
</script>

<div class="device">
	<!-- ===== TOP HALF (display) ===== -->
	<div class="lid">
		<div class="screen top">
			<div class="bar">
				<span class="t pixel">▸ {title}</span>
				<span class="c pixel">{clock}</span>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="view"
				bind:this={screen}
				tabindex="0"
				data-lenis-prevent
				role="region"
				aria-label="App content"
			>
				<!-- home / boot -->
				<div class="boot" hidden={active !== 'home'}>
					<p class="logo pixel">etsuOS</p>
					<p class="name">Julien “etsu” Evrard</p>
					<p class="role">software engineer — AI · full-stack · DevOps</p>
					<p class="blurb">
						Apprentice @ Lemerpax (Polytech Nantes), currently interning at KU Leuven.
					</p>
					<p class="hint pixel">▼ tap an app below to begin</p>
				</div>

				<!-- about -->
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

				<!-- projects -->
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

				<!-- skills -->
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

				<!-- contact -->
				<div class="pane contact" hidden={active !== 'contact'}>
					<h3>Let's build <span class="hl">something good.</span></h3>
					<p class="csub">
						Open to internships, apprenticeships and fun collaborations. Email is fastest.
					</p>
					<div class="cbtns">
						<a class="btn primary" href="mailto:{email}">✉ Email me</a>
						<a class="btn ghost" href={githubUrl} target="_blank" rel="noopener noreferrer"
							>★ GitHub</a
						>
					</div>
					<p class="ps2 pixel">ps — yes, this whole site is a nintendo 3ds 🎮</p>
				</div>
			</div>
		</div>
	</div>

	<!-- ===== HINGE ===== -->
	<div class="hinge" aria-hidden="true">
		<span class="grille"></span>
		<span class="cam"></span>
		<span class="grille"></span>
	</div>

	<!-- ===== BOTTOM HALF (controls + touch screen) ===== -->
	<div class="base">
		<div class="dpad" aria-hidden="true"><span class="cross"></span></div>

		<div class="screen bottom">
			<p class="menu-label pixel">home menu</p>
			<div
				class="apps"
				role="tablist"
				aria-label="Sections"
				tabindex="0"
				onkeydown={onMenuKey}
			>
				{#each apps as a}
					<button
						class="app"
						role="tab"
						aria-selected={active === a.id}
						style="--a:{a.accent}"
						onclick={() => open(a.id)}
					>
						<span class="ic">{a.icon}</span>
						<span class="lb">{a.label}</span>
					</button>
				{/each}
			</div>
			<div class="status">
				<button class="home" onclick={() => open('home')} aria-label="Home menu">⌂ home</button>
				<span class="credit pixel">© 2026 etsu</span>
			</div>
		</div>

		<div class="abxy" aria-hidden="true">
			<span class="b x">X</span>
			<span class="b y">Y</span>
			<span class="b a">A</span>
			<span class="b bb">B</span>
		</div>
	</div>
</div>

<style>
	/* author display rules below would otherwise beat [hidden] */
	[hidden] {
		display: none !important;
	}

	.device {
		width: min(94vw, 720px);
		height: min(90svh, 820px);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		padding: clamp(8px, 1.6vw, 16px);
		gap: clamp(4px, 1vw, 8px);
		background: linear-gradient(180deg, var(--surface), var(--bg-alt));
		border: var(--border-w) solid var(--edge);
		border-radius: clamp(20px, 3vw, 34px);
		box-shadow: 0 var(--lift) 0 0 var(--edge);
	}

	/* screens */
	.screen {
		background: var(--bg-crust);
		border: var(--border-w) solid var(--edge);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: inset 0 0 24px rgb(0 0 0 / 0.35);
	}

	.lid {
		flex: 1.45;
		min-height: 0;
		display: flex;
	}
	.top {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.8rem;
		background: color-mix(in srgb, var(--accent) 14%, var(--bg-crust));
		border-bottom: var(--border-w) solid var(--edge);
		flex: none;
	}
	.bar .t {
		font-size: 0.55rem;
		color: var(--accent);
		text-transform: uppercase;
	}
	.bar .c {
		font-size: 0.55rem;
		color: var(--faint);
	}

	.view {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: clamp(1rem, 3vw, 2rem);
	}
	.view::-webkit-scrollbar {
		width: 8px;
	}

	/* ---- home / boot ---- */
	.boot {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: 0.6rem;
	}
	.boot .logo {
		font-size: clamp(1.1rem, 4vw, 1.8rem);
		color: var(--accent);
		line-height: 1.4;
	}
	.boot .name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.3rem, 5vw, 2rem);
		color: var(--text);
	}
	.boot .role {
		color: var(--ctp-lavender);
		font-size: 0.92rem;
	}
	.boot .blurb {
		color: var(--muted);
		max-width: 32ch;
		font-size: 0.9rem;
	}
	.boot .hint {
		margin-top: 0.6rem;
		font-size: 0.5rem;
		color: var(--faint);
		animation: blink 1.6s steps(1) infinite;
	}

	/* ---- generic pane ---- */
	.pane h3 {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 5vw, 2.2rem);
	}
	.lead {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(1.05rem, 2.6vw, 1.3rem);
		line-height: 1.5;
		margin-bottom: 1.4rem;
	}

	.log {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}
	.log li {
		border-left: var(--border-w) dashed var(--border);
		padding-left: 0.9rem;
	}
	.log .when {
		font-size: 0.5rem;
		color: var(--accent);
	}
	.log h4 {
		font-family: var(--font-display);
		font-size: 1.02rem;
		margin-top: 0.2rem;
	}
	.log .where {
		color: var(--subtext1);
		font-size: 0.86rem;
	}
	.log .det {
		color: var(--muted);
		font-size: 0.84rem;
		margin-top: 0.25rem;
	}

	/* ---- projects ---- */
	.projects {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}
	.prj {
		border: var(--border-w) solid var(--edge);
		border-left: 4px solid var(--a);
		border-radius: 12px;
		padding: 0.9rem 1rem;
		background: var(--bg-alt);
	}
	.ph {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
	}
	.pic {
		font-size: 1.3rem;
		flex: none;
	}
	.ph h4 {
		font-family: var(--font-display);
		font-size: 1.05rem;
	}
	.ptag {
		color: var(--a);
		font-size: 0.82rem;
	}
	.py {
		margin-left: auto;
		font-size: 0.45rem;
		color: var(--faint);
	}
	.pdesc {
		color: var(--muted);
		font-size: 0.85rem;
		margin: 0.5rem 0 0.6rem;
	}
	.tech {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}
	.tech li {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		padding: 0.15rem 0.45rem;
		border-radius: 7px;
		background: var(--bg-crust);
		border: 1px solid var(--border);
		color: var(--subtext1);
	}
	.pf {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.7rem;
	}
	.ps,
	.lk {
		font-size: 0.45rem;
		color: var(--faint);
	}
	.pf a {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--bg-crust);
		background: var(--a);
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		border: 2px solid var(--edge);
	}

	/* ---- skills ---- */
	.skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0.8rem;
	}
	.grp {
		border: var(--border-w) solid var(--edge);
		border-top: 4px solid var(--a);
		border-radius: 12px;
		padding: 0.8rem 0.9rem;
		background: var(--bg-alt);
	}
	.grp h4 {
		font-size: 0.52rem;
		color: var(--a);
		margin-bottom: 0.6rem;
	}
	.grp ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.grp li {
		font-size: 0.85rem;
		color: var(--text);
		display: flex;
		gap: 0.5rem;
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

	/* ---- contact ---- */
	.contact .hl {
		color: var(--accent);
	}
	.csub {
		color: var(--muted);
		margin: 0.8rem 0 1.4rem;
		max-width: 36ch;
	}
	.cbtns {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}
	.ps2 {
		margin-top: 1.6rem;
		font-size: 0.5rem;
		color: var(--faint);
		line-height: 1.7;
	}

	/* ===== hinge ===== */
	.hinge {
		flex: none;
		height: clamp(14px, 2.4vw, 22px);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.grille {
		width: clamp(20px, 6vw, 46px);
		height: 5px;
		border-radius: 99px;
		background: repeating-linear-gradient(
			90deg,
			var(--border-strong) 0 2px,
			transparent 2px 5px
		);
		opacity: 0.6;
	}
	.cam {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--bg-crust);
		border: 2px solid var(--border-strong);
	}

	/* ===== base (bottom half) ===== */
	.base {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.6rem;
		align-items: stretch;
	}
	.bottom {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.menu-label {
		flex: none;
		padding: 0.5rem 0.8rem;
		font-size: 0.5rem;
		color: var(--faint);
		border-bottom: var(--border-w) solid var(--edge);
		background: var(--bg-alt);
	}

	.apps {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(0.5rem, 1.5vw, 0.9rem);
		padding: clamp(0.7rem, 2vw, 1.1rem);
		align-content: center;
	}
	.apps:focus-visible {
		outline: none;
	}

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.7rem 0.5rem;
		border-radius: 14px;
		background: var(--bg-alt);
		border: var(--border-w) solid var(--edge);
		box-shadow: 0 4px 0 0 var(--edge);
		transition:
			transform 0.12s var(--ease),
			box-shadow 0.12s var(--ease),
			border-color 0.15s var(--ease);
	}
	.app .ic {
		font-size: clamp(1.4rem, 5vw, 2rem);
		line-height: 1;
	}
	.app .lb {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--text);
	}
	.app:hover {
		transform: translateY(2px);
		box-shadow: 0 2px 0 0 var(--edge);
	}
	.app[aria-selected='true'] {
		border-color: var(--a);
		box-shadow: 0 4px 0 0 var(--a);
		background: color-mix(in srgb, var(--a) 14%, var(--bg-alt));
	}

	.status {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.8rem;
		border-top: var(--border-w) solid var(--edge);
		background: var(--bg-alt);
	}
	.home {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.82rem;
		color: var(--accent);
	}
	.credit {
		font-size: 0.45rem;
		color: var(--faint);
	}

	/* ===== controls (decorative, desktop only) ===== */
	.dpad,
	.abxy {
		display: none;
	}
	.cross {
		width: 58px;
		height: 58px;
		background:
			linear-gradient(var(--surface-2) 0 0) center / 20px 100% no-repeat,
			linear-gradient(var(--surface-2) 0 0) center / 100% 20px no-repeat;
		border-radius: 8px;
		filter: drop-shadow(0 3px 0 var(--edge));
	}
	.abxy {
		position: relative;
		width: 78px;
		height: 78px;
	}
	.b {
		position: absolute;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-family: var(--font-pixel);
		font-size: 0.5rem;
		color: var(--bg-crust);
		background: var(--surface-2);
		box-shadow: 0 3px 0 0 var(--edge);
	}
	.b.x {
		top: 0;
		left: 26px;
		background: var(--ctp-blue);
	}
	.b.y {
		top: 26px;
		left: 0;
		background: var(--ctp-green);
	}
	.b.a {
		top: 26px;
		left: 52px;
		background: var(--ctp-red);
	}
	.b.bb {
		top: 52px;
		left: 26px;
		background: var(--ctp-yellow);
	}

	@keyframes blink {
		50% {
			opacity: 0.4;
		}
	}

	@media (min-width: 720px) {
		.base {
			grid-template-columns: auto 1fr auto;
			align-items: center;
		}
		.dpad,
		.abxy {
			display: grid;
			place-items: center;
			align-self: center;
		}
		.bottom {
			height: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot .hint {
			animation: none;
		}
	}
</style>
