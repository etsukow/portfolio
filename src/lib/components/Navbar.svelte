<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="nav">
	<div class="bar container">
		<span class="brand">
			<span class="dot" aria-hidden="true"></span>
			<span class="name">etsu<span class="ext">.console</span></span>
		</span>
		<ThemeToggle />
	</div>
</header>

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 60;
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
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

	@keyframes pulse {
		50% {
			opacity: 0.45;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.brand .dot {
			animation: none;
		}
	}
</style>
