/**
 * Count-up animation for numbers
 * @param target - Final number to count to
 * @param duration - Duration in milliseconds
 * @param callback - Called on each frame with current value
 * @returns Cleanup function to cancel animation
 */
export function countUp(
	target: number,
	duration: number,
	callback: (value: number) => void
): () => void {
	const startTime = performance.now();
	let animationId: number;

	function update(currentTime: number): void {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = easeOutCubic(progress);
		const currentValue = Math.floor(easedProgress * target);

		callback(currentValue);

		if (progress < 1) {
			animationId = requestAnimationFrame(update);
		} else {
			callback(target);
		}
	}

	animationId = requestAnimationFrame(update);

	return () => cancelAnimationFrame(animationId);
}

/** Easing function: ease-out cubic */
export function easeOutCubic(t: number): number {
	return 1 - Math.pow(1 - t, 3);
}

/** Stagger delay calculator */
export function staggerDelay(index: number, delay: number = 100): number {
	return index * delay;
}

/** Parse numeric value from string (e.g., "20萬+" → 200000) */
export function parseStatValue(value: string): number | null {
	const match = value.match(/(\d+)/);
	if (!match) return null;

	const num = parseInt(match[1], 10);
	if (value.includes('萬')) return num * 10000;
	return num;
}
