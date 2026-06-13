<script lang="ts">
	// Minimal line-icon set (monochrome, inherits currentColor) — replaces emoji
	// so the OS has one coherent visual language.
	let { name, size = 22 }: { name: string; size?: number } = $props();
</script>

<svg
	class="icon"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if name === 'about'}
		<circle cx="12" cy="8" r="3.5" />
		<path d="M5.5 20c0-3.6 2.9-5.6 6.5-5.6s6.5 2 6.5 5.6" />
	{:else if name === 'projects'}
		<rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
		<rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
		<rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
		<rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
	{:else if name === 'skills'}
		<path d="M12 3.2 21 8l-9 4.8L3 8l9-4.8Z" />
		<path d="M3 12.5 12 17.3 21 12.5" />
		<path d="M3 16.8 12 21.6 21 16.8" />
	{:else if name === 'contact' || name === 'mail'}
		<rect x="3" y="5" width="18" height="14" rx="2.5" />
		<path d="m3.5 7 8.5 6 8.5-6" />
	{:else if name === 'github'}
		<path
			fill="currentColor"
			stroke="none"
			d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.89.12 3.19.78.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22 0 1.61-.02 2.9-.02 3.29 0 .32.22.69.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"
		/>
	{:else if name === 'lock'}
		<rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
		<path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
	{/if}
</svg>

<style>
	.icon {
		display: block;
		flex: none;
	}
</style>
