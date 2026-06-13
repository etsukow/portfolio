<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';

	const title = 'Julien Evrard — Software Engineer';
	const description =
		'Julien "etsu" Evrard — software engineer building AI workspaces, real-time apps, 3D on the web, and the pipelines that ship them.';
	const url = 'https://etsu.dev';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Julien Evrard" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<link rel="canonical" href={url} />
</svelte:head>

<Hero />
<About />
<Projects />
<Skills />
<Contact />
