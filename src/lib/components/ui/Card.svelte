<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		hover?: boolean;
		children: Snippet;
		class?: string;
	}

	let { hover = false, children, class: className = '' }: Props = $props();

	const hoverClasses = $derived(hover ? 'hover:-translate-y-1 hover:border-border-strong' : '');
</script>

<div
	class="rounded-xl border border-border bg-bg-surface p-5 transition-all duration-200 {hoverClasses} {className}"
>
	{@render children()}
</div>
