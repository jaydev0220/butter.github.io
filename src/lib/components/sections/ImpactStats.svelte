<script lang="ts">
	import { stats } from '$lib/data/stats';
	import StatCard from '$lib/components/ui/StatCard.svelte';
	import { staggerDelay } from '$lib/utils/animation';
</script>

<section id="impact-stats" class="bg-bg-page py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
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
	</div>
</section>
