<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/fredoka/500.css';
	import '@fontsource/fredoka/600.css';
	import '@fontsource/fredoka/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/press-start-2p/400.css';

	import { onMount } from 'svelte';
	import { initSmoothScroll } from '$lib/scroll/smooth';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	onMount(() => initSmoothScroll());
</script>

<div class="crt" aria-hidden="true"></div>
<Navbar />
<main>
	{@render children()}
</main>
