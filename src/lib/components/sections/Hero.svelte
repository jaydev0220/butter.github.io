<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ChevronDown } from 'lucide-svelte';
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

<section id="hero" class="relative min-h-screen overflow-hidden bg-portrait-bg">
	<!-- Mobile: Vertical stacked layout -->
	<div class="flex min-h-screen flex-col md:hidden">
		<!-- Portrait Header (Mobile) -->
		<div class="relative shrink-0 pt-16">
			<img
				src="/images/butter.webp"
				alt=""
				aria-hidden="true"
				class="mx-auto w-full max-w-xs object-contain"
				loading="eager"
				fetchpriority="high"
			/>
			<!-- Bottom fade into content area -->
			<div
				class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-portrait-bg to-transparent"
			></div>
		</div>

		<!-- Content (Mobile) -->
		<div class="relative z-10 flex flex-1 flex-col justify-center px-6 pb-20 text-center">
			<!-- Pre-title Badge -->
			<div class="mb-4" class:animate-fade-in={hasAnimated}>
				<Badge variant="gold">金融教育 × 創作音樂</Badge>
			</div>

			<!-- Headline -->
			<h1
				class="mb-3 font-display text-3xl font-bold text-indigo-darkest sm:text-4xl"
				class:animate-fade-in-delay-1={hasAnimated}
			>
				我是 Butter 巴特
			</h1>

			<!-- Typewriter Sub-headline -->
			<div class="mb-2 h-10" class:animate-fade-in-delay-2={hasAnimated}>
				<div class="relative flex items-center justify-center">
					{#key currentRoleIndex}
						<p
							in:fly={{ y: 20, duration: 400, delay: 100 }}
							out:fly={{ y: -20, duration: 400 }}
							class="absolute top-0 font-sans text-lg whitespace-nowrap text-indigo-deep sm:text-xl"
						>
							{roles[currentRoleIndex]}
						</p>
					{/key}
				</div>
			</div>

			<!-- Tagline -->
			<p class="mb-6 text-indigo-darkest/80 sm:text-lg" class:animate-fade-in-delay-3={hasAnimated}>
				交易是邏輯，音樂是靈魂
			</p>

			<!-- CTAs -->
			<div
				class="flex flex-col justify-center gap-3 sm:flex-row"
				class:animate-fade-in-delay-4={hasAnimated}
			>
				<Button variant="primary" href="#impact-stats">探索課程</Button>
				<Button variant="secondary" href="#music">聽聽音樂</Button>
			</div>
		</div>

		<!-- Scroll Indicator (Mobile) -->
		<div class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce" aria-hidden="true">
			<ChevronDown class="h-5 w-5 text-indigo-darkest/50" />
		</div>
	</div>

	<!-- Tablet/Desktop: Asymmetric layout with portrait on right -->
	<div class="hidden min-h-screen items-center md:flex">
		<!-- Portrait Background (Tablet/Desktop) -->
		<div class="absolute top-1/2 right-[-5%] z-0 h-full max-h-screen -translate-y-1/2 lg:right-0">
			<img
				src="/images/butter.webp"
				alt=""
				aria-hidden="true"
				class="portrait-image h-full w-auto object-contain"
				loading="eager"
				fetchpriority="high"
			/>
		</div>

		<!-- Content (Tablet/Desktop) -->
		<div class="relative z-10 mx-auto w-full max-w-7xl px-6 md:pl-12 lg:pl-20">
			<div class="max-w-lg text-left lg:max-w-xl">
				<!-- Pre-title Badge -->
				<div class="mb-6" class:animate-fade-in={hasAnimated}>
					<Badge variant="gold">金融教育 × 創作音樂</Badge>
				</div>

				<!-- Headline -->
				<h1
					class="mb-4 font-display text-5xl font-bold text-indigo-darkest lg:text-6xl xl:text-7xl"
					class:animate-fade-in-delay-1={hasAnimated}
				>
					我是 Butter 巴特
				</h1>

				<!-- Typewriter Sub-headline -->
				<div class="mb-3 h-14" class:animate-fade-in-delay-2={hasAnimated}>
					<div class="relative flex items-center">
						{#key currentRoleIndex}
							<p
								in:fly={{ y: 20, duration: 400, delay: 100 }}
								out:fly={{ y: -20, duration: 400 }}
								class="absolute top-0 font-sans text-2xl whitespace-nowrap text-indigo-deep lg:text-3xl"
							>
								{roles[currentRoleIndex]}
							</p>
						{/key}
					</div>
				</div>

				<!-- Tagline -->
				<p
					class="mb-8 text-lg text-indigo-darkest/80 lg:text-xl"
					class:animate-fade-in-delay-3={hasAnimated}
				>
					交易是邏輯，音樂是靈魂
				</p>

				<!-- CTAs -->
				<div class="flex gap-4" class:animate-fade-in-delay-4={hasAnimated}>
					<Button variant="primary" href="#impact-stats">探索課程</Button>
					<Button variant="secondary" href="#music">聽聽音樂</Button>
				</div>
			</div>
		</div>

		<!-- Scroll Indicator (Tablet/Desktop) -->
		<div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce" aria-hidden="true">
			<ChevronDown class="h-6 w-6 text-indigo-darkest/50" />
		</div>
	</div>
</section>

<style>
	/* Mask gradient for portrait - Tailwind doesn't have mask utilities */
	.portrait-image {
		mask-image: linear-gradient(to left, black 40%, transparent 95%);
		-webkit-mask-image: linear-gradient(to left, black 40%, transparent 95%);
	}

	@media (min-width: 1024px) {
		.portrait-image {
			mask-image: linear-gradient(to left, black 50%, transparent 90%);
			-webkit-mask-image: linear-gradient(to left, black 50%, transparent 90%);
		}
	}
</style>
