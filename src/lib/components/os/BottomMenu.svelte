<script lang="ts">
	import { apps, type App } from '$lib/data/os';
	import Icon from '../Icon.svelte';

	let { active, onOpen }: { active: App; onOpen: (a: App) => void } = $props();

	function onMenuKey(e: KeyboardEvent) {
		const i = apps.findIndex((a) => a.id === active);
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			onOpen(apps[(Math.max(0, i) + 1) % apps.length].id);
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			onOpen(apps[(Math.max(0, i) - 1 + apps.length) % apps.length].id);
		}
	}
</script>

<div class="bm">
	<p class="menu-label pixel">home menu</p>
	<div class="apps" role="tablist" aria-label="Sections" tabindex="0" onkeydown={onMenuKey}>
		{#each apps as a}
			<button
				class="app"
				role="tab"
				aria-selected={active === a.id}
				style="--a:{a.accent}"
				onclick={() => onOpen(a.id)}
			>
				<span class="ic"><Icon name={a.id} /></span>
				<span class="lb">{a.label}</span>
			</button>
		{/each}
	</div>
	<div class="status">
		<button class="home" onclick={() => onOpen('home')} aria-label="Home menu">⌂ home</button>
		<span class="credit pixel">© 2026 etsu</span>
	</div>
</div>

<style>
	.bm {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		background: var(--bg-crust);
		container-type: inline-size;
	}

	.menu-label {
		flex: none;
		padding: 0.4rem 0.7rem;
		font-size: 0.5rem;
		color: var(--faint);
		border-bottom: 1px solid var(--surface);
		background: var(--bg-alt);
	}

	.apps {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 4cqw;
		padding: 5cqw;
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
		gap: 0.3rem;
		padding: 3cqw 1cqw;
		border-radius: 12px;
		background: var(--bg-alt);
		border: 2px solid var(--edge);
		box-shadow: 0 3px 0 0 var(--edge);
		transition:
			transform 0.12s var(--ease),
			box-shadow 0.12s var(--ease),
			border-color 0.15s var(--ease);
	}
	.app .ic {
		display: grid;
		place-items: center;
		color: var(--a);
	}
	.app .ic :global(svg) {
		width: clamp(20px, 8.5cqw, 30px);
		height: auto;
	}
	.app .lb {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: clamp(0.72rem, 4.2cqw, 0.95rem);
		color: var(--text);
	}
	.app:hover {
		transform: translateY(2px);
		box-shadow: 0 1px 0 0 var(--edge);
	}
	.app[aria-selected='true'] {
		border-color: var(--a);
		box-shadow: 0 3px 0 0 var(--a);
		background: color-mix(in srgb, var(--a) 14%, var(--bg-alt));
	}

	.status {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.4rem 0.7rem;
		border-top: 1px solid var(--surface);
		background: var(--bg-alt);
	}
	.home {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: clamp(0.7rem, 3.6cqw, 0.85rem);
		color: var(--accent);
	}
	.credit {
		font-size: 0.45rem;
		color: var(--faint);
	}
</style>
