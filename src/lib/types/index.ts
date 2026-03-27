/** Impact stats displayed in the hero/stats section */
export interface Stat {
	metric: string;
	value: string;
	label: string;
}

/** Partner/collaborator information */
export interface Partner {
	name: string;
	description: string;
	logoUrl: string;
}

/** Trading certification badge */
export interface Certification {
	badge: string;
	fullName: string;
	iconUrl: string;
}

/** Track record timeline event */
export interface TimelineEvent {
	date: string;
	event: string;
	outcome: string;
}

/** Beyond Finance capability pillar */
export interface BeyondFinancePillar {
	icon: string;
	title: string;
	description: string;
}

/** Social media link */
export interface SocialLink {
	platform: 'youtube' | 'instagram' | 'spotify' | 'threads';
	url: string;
	ariaLabel: string;
}

/** Navigation menu item */
export interface NavItem {
	label: string;
	href: string;
}
