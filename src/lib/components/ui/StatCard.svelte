<script lang="ts">
	import { onMount } from 'svelte';
	import { countUp, parseStatValue } from '$lib/utils/animation';
	import { createScrollObserver } from '$lib/utils/scroll';
	import type { Stat } from '$lib/types';

	interface Props {
		stat: Stat;
		delay?: number;
	}

	let { stat, delay = 0 }: Props = $props();

	// Parse prefix (e.g., "~"), number, and suffix (e.g., "萬+")
	const parsed = $derived(() => {
		const match = stat.value.match(/^([^\d]*)([\d,]+)(.*)$/);
		return {
			prefix: match?.[1] ?? '',
			finalNumber: match?.[2] ?? stat.value,
			suffix: match?.[3] ?? ''
		};
	});

	let animatedNumber = $state<string | null>(null);
	let element: HTMLDivElement | undefined = $state();
	let hasAnimated = $state(false);

	const displayNumber = $derived(animatedNumber ?? parsed().finalNumber);

	onMount(() => {
		if (!element) return;

		const numericValue = parseStatValue(stat.value);
		if (numericValue === null) return;

		const observer = createScrollObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						setTimeout(() => {
							countUp(numericValue, 1500, (value) => {
								const displayNum = stat.value.includes('萬') ? Math.floor(value / 10000) : value;
								animatedNumber = String(displayNum);
							});
						}, delay);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div bind:this={element} class="text-center">
	<p class="mb-1 text-sm text-text-secondary">{stat.metric}</p>
	<p class="font-sans text-4xl font-medium tracking-tight text-indigo-deep md:text-5xl">
		{parsed().prefix}<span class="inline-block tabular-nums">{displayNumber}</span>{parsed().suffix}
	</p>
	<p class="mt-1 text-sm text-text-muted">{stat.label}</p>
</div>
