<script lang="ts">
	import { certifications } from '$lib/data/certifications';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ImageModal from '$lib/components/ui/ImageModal.svelte';

	let selectedImage = $state<{ url: string; alt: string } | null>(null);

	function openCertificationImage(imageUrl: string, fullName: string): void {
		selectedImage = { url: imageUrl, alt: `${fullName} certification` };
	}

	function closeCertificationImage(): void {
		selectedImage = null;
	}
</script>

<section id="certifications" class="bg-bg-page py-20 md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold text-text-primary md:text-4xl">專業認證</h2>
			<p class="mx-auto max-w-2xl text-text-secondary">
				長期專注於市場結構與資金行為（Smart Money Concepts）的研究與教學，並取得多項國際交易認證。
			</p>
		</div>

		<!-- Certification Cards -->
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
			{#each certifications as cert (cert.badge)}
				<div
					class="flex flex-col items-center justify-center rounded-2xl border border-border
						bg-bg-surface p-8 transition-colors hover:border-indigo"
				>
					<img
						src={cert.iconUrl}
						alt="{cert.badge} badge"
						class="mb-4 h-20 w-auto"
						width="200"
						height="80"
					/>
					<p class="mb-2 text-2xl font-bold text-indigo-deep">{cert.fullName}</p>
					<button
						type="button"
						class="cursor-pointer text-sm font-medium text-text-secondary underline decoration-indigo/40 underline-offset-4 transition-colors hover:text-indigo focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-4 focus-visible:ring-offset-bg-surface"
						onclick={() => openCertificationImage(cert.imageUrl, cert.fullName)}
						aria-label="查看 {cert.fullName} 認證圖片"
					>
						查看證照
					</button>
				</div>
			{/each}
		</div>

		<!-- Expertise Tags -->
		<div class="mt-12 flex flex-wrap justify-center gap-3">
			<Badge variant="indigo">市場結構分析</Badge>
			<Badge variant="indigo">Smart Money Concepts</Badge>
			<Badge variant="indigo">風險管理</Badge>
			<Badge variant="indigo">系統化交易</Badge>
		</div>
	</div>
</section>

<ImageModal
	isOpen={selectedImage !== null}
	imageUrl={selectedImage?.url ?? ''}
	imageAlt={selectedImage?.alt ?? ''}
	onClose={closeCertificationImage}
/>
