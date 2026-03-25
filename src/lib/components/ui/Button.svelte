<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		href?: string;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
		class?: string;
		external?: boolean;
	}

	let {
		variant = 'primary',
		href,
		onclick,
		children,
		class: className = '',
		external = false
	}: Props = $props();

	const baseClasses =
		'inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
	const variantClasses = {
		primary: 'bg-gold text-gold-tint hover:bg-gold-hover active:scale-[0.98] focus:ring-gold',
		secondary:
			'bg-transparent text-indigo border-[1.5px] border-indigo-light hover:bg-indigo-tint focus:ring-indigo'
	};

	const classes = $derived(`${baseClasses} ${variantClasses[variant]} ${className}`);
	const isAnchor = $derived(href?.startsWith('#') ?? false);
	const isExternal = $derived(external || href?.startsWith('http') || href?.startsWith('mailto:'));
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Component handles anchor, external, and internal links -->
{#if href}
	{#if isAnchor}
		<a {href} class={classes} {onclick}>
			{@render children()}
		</a>
	{:else if isExternal}
		<a {href} class={classes} {onclick} target="_blank" rel="noopener noreferrer">
			{@render children()}
		</a>
	{:else}
		<a {href} class={classes} {onclick} data-sveltekit-preload-data="hover">
			{@render children()}
		</a>
	{/if}
{:else}
	<button type="button" class={classes} {onclick}>
		{@render children()}
	</button>
{/if}
<!-- eslint-enable svelte/no-navigation-without-resolve -->
