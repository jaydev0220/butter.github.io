import { socialLinks } from '$lib/data/navigation';
import type { SchemaOrgProps, SeoConfig } from 'svead';

export interface PageSeo {
	title: string;
	description: string;
	imagePath?: string;
	imageAlt?: string;
	twitterCardType?: SeoConfig['twitter_card_type'];
}

interface PersonSchema {
	'@type': 'Person';
	name: string;
	alternateName: string[];
	jobTitle: string[];
	sameAs: string[];
}

type SeoSchema = SchemaOrgProps['schema'];

export const SITE_AUTHOR = 'Butter 巴特';
export const SITE_LOCALE = 'zh_TW';
export const SITE_NAME = 'Butter 巴特';
export const SITE_URL = 'https://eddyb5201314-afk.github.io/';
export const DEFAULT_OPEN_GRAPH_IMAGE_PATH = '/images/butter-sm.webp';

export const homeSeo: PageSeo = {
	title: 'Butter 巴特 — 金融交易講師 · 創作歌手',
	description:
		'你好，我是巴特（Butter）。我是一名金融交易講師與金融教育創作者，同時也是一位創作歌手。累積 20 萬+學生。持有 MCF、Topstep、FTMO 認證，曾與 Bybit、群益證券合作開講。專注市場結構與資金行為（Smart Money Concepts）研究與教學。',
	twitterCardType: 'summary'
};

export const joinSeo: PageSeo = {
	title: '加入 Butter 巴特學員社群 — Bybit 註冊與 Discord 加入流程',
	description:
		'依照指定邀請連結完成 Bybit 註冊、KYC、入金與 UID 留言，解鎖 Butter 巴特學員 Discord 社群交流與課程資源。',
	twitterCardType: 'summary'
};

export function createSeoConfig(pageSeo: PageSeo, url: URL): SeoConfig {
	const pageUrl = createPageUrl(url);

	return {
		title: pageSeo.title,
		url: pageUrl,
		description: pageSeo.description,
		language: SITE_LOCALE,
		author_name: SITE_AUTHOR,
		site_name: SITE_NAME,
		open_graph_image: createAbsoluteUrl(pageSeo.imagePath ?? DEFAULT_OPEN_GRAPH_IMAGE_PATH),
		open_graph_image_alt: pageSeo.imageAlt ?? pageSeo.title,
		twitter_card_type: pageSeo.twitterCardType ?? 'summary_large_image'
	};
}

export function createPersonSchema(): PersonSchema {
	return {
		'@type': 'Person',
		name: SITE_AUTHOR,
		alternateName: ['Butter', '巴特'],
		jobTitle: ['金融交易講師', '金融教育創作者', '創作歌手', '歌手', '創作者'],
		sameAs: socialLinks.map(({ url }) => url)
	};
}

export function createWebsiteSchema(personSchema: PersonSchema): SeoSchema {
	return {
		'@type': 'WebSite',
		name: homeSeo.title,
		url: createAbsoluteUrl('/'),
		description: homeSeo.description,
		publisher: personSchema,
		inLanguage: SITE_LOCALE
	};
}

export function createProfilePageSchema(personSchema: PersonSchema): SeoSchema {
	return {
		'@type': 'ProfilePage',
		mainEntity: personSchema
	};
}

export function createWebPageSchema(
	pageSeo: PageSeo,
	url: URL,
	personSchema: PersonSchema
): SeoSchema {
	return {
		'@type': 'WebPage',
		name: pageSeo.title,
		url: createPageUrl(url),
		description: pageSeo.description,
		inLanguage: SITE_LOCALE,
		author: personSchema
	};
}

function createPageUrl(url: URL): string {
	return createAbsoluteUrl(url.pathname);
}

function createAbsoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}
