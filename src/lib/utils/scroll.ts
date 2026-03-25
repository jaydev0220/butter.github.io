/** Smooth scroll to element by ID with offset for fixed navbar */
export function scrollToSection(elementId: string, offset: number = 80): void {
	const element = document.getElementById(elementId);
	if (!element) return;

	const elementPosition = element.getBoundingClientRect().top + window.scrollY;
	const offsetPosition = elementPosition - offset;

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth'
	});
}

/** Create IntersectionObserver for scroll animations */
export function createScrollObserver(
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit
): IntersectionObserver {
	const defaultOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1,
		...options
	};
	return new IntersectionObserver(callback, defaultOptions);
}
