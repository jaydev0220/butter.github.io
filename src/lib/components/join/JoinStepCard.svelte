<script lang="ts">
	import { Check, Clipboard, ExternalLink } from '@lucide/svelte';
	import type { JoinStepState } from '$lib/types';

	interface Props {
		step: JoinStepState;
		index: number;
		inviteCode: string;
		onStepChange: (stepIndex: number, checked: boolean) => void | Promise<void>;
		onCopyInviteCode: () => void | Promise<void>;
	}

	let { step, index, inviteCode, onStepChange, onCopyInviteCode }: Props = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Source plan requires placeholder href values until real external URLs are supplied. -->
<article
	id={`join-step-${step.id}`}
	class="join-card scroll-mt-24 rounded-3xl border border-border bg-bg-surface p-5 shadow-sm
		transition-all duration-200 sm:p-6
		{step.enabled ? 'opacity-100' : 'opacity-60'}"
	aria-labelledby={`join-step-title-${step.id}`}
>
	<div class="join-card-grid grid gap-5 lg:grid-cols-[4.5rem_minmax(0,1fr)_9rem] lg:items-start">
		<div
			class="join-step-index flex h-14 w-14 items-center justify-center rounded-2xl border
				border-gold-light bg-gold-tint text-lg font-bold text-gold-text"
			aria-hidden="true"
		>
			{index + 1}
		</div>

		<div class="join-step-content min-w-0">
			<h3 id={`join-step-title-${step.id}`} class="join-step-title text-xl font-bold">
				{step.title}
			</h3>
			<p class="join-step-description mt-3 leading-8 text-text-secondary">
				{step.description}
			</p>

			{#if step.action || index === 0}
				<div class="join-actions mt-5 flex flex-wrap items-center gap-3">
					{#if step.action}
						<a
							href={step.action.href}
							target="_blank"
							rel="external noopener noreferrer"
							class="join-primary-button inline-flex items-center gap-2 rounded-xl bg-indigo px-5 py-3
								font-semibold text-bg-page transition-all duration-200 hover:-translate-y-0.5
								hover:bg-indigo-accent focus-visible:ring-2 focus-visible:ring-indigo-accent
								focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:outline-none"
						>
							{step.action.label}
							<ExternalLink class="h-4 w-4" aria-hidden="true" />
						</a>
					{/if}

					{#if index === 0}
						<span
							class="join-invite-pill rounded-full border border-gold-light bg-gold-tint px-4 py-2
								text-sm font-semibold text-gold-text"
						>
							邀請碼：{inviteCode}
						</span>
						<button
							type="button"
							class="join-secondary-button inline-flex items-center gap-2 rounded-xl border
								border-border-strong bg-bg-page px-4 py-2.5 font-semibold text-text-primary
								transition-all duration-200 hover:-translate-y-0.5 hover:border-gold
								focus-visible:ring-2 focus-visible:ring-indigo-accent focus-visible:ring-offset-2
								focus-visible:ring-offset-bg-page focus-visible:outline-none"
							onclick={() => onCopyInviteCode()}
						>
							<Clipboard class="h-4 w-4" aria-hidden="true" />
							複製邀請碼
						</button>
					{/if}
				</div>
			{/if}

			{#if step.note}
				<div
					class="join-note mt-5 rounded-2xl border border-border bg-bg-page p-4 text-text-secondary"
				>
					<p class="join-note-title font-semibold text-text-primary">{step.note.title}</p>
					{#if step.note.ordered}
						<ol class="join-note-list mt-3 list-decimal space-y-2 pl-5">
							{#each step.note.items as item (item)}
								<li>{item}</li>
							{/each}
						</ol>
					{:else}
						<ul class="join-note-list mt-3 list-disc space-y-2 pl-5">
							{#each step.note.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
		</div>

		<label
			class="join-check inline-flex w-fit items-center gap-3 rounded-2xl border border-border
				bg-bg-page px-4 py-3 font-semibold text-text-primary transition-all duration-200
				has-checked:border-gold has-checked:bg-gold-tint has-disabled:cursor-not-allowed
				has-disabled:text-text-muted"
		>
			<input
				type="checkbox"
				class="join-checkbox h-5 w-5 accent-indigo disabled:cursor-not-allowed"
				checked={step.completed}
				disabled={!step.enabled}
				onchange={(event) => onStepChange(index, event.currentTarget.checked)}
			/>
			<span>{step.completed ? '已完成' : '勾選完成'}</span>
			{#if step.completed}
				<Check class="h-4 w-4 text-gold-text" aria-hidden="true" />
			{/if}
		</label>
	</div>
</article>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
