import type { NavItem, SocialLink } from '$lib/types';

export const navItems: NavItem[] = [
	{ label: '課程', href: '#impact-stats' },
	{ label: '合作', href: '#collaborations' },
	{ label: '音樂', href: '#music' },
	{ label: '聯繫', href: '#footer' }
];

export const socialLinks: SocialLink[] = [
	{ platform: 'youtube', url: 'https://www.youtube.com/@Butter.8ter', ariaLabel: 'YouTube 頻道' },
	{ platform: 'instagram', url: 'https://www.instagram.com/butter._l/', ariaLabel: 'Instagram' },
	{ platform: 'spotify', url: 'https://open.spotify.com/artist/22BENrsOtaAg9MuLfc7egJ', ariaLabel: 'Spotify 音樂' },
	{ platform: 'threads', url: 'https://www.threads.com/@butter._l', ariaLabel: 'Threads' }
];
