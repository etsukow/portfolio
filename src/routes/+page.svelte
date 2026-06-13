<script lang="ts">
	import Console from '$lib/components/Console.svelte';

	const title = 'Julien Evrard — Software Engineer';
	const description =
		'Julien "etsu" Evrard — software engineer building data & ML tooling, real-time apps, 3D on the web, and the pipelines that ship them. A portfolio that runs like a Nintendo 3DS.';
	const url = 'https://etsukow.com';
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

<Console />
