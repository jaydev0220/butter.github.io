<script lang="ts">
	import Navbar from '$lib/components/navigation/Navbar.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import ImpactStats from '$lib/components/sections/ImpactStats.svelte';
	import Collaborations from '$lib/components/sections/Collaborations.svelte';
	import Certifications from '$lib/components/sections/Certifications.svelte';
	import TrackRecord from '$lib/components/sections/TrackRecord.svelte';
	import BeyondFinance from '$lib/components/sections/BeyondFinance.svelte';
	import Music from '$lib/components/sections/Music.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
</script>

<svelte:head>
	<title>Butter 巴特 — 金融交易講師 · 創作歌手</title>
	<meta property="og:title" content="Butter 巴特 — 金融交易講師 · 創作歌手" />
	<meta property="og:type" content="website" />
</svelte:head>

<Navbar />

<main id="main-content">
	<Hero />
	<ImpactStats />
	<Collaborations />
	<Certifications />
	<TrackRecord />
	<BeyondFinance />
	<Music />
	<Footer />
</main>
