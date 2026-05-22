/** Impact stats displayed in the hero/stats section */
export interface Stat {
	metric: string;
	value: string;
	label: string;
	localeString: boolean;
}

/** Course gallery image discovered from static assets */
export interface CourseImage {
	src: string;
	alt: string;
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
	imageUrl: string;
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

export interface Contact {
	label: string;
	imageUrl: string;
	iconUrl: string;
}

export interface JoinAction {
	label: string;
	href: string;
}

export interface JoinStepNote {
	title: string;
	items: string[];
	ordered?: boolean;
}

export interface JoinStep {
	id: string;
	title: string;
	description: string;
	action?: JoinAction;
	note?: JoinStepNote;
}

export interface JoinStepState extends JoinStep {
	completed: boolean;
	enabled: boolean;
}

export interface JoinResource {
	label: string;
	title: string;
	description: string;
	buttonLabel: string;
	href: string;
}

export interface JoinFaq {
	id: string;
	question: string;
	answer: string;
	action?: JoinAction;
}
