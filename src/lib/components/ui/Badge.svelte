<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'gold' | 'indigo' | 'rose' | 'gain' | 'loss';
		children: Snippet;
		class?: string;
	}

	let { variant = 'gold', children, class: className = '' }: Props = $props();

	const variantClasses = {
		gold: 'bg-gold-tint text-gold-text',
		indigo: 'bg-indigo-tint text-indigo',
		rose: 'bg-rose-tint text-rose',
		gain: 'bg-gain-tint text-gain-text',
		loss: 'bg-loss-tint text-loss-text'
	};
</script>

<span
	class="inline-block rounded-full px-3 py-1 text-xs font-medium {variantClasses[
		variant
	]} {className}"
>
	{@render children()}
</span>
