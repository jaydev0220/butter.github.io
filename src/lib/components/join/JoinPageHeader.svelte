<script lang="ts">
	interface Props {
		completedSteps: number;
		totalSteps: number;
		progressPercent: number;
	}

	let { completedSteps, totalSteps, progressPercent }: Props = $props();
</script>

<header
	class="rounded-3xl border border-border bg-linear-to-br from-bg-surface
		to-gold-tint p-6 shadow-sm sm:p-8 lg:p-10"
>
	<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
		<div>
			<p class="mb-3 text-sm font-semibold tracking-[0.2em] text-gold-text uppercase">
				Start Learning
			</p>
			<h1 class="font-display text-4xl font-bold text-indigo-darkest sm:text-5xl">成為學員</h1>
			<p class="mt-5 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
				歡迎加入笨錢社群。請依照以下步驟完成註冊與驗證。完成後即可開始使用社群、課程與相關學習資源。
			</p>
		</div>

		<div class="rounded-2xl border border-border bg-bg-page p-5" aria-label="加入流程完成進度">
			<div class="flex items-end justify-between gap-4" aria-live="polite">
				<p class="text-lg font-semibold text-indigo-darkest">
					{completedSteps} / {totalSteps} 完成
				</p>
				<p class="text-3xl font-bold text-gold-text">{progressPercent}%</p>
			</div>
			<div
				class="mt-5 h-3 overflow-hidden rounded-full border border-border bg-bg-surface"
				role="progressbar"
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={progressPercent}
				aria-label="加入流程完成百分比"
			>
				<div
					class="h-full rounded-full bg-indigo transition-all duration-300"
					style:width={`${progressPercent}%`}
				></div>
			</div>
		</div>
	</div>
</header>
