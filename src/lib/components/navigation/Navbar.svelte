<script lang="ts">
	import { onMount } from 'svelte';
	import { navItems } from '$lib/data/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollToSection } from '$lib/utils/scroll';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	function handleScroll(): void {
		isScrolled = window.scrollY > 100;
	}

	function handleNavClick(href: string, event: MouseEvent): void {
		event.preventDefault();
		const sectionId = href.replace('#', '');
		scrollToSection(sectionId);
		isMobileMenuOpen = false;
	}

	function toggleMobileMenu(): void {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- Anchor links handled manually -->
<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300
		{isScrolled
		? 'border-b border-border bg-bg-surface/95 shadow-sm backdrop-blur-md'
		: 'bg-transparent'}"
	aria-label="Main navigation"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<!-- Logo / Brand -->
		<a
			href="#hero"
			class="font-display text-xl font-bold select-none
						{isScrolled ? 'text-text-primary' : 'text-white'}"
			onclick={(e) => handleNavClick('#hero', e)}
		>
			Butter 巴特
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden items-center gap-8 md:flex">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					onclick={(e) => handleNavClick(item.href, e)}
					class="transition-colors duration-200
						{isScrolled ? 'text-text-secondary hover:text-gold' : 'text-white/80 hover:text-white'}"
				>
					{item.label}
				</a>
			{/each}

			<Button variant="primary" href="https://www.youtube.com/@Dump.Money.Earns.More.">
				開始學習
			</Button>
		</div>

		<!-- Mobile Menu Button -->
		<button
			type="button"
			class="p-2 md:hidden {isScrolled ? 'text-text-primary' : 'text-white'}"
			onclick={toggleMobileMenu}
			aria-label={isMobileMenuOpen ? '關閉選單' : '開啟選單'}
			aria-expanded={isMobileMenuOpen}
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if isMobileMenuOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile Menu Drawer -->
	{#if isMobileMenuOpen}
		<div class="animate-slide-down border-t border-border bg-bg-surface px-6 py-4 md:hidden">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					onclick={(e) => handleNavClick(item.href, e)}
					class="block py-3 text-text-secondary transition-colors hover:text-gold"
				>
					{item.label}
				</a>
			{/each}
			<div class="mt-4">
				<Button variant="primary" href="https://www.youtube.com/@Dump.Money.Earns.More.">
					開始學習
				</Button>
			</div>
		</div>
	{/if}
</nav>

<!-- eslint-enable svelte/no-navigation-without-resolve -->

<style>
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-down {
		animation: slide-down 0.2s ease-out;
	}
</style>
