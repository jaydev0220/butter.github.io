<script lang="ts">
	import { beyondFinancePillars } from '$lib/data/beyond-finance';
	import Card from '$lib/components/ui/Card.svelte';
</script>

<section id="beyond-finance" class="bg-bg-page py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">金融之外</h2>
			<p class="mx-auto max-w-2xl text-text-secondary">
				除了金融領域外，我亦具備多元的專業能力，擅長將複雜的專業價值有效呈現。
			</p>
		</div>

		<!-- Capability Cards -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each beyondFinancePillars as pillar (pillar.title)}
				<Card hover class="text-center">
					<div class="mb-4 text-5xl">{pillar.icon}</div>
					<h3 class="mb-2 text-xl font-bold text-text-primary">{pillar.title}</h3>
					<p class="text-text-secondary">{pillar.description}</p>
				</Card>
			{/each}
		</div>
	</div>
</section>
