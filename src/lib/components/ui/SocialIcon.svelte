<script lang="ts">
	import { siYoutube, siInstagram, siSpotify, siThreads } from 'simple-icons';

	interface Props {
		platform: string;
		class?: string;
	}

	let { platform, class: className = 'h-5 w-5' }: Props = $props();

	const iconMap: Record<string, { path: string; title: string }> = {
		youtube: { path: siYoutube.path, title: siYoutube.title },
		instagram: { path: siInstagram.path, title: siInstagram.title },
		spotify: { path: siSpotify.path, title: siSpotify.title },
		threads: { path: siThreads.path, title: siThreads.title }
	};
	const icon = $derived(iconMap[platform]);
</script>

{#if icon}
	<svg class={className} fill="currentColor" viewBox="0 0 24 24" role="img">
		<title>{icon.title}</title>
		<path d={icon.path} />
	</svg>
{/if}
