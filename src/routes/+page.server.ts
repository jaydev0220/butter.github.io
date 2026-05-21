import { readdir } from 'node:fs/promises';
import { extname, join, parse } from 'node:path';
import type { CourseImage } from '$lib/types';

const courseImageDirectory = join(process.cwd(), 'static', 'images', 'course');
const supportedImageExtensions = new Set(['.avif', '.gif', '.jpg', '.jpeg', '.png', '.webp']);

function isMissingDirectory(error: unknown): boolean {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		(error as { code?: string }).code === 'ENOENT'
	);
}

function createImageAlt(filename: string, index: number): string {
	const label = parse(filename).name.replace(/[-_]+/g, ' ').trim();

	return label ? `課程照片 ${label}` : `課程照片 ${index + 1}`;
}

export async function load(): Promise<{ courseImages: CourseImage[] }> {
	let entries;

	try {
		entries = await readdir(courseImageDirectory, { withFileTypes: true });
	} catch (error) {
		if (isMissingDirectory(error)) {
			return { courseImages: [] };
		}

		throw error;
	}

	const courseImages = entries
		.filter((entry) => entry.isFile())
		.map((entry) => entry.name)
		.filter((filename) => supportedImageExtensions.has(extname(filename).toLowerCase()))
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
		.map((filename, index) => ({
			src: `/images/course/${filename}`,
			alt: createImageAlt(filename, index)
		}));

	return { courseImages };
}
