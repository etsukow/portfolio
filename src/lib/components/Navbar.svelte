<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { scrollTo } from '$lib/scroll/smooth';

	const links = [
		{ id: 'about', label: 'About' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	];

	let scrolled = $state(false);
	let active = $state('');
	let menuOpen = $state(false);

	function go(e: MouseEvent, id: string) {
		e.preventDefault();
		menuOpen = false;
		scrollTo(`#${id}`, -72);
	}

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		const spy = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const l of links) {
			const el = document.getElementById(l.id);
			if (el) spy.observe(el);
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
			spy.disconnect();
		};
	});
</script>

<header class="nav" class:scrolled>
	<div class="bar container">
		<a class="brand" href="#top" onclick={(e) => go(e, 'top')} aria-label="Home">
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M6 8l5 4-5 4" />
				<path class="ul" d="M13 16h6" />
			</svg>
			<span>etsu<span class="dot">.</span></span>
		</a>

		<nav class="links" aria-label="Primary">
			{#each links as link}
				<a
					href="#{link.id}"
					class:active={active === link.id}
					onclick={(e) => go(e, link.id)}>{link.label}</a
				>
			{/each}
		</nav>

		<div class="actions">
			<ThemeToggle />
			<button
				class="burger"
				class:open={menuOpen}
				aria-label="Menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="sheet" aria-label="Mobile">
			{#each links as link}
				<a href="#{link.id}" onclick={(e) => go(e, link.id)}>{link.label}</a>
			{/each}
		</nav>
	{/if}
</header>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		transition:
			background-color 0.4s var(--ease),
			border-color 0.4s var(--ease),
			backdrop-filter 0.4s var(--ease);
		border-bottom: 1px solid transparent;
	}

	.nav.scrolled {
		background: color-mix(in srgb, var(--bg) 72%, transparent);
		backdrop-filter: blur(12px) saturate(1.2);
		border-bottom-color: var(--border);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 64px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		font-size: 1.05rem;
	}

	.brand svg {
		width: 26px;
		height: 26px;
		fill: none;
		stroke: var(--accent);
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.brand .dot {
		color: var(--accent);
	}

	.links {
		display: none;
		gap: 1.5rem;
	}

	.links a {
		position: relative;
		font-size: 0.92rem;
		color: var(--muted);
		transition: color 0.25s var(--ease);
	}

	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -6px;
		width: 100%;
		height: 2px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s var(--ease);
	}

	.links a:hover,
	.links a.active {
		color: var(--text);
	}

	.links a.active::after {
		transform: scaleX(1);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.burger {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 38px;
		height: 38px;
		padding: 0 8px;
		border-radius: 10px;
		border: 1px solid var(--border);
	}

	.burger span {
		display: block;
		height: 2px;
		background: var(--text);
		border-radius: 2px;
		transition: transform 0.3s var(--ease), opacity 0.2s var(--ease);
	}

	.burger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.burger.open span:nth-child(2) {
		opacity: 0;
	}
	.burger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	.sheet {
		display: flex;
		flex-direction: column;
		padding: 0.5rem var(--gutter) 1.25rem;
		background: color-mix(in srgb, var(--bg) 92%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}

	.sheet a {
		padding: 0.85rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		border-bottom: 1px solid var(--border);
	}

	@media (min-width: 760px) {
		.links {
			display: flex;
		}
		.burger {
			display: none;
		}
		.sheet {
			display: none;
		}
	}
</style>
