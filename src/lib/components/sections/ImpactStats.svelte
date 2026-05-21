<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { stats } from '$lib/data/stats';
	import StatCard from '$lib/components/ui/StatCard.svelte';
	import { staggerDelay } from '$lib/utils/animation';
	import type { CourseImage } from '$lib/types';

	interface Props {
		courseImages?: CourseImage[];
	}

	let { courseImages = [] }: Props = $props();
	let activeSlideIndex = $state(0);

	const hasMultipleSlides = $derived(courseImages.length > 1);

	function goToSlide(index: number): void {
		if (courseImages.length === 0) return;

		activeSlideIndex = (index + courseImages.length) % courseImages.length;
	}

	onMount(() => {
		if (!hasMultipleSlides || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const autoplayTimer = window.setInterval(() => {
			goToSlide(activeSlideIndex + 1);
		}, 5000);

		return () => window.clearInterval(autoplayTimer);
	});
</script>

<section id="impact-stats" class="bg-bg-page py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-6">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">教學成果</h2>
			<p class="mx-auto max-w-2xl text-text-secondary">
				自 2024
				年投入金融教育領域以來，我致力於將複雜的市場結構與交易邏輯，轉化為一般人也能理解並實際應用的系統化知識。
			</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
			{#each stats as stat, index (stat.metric)}
				<StatCard {stat} delay={staggerDelay(index, 200)} />
			{/each}
		</div>

		{#if courseImages.length > 0}
			<div class="mt-16">
				<div
					class="relative left-1/2 h-60 w-screen -translate-x-1/2 overflow-hidden border-y
						border-border bg-bg-surface shadow-sm sm:h-75 md:h-90 lg:h-100"
				>
					<div
						class="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
						style:transform={`translateX(-${activeSlideIndex * 100}%)`}
						aria-label="課程照片輪播"
					>
						{#each courseImages as image, index (image.src)}
							<figure class="flex h-full min-w-full justify-center">
								<img
									src={image.src}
									alt={image.alt}
									class="h-full w-auto max-w-none"
									loading={index === 0 ? 'eager' : 'lazy'}
									decoding="async"
								/>
							</figure>
						{/each}
					</div>

					{#if hasMultipleSlides}
						<button
							type="button"
							class="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center
								justify-center rounded-full border border-white/70 bg-bg-surface/90 text-indigo-deep
								shadow-sm transition-all hover:-translate-x-0.5 hover:bg-white hover:text-indigo
								focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo md:left-4 md:h-12 md:w-12"
							onclick={() => goToSlide(activeSlideIndex - 1)}
							aria-label="上一張課程照片"
						>
							<ChevronLeft class="h-5 w-5" />
						</button>
						<button
							type="button"
							class="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center
								justify-center rounded-full border border-white/70 bg-bg-surface/90 text-indigo-deep
								shadow-sm transition-all hover:translate-x-0.5 hover:bg-white hover:text-indigo
								focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo md:right-4 md:h-12 md:w-12"
							onclick={() => goToSlide(activeSlideIndex + 1)}
							aria-label="下一張課程照片"
						>
							<ChevronRight class="h-5 w-5" />
						</button>
					{/if}
				</div>

				{#if hasMultipleSlides}
					<div class="mt-2 flex justify-center gap-2">
						{#each courseImages as image, index (image.src)}
							<button
								type="button"
								class={`h-2.5 rounded-full transition-all hover:bg-indigo/70 focus:outline-none
									focus-visible:ring-2 focus-visible:ring-indigo ${
										activeSlideIndex === index ? 'w-8 bg-indigo' : 'w-2.5 bg-border'
									}`}
								onclick={() => goToSlide(index)}
								aria-label={`查看第 ${index + 1} 張課程照片`}
								aria-current={activeSlideIndex === index ? 'true' : undefined}
							></button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
