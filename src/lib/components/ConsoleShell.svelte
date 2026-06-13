<script lang="ts">
	import type { App } from '$lib/data/os';
	import TopScreen from './os/TopScreen.svelte';
	import BottomMenu from './os/BottomMenu.svelte';

	let active = $state<App>('home');
	function open(app: App) {
		active = app;
	}
</script>

<div class="device">
	<div class="lid">
		<div class="screen top"><TopScreen {active} /></div>
	</div>

	<div class="hinge" aria-hidden="true">
		<span class="grille"></span>
		<span class="cam"></span>
		<span class="grille"></span>
	</div>

	<div class="base">
		<div class="dpad" aria-hidden="true"><span class="cross"></span></div>
		<div class="screen bottom"><BottomMenu {active} onOpen={open} /></div>
		<div class="abxy" aria-hidden="true">
			<span class="b x">X</span><span class="b y">Y</span><span class="b a">A</span><span
				class="b bb">B</span
			>
		</div>
	</div>
</div>

<style>
	.device {
		width: min(94vw, 680px);
		/* leave room for the navbar + .os padding (≈7rem) so the bottom menu is
		   never clipped on short viewports (phone toolbar showing, etc.) */
		height: min(800px, calc(100svh - 7rem));
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

	.screen {
		border: var(--border-w) solid var(--edge);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: inset 0 0 24px rgb(0 0 0 / 0.35);
	}

	.lid {
		flex: 1.2;
		min-height: 0;
		display: flex;
	}
	.top {
		flex: 1;
		min-height: 0;
	}

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
		background: repeating-linear-gradient(90deg, var(--border-strong) 0 2px, transparent 2px 5px);
		opacity: 0.6;
	}
	.cam {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--bg-crust);
		border: 2px solid var(--border-strong);
	}

	.base {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.6rem;
	}
	.bottom {
		min-height: 0;
	}

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

	@media (min-width: 720px) {
		.base {
			grid-template-columns: auto 1fr auto;
			align-items: center;
		}
		.dpad,
		.abxy {
			display: grid;
			place-items: center;
		}
	}
</style>
