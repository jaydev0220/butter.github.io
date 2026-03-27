<script lang="ts">
	import { socialLinks } from '$lib/data/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import SocialIcon from '$lib/components/ui/SocialIcon.svelte';
	import ImageModal from '$lib/components/ui/ImageModal.svelte';
	import { contacts } from '$lib/data/contacts';

	const currentYear = new Date().getFullYear();

	let selectedImage = $state<{ url: string; alt: string } | null>(null);

	function openImage(imageUrl: string, label: string): void {
		selectedImage = { url: imageUrl, alt: `${label} QRCode` };
	}

	function closeImage(): void {
		selectedImage = null;
	}
</script>

<!-- CTA Section -->
<section class="bg-gold-deep py-20 text-white md:py-28">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">準備好開始了嗎？</h2>
		<p class="mx-auto mb-8 max-w-2xl text-gold-light">
			加入超過 20 萬名學員的行列，一起學習系統化的金融交易知識。
		</p>
		<Button
			variant="primary"
			href="https://www.youtube.com/@Dump.Money.Earns.More."
			class="bg-gold hover:bg-gold-hover"
		>
			開始學習
		</Button>
	</div>
</section>

<!-- Footer -->
<footer id="footer" class="bg-indigo-darkest py-12 text-white">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<h3 class="mb-4 font-display text-xl font-bold">Butter 巴特</h3>
				<p class="text-sm text-indigo-light">金融交易講師 · 教育創作者 · 創作歌手</p>
				<p class="mt-2 text-sm text-indigo-light">交易是邏輯，音樂是靈魂</p>
			</div>

			<!-- Social -->
			<div>
				<h4 class="mb-4 font-bold">社群連結</h4>
				<!-- eslint-disable svelte/no-navigation-without-resolve -- External links -->
				<div class="flex gap-4">
					{#each socialLinks as social (social.platform)}
						<a
							href={social.url}
							aria-label={social.ariaLabel}
							class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-deep
								transition-colors hover:bg-indigo"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SocialIcon platform={social.platform} />
						</a>
					{/each}
				</div>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</div>

			<!-- Contact -->
			<div>
				<h4 class="mb-4 font-bold">
					聯繫方式
					<span class="text-sm font-normal text-text-muted">（點擊放大）</span>
				</h4>
				<div class="flex gap-4">
					{#each contacts as contact (contact.label)}
						<button
							type="button"
							class="cursor-pointer transition-transform hover:scale-110 focus:scale-110
								focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
							onclick={() => openImage(contact.imageUrl, contact.label)}
							aria-label="放大 {contact.label} QRCode"
						>
							<img
								src={contact.iconUrl}
								alt="{contact.label} QRCode"
								class="h-12 w-12 rounded"
								width="48"
								height="48"
							/>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="border-t border-indigo-deep pt-8 text-center text-sm text-indigo-mid">
			<p>
				© {currentYear} Butter 巴特. All rights reserved. · Site by
				<a
					href="https://www.hsieh-dev.us.ci"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-gold">謝孟哲</a
				>
			</p>
		</div>
	</div>
</footer>

<!-- Image Modal -->
<ImageModal
	isOpen={selectedImage !== null}
	imageUrl={selectedImage?.url ?? ''}
	imageAlt={selectedImage?.alt ?? ''}
	onClose={closeImage}
/>
