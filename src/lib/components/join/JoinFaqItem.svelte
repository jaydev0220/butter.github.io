<script lang="ts">
	import { ChevronDown, ExternalLink } from '@lucide/svelte';
	import type { JoinFaq } from '$lib/types';

	interface Props {
		faq: JoinFaq;
		open: boolean;
		onToggle: (faqId: string) => void;
	}

	let { faq, open, onToggle }: Props = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Source plan requires placeholder href values until real external URLs are supplied. -->
<article class="join-faq-item overflow-hidden rounded-2xl border border-border bg-bg-surface">
	<button
		type="button"
		class="join-faq-button flex w-full items-center justify-between gap-4 px-5 py-4 text-left
			font-semibold text-text-primary transition-colors duration-200 hover:bg-gold-tint
			focus-visible:ring-2 focus-visible:ring-indigo-accent focus-visible:ring-offset-2
			focus-visible:ring-offset-bg-page focus-visible:outline-none sm:px-6"
		aria-expanded={open}
		aria-controls={`join-faq-panel-${faq.id}`}
		id={`join-faq-button-${faq.id}`}
		onclick={() => onToggle(faq.id)}
	>
		<span>{faq.question}</span>
		<ChevronDown
			class="h-5 w-5 shrink-0 text-gold-text transition-transform duration-200 {open
				? 'rotate-180'
				: ''}"
			aria-hidden="true"
		/>
	</button>

	{#if open}
		<div
			id={`join-faq-panel-${faq.id}`}
			class="join-faq-panel animate-slide-down border-t border-border px-5 py-5 text-text-secondary sm:px-6"
			role="region"
			aria-labelledby={`join-faq-button-${faq.id}`}
		>
			<p class="leading-8">{faq.answer}</p>
			{#if faq.action}
				<a
					href={faq.action.href}
					target="_blank"
					rel="external noopener noreferrer"
					class="join-secondary-button mt-4 inline-flex items-center gap-2 rounded-xl border
						border-border-strong bg-bg-page px-4 py-2.5 font-semibold text-text-primary
						transition-all duration-200 hover:-translate-y-0.5 hover:border-gold
						focus-visible:ring-2 focus-visible:ring-indigo-accent focus-visible:ring-offset-2
						focus-visible:ring-offset-bg-page focus-visible:outline-none"
				>
					{faq.action.label}
					<ExternalLink class="h-4 w-4" aria-hidden="true" />
				</a>
			{/if}
		</div>
	{/if}
</article>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
