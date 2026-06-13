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
		scrollTo(`#${id}`, -76);
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
			<span class="dot" aria-hidden="true"></span>
			<span class="name">etsu<span class="ext">.console</span></span>
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
		<nav class="sheet container" aria-label="Mobile">
			{#each links as link}
				<a href="#{link.id}" onclick={(e) => go(e, link.id)}>▸ {link.label}</a>
			{/each}
		</nav>
	{/if}
</header>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		border-bottom: var(--border-w) solid transparent;
		transition:
			background-color 0.4s var(--ease),
			border-color 0.4s var(--ease),
			backdrop-filter 0.4s var(--ease);
	}

	.nav.scrolled {
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		backdrop-filter: blur(12px) saturate(1.2);
		border-bottom-color: var(--edge);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 66px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-pixel);
		font-size: 0.82rem;
	}
	.brand .name {
		color: var(--text);
	}
	.brand .ext {
		color: var(--accent);
	}
	.brand .dot {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		background: var(--ctp-green);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--ctp-green) 35%, transparent);
		animation: pulse 2s var(--ease) infinite;
	}

	.links {
		display: none;
		gap: 0.4rem;
	}

	.links a {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--muted);
		padding: 0.35rem 0.8rem;
		border-radius: 999px;
		border: var(--border-w) solid transparent;
		transition:
			color 0.2s var(--ease),
			background-color 0.2s var(--ease),
			border-color 0.2s var(--ease);
	}

	.links a:hover {
		color: var(--text);
	}

	.links a.active {
		color: var(--bg-crust);
		background: var(--accent);
		border-color: var(--edge);
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
		width: 42px;
		height: 42px;
		padding: 0 9px;
		border-radius: 12px;
		border: var(--border-w) solid var(--edge);
		background: var(--bg-alt);
		box-shadow: 0 4px 0 0 var(--edge);
	}
	.burger span {
		display: block;
		height: 2.5px;
		background: var(--text);
		border-radius: 2px;
		transition:
			transform 0.3s var(--ease),
			opacity 0.2s var(--ease);
	}
	.burger.open span:nth-child(1) {
		transform: translateY(7.5px) rotate(45deg);
	}
	.burger.open span:nth-child(2) {
		opacity: 0;
	}
	.burger.open span:nth-child(3) {
		transform: translateY(-7.5px) rotate(-45deg);
	}

	.sheet {
		display: flex;
		flex-direction: column;
		padding-block: 0.5rem 1.25rem;
		background: color-mix(in srgb, var(--bg) 94%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: var(--border-w) solid var(--edge);
	}
	.sheet a {
		font-family: var(--font-display);
		font-weight: 600;
		padding: 0.85rem 0.25rem;
		font-size: 1.15rem;
		color: var(--text);
		border-bottom: 1px solid var(--border);
	}

	@keyframes pulse {
		50% {
			opacity: 0.45;
		}
	}

	@media (min-width: 760px) {
		.links {
			display: flex;
		}
		.burger,
		.sheet {
			display: none;
		}
	}
</style>
