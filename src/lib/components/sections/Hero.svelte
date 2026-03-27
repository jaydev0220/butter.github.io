<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let currentRoleIndex = $state(0);
	const roles = ['金融交易講師', '教育創作者', '創作歌手'];
	let hasAnimated = $state(false);

	onMount(() => {
		hasAnimated = true;

		const interval = setInterval(() => {
			currentRoleIndex = (currentRoleIndex + 1) % roles.length;
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<section id="hero" class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<!-- Background Gradient (Placeholder) -->
	<div
		class="absolute inset-0 z-0 bg-linear-to-br from-indigo-darkest via-indigo-deep to-gold-deep"
	></div>
	<div class="absolute inset-0 z-0 bg-black/30"></div>

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center text-white select-none">
		<!-- Pre-title Badge -->
		<div class="mb-6" class:animate-fade-in={hasAnimated}>
			<Badge variant="gold">金融教育 × 創作音樂</Badge>
		</div>

		<!-- Headline -->
		<h1
			class="mb-4 font-display text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
			class:animate-fade-in-delay-1={hasAnimated}
		>
			我是 Butter 巴特
		</h1>

		<!-- Typewriter Sub-headline -->
		<div class="mb-3 h-12 sm:h-14" class:animate-fade-in-delay-2={hasAnimated}>
			<div class="relative flex items-center justify-center">
				{#key currentRoleIndex}
					<p
						in:fly={{ y: 20, duration: 400, delay: 100 }}
						out:fly={{ y: -20, duration: 400 }}
						class="absolute top-0 font-sans text-lg whitespace-nowrap text-white/90 sm:text-2xl md:text-3xl"
					>
						{roles[currentRoleIndex]}
					</p>
				{/key}
			</div>
		</div>

		<!-- Tagline -->
		<p class="mb-8 text-white/70 sm:text-xl" class:animate-fade-in-delay-3={hasAnimated}>
			交易是邏輯，音樂是靈魂
		</p>

		<!-- CTAs -->
		<div
			class="flex flex-col justify-center gap-4 sm:flex-row"
			class:animate-fade-in-delay-4={hasAnimated}
		>
			<Button variant="primary" href="#impact-stats">探索課程</Button>
			<Button
				variant="secondary"
				href="#music"
				class="border-white/50 text-white hover:bg-white/10"
			>
				聽聽音樂
			</Button>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
		<svg class="h-6 w-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.8s ease-out;
	}
	.animate-fade-in-delay-1 {
		animation: fade-in 0.8s ease-out 0.2s both;
	}
	.animate-fade-in-delay-2 {
		animation: fade-in 0.8s ease-out 0.4s both;
	}
	.animate-fade-in-delay-3 {
		animation: fade-in 0.8s ease-out 0.6s both;
	}
	.animate-fade-in-delay-4 {
		animation: fade-in 0.8s ease-out 0.8s both;
	}
</style>
