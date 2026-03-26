<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$lib/components/navigation/Navbar.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import ImpactStats from '$lib/components/sections/ImpactStats.svelte';
	import Collaborations from '$lib/components/sections/Collaborations.svelte';
	import Certifications from '$lib/components/sections/Certifications.svelte';
	import TrackRecord from '$lib/components/sections/TrackRecord.svelte';
	import BeyondFinance from '$lib/components/sections/BeyondFinance.svelte';
	import Music from '$lib/components/sections/Music.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { socialLinks } from '$lib/data/navigation';
	import { Head, SchemaOrg, type SeoConfig, type SchemaOrgProps } from 'svead';

	const title = 'Butter 巴特 — 金融交易講師 · 創作歌手';
	const url = page.url.toString();
	const author = 'Butter 巴特';
	const description =
		'你好，我是巴特（Butter）。我是一名金融交易講師與金融教育創作者，同時也是一位創作歌手。累積 20 萬+學生。持有 MCF、Topstep、FTMO 認證，曾與 Bybit、群益證券合作開講。專注市場結構與資金行為（Smart Money Concepts）研究與教學。';
	const language = 'zh_TW';
	const seoConfig: SeoConfig = {
		title,
		url,
		description,
		language,
		author_name: author,
		twitter_card_type: 'summary'
	};
	const personSchema: SchemaOrgProps['schema'] = {
		'@type': 'Person',
		name: author,
		alternateName: ['Butter', '巴特'],
		jobTitle: ['金融交易講師', '金融教育創作者', '創作歌手', '歌手', '創作者'],
		sameAs: socialLinks.map(({ url }) => url)
	};
	const websiteSchema: SchemaOrgProps['schema'] = {
		url,
		description,
		'@type': 'WebSite',
		name: title,
		publisher: personSchema,
		inLanguage: language
	};
	const profileSchema: SchemaOrgProps['schema'] = {
		'@type': 'ProfilePage',
		mainEntity: personSchema
	};
</script>

<Head seo_config={seoConfig} />
<SchemaOrg schema={websiteSchema} />
<SchemaOrg schema={personSchema} />
<SchemaOrg schema={profileSchema} />
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
