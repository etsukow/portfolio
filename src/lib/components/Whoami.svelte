<script lang="ts">
	interface Props {
		/** Drive progress 0 → 1 (typically from the hero scroll timeline). */
		t?: number;
	}
	let { t = 0 }: Props = $props();

	const clamp = (n: number) => Math.max(0, Math.min(1, n));
	const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

	const cmd = 'whoami';
	const typed = $derived(cmd.slice(0, Math.round(map(t, 0.06, 0.4) * cmd.length)));
	const ran = $derived(t > 0.42);

	const lines = [
		{ text: 'Julien "etsu" Evrard', cls: 'name' },
		{ text: 'Software engineer — AI · full-stack · DevOps', cls: 'role' },
		{ text: 'Polytech Nantes · apprentice · ex–KU Leuven', cls: 'meta' }
	];

	const op = (i: number) => map(t, 0.46 + i * 0.13, 0.62 + i * 0.13);
</script>

<div class="term" role="img" aria-label="Terminal running whoami: Julien Evrard, software engineer.">
	<div class="bar">
		<span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
		<span class="title">etsu@portfolio — zsh</span>
	</div>
	<div class="body">
		<p class="cmd">
			<span class="prompt">etsu@portfolio</span><span class="sep">:</span><span class="path">~</span
			><span class="sep">$</span>
			<span class="typed">{typed}</span>{#if !ran}<span class="cursor"></span>{/if}
		</p>
		{#each lines as line, i}
			<p
				class="out {line.cls}"
				style="opacity:{op(i)}; transform:translateY({(1 - op(i)) * 8}px)"
			>
				<span class="arrow">→</span>
				{line.text}
			</p>
		{/each}
	</div>
</div>

<style>
	.term {
		width: min(440px, 100%);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--bg-crust) 88%, transparent);
		border: 1px solid var(--border);
		box-shadow: var(--shadow-md);
		backdrop-filter: blur(8px);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 0.6rem 0.85rem;
		background: color-mix(in srgb, var(--surface) 60%, transparent);
		border-bottom: 1px solid var(--border);
	}

	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
	}
	.dot.r {
		background: var(--ctp-red);
	}
	.dot.y {
		background: var(--ctp-yellow);
	}
	.dot.g {
		background: var(--ctp-green);
	}

	.title {
		margin-left: auto;
		font-size: 0.72rem;
		color: var(--faint);
	}

	.body {
		padding: 1rem 1.1rem 1.2rem;
		font-size: 0.86rem;
		line-height: 1.85;
	}

	.cmd {
		white-space: nowrap;
	}
	.prompt {
		color: var(--ctp-green);
	}
	.path {
		color: var(--ctp-blue);
	}
	.sep {
		color: var(--faint);
	}
	.typed {
		color: var(--text);
	}

	.cursor {
		display: inline-block;
		width: 8px;
		height: 1.05em;
		translate: 0 0.18em;
		background: var(--accent);
		animation: blink 1s steps(1) infinite;
	}

	.out {
		color: var(--muted);
	}
	.out .arrow {
		color: var(--accent);
	}
	.out.name {
		color: var(--text);
		font-weight: 700;
		font-size: 1.02rem;
	}
	.out.role {
		color: var(--ctp-lavender);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
		}
	}
</style>
