<script lang="ts">
	import { tick } from 'svelte';
	import { Check, ChevronDown, Clipboard, ExternalLink } from '@lucide/svelte';
	import { scrollToSection } from '$lib/utils/scroll';

	const INVITE_CODE = '8TER';

	type JoinStep = {
		id: string;
		title: string;
		description: string;
		completed: boolean;
		enabled: boolean;
		action?: {
			label: string;
			href: string;
		};
		note?: {
			title: string;
			items: string[];
			ordered?: boolean;
		};
	};

	type Resource = {
		label: string;
		title: string;
		description: string;
		buttonLabel: string;
		href: string;
	};

	type Faq = {
		id: string;
		question: string;
		answer: string;
		action?: {
			label: string;
			href: string;
		};
	};

	let steps = $state<JoinStep[]>([
		{
			id: 'register',
			title: '註冊新的 Bybit 帳戶',
			description: '請使用指定邀請連結註冊新的 Bybit 帳戶，並確認註冊時綁定邀請碼。',
			completed: false,
			enabled: true,
			action: {
				label: '開啟註冊連結',
				href: '<affiliate_link>'
			},
			note: {
				title: '注意事項',
				items: [
					`請確認註冊時綁定邀請碼：${INVITE_CODE}。`,
					'建議使用尚未註冊過 Bybit 的 Email 或手機號碼。',
					'若您已經有 Bybit 帳戶，請先確認是否需要進行身分轉移。'
				]
			}
		},
		{
			id: 'kyc',
			title: '完成 KYC 與入金',
			description: '註冊完成後，請在 Bybit 帳戶內完成必要的資格與安全設定。',
			completed: false,
			enabled: false,
			note: {
				title: '需完成項目',
				ordered: true,
				items: ['KYC 身分驗證', '帳戶安全設定', '入金流程']
			}
		},
		{
			id: 'uid',
			title: '查詢您的 Bybit UID',
			description:
				'完成註冊、KYC 與入金後，請登入 Bybit 查詢您的 UID。請確認 UID 正確，避免影響資格審核。',
			completed: false,
			enabled: false,
			note: {
				title: 'UID 查詢方式',
				ordered: true,
				items: ['登入 Bybit 帳戶', '進入個人帳戶頁面', '找到 UID / User ID', '複製完整 UID']
			}
		},
		{
			id: 'discord',
			title: '加入 Discord 並留言 UID',
			description:
				'加入 Discord 後，到指定 UID 專區完成留言驗證。若填錯或留言錯 UID，請在 Discord UID 專區重新留言並註明。',
			completed: false,
			enabled: false,
			action: {
				label: '加入 Discord',
				href: '<discord_link>'
			}
		}
	]);

	const resources: Resource[] = [
		{
			label: 'Community',
			title: '笨錢社群 LINE 群',
			description: '用於接收社群通知與補充交流資訊。',
			buttonLabel: '加入 LINE 群',
			href: '<line_link>'
		},
		{
			label: 'Course',
			title: '實體課程報名',
			description: '查看可報名的實體課程與相關活動。',
			buttonLabel: '查看報名連結',
			href: '<course_link>'
		},
		{
			label: 'Video',
			title: '線上課程影片',
			description: '課程影片皆為免費且公開，可先開始學習。',
			buttonLabel: '觀看課程影片',
			href: '<tut_video_link>'
		}
	];

	const faqs: Faq[] = [
		{
			id: 'existing-account',
			question: '我已經有 Bybit 帳戶，還可以加入嗎？',
			answer:
				'可以，但請先確認原帳戶是否已綁定其他邀請人。若需要轉移身分，請參考身分轉移教學影片。',
			action: {
				label: '觀看身分轉移教學',
				href: '<transfer_video_link>'
			}
		},
		{
			id: 'wrong-uid',
			question: '我填錯或留言錯 UID 怎麼辦？',
			answer: '請在 Discord UID 專區重新留言並註明。建議重新複製完整 UID，避免缺漏或多輸入空格。'
		},
		{
			id: 'kyc-deposit',
			question: '沒有完成 KYC 或入金可以加入嗎？',
			answer:
				'課程影片皆為免費且公開。若您想與其他學員交流討論，您必須完成 KYC 與入金才能加入社群。'
		}
	];

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
			await navigator.clipboard.writeText(INVITE_CODE);
			showToast(`已複製：${INVITE_CODE}`);
		} catch {
			showToast('複製失敗，請手動複製');
		}
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Source plan requires placeholder href values until real external URLs are supplied. -->
<main
	class="join-page min-h-screen bg-bg-page px-5 py-24 text-text-primary sm:px-6 lg:px-8"
	data-route="/join"
>
	<div class="join-page-inner mx-auto max-w-6xl">
		<header
			class="join-page-header rounded-3xl border border-border bg-linear-to-br from-bg-surface
				to-gold-tint p-6 shadow-sm sm:p-8 lg:p-10"
		>
			<div
				class="join-page-header-grid grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"
			>
				<div class="join-page-header-copy">
					<p
						class="join-eyebrow mb-3 text-sm font-semibold tracking-[0.2em] text-gold-text uppercase"
					>
						Start Learning
					</p>
					<h1 class="join-title font-display text-4xl font-bold text-indigo-darkest sm:text-5xl">
						成為學員
					</h1>
					<p class="join-intro mt-5 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
						歡迎加入笨錢社群。請依照以下步驟完成註冊與驗證。完成後即可開始使用社群、課程與相關學習資源。
					</p>
				</div>

				<div
					class="join-progress-card rounded-2xl border border-border bg-bg-page p-5"
					aria-label="加入流程完成進度"
				>
					<div
						class="join-progress-summary flex items-end justify-between gap-4"
						aria-live="polite"
					>
						<p class="join-progress-count text-lg font-semibold text-indigo-darkest">
							{completedSteps} / {totalSteps} 完成
						</p>
						<p class="join-progress-percent text-3xl font-bold text-gold-text">
							{progressPercent}%
						</p>
					</div>
					<div
						class="join-progress-track mt-5 h-3 overflow-hidden rounded-full border border-border bg-bg-surface"
						role="progressbar"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow={progressPercent}
						aria-label="加入流程完成百分比"
					>
						<div
							class="join-progress-fill h-full rounded-full bg-indigo transition-all duration-300"
							style:width={`${progressPercent}%`}
						></div>
					</div>
				</div>
			</div>
		</header>

		<section class="join-section mt-14" aria-labelledby="join-steps-heading">
			<div
				class="join-section-heading mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
			>
				<div>
					<h2 id="join-steps-heading" class="join-section-title font-display text-3xl font-bold">
						加入流程
					</h2>
					<p class="join-section-copy mt-2 text-text-secondary">
						請按照順序完成。後續步驟會在前一步勾選後解鎖。
					</p>
				</div>
				<p
					class="join-section-note rounded-full border border-border bg-bg-surface px-4 py-2 text-sm text-text-muted"
				>
					依序解鎖
				</p>
			</div>

			<div class="join-steps-list grid gap-4">
				{#each steps as step, index (step.id)}
					<article
						id={`join-step-${step.id}`}
						class="join-card scroll-mt-24 rounded-3xl border border-border bg-bg-surface p-5 shadow-sm
							transition-all duration-200 sm:p-6
							{step.enabled ? 'opacity-100' : 'opacity-60'}"
						aria-labelledby={`join-step-title-${step.id}`}
					>
						<div
							class="join-card-grid grid gap-5 lg:grid-cols-[4.5rem_minmax(0,1fr)_9rem] lg:items-start"
						>
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
												邀請碼：{INVITE_CODE}
											</span>
											<button
												type="button"
												class="join-secondary-button inline-flex items-center gap-2 rounded-xl border
													border-border-strong bg-bg-page px-4 py-2.5 font-semibold text-text-primary
													transition-all duration-200 hover:-translate-y-0.5 hover:border-gold
													focus-visible:ring-2 focus-visible:ring-indigo-accent focus-visible:ring-offset-2
													focus-visible:ring-offset-bg-page focus-visible:outline-none"
												onclick={copyInviteCode}
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
									onchange={(event) => void handleStepChange(index, event.currentTarget.checked)}
								/>
								<span>{step.completed ? '已完成' : '勾選完成'}</span>
								{#if step.completed}
									<Check class="h-4 w-4 text-gold-text" aria-hidden="true" />
								{/if}
							</label>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section
			id="join-resources-section"
			class="join-section join-resources mt-14 scroll-mt-24 rounded-3xl border border-border bg-bg-surface
				p-5 shadow-sm sm:p-6 lg:p-8"
			aria-labelledby="join-resources-heading"
		>
			<div class="join-section-heading mb-6">
				<h2 id="join-resources-heading" class="join-section-title font-display text-3xl font-bold">
					其他資源
				</h2>
				<p class="join-section-copy mt-2 text-text-secondary">
					完成加入流程後，可繼續使用以下公開學習資源。
				</p>
			</div>

			<div class="join-resource-grid grid gap-4 lg:grid-cols-3">
				{#each resources as resource (resource.href)}
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
				{/each}
			</div>
		</section>

		<section class="join-section join-faq mt-14" aria-labelledby="join-faq-heading">
			<div class="join-section-heading mb-6">
				<h2 id="join-faq-heading" class="join-section-title font-display text-3xl font-bold">
					常見問題
				</h2>
				<p class="join-section-copy mt-2 text-text-secondary">
					加入資格、UID 留言與 KYC / 入金狀態，是最常造成審核延遲的項目。
				</p>
			</div>

			<div class="join-faq-list grid gap-3">
				{#each faqs as faq (faq.id)}
					<article
						class="join-faq-item overflow-hidden rounded-2xl border border-border bg-bg-surface"
					>
						<button
							type="button"
							class="join-faq-button flex w-full items-center justify-between gap-4 px-5 py-4 text-left
								font-semibold text-text-primary transition-colors duration-200 hover:bg-gold-tint
								focus-visible:ring-2 focus-visible:ring-indigo-accent focus-visible:ring-offset-2
								focus-visible:ring-offset-bg-page focus-visible:outline-none sm:px-6"
							aria-expanded={openFaqIds.includes(faq.id)}
							aria-controls={`join-faq-panel-${faq.id}`}
							id={`join-faq-button-${faq.id}`}
							onclick={() => toggleFaq(faq.id)}
						>
							<span>{faq.question}</span>
							<ChevronDown
								class="h-5 w-5 shrink-0 text-gold-text transition-transform duration-200
									{openFaqIds.includes(faq.id) ? 'rotate-180' : ''}"
								aria-hidden="true"
							/>
						</button>

						{#if openFaqIds.includes(faq.id)}
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
				{/each}
			</div>
		</section>
	</div>

	<div
		class="join-toast pointer-events-none fixed right-5 bottom-5 z-50 rounded-2xl bg-indigo-darkest px-5 py-3
			font-semibold text-bg-page shadow-lg transition-opacity duration-200
			{toastMessage ? 'opacity-100' : 'opacity-0'}"
		aria-live="polite"
		aria-atomic="true"
	>
		{toastMessage}
	</div>
</main>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
