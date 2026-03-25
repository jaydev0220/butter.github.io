<script lang="ts">
	const spotifyArtistId = '22BENrsOtaAg9MuLfc7egJ';
</script>

<section id="music" class="bg-rose-deep py-20 text-white md:py-28">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">創作音樂</h2>
			<p class="mx-auto max-w-2xl text-rose-light">
				在金融教育之外，我以創作歌手的身份，用音樂表達另一面的自己。
			</p>
		</div>

		<!-- Spotify Embed -->
		<div class="mx-auto max-w-2xl">
			<iframe
				title="Spotify Artist"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/artist/{spotifyArtistId}?utm_source=generator&theme=0"
				width="100%"
				height="352"
				frameborder="0"
				allowfullscreen
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			></iframe>
		</div>

		<!-- Decorative Vinyl Animation -->
		<div class="mt-12 flex justify-center" aria-hidden="true">
			<div class="relative h-38 w-38">
				<!-- Vinyl Record -->
				<div
					class="animate-spin-slow absolute inset-0 rounded-full bg-linear-to-br from-neutral-900 to-neutral-800"
				>
					<!-- Grooves -->
					<div class="absolute inset-2 rounded-full border border-neutral-700"></div>
					<div class="absolute inset-4 rounded-full border border-neutral-700"></div>
					<div class="absolute inset-6 rounded-full border border-neutral-700"></div>
					<div class="absolute inset-8 rounded-full border border-neutral-700"></div>
					<!-- Center Label -->
					<div class="absolute inset-10 flex items-center justify-center rounded-full bg-rose">
						<span class="text-xs font-bold text-white">BUTTER</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin-slow {
		animation: spin-slow 8s linear infinite;
	}
</style>
