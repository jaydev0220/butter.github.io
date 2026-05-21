<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { stats } from '$lib/data/stats';
	import StatCard from '$lib/components/ui/StatCard.svelte';
	import { staggerDelay } from '$lib/utils/animation';
	import type { CourseImage } from '$lib/types';

	interface Props {
		courseImages?: CourseImage[];
	}

	let { courseImages = [] }: Props = $props();
	let activeSlideIndex = $state(0);
	let sliderTrack: HTMLDivElement | undefined = $state();

	const hasMultipleSlides = $derived(courseImages.length > 1);

	function getScrollBehavior(): ScrollBehavior {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
	}

	function goToSlide(index: number): void {
		if (courseImages.length === 0) return;

		const nextIndex = (index + courseImages.length) % courseImages.length;
		activeSlideIndex = nextIndex;
		sliderTrack?.children
			.item(nextIndex)
			?.scrollIntoView({ behavior: getScrollBehavior(), block: 'nearest', inline: 'center' });
	}

	function updateActiveSlide(): void {
		if (!sliderTrack) return;

		const trackRect = sliderTrack.getBoundingClientRect();
		const trackCenter = trackRect.left + trackRect.width / 2;
		let closestIndex = activeSlideIndex;
		let closestDistance = Number.POSITIVE_INFINITY;

		Array.from(sliderTrack.children).forEach((slide, index) => {
			const slideRect = slide.getBoundingClientRect();
			const slideCenter = slideRect.left + slideRect.width / 2;
			const distance = Math.abs(trackCenter - slideCenter);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		activeSlideIndex = closestIndex;
	}
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
				<div class="mb-6 flex items-end justify-between gap-4">
					<div>
						<p class="mb-2 text-sm font-medium text-indigo">課程現場</p>
						<h3 class="font-display text-2xl font-bold text-text-primary md:text-3xl">
							課程與講座剪影
						</h3>
					</div>

					{#if hasMultipleSlides}
						<div class="flex gap-2">
							<button
								type="button"
								class="flex h-10 w-10 items-center justify-center rounded-full border border-border
									bg-bg-surface text-indigo-deep transition-all hover:-translate-y-0.5 hover:border-indigo
									hover:text-indigo focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
								onclick={() => goToSlide(activeSlideIndex - 1)}
								aria-label="上一張課程照片"
							>
								<ChevronLeft class="h-5 w-5" />
							</button>
							<button
								type="button"
								class="flex h-10 w-10 items-center justify-center rounded-full border border-border
									bg-bg-surface text-indigo-deep transition-all hover:-translate-y-0.5 hover:border-indigo
									hover:text-indigo focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
								onclick={() => goToSlide(activeSlideIndex + 1)}
								aria-label="下一張課程照片"
							>
								<ChevronRight class="h-5 w-5" />
							</button>
						</div>
					{/if}
				</div>

				<div
					bind:this={sliderTrack}
					class="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto scroll-smooth
						pb-4 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
					onscroll={updateActiveSlide}
					aria-label="課程照片輪播"
				>
					{#each courseImages as image, index (image.src)}
						<figure
							class="min-w-full snap-center overflow-hidden rounded-3xl border border-border bg-bg-surface
								shadow-sm md:min-w-[72%] lg:min-w-[60%]"
						>
							<img
								src={image.src}
								alt={image.alt}
								class="aspect-[16/10] w-full bg-bg-surface object-contain"
								loading={index === 0 ? 'eager' : 'lazy'}
								decoding="async"
							/>
						</figure>
					{/each}
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
