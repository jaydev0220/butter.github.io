<script lang="ts">
	import { partners } from '$lib/data/collaborations';
</script>

<section id="collaborations" class="bg-bg-surface py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">合作夥伴</h2>
			<p class="mx-auto max-w-2xl text-text-secondary">
				曾受邀與頂尖金融機構合作開設講座，致力於推廣系統化的金融教育。
			</p>
		</div>

		<!-- Partner Logos Grid -->
		<div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
			{#each partners as partner (partner.name)}
				<div
					class="group flex flex-col items-center rounded-xl border border-border bg-bg-page p-8 text-center
						transition-all duration-300 hover:border-gold hover:shadow-lg"
				>
					<img
						src={partner.logoUrl}
						alt="{partner.name} logo"
						class="mb-4 h-16 w-auto transition-all duration-300"
						width="256"
						height="64"
					/>
					<h3 class="mb-1 text-lg font-bold text-text-primary">{partner.name}</h3>
					<p class="text-sm text-text-muted">{partner.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
