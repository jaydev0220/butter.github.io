<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';
	import type { JoinResource } from '$lib/types';

	interface Props {
		resource: JoinResource;
	}

	let { resource }: Props = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Source plan requires placeholder href values until real external URLs are supplied. -->
<article class="join-resource-card rounded-2xl border border-border bg-bg-page p-5">
	<p
		class="join-resource-label mb-4 inline-flex rounded-full bg-indigo-tint px-3 py-1 text-sm
			font-semibold text-indigo"
	>
		{resource.label}
	</p>
	<h3 class="join-resource-title text-xl font-bold">{resource.title}</h3>
	<p class="join-resource-description mt-3 leading-7 text-text-secondary">
		{resource.description}
	</p>
	<a
		href={resource.href}
		target="_blank"
		rel="external noopener noreferrer"
		class="join-resource-button mt-5 inline-flex items-center gap-2 rounded-xl border
			border-border-strong bg-bg-page px-4 py-2.5 font-semibold text-text-primary transition-all
			duration-200 hover:-translate-y-0.5 hover:border-indigo-light focus-visible:ring-2
			focus-visible:ring-indigo-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
			focus-visible:outline-none"
	>
		{resource.buttonLabel}
		<ExternalLink class="h-4 w-4" aria-hidden="true" />
	</a>
</article>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
