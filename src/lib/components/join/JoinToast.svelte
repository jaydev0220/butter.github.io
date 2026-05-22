<script lang="ts">
	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div
	class="join-toast pointer-events-none fixed right-5 bottom-5 z-50 rounded-2xl bg-indigo-darkest px-5 py-3
		font-semibold text-bg-page shadow-lg transition-opacity duration-200
		{message ? 'opacity-100' : 'opacity-0'}"
	aria-live="polite"
	aria-atomic="true"
>
	{message}
</div>
