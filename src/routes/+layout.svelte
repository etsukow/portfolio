<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/800.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';

	import { onMount } from 'svelte';
	import { initSmoothScroll } from '$lib/scroll/smooth';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	onMount(() => initSmoothScroll());
</script>

<Navbar />
<main>
	{@render children()}
</main>
<Footer />
