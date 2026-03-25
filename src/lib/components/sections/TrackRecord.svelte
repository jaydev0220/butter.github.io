<script lang="ts">
	import { trackRecordEvents } from '$lib/data/timeline';
	import Badge from '$lib/components/ui/Badge.svelte';
</script>

<section id="track-record" class="bg-bg-surface py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">分析師實戰</h2>
			<p class="mx-auto max-w-2xl text-text-secondary">
				於市場關鍵節點成功提前提醒學員調整策略，協助投資者有效管理風險。
			</p>
		</div>

		<!-- Timeline -->
		<div class="relative mx-auto max-w-3xl">
			<!-- Timeline Line -->
			<div
				class="absolute top-0 bottom-0 left-4 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5"
			></div>

			{#each trackRecordEvents as event, index (event.date)}
				<div class="relative mb-12 last:mb-0">
					<!-- Timeline Dot -->
					<div
						class="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-bg-surface
							bg-gold md:left-1/2"
					></div>

					<!-- Content -->
					<div
						class="ml-12 md:ml-0 {index % 2 === 0
							? 'md:mr-[calc(50%+2rem)] md:text-right'
							: 'md:ml-[calc(50%+2rem)]'}"
					>
						<Badge variant="gold" class="mb-2">{event.date}</Badge>
						<h3 class="mb-2 text-lg font-bold text-text-primary">{event.event}</h3>
						<p
							class="flex items-center gap-2 text-text-secondary {index % 2 === 0
								? 'md:justify-end'
								: ''}"
						>
							<span class="inline-block h-2 w-2 rounded-full bg-gain"></span>
							{event.outcome}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
