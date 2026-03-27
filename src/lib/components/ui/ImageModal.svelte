<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { X } from 'lucide-svelte';

	interface Props {
		isOpen: boolean;
		imageUrl: string;
		imageAlt: string;
		onClose: () => void;
	}

	let { isOpen, imageUrl, imageAlt, onClose }: Props = $props();

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && isOpen) {
			onClose();
		}
	}

	function handleBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={(e) => e.key === 'Enter' && handleBackdropClick(e as unknown as MouseEvent)}
		role="dialog"
		aria-modal="true"
		aria-label={imageAlt}
		tabindex="-1"
	>
		<div
			class="relative max-h-[90vh] max-w-[90vw]"
			transition:scale={{ duration: 200, start: 0.9 }}
		>
			<!-- Close Button -->
			<button
				type="button"
				class="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full
					bg-white/20 text-white transition-colors hover:bg-white/30"
				onclick={onClose}
				aria-label="關閉圖片"
			>
				<X class="h-5 w-5" />
			</button>

			<!-- Image -->
			<img
				src={imageUrl}
				alt={imageAlt}
				class="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
				width="512"
				height="512"
			/>
		</div>
	</div>
{/if}
