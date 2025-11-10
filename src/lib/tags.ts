// ABOUTME: Tag utility functions for blog posts
// ABOUTME: Provides tag extraction, normalization, and filtering
import type { CollectionEntry } from "astro:content";

export interface TagInfo {
	tag: string;      // Original tag text from frontmatter
	slug: string;     // URL-safe normalized version
	count: number;    // Number of posts with this tag
}

/**
 * Converts tag string to URL-safe slug
 * Examples: "3D print" -> "3d-print", "Machine Learning" -> "machine-learning"
 */
export function normalizeTagForUrl(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/^-+|-+$/g, "");
}

/**
 * Extracts all unique tags from posts collection
 * Returns array sorted alphabetically by tag name
 */
export function getAllTags(
	posts: CollectionEntry<"blog">[],
): TagInfo[] {
	const tagMap = new Map<string, { tag: string; count: number }>();

	for (const post of posts) {
		if (!post.data.tags) continue;

		for (const tag of post.data.tags) {
			const slug = normalizeTagForUrl(tag);
			const existing = tagMap.get(slug);

			if (existing) {
				existing.count++;
			} else {
				tagMap.set(slug, { tag, count: 1 });
			}
		}
	}

	return Array.from(tagMap.entries())
		.map(([slug, { tag, count }]) => ({ tag, slug, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Filters posts by normalized tag slug
 * Returns posts sorted by date descending (newest first)
 */
export function getPostsByTag(
	posts: CollectionEntry<"blog">[],
	tagSlug: string,
): CollectionEntry<"blog">[] {
	return posts
		.filter((post) => {
			if (!post.data.tags) return false;
			return post.data.tags.some(
				(tag) => normalizeTagForUrl(tag) === tagSlug,
			);
		})
		.sort((a, b) => {
			const dateA = new Date(a.data.pubDate);
			const dateB = new Date(b.data.pubDate);
			return dateB.getTime() - dateA.getTime();
		});
}
