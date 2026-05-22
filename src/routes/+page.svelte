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
	import {
		createPersonSchema,
		createProfilePageSchema,
		createSeoConfig,
		createWebsiteSchema,
		homeSeo
	} from '$lib/data/seo';
	import { Head, SchemaOrg } from 'svead';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const seoConfig = createSeoConfig(homeSeo, page.url);
	const personSchema = createPersonSchema();
	const websiteSchema = createWebsiteSchema(personSchema);
	const profileSchema = createProfilePageSchema(personSchema);
</script>

<Head seo_config={seoConfig} />
<SchemaOrg schema={websiteSchema} />
<SchemaOrg schema={personSchema} />
<SchemaOrg schema={profileSchema} />
<Navbar />

<main id="main-content">
	<Hero />
	<ImpactStats courseImages={data.courseImages} />
	<Collaborations />
	<Certifications />
	<TrackRecord />
	<BeyondFinance />
	<Music />
	<Footer />
</main>
