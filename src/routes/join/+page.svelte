<script lang="ts">
	import { tick } from 'svelte';
	import JoinFaqItem from '$lib/components/join/JoinFaqItem.svelte';
	import JoinPageHeader from '$lib/components/join/JoinPageHeader.svelte';
	import JoinResourceCard from '$lib/components/join/JoinResourceCard.svelte';
	import JoinStepCard from '$lib/components/join/JoinStepCard.svelte';
	import JoinToast from '$lib/components/join/JoinToast.svelte';
	import { JOIN_INVITE_CODE, joinFaqs, joinResources, joinSteps } from '$lib/data/join';
	import type { JoinStepState } from '$lib/types';
	import { scrollToSection } from '$lib/utils/scroll';

	let steps = $state<JoinStepState[]>(
		joinSteps.map((step, index) => ({
			...step,
			completed: false,
			enabled: index === 0
		}))
	);
	let openFaqIds = $state<string[]>([]);
	let toastMessage = $state('');
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	const totalSteps = $derived(steps.length);
	const completedSteps = $derived(steps.filter((step) => step.completed).length);
	const progressPercent = $derived(Math.round((completedSteps / totalSteps) * 100));

	function syncStepLocks(): void {
		for (let index = 0; index < steps.length; index += 1) {
			const enabled = index === 0 || steps[index - 1].completed;
			steps[index].enabled = enabled;

			if (!enabled) {
				steps[index].completed = false;
			}
		}
	}

	async function handleStepChange(stepIndex: number, checked: boolean): Promise<void> {
		steps[stepIndex].completed = checked;
		syncStepLocks();

		if (!checked) return;

		await tick();
		const targetId =
			stepIndex === steps.length - 1
				? 'join-resources-section'
				: `join-step-${steps[stepIndex + 1].id}`;
		scrollToSection(targetId);
	}

	function toggleFaq(faqId: string): void {
		openFaqIds = openFaqIds.includes(faqId)
			? openFaqIds.filter((openId) => openId !== faqId)
			: [...openFaqIds, faqId];
	}

	function showToast(message: string): void {
		toastMessage = message;
		if (toastTimer) {
			clearTimeout(toastTimer);
		}
		toastTimer = setTimeout(() => {
			toastMessage = '';
		}, 2800);
	}

	async function copyInviteCode(): Promise<void> {
		try {
			await navigator.clipboard.writeText(JOIN_INVITE_CODE);
			showToast(`已複製：${JOIN_INVITE_CODE}`);
		} catch {
			showToast('複製失敗，請手動複製');
		}
	}
</script>

<main
	class="min-h-screen bg-bg-page px-5 py-24 text-text-primary sm:px-6 lg:px-8"
	data-route="/join"
>
	<div class="mx-auto max-w-6xl">
		<JoinPageHeader {completedSteps} {totalSteps} {progressPercent} />

		<section class="mt-14" aria-labelledby="join-steps-heading">
			<h2 id="join-steps-heading" class="mb-6 font-display text-3xl font-bold">加入流程</h2>

			<div class="grid gap-4">
				{#each steps as step, index (step.id)}
					<JoinStepCard
						{step}
						{index}
						inviteCode={JOIN_INVITE_CODE}
						onStepChange={handleStepChange}
						onCopyInviteCode={copyInviteCode}
					/>
				{/each}
			</div>
		</section>

		<section
			id="join-resources-section"
			class="mt-14 scroll-mt-24 rounded-3xl border border-border bg-bg-surface
				p-5 shadow-sm sm:p-6 lg:p-8"
			aria-labelledby="join-resources-heading"
		>
			<h2 id="join-resources-heading" class="mb-6 font-display text-3xl font-bold">其他資源</h2>

			<div class="grid gap-4 lg:grid-cols-3">
				{#each joinResources as resource (resource.href)}
					<JoinResourceCard {resource} />
				{/each}
			</div>
		</section>

		<section class="mt-14" aria-labelledby="join-faq-heading">
			<h2 id="join-faq-heading" class="mb-6 font-display text-3xl font-bold">常見問題</h2>

			<div class="grid gap-3">
				{#each joinFaqs as faq (faq.id)}
					<JoinFaqItem {faq} open={openFaqIds.includes(faq.id)} onToggle={toggleFaq} />
				{/each}
			</div>
		</section>
	</div>

	<JoinToast message={toastMessage} />
</main>
