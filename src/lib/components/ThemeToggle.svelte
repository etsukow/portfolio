<script lang="ts">
	import { theme, toggleTheme } from '$lib/theme.svelte';

	const isLight = $derived(theme.value === 'latte');
</script>

<button
	type="button"
	class="toggle"
	onclick={toggleTheme}
	role="switch"
	aria-checked={isLight}
	aria-label={isLight ? 'Switch to dark theme (Mocha)' : 'Switch to light theme (Latte)'}
	title={isLight ? 'Mocha' : 'Latte'}
>
	<span class="track">
		<span class="thumb" class:light={isLight}>
			{#if isLight}
				<!-- sun -->
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="12" r="4.2" />
					<g stroke-linecap="round">
						<path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
					</g>
				</svg>
			{:else}
				<!-- moon -->
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
				</svg>
			{/if}
		</span>
	</span>
</button>

<style>
	.toggle {
		display: inline-grid;
		place-items: center;
		padding: 4px;
		border-radius: 999px;
	}

	.track {
		position: relative;
		display: block;
		width: 54px;
		height: 30px;
		border-radius: 999px;
		background: var(--bg-alt);
		border: var(--border-w) solid var(--edge);
		box-shadow: 0 3px 0 0 var(--edge);
		transition: background-color 0.4s var(--ease);
	}

	.thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 22px;
		height: 22px;
		display: grid;
		place-items: center;
		border-radius: 999px;
		background: var(--accent);
		color: var(--bg-crust);
		box-shadow: 0 2px 0 0 var(--edge);
		transition:
			transform 0.4s var(--ease),
			background-color 0.4s var(--ease);
	}

	.thumb.light {
		transform: translateX(24px);
		background: var(--ctp-yellow);
	}

	svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.thumb svg circle {
		fill: currentColor;
		stroke: none;
	}

	.thumb svg path {
		fill: var(--bg-crust);
		stroke: none;
	}

	.thumb.light svg g path {
		fill: none;
		stroke: currentColor;
	}

	.toggle:hover .thumb {
		filter: brightness(1.08);
	}
</style>
