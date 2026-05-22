<script lang="ts">
	import './layout.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen bg-bg-page font-sans text-text-primary antialiased">
	{@render children()}
</div>
