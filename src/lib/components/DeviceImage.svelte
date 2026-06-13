<script lang="ts">
	import { DEVICE_IMG, DEVICE_ASPECT, SCREEN_RECTS, type App } from '$lib/data/os';
	import TopScreen from './os/TopScreen.svelte';
	import BottomMenu from './os/BottomMenu.svelte';

	let active = $state<App>('home');
	function open(app: App) {
		active = app;
	}

	const t = SCREEN_RECTS.top;
	const b = SCREEN_RECTS.bottom;
	const pct = (r: { x: number; y: number; w: number; h: number }) =>
		`left:${r.x * 100}%;top:${r.y * 100}%;width:${r.w * 100}%;height:${r.h * 100}%`;
</script>

<div class="dev" style="--aspect:{DEVICE_ASPECT}">
	<img class="frame" src={DEVICE_IMG} alt="An open Nintendo 3DS" draggable="false" />
	<div class="screen" style={pct(t)}><TopScreen {active} /></div>
	<div class="screen" style={pct(b)}><BottomMenu {active} onOpen={open} /></div>
</div>

<style>
	.dev {
		position: relative;
		width: min(92vw, calc(82svh * var(--aspect)));
		aspect-ratio: var(--aspect);
		filter: drop-shadow(0 24px 40px rgb(0 0 0 / 0.45));
	}

	.frame {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		pointer-events: none;
		user-select: none;
	}

	.screen {
		position: absolute;
		overflow: hidden;
		/* the screens in the render are flat glass — round the corners a touch */
		border-radius: 4px;
	}
</style>
